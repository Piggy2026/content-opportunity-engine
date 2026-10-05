import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ResearchRequest, OpportunityEngineResult } from '../src/types/index.js';
import { searchCompetitors } from './services/searchService.js';
import { analyzeOutliers } from './services/outlierService.js';
import { detectContentGaps } from './services/gapService.js';
import { generateRankedIdeas } from './services/ideasService.js';
import { generateScriptSuite } from './services/scriptService.js';
import { enforceTopicFidelity } from './services/topicValidator.js';
import { getCacheKey, getCachedItem, setCachedItem } from './services/cacheService.js';
import { getAllProjects, getProjectById, saveProject, deleteProject } from './data/projectsStore.js';
import { translateNaturally } from './services/translationService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health and configuration check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    config: {
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      hasYouTubeKey: Boolean(process.env.YOUTUBE_API_KEY),
      hasTavilyKey: Boolean(process.env.TAVILY_API_KEY),
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

// Main Opportunity Pipeline Endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const researchReq = req.body as ResearchRequest;

    if (!researchReq.topic || !researchReq.market || !researchReq.platform) {
      return res.status(400).json({
        error: 'Missing required parameters: topic, market, and platform are required.',
      });
    }

    const cacheKey = getCacheKey(researchReq.topic, researchReq.market, researchReq.platform);
    const cached = getCachedItem<OpportunityEngineResult>(cacheKey);

    // If cached, return immediately to save quota and speed up response
    if (cached) {
      console.log(`[Engine] Serving cached result for: "${cacheKey}"`);
      return res.json({ ...cached, cached: true });
    }

    console.log(`[Engine] Running full pipeline for: "${researchReq.topic}" (${researchReq.market}, ${researchReq.platform})`);

    // 1. Live Web & Video Search Research (with provenance and zero-fabrication guarantees)
    const { competitors, provenance } = await searchCompetitors(researchReq);
    console.log(`[Engine] Search result: ${competitors.length} competitors. Provenance: ${provenance.sourceType}, Live: ${provenance.isLiveResearchAvailable}`);

    // 2. Outlier Analysis
    const outlierAnalysis = analyzeOutliers(researchReq, competitors);

    // 3. Content Gap Detection
    const contentGaps = detectContentGaps(researchReq, competitors);

    // 4. Generate 15-20 Ranked Content Ideas
    const rankedIdeas = generateRankedIdeas(researchReq, contentGaps, competitors);

    // Best Opportunity is #1 ranked idea
    const bestOpportunity = rankedIdeas[0];

    // 5. Generate 3 Script Variations, Titles, Hooks, CTAs, and Sources
    const scriptSuite = generateScriptSuite(researchReq, bestOpportunity, competitors);

    const result: OpportunityEngineResult = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      request: researchReq,
      cached: false,
      isLiveResearchAvailable: provenance.isLiveResearchAvailable,
      researchProvenance: provenance,
      competitors,
      outlierAnalysis,
      contentGaps,
      rankedIdeas,
      bestOpportunityId: bestOpportunity.id,
      bestOpportunity,
      scripts: scriptSuite.scripts,
      titles: scriptSuite.titles,
      hooks: scriptSuite.hooks,
      ctas: scriptSuite.ctas,
      sources: scriptSuite.sources,
    };

    // Strict topic-fidelity enforcement
    const validatedResult = enforceTopicFidelity(result);

    // Cache the completed analysis
    setCachedItem(cacheKey, validatedResult);

    // Automatically save project into local store
    saveProject(validatedResult);

    return res.json(validatedResult);
  } catch (err: any) {
    console.error('[Engine] Analysis pipeline failed:', err);
    return res.status(500).json({
      error: 'Failed to complete content opportunity analysis.',
      details: err.message,
    });
  }
});

// Generate scripts for any chosen idea from the 15-20 list
app.post('/api/generate-scripts-for-idea', (req, res) => {
  try {
    const { request: researchReq, idea, competitors } = req.body;
    if (!researchReq || !idea) {
      return res.status(400).json({ error: 'Missing request or idea payload' });
    }

    const scriptSuite = generateScriptSuite(researchReq, idea, competitors || []);
    return res.json(scriptSuite);
  } catch (err: any) {
    console.error('[Engine] Script generation for idea failed:', err);
    return res.status(500).json({ error: 'Failed to generate scripts for idea', details: err.message });
  }
});

// Natural Semantic Translation Endpoint (meaning-first for creative directors & strategists)
app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLang = 'en', context = 'general', apiKey } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Missing text parameter' });
    }
    const result = await translateNaturally(text, targetLang, context, apiKey);
    return res.json(result);
  } catch (err: any) {
    console.error('[Engine] Translation failed:', err);
    return res.status(500).json({ error: 'Translation failed', details: err.message });
  }
});

// Saved Projects Endpoints
app.get('/api/projects', (req, res) => {
  const projects = getAllProjects();
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = getProjectById(req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.post('/api/projects', (req, res) => {
  const project = req.body as OpportunityEngineResult;
  if (!project.id) {
    return res.status(400).json({ error: 'Project must have an id' });
  }
  saveProject(project);
  res.json({ success: true, id: project.id });
});

app.delete('/api/projects/:id', (req, res) => {
  const deleted = deleteProject(req.params.id);
  res.json({ success: deleted });
});

import path from 'path';
import fs from 'fs';

// Serve compiled frontend when available
const staticDistPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(staticDistPath)) {
  app.use(express.static(staticDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(staticDistPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] Content Opportunity Engine backend running on http://localhost:${PORT}`);
});
