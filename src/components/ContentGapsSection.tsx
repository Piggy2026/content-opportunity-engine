import React from 'react';
import { Target, AlertTriangle, HelpCircle, XCircle, ArrowUpRight, Compass } from 'lucide-react';
import { ContentGap } from '../types/index.js';

interface ContentGapsSectionProps {
  gaps: ContentGap[];
}

export const ContentGapsSection: React.FC<ContentGapsSectionProps> = ({ gaps }) => {
  const getCategoryMeta = (cat: ContentGap['category']) => {
    switch (cat) {
      case 'underserved-market-need':
        return {
          label: 'Necessidade Local Desatendida',
          icon: Compass,
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        };
      case 'oversaturated-angle':
        return {
          label: 'Ângulo Saturado a Evitar',
          icon: XCircle,
          color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
        };
      case 'unanswered-question':
        return {
          label: 'Dúvida Sem Resposta Prática',
          icon: HelpCircle,
          color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
        };
      case 'weak-competitor-execution':
        return {
          label: 'Execução Fraca dos Concorrentes',
          icon: AlertTriangle,
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        };
    }
  };

  const getPriorityBadge = (lvl: ContentGap['opportunityLevel']) => {
    switch (lvl) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">Oportunidade Crítica</span>;
      case 'very-high':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30">Oportunidade Muito Alta</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">Oportunidade Alta</span>;
    }
  };

  return (
    <div id="section-gaps" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
        <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
          4
        </span>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Deteção de Lacunas de Conteúdo (Content Gaps)
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            O que os concorrentes repetem em excesso vs o que o público procura e não encontra.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gaps.map((gap) => {
          const meta = getCategoryMeta(gap.category);
          const Icon = meta.icon;

          return (
            <div
              key={gap.id}
              className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                {/* Meta Tag & Priority */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${meta.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span>{meta.label}</span>
                  </span>
                  {getPriorityBadge(gap.opportunityLevel)}
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-white">{gap.title}</h3>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{gap.description}</p>

                {/* Why competitors missed it */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs space-y-1">
                  <span className="text-slate-400 font-medium block text-[11px] uppercase tracking-wider">
                    Por que a concorrência falhou:
                  </span>
                  <p className="text-slate-300">{gap.whyCompetitorsMissedIt}</p>
                </div>
              </div>

              {/* Market Nuance */}
              <div className="mt-4 pt-3 border-t border-slate-900 text-xs text-brand-300 flex items-start space-x-2">
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-semibold">Nuance Local:</strong> {gap.marketNuance}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
