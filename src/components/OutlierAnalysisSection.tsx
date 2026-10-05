import React from 'react';
import { TrendingUp, Zap, Sparkles, CheckCircle2, Lightbulb, HeartHandshake, Eye } from 'lucide-react';
import { OutlierAnalysis } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface OutlierAnalysisSectionProps {
  analysis: OutlierAnalysis;
}

export const OutlierAnalysisSection: React.FC<OutlierAnalysisSectionProps> = ({ analysis }) => {
  const { t } = useLanguage();

  return (
    <div id="section-outliers" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
      {/* Title */}
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
        <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
          {t.outliers.step}
        </span>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t.outliers.title}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            {t.outliers.subtitle}
          </p>
        </div>
      </div>

      {/* Top Format Outlier Callout */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-slate-950 via-brand-950/20 to-slate-950 border border-brand-500/30">
        <div className="flex items-center space-x-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Zap className="w-4 h-4 text-brand-400" />
          <span>{t.outliers.formatCalloutTitle}</span>
        </div>
        <h3 className="text-lg font-bold text-white">{analysis.topFormatOutlier.format}</h3>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          {analysis.topFormatOutlier.whyItOutperforms}
        </p>
        <div className="mt-3 inline-block px-3 py-1 rounded-md bg-brand-500/10 text-brand-300 text-xs font-medium border border-brand-500/20">
          {t.outliers.formatFrequency} {analysis.topFormatOutlier.frequencyObserved}
        </div>
      </div>

      {/* Dominant Hook Patterns */}
      <div>
        <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-indigo-400" />
          <span>{t.outliers.hooksTitle}</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.dominantHookPatterns.map((hook, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-400 block">{t.outliers.patternLabel(idx + 1)}</span>
              <h5 className="font-semibold text-sm text-white">{hook.pattern}</h5>
              <div className="p-2 rounded bg-slate-900 border border-slate-800/80 text-xs text-slate-300 italic">
                {hook.example}
              </div>
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                <span className="text-slate-300 font-medium">{t.outliers.whyItWorks}</span> {hook.whyItWorks}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* High Velocity Topics & Emotional Triggers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Topics */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>{t.outliers.velocityTitle}</span>
          </h4>
          <ul className="space-y-2 text-xs">
            {analysis.highVelocityTopics.map((topic, i) => (
              <li key={i} className="flex items-start space-x-2 text-slate-300">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Emotional Triggers */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
            <HeartHandshake className="w-4 h-4 text-rose-400" />
            <span>{t.outliers.triggersTitle}</span>
          </h4>
          <div className="space-y-3">
            {analysis.emotionalTriggers.map((trig, i) => (
              <div key={i} className="text-xs">
                <span className="font-semibold text-rose-300 block">{trig.trigger}</span>
                <p className="text-slate-400 mt-0.5">{trig.application}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strict Distinction: Observed Facts vs AI Deductions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.outliers.observedFactsTitle}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {analysis.observedFacts.map((fact, i) => (
              <li key={i} className="flex items-start space-x-1.5">
                <span className="text-slate-500">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-brand-950/20 border border-brand-800/30">
          <div className="flex items-center space-x-2 text-xs font-bold text-brand-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.outliers.aiDeductionsTitle}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {analysis.aiDeductions.map((deduction, i) => (
              <li key={i} className="flex items-start space-x-1.5">
                <span className="text-brand-400">•</span>
                <span>{deduction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
