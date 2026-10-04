import fs from 'fs';
import path from 'path';

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const isServerless = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL);
const CACHE_FILE_PATH = isServerless
  ? path.resolve('/tmp', 'coe_cache.json')
  : path.resolve(process.cwd(), 'server', 'data', 'cache.json');

// In-memory cache map
const memoryCache = new Map<string, CacheEntry<any>>();

// Load initial cache from disk if available
function initDiskCache() {
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const raw = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      const now = Date.now();
      for (const [key, value] of Object.entries(parsed)) {
        const entry = value as CacheEntry<any>;
        if (now - entry.timestamp < CACHE_TTL_MS) {
          memoryCache.set(key, entry);
        }
      }
    }
  } catch (err) {
    console.warn('[Cache] Could not read disk cache:', err);
  }
}

initDiskCache();

function persistToDisk() {
  try {
    const obj: Record<string, any> = {};
    for (const [k, v] of memoryCache.entries()) {
      obj[k] = v;
    }
    const dir = path.dirname(CACHE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(obj, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[Cache] Could not write disk cache:', err);
  }
}

export function getCacheKey(topic: string, market: string, platform: string): string {
  const cleanTopic = topic.trim().toLowerCase().replace(/[^a-z0-9]/gi, '_');
  return `${cleanTopic}__${market}__${platform}`;
}

export function getCachedItem<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL_MS;
  if (isExpired) {
    memoryCache.delete(key);
    return null;
  }

  return entry.data as T;
}

export function setCachedItem<T>(key: string, data: T): void {
  memoryCache.set(key, {
    timestamp: Date.now(),
    data,
  });
  persistToDisk();
}

export function clearCache(): void {
  memoryCache.clear();
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      fs.unlinkSync(CACHE_FILE_PATH);
    }
  } catch (err) {
    console.warn('[Cache] Could not delete disk cache:', err);
  }
}
