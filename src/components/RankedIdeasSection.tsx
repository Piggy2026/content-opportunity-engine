import React, { useState } from 'react';
import { ListOrdered, Sparkles, Flame, CheckCircle, ArrowRight, Filter, ChevronRight, HelpCircle } from 'lucide-react';
import { ContentIdea } from '../types/index.js';

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
  const [filterVirality, setFilterVirality] = useState<string>('all');

  const filtered = ideas.filter((idea) => {
    if (filterVirality === 'all') return true;
    return idea.viralityPotential === filterVirality;
  });

  return (
    <div id="section-ideas" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm">
            5
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {ideas.length} Ideias de Conteúdo Ranqueadas
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                Score 0–100
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Classificadas por demanda de busca, fraqueza da concorrência e adequação ao formato da plataforma.
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Filtrar viralidade:</span>
          {['all', 'Exceptional', 'Very High', 'High'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterVirality(f)}
              className={`px-2.5 py-1 rounded-lg font-medium border transition ${
                filterVirality === f
                  ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {f === 'all' ? 'Todas' : f}
            </button>
          ))}
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
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 uppercase">
                        ★ Melhor Oportunidade
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-slate-400 font-normal">Ângulo:</strong> {idea.angle}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {idea.format}
                    </span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                      Viralidade: {idea.viralityPotential}
                    </span>
                    <span className="text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-medium">
                      Concorrência: {idea.competitionLevel}
                    </span>
                    <span className="text-slate-400 hidden sm:inline">
                      Lacuna: <span className="text-slate-300">{idea.gapExploited}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Opportunity Score & Generate Scripts Button */}
              <div className="flex items-center justify-between lg:justify-end space-x-4 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-900">
                <div className="text-left lg:text-right">
                  <div className="text-xl sm:text-2xl font-extrabold text-white">
                    {idea.opportunityScore}
                    <span className="text-slate-500 text-xs font-normal">/100</span>
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Score
                  </span>
                </div>

                <button
                  onClick={() => onSelectIdea(idea)}
                  disabled={isGeneratingScripts}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>{isSelected ? 'Roteiro Ativo' : 'Gerar Roteiro'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
