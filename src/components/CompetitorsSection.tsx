import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Search, Video, Eye, Calendar, AlertCircle } from 'lucide-react';
import { CompetitorResult, ResearchProvenance } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface CompetitorsSectionProps {
  competitors: CompetitorResult[];
  provenance?: ResearchProvenance;
  topic?: string;
}

export const CompetitorsSection: React.FC<CompetitorsSectionProps> = ({ competitors, provenance, topic }) => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

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

        {/* Search inside results (only when competitors exist) */}
        {competitors.length > 0 && (
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.competitors.searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-brand-500"
            />
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
              </div>

              {/* Observed Fact Card */}
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                  {t.competitors.cardFact}
                </span>
                <p className="text-slate-300">{comp.factSummary}</p>
              </div>

              {/* AI Strategic Inference Card */}
              {comp.aiInference && (
                <div className="p-2.5 rounded-lg bg-brand-950/20 border border-brand-800/30 text-xs space-y-1">
                  <span className="text-[11px] font-semibold text-brand-300 uppercase tracking-wider block">
                    {t.competitors.cardAi}
                  </span>
                  <p className="text-slate-300/90">{comp.aiInference}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
