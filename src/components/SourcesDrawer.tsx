import React from 'react';
import { Link2, ExternalLink, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';
import { SourceCitation } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface SourcesDrawerProps {
  sources: SourceCitation[];
}

export const SourcesDrawer: React.FC<SourcesDrawerProps> = ({ sources }) => {
  const { t } = useLanguage();

  return (
    <div id="section-sources" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
        <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
          {t.sources.step}
        </span>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>{t.sources.title}</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {t.sources.verifiedBadge(sources.length)}
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            {t.sources.subtitle}
          </p>
        </div>
      </div>

      {sources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sources.map((src, idx) => (
            <div
              key={src.id || idx}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-white truncate max-w-[280px]">
                    {src.title}
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                    {t.sources.verifiedTag}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] truncate">
                  {t.sources.channelHostLabel} <span className="text-slate-300">{src.channelOrHost}</span> • {t.sources.platformLabel} {src.platform}
                </p>
                <p className="text-slate-500 text-[11px] line-clamp-1 italic">
                  "{src.snippet}"
                </p>
              </div>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-brand-400 hover:text-brand-300 border border-slate-800 transition shrink-0"
                title={t.sources.openLinkTooltip}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-200">{t.sources.zeroSourcesTitle}</p>
            <p>{t.sources.zeroSourcesBody}</p>
          </div>
        </div>
      )}
    </div>
  );
};
