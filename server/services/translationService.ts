import { GoogleGenAI } from '@google/genai';

interface TranslationResult {
  translation: string;
  directorNote?: string;
}

// In-memory cache for translations to ensure instant repeated lookups
const translationCache = new Map<string, TranslationResult>();

// Semantic dictionary for high-frequency phrases, idioms, and creator terminology
const SEMANTIC_DICTIONARY: Record<string, string> = {
  // Common video / social phrases
  'como começar': 'how to get started',
  'como fazer': 'how to make',
  'passo a passo': 'step-by-step blueprint',
  'do zero': 'from scratch',
  'o erro que': 'the mistake that',
  'não cometas este erro': "don't make this mistake",
  'não cometa esse erro': "don't make this mistake",
  'no cometas este error': "don't make this mistake",
  'guarda este vídeo': 'save this video',
  'salva esse vídeo': 'save this video',
  'guarda este vídeo para': 'save this video for',
  'guarda este video': 'save this video',
  'comenta': 'comment',
  'partilha com': 'share with',
  'comparte con': 'share with',
  'deixa o like': 'drop a like',
  'inscreva-se no canal': 'subscribe to the channel',
  'subscreve o canal': 'subscribe to the channel',
  'suscríbete al canal': 'subscribe to the channel',
  'pão de ló': 'traditional sponge cake',
  'tarta de chocolate': 'rich chocolate cake',
  'bolo de chocolate': 'rich chocolate cake',
  'cuota de autónomos': 'freelancer social security quota',
  'hacienda': 'the Spanish tax authority (Hacienda)',
  'autónomos': 'freelancers / sole traders',
  'declaración de la renta': 'annual income tax return',
  'poupar no irs': 'minimise Portuguese income tax (IRS)',
  'irs': 'Portuguese personal income tax (IRS)',
  'tesouro direto': 'government treasury bonds',
  'renda fixa': 'fixed income investments',
  'poupança': 'traditional savings account',
  'fatia perfeita': 'picture-perfect slice',
  'textura fofa e húmida': 'tender and moist crumb texture',
  'horta em casa': 'home vegetable garden',
  'em vasos': 'in containers / pots',
  'poupar nas compras': 'saving money on grocery shopping',
};

/**
 * Natural, meaning-first semantic translation.
 * Ensures creator content retains punch, tone, and marketing intent without robotic word-for-word output.
 */
export async function translateNaturally(
  text: string,
  targetLang: 'en' | 'es' | 'pt' = 'en',
  context: 'competitor_title' | 'competitor_snippet' | 'script' | 'hook' | 'general' = 'general',
  apiKey?: string
): Promise<TranslationResult> {
  if (!text || text.trim() === '') {
    return { translation: '' };
  }

  const cleanText = text.trim();
  const cacheKey = `${targetLang}_${context}_${cleanText}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // 1. If Gemini API key is available, execute natural semantic translation
  const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;
  if (effectiveApiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: effectiveApiKey });
      const prompt = `You are an elite bilingual creative director and YouTube content strategist.
Translate the following ${context.replace('_', ' ')} into natural, modern, native ${targetLang === 'en' ? 'British English' : targetLang === 'es' ? 'Peninsular Spanish' : 'European Portuguese'}.

CRITICAL RULES:
1. NEVER translate literally word-for-word.
2. Capture the exact emotional hook, marketing punch, creator intent, and natural conversational cadence.
3. If translating a competitor title or script, translate the meaning as if written directly by a top native content creator.
4. Provide a 1-sentence "Director's Note" explaining the strategic psychology or marketing trigger of this content.

Input Text: "${cleanText}"

Output format strictly as JSON:
{
  "translation": "natural translated text",
  "directorNote": "1-sentence marketing or creative director explanation"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
      });

      const raw = response.text || '';
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.translation) {
          const res: TranslationResult = {
            translation: parsed.translation.trim(),
            directorNote: parsed.directorNote?.trim(),
          };
          translationCache.set(cacheKey, res);
          return res;
        }
      }
    } catch (err: any) {
      console.warn('[Translation] Gemini natural translation failed, using semantic fallback:', err?.message || err);
    }
  }

  // 2. Intelligent Semantic Fallback (Heuristic & Dictionary)
  const result = generateSemanticFallback(cleanText, targetLang, context);
  translationCache.set(cacheKey, result);
  return result;
}

function generateSemanticFallback(
  text: string,
  targetLang: 'en' | 'es' | 'pt',
  context: string
): TranslationResult {
  // If target is English, perform semantic conversion
  if (targetLang === 'en') {
    let translated = text;

    // Apply phrase dictionary replacements
    for (const [pattern, replacement] of Object.entries(SEMANTIC_DICTIONARY)) {
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      translated = translated.replace(regex, replacement);
    }

    // Common linguistic connective patterns (PT/ES -> EN)
    translated = translated
      .replace(/\bcomo fazer um\b/gi, 'How to make a')
      .replace(/\bcomo fazer uma\b/gi, 'How to make a')
      .replace(/\bcomo fazer\b/gi, 'How to make')
      .replace(/\bcomo preparar\b/gi, 'How to prepare')
      .replace(/\bcómo hacer un\b/gi, 'How to make a')
      .replace(/\bcómo hacer una\b/gi, 'How to make a')
      .replace(/\bcómo hacer\b/gi, 'How to make')
      .replace(/\bguía completa\b/gi, 'Complete guide')
      .replace(/\bguia completo\b/gi, 'Complete guide')
      .replace(/\bpara iniciantes\b/gi, 'for beginners')
      .replace(/\bpara principiantes\b/gi, 'for beginners')
      .replace(/\bpasso a passo\b/gi, 'step by step')
      .replace(/\bpasso a passo\b/gi, 'step by step')
      .replace(/\bsem segredos\b/gi, 'without complications')
      .replace(/\bsin secretos\b/gi, 'without secrets')
      .replace(/\bmelhor receita\b/gi, 'best recipe')
      .replace(/\bmelhor forma de\b/gi, 'best way to')
      .replace(/\bmejor manera de\b/gi, 'best way to')
      .replace(/\bmais fácil\b/gi, 'easiest')
      .replace(/\bmás fácil\b/gi, 'easiest')
      .replace(/\bcom apenas\b/gi, 'with only')
      .replace(/\bcon solo\b/gi, 'with only')
      .replace(/\bingredientes simples\b/gi, 'simple ingredients')
      .replace(/\btudo o que precisas saber\b/gi, 'everything you need to know')
      .replace(/\btudo o que você precisa saber\b/gi, 'everything you need to know')
      .replace(/\btodo lo que necesitas saber\b/gi, 'everything you need to know');

    // Capitalize first letter
    translated = translated.charAt(0).toUpperCase() + translated.slice(1);

    let directorNote: string | undefined;
    if (context === 'competitor_title') {
      directorNote = 'Competitor Angle: Formatted to target high-intent search queries with immediate promise of ease or authority.';
    } else if (context === 'script') {
      directorNote = 'Presenter Beat: Designed to sustain viewer retention through high pacing and clear transformation.';
    } else if (context === 'hook') {
      directorNote = 'Hook Mechanism: Disrupts scrolling habits within 3 seconds using contrast and curiosity.';
    }

    return { translation: translated, directorNote };
  }

  // Fallback for identical or non-English target
  return { translation: text };
}
