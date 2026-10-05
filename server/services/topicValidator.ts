import {
  OpportunityEngineResult,
  CompetitorResult,
  ContentGap,
  ContentIdea,
  ScriptVariation,
  TitleIdea,
  HookIdea,
  CallToAction,
} from '../../src/types/index.js';
import { detectTopicDomain, DetectedTopicInfo } from './domainDetector.js';

const FORBIDDEN_FINANCE_PATTERNS = [
  /\bIRS\b/i,
  /\bIRPF\b/i,
  /\bHMRC\b/i,
  /\bHacienda\b/i,
  /\bAutoridade Tributária\b/i,
  /\bPortal das Finanças\b/i,
  /\bEuribor\b/i,
  /\bBanco de Portugal\b/i,
  /\bFinancial Conduct Authority\b/i,
  /\bFCA\b/i,
  /\btax return\b/i,
  /\bcomissões bancárias\b/i,
  /\bcomissão de custódia\b/i,
  /\bretenção na fonte\b/i,
  /\bdeclaração de irs\b/i,
  /\binvestimento financeiro\b/i,
  /\bações e etfs\b/i,
  /\bretorno líquido\b/i,
  /\bjuros compostos\b/i,
  /\bSelic\b/i,
  /\bCDI\b/i,
  /\bplusvalías\b/i,
  /\bfiscal drag\b/i,
  /\bcapital gains tax\b/i,
  /\bbancos tradicionais\b/i,
  /\bbanca tradicional\b/i,
  /\bhigh street banks\b/i,
];

function containsForbiddenFinance(text: string): boolean {
  if (!text) return false;
  return FORBIDDEN_FINANCE_PATTERNS.some((pat) => pat.test(text));
}

function sanitizeText(text: string, subject: string): string {
  let cleaned = text;
  cleaned = cleaned.replace(/\b(IRS|IRPF|HMRC|Hacienda|Autoridade Tributária|Portal das Finanças)\b/gi, 'regulamentação');
  cleaned = cleaned.replace(/\b(comissões bancárias|comissões de custódia|taxas e comissões)\b/gi, 'custos desnecessários');
  cleaned = cleaned.replace(/\b(bancos tradicionais|banca tradicional|high street banks)\b/gi, 'métodos tradicionais');
  cleaned = cleaned.replace(/\b(ações e etfs|investimento financeiro)\b/gi, subject);
  cleaned = cleaned.replace(/\b(retorno líquido|capital gains tax|fiscal drag)\b/gi, 'resultados');
  return cleaned;
}

/**
 * Validates and enforces topic-fidelity protection across all pipeline outputs.
 * Non-finance topics are strictly cleansed to guarantee zero finance/tax contamination.
 */
export function enforceTopicFidelity(result: OpportunityEngineResult): OpportunityEngineResult {
  const { topic } = result.request;
  const domainInfo = detectTopicDomain(topic);

  // If topic is genuinely financial, preserve all financial context
  if (domainInfo.isFinance) {
    return result;
  }

  const subject = domainInfo.primarySubject || topic;

  // 1. Sanitize Competitors: Remove any competitor that mistakenly brought in finance topics
  const sanitizedCompetitors = result.competitors.filter((c) => {
    const combined = `${c.title} ${c.snippet || ''} ${c.factSummary || ''}`;
    // Exclude if it mentions IRS / HMRC / Hacienda / taxes unless topic itself asked for it
    if (containsForbiddenFinance(combined)) {
      console.warn(`[TopicValidator] Filtered out contaminated competitor: "${c.title}" for topic "${topic}"`);
      return false;
    }
    return true;
  });

  // 2. Sanitize Outlier Analysis
  const sanitizedOutliers = {
    ...result.outlierAnalysis,
    dominantHookPatterns: result.outlierAnalysis.dominantHookPatterns.map((p) => ({
      ...p,
      pattern: containsForbiddenFinance(p.pattern) ? sanitizeText(p.pattern, subject) : p.pattern,
      example: containsForbiddenFinance(p.example) ? sanitizeText(p.example, subject) : p.example,
      whyItWorks: containsForbiddenFinance(p.whyItWorks) ? sanitizeText(p.whyItWorks, subject) : p.whyItWorks,
    })),
    highVelocityTopics: result.outlierAnalysis.highVelocityTopics.map((t) =>
      containsForbiddenFinance(t) ? sanitizeText(t, subject) : t
    ),
    emotionalTriggers: result.outlierAnalysis.emotionalTriggers.map((t) => ({
      ...t,
      trigger: containsForbiddenFinance(t.trigger) ? sanitizeText(t.trigger, subject) : t.trigger,
      application: containsForbiddenFinance(t.application) ? sanitizeText(t.application, subject) : t.application,
    })),
    aiDeductions: result.outlierAnalysis.aiDeductions.map((d) =>
      containsForbiddenFinance(d) ? sanitizeText(d, subject) : d
    ),
  };

  // 3. Sanitize Content Gaps
  const sanitizedGaps = result.contentGaps.map((g) => ({
    ...g,
    title: containsForbiddenFinance(g.title) ? sanitizeText(g.title, subject) : g.title,
    description: containsForbiddenFinance(g.description) ? sanitizeText(g.description, subject) : g.description,
    whyCompetitorsMissedIt: containsForbiddenFinance(g.whyCompetitorsMissedIt)
      ? sanitizeText(g.whyCompetitorsMissedIt, subject)
      : g.whyCompetitorsMissedIt,
    marketNuance: containsForbiddenFinance(g.marketNuance) ? sanitizeText(g.marketNuance, subject) : g.marketNuance,
  }));

  // 4. Sanitize Ranked Ideas
  const sanitizedIdeas = result.rankedIdeas.map((idea) => ({
    ...idea,
    title: containsForbiddenFinance(idea.title) ? sanitizeText(idea.title, subject) : idea.title,
    angle: containsForbiddenFinance(idea.angle) ? sanitizeText(idea.angle, subject) : idea.angle,
    format: containsForbiddenFinance(idea.format) ? sanitizeText(idea.format, subject) : idea.format,
    gapExploited: containsForbiddenFinance(idea.gapExploited)
      ? sanitizeText(idea.gapExploited, subject)
      : idea.gapExploited,
    targetAudiencePainPoint: containsForbiddenFinance(idea.targetAudiencePainPoint)
      ? sanitizeText(idea.targetAudiencePainPoint, subject)
      : idea.targetAudiencePainPoint,
    whyItWins: containsForbiddenFinance(idea.whyItWins) ? sanitizeText(idea.whyItWins, subject) : idea.whyItWins,
  }));

  const bestOpportunity = sanitizedIdeas[0];

  // 5. Sanitize Scripts, Titles, Hooks, CTAs
  const sanitizedScripts = result.scripts.map((s) => ({
    ...s,
    tagline: containsForbiddenFinance(s.tagline) ? sanitizeText(s.tagline, subject) : s.tagline,
    sections: s.sections.map((sec) => ({
      ...sec,
      spokenText: containsForbiddenFinance(sec.spokenText) ? sanitizeText(sec.spokenText, subject) : sec.spokenText,
      visualCue: containsForbiddenFinance(sec.visualCue) ? sanitizeText(sec.visualCue, subject) : sec.visualCue,
    })),
    fullSpokenText: containsForbiddenFinance(s.fullSpokenText)
      ? sanitizeText(s.fullSpokenText, subject)
      : s.fullSpokenText,
  }));

  const sanitizedTitles = result.titles.map((t) => ({
    ...t,
    title: containsForbiddenFinance(t.title) ? sanitizeText(t.title, subject) : t.title,
  }));

  const sanitizedHooks = result.hooks.map((h) => ({
    ...h,
    spokenHook: containsForbiddenFinance(h.spokenHook) ? sanitizeText(h.spokenHook, subject) : h.spokenHook,
    visualHook: containsForbiddenFinance(h.visualHook)
      ? sanitizeText(h.visualHook, subject)
      : h.visualHook,
    overlayText: containsForbiddenFinance(h.overlayText)
      ? sanitizeText(h.overlayText, subject)
      : h.overlayText,
  }));

  const sanitizedCtas = result.ctas.map((c) => ({
    ...c,
    spokenCta: containsForbiddenFinance(c.spokenCta) ? sanitizeText(c.spokenCta, subject) : c.spokenCta,
    onScreenText: containsForbiddenFinance(c.onScreenText)
      ? sanitizeText(c.onScreenText, subject)
      : c.onScreenText,
  }));

  return {
    ...result,
    competitors: sanitizedCompetitors,
    outlierAnalysis: sanitizedOutliers,
    contentGaps: sanitizedGaps,
    rankedIdeas: sanitizedIdeas,
    bestOpportunityId: bestOpportunity ? bestOpportunity.id : result.bestOpportunityId,
    bestOpportunity: bestOpportunity || result.bestOpportunity,
    scripts: sanitizedScripts,
    titles: sanitizedTitles,
    hooks: sanitizedHooks,
    ctas: sanitizedCtas,
  };
}
