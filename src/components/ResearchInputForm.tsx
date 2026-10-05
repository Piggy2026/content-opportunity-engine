import React, { useState } from 'react';
import { Search, Sparkles, Youtube, Video, Smartphone, Globe, Layers, ChevronDown, Check, Info } from 'lucide-react';
import { ResearchRequest, TargetMarket, Platform, MarketOption, PlatformOption } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface ResearchInputFormProps {
  onSubmit: (request: ResearchRequest) => void;
  isLoading: boolean;
  loadingProgress?: string;
  selectedMarket?: TargetMarket;
  onMarketChange?: (market: TargetMarket) => void;
}

const MARKET_BASE_CONFIG: { id: TargetMarket; flag: string; country: string; localeCode: string }[] = [
  { id: 'pt-PT', flag: '🇵🇹', country: 'Portugal', localeCode: 'pt-PT' },
  { id: 'pt-BR', flag: '🇧🇷', country: 'Brasil', localeCode: 'pt-BR' },
  { id: 'es-ES', flag: '🇪🇸', country: 'España', localeCode: 'es-ES' },
  { id: 'en-GB', flag: '🇬🇧', country: 'United Kingdom', localeCode: 'en-GB' },
];

const PLATFORM_BASE_CONFIG: { id: Platform; name: string; icon: string }[] = [
  { id: 'youtube', name: 'YouTube', icon: 'youtube' },
  { id: 'youtube-shorts', name: 'YouTube Shorts', icon: 'video' },
  { id: 'tiktok', name: 'TikTok', icon: 'smartphone' },
  { id: 'instagram-reels', name: 'Instagram Reels', icon: 'smartphone' },
];

const PRESETS = [
  {
    topic: 'Investir em ETFs e Poupar no IRS em Portugal',
    market: 'pt-PT' as TargetMarket,
    platform: 'youtube' as Platform,
  },
  {
    topic: 'Como Começar a Investir com R$ 50 no Tesouro Direto e Renda Fixa',
    market: 'pt-BR' as TargetMarket,
    platform: 'youtube' as Platform,
  },
  {
    topic: 'Cuota de Autónomos y Deducciones Legales de Hacienda en España',
    market: 'es-ES' as TargetMarket,
    platform: 'youtube' as Platform,
  },
  {
    topic: 'How to Invest in Stocks & Shares ISAs and Minimise Capital Gains Tax in the UK',
    market: 'en-GB' as TargetMarket,
    platform: 'youtube' as Platform,
  },
  {
    topic: 'How to make a rich chocolate cake from scratch',
    market: 'en-GB' as TargetMarket,
    platform: 'youtube' as Platform,
  },
];

export const ResearchInputForm: React.FC<ResearchInputFormProps> = ({
  onSubmit,
  isLoading,
  loadingProgress,
  selectedMarket,
  onMarketChange,
}) => {
  const { t, uiLanguage, getOutputLanguageName } = useLanguage();
  const [topic, setTopic] = useState('');
  const [market, setMarket] = useState<TargetMarket>(selectedMarket || 'pt-PT');
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [audienceLevel, setAudienceLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'all'>('all');
  const [seedCompetitors, setSeedCompetitors] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleMarketSelect = (m: TargetMarket) => {
    setMarket(m);
    if (onMarketChange) onMarketChange(m);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const competitorsList = seedCompetitors
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    onSubmit({
      topic: topic.trim(),
      market,
      platform,
      audienceLevel,
      seedCompetitors: competitorsList.length > 0 ? competitorsList : undefined,
    });
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setTopic(preset.topic);
    handleMarketSelect(preset.market);
    setPlatform(preset.platform);
  };

  return (
    <div id="section-input" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.researchForm.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t.researchForm.title}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          {t.researchForm.subtitle}
        </p>

        {/* Explicit Language Architecture Clarification Banner */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-brand-500/20 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">{t.researchForm.archClarification.title}: </span>
            <span className="text-slate-300/90">{t.researchForm.archClarification.body}</span>
          </div>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 font-medium mr-1">{t.researchForm.quickPresets}</span>
        {PRESETS.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleApplyPreset(p)}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700/80 text-slate-300 border border-slate-700/70 transition"
          >
            {p.market === 'pt-PT' ? '🇵🇹' : p.market === 'pt-BR' ? '🇧🇷' : p.market === 'es-ES' ? '🇪🇸' : '🇬🇧'}{' '}
            {p.topic.slice(0, 36)}...
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Main Topic Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            {t.researchForm.topicLabel} <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.researchForm.topicPlaceholder}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-950 rounded-xl border border-slate-700/80 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-white placeholder-slate-500 text-base transition"
              required
            />
          </div>
        </div>

        {/* Market and Platform Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Market */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center justify-between">
              <span>{t.researchForm.marketLabel}</span>
              <span className="text-xs text-brand-300/80 font-normal">{t.researchForm.marketHelp}</span>
            </label>
            <div className="space-y-2">
              {MARKET_BASE_CONFIG.map((m) => {
                const isSelected = market === m.id;
                const localizedMarket = t.researchForm.markets[m.id];
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleMarketSelect(m.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 text-white shadow-sm shadow-brand-500/10'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{m.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{localizedMarket.name}</span>
                        <span className="text-xs text-brand-300 font-mono bg-brand-500/10 px-1.5 py-0.2 rounded">
                          {localizedMarket.language}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{localizedMarket.description}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-brand-400 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center justify-between">
              <span>{t.researchForm.platformLabel}</span>
              <span className="text-xs text-slate-400 font-normal">{t.researchForm.platformHelp}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORM_BASE_CONFIG.map((p) => {
                const isSelected = platform === p.id;
                const localizedPlatform = t.researchForm.platforms[p.id];
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 text-white shadow-sm shadow-brand-500/10'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{p.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-400" />}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-1">{localizedPlatform.format}</span>
                    </div>
                    <span className="text-[10px] text-brand-400 font-mono mt-2 bg-brand-500/10 px-1.5 py-0.5 rounded w-fit">
                      {localizedPlatform.recommendedLength}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Advanced Options Accordion */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            <span>{t.researchForm.advancedToggle}</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.researchForm.audienceLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: t.researchForm.audienceLevels.all },
                    { id: 'beginner', label: t.researchForm.audienceLevels.beginner },
                    { id: 'intermediate', label: t.researchForm.audienceLevels.intermediate },
                    { id: 'advanced', label: t.researchForm.audienceLevels.advanced },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setAudienceLevel(lvl.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                        audienceLevel === lvl.id
                          ? 'bg-slate-800 text-brand-300 border-brand-500/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.researchForm.seedCompetitorsLabel}
                </label>
                <textarea
                  value={seedCompetitors}
                  onChange={(e) => setSeedCompetitors(e.target.value)}
                  placeholder={t.researchForm.seedCompetitorsPlaceholder}
                  rows={2}
                  className="w-full p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{loadingProgress || t.researchForm.submitBtnLoading}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>{t.researchForm.submitBtnIdle}</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-500 mt-2">
            {t.researchForm.footerNotice}
          </p>
        </div>
      </form>
    </div>
  );
};
