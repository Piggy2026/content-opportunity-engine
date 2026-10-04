import fs from 'fs';
import path from 'path';
import { OpportunityEngineResult, ProjectSummary } from '../../src/types/index.js';

const isServerless = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL);
const PROJECTS_FILE_PATH = isServerless
  ? path.resolve('/tmp', 'coe_projects.json')
  : path.resolve(process.cwd(), 'server', 'data', 'projects.json');

function ensureProjectsFile() {
  try {
    const dir = path.dirname(PROJECTS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(PROJECTS_FILE_PATH)) {
      fs.writeFileSync(PROJECTS_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('[ProjectsStore] Could not initialize projects file:', err);
  }
}

export function getAllProjects(): ProjectSummary[] {
  ensureProjectsFile();
  try {
    const raw = fs.readFileSync(PROJECTS_FILE_PATH, 'utf-8');
    const list: OpportunityEngineResult[] = JSON.parse(raw);
    return list.map((p) => ({
      id: p.id,
      createdAt: p.createdAt,
      topic: p.request.topic,
      market: p.request.market,
      platform: p.request.platform,
      bestIdeaTitle: p.bestOpportunity?.title || 'Sem título',
      opportunityScore: p.bestOpportunity?.opportunityScore || 90,
      competitorCount: p.competitors?.length || 0,
    }));
  } catch (err) {
    console.warn('[ProjectsStore] Error reading projects:', err);
    return [];
  }
}

export function getProjectById(id: string): OpportunityEngineResult | null {
  ensureProjectsFile();
  try {
    const raw = fs.readFileSync(PROJECTS_FILE_PATH, 'utf-8');
    const list: OpportunityEngineResult[] = JSON.parse(raw);
    return list.find((p) => p.id === id) || null;
  } catch (err) {
    console.warn('[ProjectsStore] Error getting project by id:', err);
    return null;
  }
}

export function saveProject(project: OpportunityEngineResult): void {
  ensureProjectsFile();
  try {
    const raw = fs.readFileSync(PROJECTS_FILE_PATH, 'utf-8');
    const list: OpportunityEngineResult[] = JSON.parse(raw);
    const existingIndex = list.findIndex((p) => p.id === project.id);
    if (existingIndex >= 0) {
      list[existingIndex] = project;
    } else {
      list.unshift(project);
    }
    fs.writeFileSync(PROJECTS_FILE_PATH, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[ProjectsStore] Error saving project:', err);
  }
}

export function deleteProject(id: string): boolean {
  ensureProjectsFile();
  try {
    const raw = fs.readFileSync(PROJECTS_FILE_PATH, 'utf-8');
    const list: OpportunityEngineResult[] = JSON.parse(raw);
    const filtered = list.filter((p) => p.id !== id);
    fs.writeFileSync(PROJECTS_FILE_PATH, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn('[ProjectsStore] Error deleting project:', err);
    return false;
  }
}
