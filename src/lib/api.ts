import {
  OpportunityEngineResult,
  ProjectSummary,
  ResearchRequest,
  ContentIdea,
  CompetitorResult,
  ScriptVariation,
  TitleIdea,
  HookIdea,
  CallToAction,
  SourceCitation,
} from '../types/index.js';

const API_BASE = '/api';

export async function checkServerHealth(): Promise<{
  status: string;
  hasGeminiKey: boolean;
  hasYouTubeKey: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    const data = await res.json();
    return {
      status: data.status,
      hasGeminiKey: Boolean(data.config?.hasGeminiKey || data.hasGeminiKey),
      hasYouTubeKey: Boolean(data.config?.hasYouTubeKey),
    };
  } catch {
    return { status: 'offline', hasGeminiKey: false, hasYouTubeKey: false };
  }
}

export async function runOpportunityAnalysis(
  req: ResearchRequest
): Promise<OpportunityEngineResult> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({ error: 'Falha na análise' }));
    throw new Error(errData.error || errData.details || 'Falha ao processar pesquisa');
  }

  const result: OpportunityEngineResult = await res.json();

  // Save to client localStorage as backup
  try {
    const historyRaw = localStorage.getItem('coe_projects_backup');
    const history: OpportunityEngineResult[] = historyRaw ? JSON.parse(historyRaw) : [];
    const exists = history.findIndex((p) => p.id === result.id);
    if (exists >= 0) {
      history[exists] = result;
    } else {
      history.unshift(result);
    }
    localStorage.setItem('coe_projects_backup', JSON.stringify(history.slice(0, 30)));
  } catch (e) {
    console.warn('[LocalStorage] Could not backup project:', e);
  }

  return result;
}

export async function generateScriptsForIdea(
  req: ResearchRequest,
  idea: ContentIdea,
  competitors: CompetitorResult[]
): Promise<{
  scripts: ScriptVariation[];
  titles: TitleIdea[];
  hooks: HookIdea[];
  ctas: CallToAction[];
  sources: SourceCitation[];
}> {
  const res = await fetch(`${API_BASE}/generate-scripts-for-idea`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ request: req, idea, competitors }),
  });

  if (!res.ok) {
    throw new Error('Falha ao gerar variações para a ideia selecionada');
  }

  return res.json();
}

export async function fetchSavedProjects(): Promise<ProjectSummary[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (res.ok) {
      const serverProjects = await res.json();
      if (serverProjects && serverProjects.length > 0) {
        return serverProjects;
      }
    }
  } catch {
    // fallback to local storage
  }

  // Fallback to client localStorage
  try {
    const historyRaw = localStorage.getItem('coe_projects_backup');
    if (historyRaw) {
      const history: OpportunityEngineResult[] = JSON.parse(historyRaw);
      return history.map((p) => ({
        id: p.id,
        createdAt: p.createdAt,
        topic: p.request.topic,
        market: p.request.market,
        platform: p.request.platform,
        bestIdeaTitle: p.bestOpportunity?.title || 'Sem título',
        opportunityScore: p.bestOpportunity?.opportunityScore || 90,
        competitorCount: p.competitors?.length || 0,
      }));
    }
  } catch {
    // ignore
  }

  return [];
}

export async function fetchProjectDetails(id: string): Promise<OpportunityEngineResult | null> {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // fallback
  }

  try {
    const historyRaw = localStorage.getItem('coe_projects_backup');
    if (historyRaw) {
      const history: OpportunityEngineResult[] = JSON.parse(historyRaw);
      const found = history.find((p) => p.id === id);
      if (found) return found;
    }
  } catch {
    // ignore
  }

  return null;
}

export async function deleteProjectById(id: string): Promise<boolean> {
  try {
    await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
  } catch {
    // ignore
  }

  try {
    const historyRaw = localStorage.getItem('coe_projects_backup');
    if (historyRaw) {
      const history: OpportunityEngineResult[] = JSON.parse(historyRaw);
      const filtered = history.filter((p) => p.id !== id);
      localStorage.setItem('coe_projects_backup', JSON.stringify(filtered));
    }
  } catch {
    // ignore
  }

  return true;
}
