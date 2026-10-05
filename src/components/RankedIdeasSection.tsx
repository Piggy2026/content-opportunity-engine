import React, { useState } from 'react';
import { ListOrdered, Sparkles, Flame, CheckCircle, ArrowRight, Filter, ChevronRight, HelpCircle, Languages } from 'lucide-react';
import { ContentIdea } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface RankedIdeasSectionProps {
  ideas: ContentIdea[];
  selectedIdeaId: string;
  onSelectIdea: (idea: ContentIdea) => void;
  isGeneratingScripts?: boolean;
}

export const RankedIdeasSection: React.FC<RankedIdeasSectionProps> = ({
  ideas,
  selectedIdeaId,
  onSelectIdea,
  isGeneratingScripts,
}) => {
  const { t } = useLanguage();
  const [filterVirality, setFilterVirality] = useState<string>('all');
  const [showTranslations, setShowTranslations] = useState<boolean>(true);

  const hasTranslations = ideas.some((i) => Boolean(i.titleTranslation));

  const filtered = ideas.filter((idea) => {
    if (filterVirality === 'all') return true;
    return idea.viralityPotential === filterVirality;
  });

  const viralityFilters = [
    { id: 'all', label: t.ideas.filterViralityLevels.all },
    { id: 'Exceptional', label: t.ideas.filterViralityLevels.Exceptional },
    { id: 'Very High', label: t.ideas.filterViralityLevels.VeryHigh },
    { id: 'High', label: t.ideas.filterViralityLevels.High },
  ];

  return (
    <div id="section-ideas" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm">
            {t.ideas.step}
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {t.ideas.title(ideas.length)}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                {t.ideas.scoreBadge}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              {t.ideas.subtitle}
            </p>
          </div>
        </div>

        {/* Controls: Filter & Translation Toggle */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {hasTranslations && (
            <button
              onClick={() => setShowTranslations((prev) => !prev)}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-medium border transition ${
                showTranslations
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-indigo-400" />
              <span>{showTranslations ? t.ideas.meaningToggleHide : t.ideas.meaningToggleShow}</span>
            </button>
          )}

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">{t.ideas.filterViralityLabel}</span>
            {viralityFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterVirality(f.id)}
                className={`px-2.5 py-1 rounded-lg font-medium border transition ${
                  filterVirality === f.id
                    ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ideas Table / Grid */}
      <div className="space-y-3">
        {filtered.map((idea) => {
          const isSelected = idea.id === selectedIdeaId;

          return (
            <div
              key={idea.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-brand-950/30 border-brand-500/80 shadow-md shadow-brand-500/10 ring-1 ring-brand-500/50'
                  : 'bg-slate-950 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Rank & Content Details */}
              <div className="flex items-start space-x-4 flex-1">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 mt-0.5 ${
                    idea.rank === 1
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-md shadow-yellow-500/30'
                      : idea.rank <= 3
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  #{idea.rank}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {idea.title}
                    </h3>
                    {idea.isBestOpportunity && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {t.ideas.bestOpportunityTag}
                      </span>
                    )}
                  </div>

                  {showTranslations && idea.titleTranslation && idea.titleTranslation !== idea.title && (
                    <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-indigo-950/50 border border-indigo-500/30 text-xs text-indigo-200">
                      <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wide">🇬🇧 Meaning:</span>
                      <span className="font-medium italic">"{idea.titleTranslation}"</span>
                    </div>
                  )}

                  <p className="text-xs text-brand-300/90 font-medium">
                    {t.ideas.angleLabel} {idea.angle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
                    <div>
                      <span className="text-slate-500">{t.ideas.gapLabel}</span> {idea.gapExploited}
                    </div>
                    <div>
                      <span className="text-slate-500">{t.ideas.painPointLabel}</span>{' '}
                      {idea.targetAudiencePainPoint}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {t.ideas.formatLabel} {idea.format}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {t.ideas.viralityLabel} {idea.viralityPotential}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {t.ideas.competitionLabel} {idea.competitionLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 pt-1 italic">
                    <strong className="text-slate-300 not-italic">{t.ideas.whyItWinsLabel}</strong>{' '}
                    {idea.whyItWins}
                  </p>

                  {showTranslations && idea.whyItWinsTranslation && idea.whyItWinsTranslation !== idea.whyItWins && (
                    <p className="text-[11px] text-indigo-300/80 pt-0.5 italic">
                      <strong className="text-indigo-200 not-italic">🇬🇧 UK Rationale:</strong>{' '}
                      {idea.whyItWinsTranslation}
                    </p>
                  )}
                </div>
              </div>

              {/* Opportunity Score & Script Select Action */}
              <div className="flex items-center justify-between lg:flex-col lg:items-end gap-3 shrink-0 pt-2 lg:pt-0 border-t border-slate-900 lg:border-t-0">
                <div className="text-left lg:text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">{idea.opportunityScore}</span>
                    <span className="text-xs text-slate-500 font-bold">/100</span>
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    {t.ideas.opportunityScoreLabel}
                  </span>
                </div>

                <button
                  onClick={() => onSelectIdea(idea)}
                  disabled={isGeneratingScripts && isSelected}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm ${
                    isSelected
                      ? 'bg-brand-600 text-white hover:bg-brand-500 shadow-brand-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isGeneratingScripts && isSelected ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t.ideas.generatingScripts}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.ideas.selectScriptBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
