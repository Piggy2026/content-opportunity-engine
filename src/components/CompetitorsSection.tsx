import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Search, Video, Eye, Calendar, AlertCircle, Globe, Languages } from 'lucide-react';
import { CompetitorResult, ResearchProvenance } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { translateText } from '../lib/api.js';

interface CompetitorsSectionProps {
  competitors: CompetitorResult[];
  provenance?: ResearchProvenance;
  topic?: string;
}

export const CompetitorsSection: React.FC<CompetitorsSectionProps> = ({ competitors, provenance, topic }) => {
  const { t, uiLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTranslations, setExpandedTranslations] = useState<Record<string, boolean>>({});
  const [loadingTranslation, setLoadingTranslation] = useState<Record<string, boolean>>({});
  const [allTranslated, setAllTranslated] = useState(false);

  const formatFactSummary = (comp: CompetitorResult) => {
    if (!comp.factSummary) return '';
    if (
      comp.factSummary.includes('pesquisa pública') ||
      comp.factSummary.includes('public search') ||
      comp.factSummary.includes('búsqueda pública')
    ) {
      if (uiLanguage === 'en') {
        return `Active content verified via public search: title "${comp.title}".`;
      }
      if (uiLanguage === 'es') {
        return `Contenido activo verificado mediante búsqueda pública: título "${comp.title}".`;
      }
      return `Conteúdo ativo verificado via pesquisa pública: título "${comp.title}".`;
    }
    if (
      comp.factSummary.includes('ecossistema') ||
      comp.factSummary.includes('ecosystem') ||
      comp.factSummary.includes('ecosistema')
    ) {
      if (uiLanguage === 'en') {
        return `Active URL indexed in content ecosystem: "${comp.title}".`;
      }
      if (uiLanguage === 'es') {
        return `URL activa indexada en el ecosistema de contenido: "${comp.title}".`;
      }
      return `URL real indexada com presença no ecossistema de conteúdo: "${comp.title}".`;
    }
    return comp.factSummary;
  };

  const formatAiInference = (comp: CompetitorResult) => {
    if (!comp.aiInference) return null;
    const cleaned = comp.aiInference.replace(/^(Dedução IA|Deducción IA|AI Deduction):\s*/i, '');

    if (
      cleaned.includes('tráfego orgânico') ||
      cleaned.includes('organic search traffic') ||
      cleaned.includes('tráfico orgánico')
    ) {
      if (uiLanguage === 'en') {
        return 'Format structured to attract organic search traffic with emphasis on high initial retention.';
      }
      if (uiLanguage === 'es') {
        return 'Formato estructurado para atraer tráfico orgánico con énfasis en alta retención inicial.';
      }
      return 'Formato estruturado para atrair tráfego orgânico com ênfase em retenção inicial.';
    }

    if (
      cleaned.includes('autoridade no nicho') ||
      cleaned.includes('authority in the') ||
      cleaned.includes('autoridad en el nicho')
    ) {
      if (uiLanguage === 'en') {
        return `Established authority in the "${topic || 'target'}" niche by addressing primary viewer search intent.`;
      }
      if (uiLanguage === 'es') {
        return `Estableció autoridad en el nicho de "${topic || 'objetivo'}" respondiendo a la intención de búsqueda del usuario.`;
      }
      return `Estabeleceu autoridade no nicho de "${topic || 'pesquisado'}" respondendo à intenção de pesquisa do utilizador.`;
    }

    return cleaned;
  };

  const handleToggleTranslation = async (id: string, comp: CompetitorResult) => {
    if (expandedTranslations[id]) {
      setExpandedTranslations((prev) => ({ ...prev, [id]: false }));
      return;
    }

    if (!comp.titleTranslation) {
      setLoadingTranslation((prev) => ({ ...prev, [id]: true }));
      try {
        const trans = await translateText(comp.title, 'en', 'competitor_title');
        comp.titleTranslation = trans.translation;
        if (comp.snippet) {
          const snipTrans = await translateText(comp.snippet, 'en', 'competitor_snippet');
          comp.snippetTranslation = snipTrans.translation;
        }
      } catch (err) {
        console.warn('Competitor translation failed:', err);
      } finally {
        setLoadingTranslation((prev) => ({ ...prev, [id]: false }));
      }
    }

    setExpandedTranslations((prev) => ({ ...prev, [id]: true }));
  };

  const handleToggleAllTranslations = async () => {
    const nextState = !allTranslated;
    setAllTranslated(nextState);

    if (nextState) {
      const newMap: Record<string, boolean> = {};
      for (const comp of competitors) {
        newMap[comp.id] = true;
        if (!comp.titleTranslation) {
          try {
            const trans = await translateText(comp.title, 'en', 'competitor_title');
            comp.titleTranslation = trans.translation;
            if (comp.snippet) {
              const snipTrans = await translateText(comp.snippet, 'en', 'competitor_snippet');
              comp.snippetTranslation = snipTrans.translation;
            }
          } catch {
            // ignore
          }
        }
      }
      setExpandedTranslations(newMap);
    } else {
      setExpandedTranslations({});
    }
  };

  const filtered = competitors.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.channelOrCreator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.snippet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="section-competitors" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
              {t.competitors.step}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t.competitors.title}
            </h2>
            {competitors.length > 0 ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {t.competitors.verifiedBadge(competitors.length)}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {t.competitors.zeroBadge}
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {t.competitors.subtitle}
          </p>
        </div>

        {/* Action Controls & Search */}
        {competitors.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {uiLanguage === 'en' && (
              <button
                onClick={handleToggleAllTranslations}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                  allTranslated
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-950 text-indigo-300 border-indigo-500/30 hover:border-indigo-500/60'
                }`}
                title="Toggle natural English translations for all competitor cards"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{allTranslated ? t.competitors.hideTranslationBtn : t.competitors.translateTitleBtn}</span>
              </button>
            )}

            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.competitors.searchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-brand-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Distinction Banner */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3 text-xs">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-slate-300">
          <strong className="text-white font-semibold">{t.competitors.integrityTitle}</strong>{' '}
          {t.competitors.integrityText}
        </div>
      </div>

      {/* Provenance Notice if available */}
      {provenance?.notice && (
        <div className="mt-3 p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-300 text-xs flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{provenance.notice}</span>
        </div>
      )}

      {/* Zero Competitors Honest Card */}
      {competitors.length === 0 && (
        <div className="mt-6 p-6 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-amber-200 space-y-4">
          <div className="flex items-start gap-3.5">
            <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-2.5 text-xs sm:text-sm">
              <h4 className="font-bold text-amber-300 text-base">
                {t.competitors.zeroCard.title}
              </h4>
              <p className="text-amber-200/90 leading-relaxed">
                {t.competitors.zeroCard.body(topic || '')}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-900/40 text-slate-300 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.competitors.zeroCard.safeguardTitle}</span>
                </div>
                <p>
                  {t.competitors.zeroCard.safeguardBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Competitors Grid */}
      {competitors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filtered.map((comp) => (
            <div
              key={comp.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" />
                      <span>{comp.platform}</span>
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-white hover:text-brand-300 transition">
                      <a href={comp.url} target="_blank" rel="noopener noreferrer">
                        {comp.title}
                      </a>
                    </h3>
                  </div>

                  <a
                    href={comp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0"
                    title={t.competitors.cardOpenSource}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                  <span>
                    {t.competitors.cardChannel}{' '}
                    <strong className="text-slate-200">{comp.channelOrCreator}</strong>
                  </span>
                  {comp.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {comp.views}
                    </span>
                  )}
                  {comp.publishedDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {comp.publishedDate}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                  "{comp.snippet}"
                </p>

                {/* Inline Translation Toggle & Card */}
                {uiLanguage === 'en' && (
                  <div className="mt-2.5">
                    <button
                      onClick={() => handleToggleTranslation(comp.id, comp)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition"
                    >
                      <Globe className="w-3 h-3" />
                      <span>
                        {loadingTranslation[comp.id]
                          ? 'Translating...'
                          : expandedTranslations[comp.id]
                          ? t.competitors.hideTranslationBtn
                          : t.competitors.translateTitleBtn}
                      </span>
                    </button>

                    {expandedTranslations[comp.id] && comp.titleTranslation && (
                      <div className="mt-2 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1 animate-in fade-in">
                        <div className="flex items-center gap-1.5 text-indigo-300 font-semibold text-[11px]">
                          <Languages className="w-3 h-3 text-indigo-400" />
                          <span>{t.competitors.translatedTitleLabel}</span>
                        </div>
                        <p className="text-white font-medium text-xs leading-snug">"{comp.titleTranslation}"</p>
                        {comp.snippetTranslation && (
                          <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                            {comp.snippetTranslation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Observed Fact Card */}
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                  {t.competitors.cardFact}
                </span>
                <p className="text-slate-300">{formatFactSummary(comp)}</p>
              </div>

              {/* AI Strategic Inference Card */}
              {comp.aiInference && (
                <div className="p-2.5 rounded-lg bg-brand-950/20 border border-brand-800/30 text-xs space-y-1">
                  <span className="text-[11px] font-semibold text-brand-300 uppercase tracking-wider block">
                    {t.competitors.cardAi}
                  </span>
                  <p className="text-slate-300/90">{formatAiInference(comp)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
