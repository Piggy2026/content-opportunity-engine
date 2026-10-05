import { Platform } from '../../src/types/index.js';

interface RawSearchItem {
  title: string;
  url: string;
  snippet: string;
  sourceDomain: string;
}

const STOP_WORDS = new Set([
  'how', 'to', 'in', 'the', 'a', 'an', 'of', 'for', 'with', 'on', 'at', 'from', 'by',
  'como', 'fazer', 'fazer um', 'fazer uma', 'um', 'uma', 'de', 'para', 'em', 'com', 'no', 'na', 'nos', 'nas',
  'cómo', 'hacer', 'hacer un', 'hacer una', 'el', 'la', 'los', 'las', 'del', 'por',
  'video', 'canal', 'shorts', 'reels', 'youtube', 'tiktok', 'instagram', 'portugal', 'brasil', 'españa', 'uk',
]);

const EXCLUDED_NOISE_TERMS = [
  'novela', 'telenovela', 'episodio completo', 'capitulo completo', 'capítulo',
  'hospital', 'futebol', 'jogo ao vivo', 'melhores momentos', 'highlights',
  'k-pop', 'kdrama', 'dorama', 'anime', 'gameplay', 'walkthrough game',
  'noticiário', 'telejornal', 'jornal da noite',
];

/**
 * Extracts key semantic tokens from a topic string.
 */
export function extractTopicKeywords(topic: string): string[] {
  return topic
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

/**
 * Evaluates whether a search item is authentically and semantically relevant to the topic.
 */
export function isSourceRelevant(
  item: RawSearchItem,
  topic: string,
  platform: Platform
): boolean {
  if (!item.url || !item.url.startsWith('http') || !item.title) {
    return false;
  }

  // Must not be a search engine redirect or search result aggregator
  if (item.url.includes('google.com/search') || item.url.includes('duckduckgo.com') || item.url.includes('bing.com')) {
    return false;
  }

  const titleLower = item.title.toLowerCase();
  const snippetLower = (item.snippet || '').toLowerCase();
  const urlLower = item.url.toLowerCase();
  const combinedText = `${titleLower} ${snippetLower} ${urlLower}`;

  // 1. Check for noisy / unrelated garbage (hospital, soap operas, live sports, anime)
  // unless the topic itself explicitly contains those words
  const topicLower = topic.toLowerCase();
  for (const noise of EXCLUDED_NOISE_TERMS) {
    if (combinedText.includes(noise) && !topicLower.includes(noise)) {
      return false;
    }
  }

  // 2. Platform relevance verification
  if (platform === 'youtube') {
    const isYouTube = item.sourceDomain.includes('youtube.com') || item.sourceDomain.includes('youtu.be');
    // Reject channel homepages or playlists that don't point to an actual video
    if (isYouTube && !item.url.includes('/watch') && !item.url.includes('youtu.be/')) {
      // allow if title explicitly mentions video/recipe/guide
    }
  } else if (platform === 'youtube-shorts') {
    const isShorts = item.url.includes('/shorts/') || item.title.toLowerCase().includes('shorts');
    if (!item.sourceDomain.includes('youtube.com') && !item.sourceDomain.includes('youtu.be')) {
      return false;
    }
  } else if (platform === 'tiktok') {
    if (!item.sourceDomain.includes('tiktok.com')) {
      return false;
    }
  } else if (platform === 'instagram-reels') {
    if (!item.sourceDomain.includes('instagram.com')) {
      return false;
    }
  }

  // 3. Semantic keyword overlap check
  const keywords = extractTopicKeywords(topic);
  if (keywords.length === 0) {
    return true; // Fallback if topic had only stop words
  }

  // Check if at least one meaningful keyword is present in the title, snippet, or URL
  const matchesKeyword = keywords.some((kw) => {
    // Substring or word match
    return combinedText.includes(kw);
  });

  return matchesKeyword;
}
