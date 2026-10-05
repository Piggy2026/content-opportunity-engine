import React from 'react';
import {
  Search,
  Users,
  TrendingUp,
  Target,
  ListOrdered,
  Award,
  FileText,
  Flame,
  Link2,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.js';

interface WorkflowProgressProps {
  currentStage: number; // 1 to 9
  onSelectStage: (stageIndex: number) => void;
  isProcessing: boolean;
}

export const WorkflowProgress: React.FC<WorkflowProgressProps> = ({
  currentStage,
  onSelectStage,
  isProcessing,
}) => {
  const { t } = useLanguage();

  const steps = [
    { id: 1, label: t.workflow.input, icon: Search, anchor: 'section-input' },
    { id: 2, label: t.workflow.competitors, icon: Users, anchor: 'section-competitors' },
    { id: 3, label: t.workflow.outliers, icon: TrendingUp, anchor: 'section-outliers' },
    { id: 4, label: t.workflow.gaps, icon: Target, anchor: 'section-gaps' },
    { id: 5, label: t.workflow.ideas, icon: ListOrdered, anchor: 'section-ideas' },
    { id: 6, label: t.workflow.bestOpportunity, icon: Award, anchor: 'section-best' },
    { id: 7, label: t.workflow.scripts, icon: FileText, anchor: 'section-scripts' },
    { id: 8, label: t.workflow.hooks, icon: Flame, anchor: 'section-hooks' },
    { id: 9, label: t.workflow.sources, icon: Link2, anchor: 'section-sources' },
  ];

  return (
    <div className="w-full bg-slate-900/60 border-y border-slate-800/80 py-3 px-4 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[860px]">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStage >= step.id;
          const isCurrent = currentStage === step.id;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onSelectStage(step.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-brand-600/30 text-brand-300 border border-brand-500/50 shadow-sm shadow-brand-500/10'
                    : isActive
                    ? 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 border border-slate-700/60'
                    : 'text-slate-500 hover:text-slate-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isActive ? 'bg-brand-500/20 text-brand-400' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {currentStage > step.id ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <Icon className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{step.label}</span>
              </button>

              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1.5 transition-colors ${
                    currentStage > step.id ? 'bg-brand-500/50' : 'bg-slate-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
