import { Handler } from '@netlify/functions';
import { ResearchRequest, OpportunityEngineResult } from '../../src/types/index.js';
import { searchCompetitors } from '../../server/services/searchService.js';
import { analyzeOutliers } from '../../server/services/outlierService.js';
import { detectContentGaps } from '../../server/services/gapService.js';
import { generateRankedIdeas } from '../../server/services/ideasService.js';
import { generateScriptSuite } from '../../server/services/scriptService.js';
import { getCacheKey, getCachedItem, setCachedItem } from '../../server/services/cacheService.js';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const path = event.path.replace(/\/\.netlify\/functions\/api/, '').replace(/^\/api/, '');

  try {
    if (path === '/health' && event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'ok',
          environment: 'netlify-serverless',
          hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
        }),
      };
    }

    if (path === '/analyze' && event.httpMethod === 'POST') {
      const researchReq = JSON.parse(event.body || '{}') as ResearchRequest;
      if (!researchReq.topic || !researchReq.market || !researchReq.platform) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing topic, market or platform' }),
        };
      }

      const cacheKey = getCacheKey(researchReq.topic, researchReq.market, researchReq.platform);
      const cached = getCachedItem<OpportunityEngineResult>(cacheKey);
      if (cached) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ ...cached, cached: true }),
        };
      }

      const competitors = await searchCompetitors(researchReq);
      const outlierAnalysis = analyzeOutliers(researchReq, competitors);
      const contentGaps = detectContentGaps(researchReq, competitors);
      const rankedIdeas = generateRankedIdeas(researchReq, contentGaps, competitors);
      const bestOpportunity = rankedIdeas[0];
      const scriptSuite = generateScriptSuite(researchReq, bestOpportunity, competitors);

      const result: OpportunityEngineResult = {
        id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
        request: researchReq,
        cached: false,
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

      setCachedItem(cacheKey, result);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    }

    if (path === '/generate-scripts-for-idea' && event.httpMethod === 'POST') {
      const { request: researchReq, idea, competitors } = JSON.parse(event.body || '{}');
      const scriptSuite = generateScriptSuite(researchReq, idea, competitors || []);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(scriptSuite),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Endpoint not found' }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal server error' }),
    };
  }
};
