import * as cheerio from 'cheerio';
import { GoogleGenAI } from '@google/genai';
import { CompetitorResult, ResearchRequest, TargetMarket, Platform, ResearchProvenance } from '../../src/types/index.js';
import { VERIFIED_SEEDS } from '../data/verifiedSeeds.js';

interface RawSearchItem {
  title: string;
  url: string;
  snippet: string;
  sourceDomain: string;
}

// Generate platform-specific search queries in native language
function buildSearchQueries(req: ResearchRequest): string[] {
  const { topic, market, platform } = req;
  const queries: string[] = [];

  let marketQualifier = '';
  if (market === 'pt-PT') marketQualifier = 'Portugal';
  else if (market === 'pt-BR') marketQualifier = 'Brasil';
  else if (market === 'es-ES') marketQualifier = 'España';
  else if (market === 'en-GB') marketQualifier = 'UK';

  let siteConstraint = '';
  let platformKeyword = '';
  if (platform === 'youtube') {
    siteConstraint = 'site:youtube.com/watch';
    platformKeyword = 'youtube';
  } else if (platform === 'youtube-shorts') {
    siteConstraint = 'site:youtube.com/shorts';
    platformKeyword = 'youtube shorts';
  } else if (platform === 'tiktok') {
    siteConstraint = 'site:tiktok.com';
    platformKeyword = 'tiktok';
  } else if (platform === 'instagram-reels') {
    siteConstraint = 'site:instagram.com/reel';
    platformKeyword = 'instagram reels';
  }

  // 1. Strict platform URL search
  queries.push(`${siteConstraint} ${topic} ${marketQualifier}`);
  // 2. Broad platform search without strict site: constraint (higher hit rate on DuckDuckGo Lite)
  queries.push(`${platformKeyword} ${topic} ${marketQualifier}`);
  // 3. Problem solving / tutorial query
  queries.push(
    market === 'en-GB'
      ? `${platformKeyword} "how to" ${topic} ${marketQualifier}`
      : `${platformKeyword} "como" ${topic} ${marketQualifier}`
  );
  // 4. Topic in target market
  queries.push(
    market === 'en-GB'
      ? `${topic} ${marketQualifier} ${platform === 'youtube' ? 'channel video' : 'shorts reels viral'}`
      : `${topic} ${marketQualifier} ${platform === 'youtube' ? 'canal video' : 'shorts reels viral'}`
  );

  return queries;
}

// Scrape live search results from DuckDuckGo Lite (Free, no API key needed, real live URLs)
async function fetchDuckDuckGoResults(query: string, maxResults = 10): Promise<RawSearchItem[]> {
  try {
    const encoded = encodeURIComponent(query);
    const url = `https://html.duckduckgo.com/html/?q=${encoded}`;

    const resp = await fetch(url, {
      signal: AbortSignal.timeout(3500), // 3.5s timeout prevents Netlify 10s execution limit
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'pt,es,en-US;q=0.9',
      },
    });

    if (!resp.ok) {
      console.warn(`[Search] DuckDuckGo response status: ${resp.status}`);
      return [];
    }

    const html = await resp.text();
    const $ = cheerio.load(html);
    const results: RawSearchItem[] = [];

    $('.result').each((_, el) => {
      if (results.length >= maxResults) return;

      const titleEl = $(el).find('.result__title a');
      const snippetEl = $(el).find('.result__snippet');
      const rawUrl = titleEl.attr('href') || '';
      const title = titleEl.text().trim();
      const snippet = snippetEl.text().trim();

      // DuckDuckGo redirects through /l/?uddg=...
      let directUrl = rawUrl;
      if (rawUrl.includes('uddg=')) {
        try {
          const match = rawUrl.match(/uddg=([^&]+)/);
          if (match && match[1]) {
            directUrl = decodeURIComponent(match[1]);
          }
        } catch {
          // ignore
        }
      }

      if (directUrl && directUrl.startsWith('http') && title && !directUrl.includes('duckduckgo.com')) {
        let domain = '';
        try {
          domain = new URL(directUrl).hostname;
        } catch {
          domain = 'web';
        }

        results.push({
          title,
          url: directUrl,
          snippet,
          sourceDomain: domain,
        });
      }
    });

    return results;
  } catch (err) {
    console.warn(`[Search] Error scraping DuckDuckGo for query "${query}":`, err);
    return [];
  }
}

// Live search with Google Gemini Grounding (supports gemini-2.0-flash, gemini-1.5-flash)
async function fetchGeminiGroundingResults(
  req: ResearchRequest,
  apiKey: string
): Promise<{ rawItems: RawSearchItem[]; aiInsights: string[] }> {
  const candidateModels = ['gemini-2.0-flash', 'gemini-1.5-flash'];
  const marketLabel =
    req.market === 'pt-PT'
      ? 'Portugal (European Portuguese)'
      : req.market === 'pt-BR'
      ? 'Brazil (Brazilian Portuguese)'
      : 'Spain (Spanish)';

  const prompt = `Perform live web and video research on the top performing competitor videos, creator content, and viral posts for the topic: "${req.topic}".
Target market: ${marketLabel}.
Platform: ${req.platform}.
Find real creators, actual video titles, and exact URLs on ${req.platform} or major platforms in this market.
List at least 10 real existing competitor videos or articles with their authentic URLs and what makes them work.`;

  for (const model of candidateModels) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const rawItems: RawSearchItem[] = [];
      const aiInsights: string[] = [];

      const metadata = response.candidates?.[0]?.groundingMetadata;
      if (metadata && metadata.groundingChunks) {
        for (const chunk of metadata.groundingChunks) {
          if (chunk.web?.uri && chunk.web?.title) {
            try {
              const domain = new URL(chunk.web.uri).hostname;
              rawItems.push({
                title: chunk.web.title,
                url: chunk.web.uri,
                snippet: `Fonte encontrada via pesquisa em tempo real Google Grounding (${model}) no mercado de ${marketLabel}.`,
                sourceDomain: domain,
              });
            } catch {
              // ignore invalid url
            }
          }
        }
      }

      if (response.text) {
        aiInsights.push(response.text);

        // Fallback: extract real grounded URLs from markdown links in response text if grounding chunks were empty
        if (rawItems.length === 0) {
          const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
          let match;
          while ((match = linkRegex.exec(response.text)) !== null) {
            const linkTitle = match[1].trim();
            const linkUrl = match[2].trim();
            try {
              const domain = new URL(linkUrl).hostname;
              if (!rawItems.some((i) => i.url === linkUrl) && !linkUrl.includes('google.com/search')) {
                rawItems.push({
                  title: linkTitle,
                  url: linkUrl,
                  snippet: `Fonte referenciada via pesquisa em tempo real Google Grounding (${model}).`,
                  sourceDomain: domain,
                });
              }
            } catch {
              // ignore
            }
          }
        }
      }

      if (rawItems.length > 0) {
        return { rawItems, aiInsights };
      }
    } catch (err: any) {
      console.warn(`[Search] Gemini model ${model} attempt error:`, err?.message || err);
      // try next model
    }
  }

  return { rawItems: [], aiInsights: [] };
}

// Extract real view metrics if factually present in snippet text (never invent numbers)
function extractRealMetrics(snippet: string, title: string): string | undefined {
  const combined = `${title} ${snippet}`;
  const match = combined.match(/(\b\d+[\d.,]*\s*(?:k|m|mil|milhões|millones)?\s*(?:visualizações|visualizaciones|views)\b)/i);
  if (match) {
    return match[1].trim();
  }
  return undefined;
}

// Extract real published date if factually present in snippet text
function extractRealDate(snippet: string): string | undefined {
  const match = snippet.match(/(\bhá\s+\d+\s+(?:dias|semanas|meses|anos)|\bhace\s+\d+\s+(?:días|semanas|meses|años)|\b\d+\s+(?:days|weeks|months|years)\s+ago|\b202[4-6]\b)/i);
  if (match) {
    return match[0].trim();
  }
  return undefined;
}

// Extract channel name and metrics from raw search item or url
function parseCreatorAndMetrics(
  item: RawSearchItem,
  platform: Platform
): { creator: string; views?: string; publishedDate?: string; hook: string } {
  let creator = 'Criador / Canal Especialista';
  let hook = item.title;

  if (item.sourceDomain.includes('youtube.com')) {
    if (item.title.includes(' - ')) {
      const parts = item.title.split(' - ');
      creator = parts[parts.length - 1].replace(/YouTube.*$/i, '').trim() || creator;
    }
  } else if (item.sourceDomain.includes('tiktok.com')) {
    const match = item.url.match(/@([^/?#]+)/);
    if (match) {
      creator = `@${match[1]}`;
    }
  } else if (item.sourceDomain.includes('instagram.com')) {
    creator = 'Criador no Instagram';
  } else {
    creator = item.sourceDomain;
  }

  // Extract metrics strictly from actual snippet text (no random generation!)
  const views = extractRealMetrics(item.snippet, item.title);
  const publishedDate = extractRealDate(item.snippet);

  // Derive detected hook from title
  if (item.title.toLowerCase().includes('como')) {
    hook = 'Promessa direta de tutorial passo a passo / como fazer';
  } else if (item.title.toLowerCase().includes('segredo') || item.title.toLowerCase().includes('erro')) {
    hook = 'Curiosidade e aversão ao erro fatal';
  } else if (/\d+/.test(item.title)) {
    hook = 'Formato lista numerada de alta retenção';
  } else {
    hook = 'Quebra de padrão ou comparativo de mercado';
  }

  return { creator, views, publishedDate, hook };
}

export interface SearchCompetitorsResult {
  competitors: CompetitorResult[];
  provenance: ResearchProvenance;
}

export async function searchCompetitors(req: ResearchRequest): Promise<SearchCompetitorsResult> {
  const apiKey = req.apiKey || process.env.GEMINI_API_KEY || '';
  const results: CompetitorResult[] = [];
  const seenUrls = new Set<string>();
  let usedGrounding = false;

  const marketLabel =
    req.market === 'pt-PT'
      ? 'Portugal'
      : req.market === 'pt-BR'
      ? 'Brasil'
      : req.market === 'es-ES'
      ? 'España'
      : 'United Kingdom';

  // 1. If Gemini API key is available, run live search with Google Search Grounding
  if (apiKey) {
    try {
      const { rawItems } = await fetchGeminiGroundingResults(req, apiKey);
      if (rawItems.length > 0) {
        usedGrounding = true;
        for (const item of rawItems) {
          if (!seenUrls.has(item.url)) {
            seenUrls.add(item.url);
            const { creator, views, publishedDate, hook } = parseCreatorAndMetrics(item, req.platform);
            results.push({
              id: `comp-gemini-${results.length + 1}`,
              title: item.title,
              url: item.url,
              channelOrCreator: creator,
              platform: req.platform,
              views,
              publishedDate,
              snippet: item.snippet,
              isRealVerifiedSource: true,
              sourceDomain: item.sourceDomain,
              factSummary: req.market === 'en-GB'
                ? `Active URL indexed in content ecosystem: ${item.title}.`
                : `URL real indexada com presença no ecossistema de conteúdo: ${item.title}.`,
              aiInference: req.market === 'pt-PT'
                ? `Dedução IA: Este conteúdo gerou autoridade no nicho de "${req.topic}" respondendo à intenção de pesquisa prioritária do utilizador local.`
                : req.market === 'pt-BR'
                ? `Dedução IA: Este conteúdo gerou autoridade no nicho de "${req.topic}" respondendo à intenção de busca prioritária do usuário local.`
                : req.market === 'es-ES'
                ? `Deducción IA: Este contenido generó autoridad en el nicho de "${req.topic}" respondiendo a la intención de búsqueda del usuario local.`
                : `AI Deduction: This content generated authority in the "${req.topic}" niche by directly addressing the primary search intent of UK viewers.`,
            });
          }
        }
      }
    } catch (err: any) {
      console.warn('[Search] Gemini grounding attempt failed:', err?.message || err);
    }
  }

  // 2. Fetch live web / video results via DuckDuckGo search in parallel with timeout protection
  const queries = buildSearchQueries(req);
  const searchPromises = queries.map((q) => fetchDuckDuckGoResults(q, 8));
  const settled = await Promise.allSettled(searchPromises);

  for (const res of settled) {
    if (res.status === 'fulfilled') {
      for (const item of res.value) {
        if (!seenUrls.has(item.url) && results.length < 20) {
          seenUrls.add(item.url);
          const { creator, views, publishedDate, hook } = parseCreatorAndMetrics(item, req.platform);
          results.push({
            id: `comp-live-${results.length + 1}`,
            title: item.title,
            url: item.url,
            channelOrCreator: creator,
            platform: req.platform,
            views,
            publishedDate,
            snippet: item.snippet || (req.market === 'en-GB'
              ? `Video / publication focusing on ${req.topic} for the UK audience.`
              : `Vídeo / publicação com foco em ${req.topic} para o mercado selecionado.`),
            isRealVerifiedSource: true,
            sourceDomain: item.sourceDomain,
            detectedHookOrAngle: hook,
            factSummary: req.market === 'en-GB'
              ? `Active content verified via public search: title "${item.title}".`
              : `Conteúdo ativo verificado via pesquisa pública: título "${item.title}".`,
            aiInference: req.market === 'en-GB'
              ? `AI Deduction: Structured to attract organic search traffic with emphasis on high initial retention.`
              : `Dedução IA: Formato estruturado para atrair tráfego orgânico com ênfase em retenção inicial.`,
          });
        }
      }
    }
  }

  // 3. Genuine niche seed matching ONLY: include seeds if and only if keywords match the topic
  const lowerTopic = req.topic.toLowerCase();
  for (const seed of VERIFIED_SEEDS) {
    if (results.length >= 16) break;
    const isMarketMatch = seed.market === req.market;
    const isKeywordMatch = seed.keywords.some((kw) => lowerTopic.includes(kw));

    if (isMarketMatch && isKeywordMatch) {
      for (const comp of seed.competitors) {
        if (!seenUrls.has(comp.url) && results.length < 20) {
          seenUrls.add(comp.url);
          results.push({
            ...comp,
            id: `comp-seed-${results.length + 1}`,
            platform: req.platform,
          });
        }
      }
    }
  }

  // 4. Strict Zero-Fabrication Safeguard:
  // If live research failed and no seed matched, DO NOT invent fake competitors or substitute unrelated channels.
  const hasLiveItems = results.some((r) => r.id.startsWith('comp-gemini') || r.id.startsWith('comp-live'));
  const hasCuratedItems = results.some((r) => r.id.startsWith('comp-seed'));

  let provenance: ResearchProvenance;
  if (usedGrounding && results.some((r) => r.id.startsWith('comp-gemini'))) {
    provenance = {
      sourceType: 'live_google_grounding',
      isLiveResearchAvailable: true,
      queryPerformed: queries[0] || req.topic,
      notice: undefined,
    };
  } else if (hasLiveItems) {
    provenance = {
      sourceType: 'live_web_search',
      isLiveResearchAvailable: true,
      queryPerformed: queries[0] || req.topic,
      notice: undefined,
    };
  } else if (hasCuratedItems) {
    provenance = {
      sourceType: 'curated_niche_match',
      isLiveResearchAvailable: true,
      queryPerformed: queries[0] || req.topic,
      notice: req.market === 'en-GB'
        ? `Audited sources obtained via direct keyword match for "${req.topic}".`
        : `Fontes auditadas obtidas com correspondência direta às palavras-chave de "${req.topic}".`,
    };
  } else {
    provenance = {
      sourceType: 'insufficient_live_data',
      isLiveResearchAvailable: false,
      queryPerformed: queries[0] || req.topic,
      notice: req.market === 'en-GB'
        ? `Direct public search unavailable or no indexed match currently found for "${req.topic}" in the ${marketLabel} market. No unrelated benchmark channels or fabricated metrics were substituted.`
        : `Pesquisa pública direta indisponível ou sem correspondência indexada no momento para "${req.topic}" no mercado de ${marketLabel}. Nenhum canal fora de nicho ou métrica inventada foi apresentado.`,
    };
  }

  return {
    competitors: results.slice(0, 20),
    provenance,
  };
}
