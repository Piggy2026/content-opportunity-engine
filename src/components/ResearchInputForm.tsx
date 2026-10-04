import React, { useState } from 'react';
import { Search, Sparkles, Youtube, Video, Smartphone, Globe, Layers, ChevronDown, Check } from 'lucide-react';
import { ResearchRequest, TargetMarket, Platform, MarketOption, PlatformOption } from '../types/index.js';

interface ResearchInputFormProps {
  onSubmit: (request: ResearchRequest) => void;
  isLoading: boolean;
  loadingProgress?: string;
}

export const MARKETS: MarketOption[] = [
  {
    id: 'pt-PT',
    name: 'Portugal',
    country: 'Portugal',
    flag: '🇵🇹',
    language: 'Português Europeu',
    localeCode: 'pt-PT',
    description: 'Gramática portuguesa (ecrã, telemóvel, faturas), IRS, banca local e taxas Euribor.',
  },
  {
    id: 'pt-BR',
    name: 'Brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    language: 'Português Brasileiro',
    localeCode: 'pt-BR',
    description: 'Comunicação dinâmica (celular, tela, grana), Selic, Pix, juros reais e classe média.',
  },
  {
    id: 'es-ES',
    name: 'España',
    country: 'España',
    flag: '🇪🇸',
    language: 'Español Peninsular',
    localeCode: 'es-ES',
    description: 'Castellano (móvil, Hacienda, autónomos, IRPF), deducciones y marco legal comunitario.',
  },
];

export const PLATFORMS: PlatformOption[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    format: 'Long-form (10–18 min)',
    recommendedLength: '12-16 min',
    description: 'Vídeos aprofundados com demonstração de tela, alta retenção de meio de vídeo e autoridade.',
  },
  {
    id: 'youtube-shorts',
    name: 'YouTube Shorts',
    icon: 'video',
    format: 'Vertical (9:16, 30–60s)',
    recommendedLength: '45 seg',
    description: 'Ritmo acelerado, gancho nos primeiros 2 segundos, legendas dinâmicas e loop final.',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'smartphone',
    format: 'Vertical (9:16, 35–50s)',
    recommendedLength: '40 seg',
    description: 'Estilo autêntico lo-fi, quebra de padrão, gatilhos de debate e chamada para favoritos.',
  },
  {
    id: 'instagram-reels',
    name: 'Instagram Reels',
    icon: 'smartphone',
    format: 'Vertical (9:16, 40–55s)',
    recommendedLength: '45 seg',
    description: 'Alta estética, salvamento para consulta posterior e automação de palavras-chave no direct.',
  },
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
    topic: '3 Ferramentas Secretas de IA Gratuitas para Dobrar a Produtividade',
    market: 'pt-BR' as TargetMarket,
    platform: 'youtube-shorts' as Platform,
  },
  {
    topic: 'Comprar Casa em Portugal em 2026: Garantia Pública e Isenção de IMT',
    market: 'pt-PT' as TargetMarket,
    platform: 'instagram-reels' as Platform,
  },
];

export const ResearchInputForm: React.FC<ResearchInputFormProps> = ({
  onSubmit,
  isLoading,
  loadingProgress,
}) => {
  const [topic, setTopic] = useState('');
  const [market, setMarket] = useState<TargetMarket>('pt-PT');
  const [platform, setPlatform] = useState<Platform>('youtube');
  const [audienceLevel, setAudienceLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'all'>('all');
  const [seedCompetitors, setSeedCompetitors] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    setMarket(preset.market);
    setPlatform(preset.platform);
  };

  return (
    <div id="section-input" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pesquisa Baseada em Dados Reais</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Descubra o que já está a funcionar e transforme gaps em roteiros de alta retenção.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Insira o seu tópico ou nicho. O motor pesquisa criadores reais no mercado selecionado, analisa outliers,
          deteta o que a concorrência não respondeu e gera 20 oportunidades com 3 roteiros completos.
        </p>
      </div>

      {/* Preset Pills */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 font-medium mr-1">Exemplos rápidos:</span>
        {PRESETS.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleApplyPreset(p)}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700/80 text-slate-300 border border-slate-700/70 transition"
          >
            {p.market === 'pt-PT' ? '🇵🇹' : p.market === 'pt-BR' ? '🇧🇷' : '🇪🇸'} {p.topic.slice(0, 36)}...
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Main Topic Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Tópico, Palavra-Chave ou Nicho de Conteúdo <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Como investir em ETFs em Portugal sem comissões escondidas"
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
              <span>Mercado Alvo & Idioma</span>
              <span className="text-xs text-slate-400 font-normal">Adaptado a nuances culturais</span>
            </label>
            <div className="space-y-2">
              {MARKETS.map((m) => {
                const isSelected = market === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMarket(m.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 text-white shadow-sm shadow-brand-500/10'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{m.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{m.name}</span>
                        <span className="text-xs text-slate-400">{m.language}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{m.description}</p>
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
              <span>Plataforma Principal</span>
              <span className="text-xs text-slate-400 font-normal">Ajusta ritmo e ganchos</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => {
                const isSelected = platform === p.id;
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
                      <span className="text-[11px] text-slate-400 block mt-1">{p.format}</span>
                    </div>
                    <span className="text-[10px] text-brand-400 font-mono mt-2 bg-brand-500/10 px-1.5 py-0.5 rounded w-fit">
                      {p.recommendedLength}
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
            <span>Opções avançadas (Canais de referência, nível do público)</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nível de Conhecimento do Público
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'all', label: 'Todos os Níveis' },
                    { id: 'beginner', label: 'Iniciantes / Leigos' },
                    { id: 'intermediate', label: 'Intermédio' },
                    { id: 'advanced', label: 'Avançado / Profissional' },
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
                  Canais Concorrentes de Referência ou URLs Específicas (Opcional)
                </label>
                <textarea
                  value={seedCompetitors}
                  onChange={(e) => setSeedCompetitors(e.target.value)}
                  placeholder="Insira um canal ou link por linha. Ex:&#10;https://www.youtube.com/@RicoDinheiro&#10;@prigorico&#10;Canal Autonomos España"
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
                <span>{loadingProgress || 'Pesquisando Concorrentes & Analisando Gaps...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>Executar Motor de Oportunidades de Conteúdo</span>
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-500 mt-2">
            Pesquisa real na web e plataformas sem alucinação de dados • Cache inteligente de 24h
          </p>
        </div>
      </form>
    </div>
  );
};
