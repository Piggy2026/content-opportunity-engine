export type TargetMarket = 'pt-PT' | 'pt-BR' | 'es-ES';

export type Platform = 'youtube' | 'youtube-shorts' | 'tiktok' | 'instagram-reels';

export interface MarketOption {
  id: TargetMarket;
  name: string;
  country: string;
  flag: string;
  language: string;
  localeCode: string;
  description: string;
}

export interface PlatformOption {
  id: Platform;
  name: string;
  icon: string;
  format: string;
  recommendedLength: string;
  description: string;
}

export interface ResearchRequest {
  topic: string;
  market: TargetMarket;
  platform: Platform;
  audienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'all';
  seedCompetitors?: string[]; // Optional user-provided channels or URLs
  customNotes?: string;
  apiKey?: string; // Optional user-provided Gemini API key override
  numCompetitors?: number; // 10-20
}

export interface CompetitorResult {
  id: string;
  title: string;
  url: string;
  channelOrCreator: string;
  platform: Platform;
  views?: string;
  publishedDate?: string;
  snippet: string;
  isRealVerifiedSource: boolean; // Must be true for verified real URLs
  sourceDomain: string;
  thumbnailUrl?: string;
  detectedHookOrAngle?: string;
  factSummary: string; // Factual observation
  aiInference?: string; // Clearly labeled AI inference
}

export interface OutlierAnalysis {
  topFormatOutlier: {
    format: string;
    whyItOutperforms: string;
    frequencyObserved: string;
  };
  dominantHookPatterns: {
    pattern: string;
    example: string;
    whyItWorks: string;
  }[];
  highVelocityTopics: string[];
  emotionalTriggers: {
    trigger: string;
    application: string;
  }[];
  observedFacts: string[]; // Strict factual data points observed
  aiDeductions: string[];  // Clearly labeled AI deductions & hypotheses
}

export interface ContentGap {
  id: string;
  category: 'unanswered-question' | 'oversaturated-angle' | 'underserved-market-need' | 'weak-competitor-execution';
  title: string;
  description: string;
  whyCompetitorsMissedIt: string;
  marketNuance: string; // Specific to Portugal, Brazil, or Spain
  opportunityLevel: 'high' | 'very-high' | 'critical';
}

export interface ContentIdea {
  rank: number; // 1 to 20
  id: string;
  title: string;
  angle: string;
  format: string; // e.g., "60s Contrarian Breakdown", "8-min YouTube Deep Dive"
  opportunityScore: number; // 0 - 100
  gapExploited: string;
  targetAudiencePainPoint: string;
  viralityPotential: 'High' | 'Very High' | 'Exceptional';
  competitionLevel: 'Low' | 'Medium' | 'High';
  whyItWins: string;
  isBestOpportunity?: boolean;
}

export interface ScriptSection {
  timestamp: string; // e.g., "0:00 - 0:03"
  stage: 'Hook' | 'Agitate / Pattern Interrupt' | 'Core Value / Meat' | 'Payoff / Turnaround' | 'Call to Action';
  visualCue: string; // e.g., [VISUAL: Fast zoom-in on phone screen displaying bank notification]
  spokenText: string; // Spoken words in target language
  audioToneCue?: string; // e.g., [AUDIO: Snappy sound effect, energetic upbeat delivery]
}

export interface ScriptVariation {
  id: string;
  style: 'contrarian-mythbuster' | 'story-driven-case-study' | 'actionable-blueprint';
  styleName: string;
  badge: string;
  tagline: string;
  estimatedDuration: string;
  targetWordCount: number;
  sections: ScriptSection[];
  fullSpokenText: string;
}

export interface TitleIdea {
  id: string;
  type: 'Curiosity Gap' | 'Fear of Missing Out / Loss' | 'Contrarian' | 'Outcome / How-To' | 'Number / Listicle';
  title: string;
  score: number;
}

export interface HookIdea {
  id: string;
  type: 'Pattern Interrupt' | 'Provocative Question' | 'Bold Statement' | 'Story Opener' | 'Visual Shock';
  visualHook: string; // What the viewer sees in the first 2 seconds
  spokenHook: string; // What is spoken in the first 3 seconds
  overlayText: string; // On-screen bold typography
}

export interface CallToAction {
  id: string;
  goal: 'Save / Bookmark' | 'Comment / Keyword Automation' | 'Follow / Subscribe' | 'Share to Story / DM';
  spokenCta: string;
  onScreenText: string;
  platformBestPractice: string;
}

export interface SourceCitation {
  id: string;
  title: string;
  url: string;
  platform: Platform;
  channelOrHost: string;
  type: 'competitor_video' | 'industry_article' | 'official_data' | 'social_post';
  verificationStatus: 'verified_real_url' | 'cached_public_record';
  retrievedAt: string;
  snippet: string;
}

export interface OpportunityEngineResult {
  id: string;
  createdAt: string;
  request: ResearchRequest;
  cached: boolean;
  competitors: CompetitorResult[]; // 10-20
  outlierAnalysis: OutlierAnalysis;
  contentGaps: ContentGap[];
  rankedIdeas: ContentIdea[]; // 15-20
  bestOpportunityId: string;
  bestOpportunity: ContentIdea;
  scripts: ScriptVariation[]; // 3 variations
  titles: TitleIdea[]; // 5+
  hooks: HookIdea[]; // 5+
  ctas: CallToAction[]; // 3+
  sources: SourceCitation[];
}

export interface ProjectSummary {
  id: string;
  createdAt: string;
  topic: string;
  market: TargetMarket;
  platform: Platform;
  bestIdeaTitle: string;
  opportunityScore: number;
  competitorCount: number;
}
