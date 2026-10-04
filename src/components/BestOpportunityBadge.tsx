import React from 'react';
import { Award, Sparkles, Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { ContentIdea } from '../types/index.js';

interface BestOpportunityBadgeProps {
  idea: ContentIdea;
  onJumpToScripts: () => void;
}

export const BestOpportunityBadge: React.FC<BestOpportunityBadgeProps> = ({ idea, onJumpToScripts }) => {
  return (
    <div id="section-best" className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900/40 via-slate-900 to-rose-950/30 border-2 border-brand-500/60 p-6 md:p-8 shadow-2xl">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/40 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Melhor Oportunidade Ranqueada (#1 de 20)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {idea.title}
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-brand-300">Tese Estratégica:</strong> {idea.whyItWins}
          </p>

          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              Formato: {idea.format}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              Potencial Viral: {idea.viralityPotential}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
              Concorrência: {idea.competitionLevel}
            </span>
          </div>
        </div>

        {/* Opportunity Score Widget & Action */}
        <div className="flex flex-col items-center sm:items-end justify-center shrink-0 space-y-4">
          <div className="text-center sm:text-right">
            <div className="flex items-baseline justify-center sm:justify-end gap-1">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-indigo-300 to-rose-300">
                {idea.opportunityScore}
              </span>
              <span className="text-slate-500 text-sm font-bold">/100</span>
            </div>
            <span className="text-xs text-slate-400 block font-medium">Score de Oportunidade</span>
          </div>

          <button
            onClick={onJumpToScripts}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-500/20 transition flex items-center justify-center space-x-2"
          >
            <span>Ver os 3 Roteiros Gerados</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
