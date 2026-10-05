import React, { useState } from 'react';
import { Flame, Copy, Check, Eye, MessageSquare, Bookmark, Share2, Globe, Languages, Sparkles } from 'lucide-react';
import { TitleIdea, HookIdea, CallToAction } from '../types/index.js';
import { copyToClipboard } from '../lib/exportUtils.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface TitlesHooksCtaSectionProps {
  titles: TitleIdea[];
  hooks: HookIdea[];
  ctas: CallToAction[];
}

export const TitlesHooksCtaSection: React.FC<TitlesHooksCtaSectionProps> = ({
  titles,
  hooks,
  ctas,
}) => {
  const { t, uiLanguage } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showStrategy, setShowStrategy] = useState<boolean>(true);

  const handleCopy = async (id: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    }
  };

  return (
    <div id="section-hooks" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
            {t.titlesHooksCta.step}
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t.titlesHooksCta.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              {t.titlesHooksCta.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowStrategy(!showStrategy)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition ${
            showStrategy
              ? 'bg-rose-600/30 text-rose-200 border-rose-500/50 shadow-sm'
              : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
          }`}
          title="Toggle English meaning and psychological rationale"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{t.titlesHooksCta.showMeaningToggle}</span>
        </button>
      </div>

      {/* Part 1: High-CTR Titles */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4 h-4 text-rose-400" />
          <span>{t.titlesHooksCta.titlesHeading}</span>
        </h3>
        <div className="grid grid-cols-1 gap-2.5">
          {titles.map((title) => (
            <div
              key={title.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-400 shrink-0">
                  {title.type}
                </span>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-slate-100 group-hover:text-white truncate block">
                    {title.title}
                  </span>
                  {showStrategy && title.titleTranslation && (
                    <span className="text-xs text-indigo-300 font-normal truncate block">
                      "{title.titleTranslation}"
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="text-xs font-mono font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                  {t.titlesHooksCta.ctrScoreLabel} {title.score}
                </span>
                <button
                  onClick={() => handleCopy(title.id, title.title)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title={t.titlesHooksCta.copyTitleTooltip}
                >
                  {copiedId === title.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Hooks (Visual + Verbal + Overlay in first 3s) */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Eye className="w-4 h-4 text-indigo-400" />
          <span>{t.titlesHooksCta.hooksHeading}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hooks.map((hook) => (
            <div
              key={hook.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-400">{hook.type}</span>
                  <button
                    onClick={() => handleCopy(hook.id, `${t.titlesHooksCta.visualLabel} ${hook.visualHook}\n${t.titlesHooksCta.spokenLabel} "${hook.spokenHook}"\n${t.titlesHooksCta.overlayLabel} ${hook.overlayText}`)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                    title={t.titlesHooksCta.copyHookTooltip}
                  >
                    {copiedId === hook.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider block">
                    {t.titlesHooksCta.visualLabel}
                  </span>
                  <p className="text-slate-300">{hook.visualHook}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs space-y-1">
                  <span className="text-[11px] font-semibold text-brand-400 uppercase tracking-wider block">
                    {t.titlesHooksCta.spokenLabel}
                  </span>
                  <p className="text-slate-100 font-medium">"{hook.spokenHook}"</p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 text-xs space-y-1">
                  <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
                    {t.titlesHooksCta.overlayLabel}
                  </span>
                  <p className="text-amber-200 font-black tracking-wide uppercase">{hook.overlayText}</p>
                </div>

                {/* Strategic Meaning & Natural Translation */}
                {showStrategy && (hook.spokenHookTranslation || hook.directorNote) && (
                  <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1.5 animate-in fade-in">
                    {hook.spokenHookTranslation && (
                      <div>
                        <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1">
                          <Languages className="w-3 h-3 text-indigo-400" />
                          {t.titlesHooksCta.naturalTranslationLabel}
                        </span>
                        <p className="text-white font-medium text-xs leading-snug">"{hook.spokenHookTranslation}"</p>
                      </div>
                    )}
                    {hook.directorNote && (
                      <p className="text-indigo-200/90 text-[11px] pt-1 border-t border-indigo-900/60 flex items-start gap-1.5">
                        <Sparkles className="w-3 h-3 text-yellow-300 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-indigo-300">{t.titlesHooksCta.directorNoteLabel}</strong> {hook.directorNote}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: High-Converting CTAs */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>{t.titlesHooksCta.ctaHeading}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ctas.map((cta) => (
            <div
              key={cta.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {cta.goal}
                  </span>
                  <button
                    onClick={() => handleCopy(cta.id, `${t.titlesHooksCta.ctaSpokenLabel} "${cta.spokenCta}"\n${t.titlesHooksCta.ctaVisualLabel} ${cta.onScreenText}`)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                    title={t.titlesHooksCta.copyCtaTooltip}
                  >
                    {copiedId === cta.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-200 font-medium">
                  <strong className="text-emerald-300">{t.titlesHooksCta.ctaSpokenLabel}</strong> "{cta.spokenCta}"
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  <strong className="text-slate-300">{t.titlesHooksCta.ctaVisualLabel}</strong> {cta.onScreenText}
                </p>

                {/* Natural Translation & Strategy for CTA */}
                {showStrategy && (cta.spokenCtaTranslation || cta.directorNote) && (
                  <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1 animate-in fade-in">
                    {cta.spokenCtaTranslation && (
                      <p className="text-white text-xs font-medium">"{cta.spokenCtaTranslation}"</p>
                    )}
                    {cta.directorNote && (
                      <p className="text-emerald-300/80 text-[11px]">
                        {cta.directorNote}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-500">
                <span className="text-slate-400">{t.titlesHooksCta.ctaBestPracticeLabel}</span> {cta.platformBestPractice}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
