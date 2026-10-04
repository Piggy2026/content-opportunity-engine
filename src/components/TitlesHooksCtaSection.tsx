import React, { useState } from 'react';
import { Flame, Copy, Check, Eye, MessageSquare, Bookmark, Share2 } from 'lucide-react';
import { TitleIdea, HookIdea, CallToAction } from '../types/index.js';
import { copyToClipboard } from '../lib/exportUtils.js';

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
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
        <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
          8
        </span>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Títulos de Alto Clique, Ganchos de 3s & CTAs
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Otimizados psicologicamente para maximizar a taxa de clique inicial (CTR) e a retenção nos primeiros segundos.
          </p>
        </div>
      </div>

      {/* Part 1: High-CTR Titles */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4 h-4 text-rose-400" />
          <span>5+ Variações de Títulos por Gatilho Psicológico</span>
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
                <span className="text-sm font-medium text-slate-100 group-hover:text-white truncate">
                  {title.title}
                </span>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className="text-xs font-mono font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                  CTR Score {title.score}
                </span>
                <button
                  onClick={() => handleCopy(title.id, title.title)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Copiar título"
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
          <span>Ganchos de Retenção Crítica (Primeiros 3 Segundos)</span>
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
                    onClick={() => handleCopy(hook.id, `"${hook.spokenHook}"`)}
                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 transition"
                    title="Copiar gancho falado"
                  >
                    {copiedId === hook.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800/80 text-xs">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                    Gancho Falado (0:00 - 0:03):
                  </span>
                  <p className="text-slate-100 font-medium italic mt-0.5">"{hook.spokenHook}"</p>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">
                    Gancho Visual em Cena:
                  </span>
                  <p className="mt-0.5 text-slate-300">{hook.visualHook}</p>
                </div>
              </div>

              <div className="p-2 rounded bg-indigo-950/40 border border-indigo-800/30 text-[11px] text-indigo-200 font-mono">
                Texto na tela: <strong>[{hook.overlayText}]</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Platform Native CTAs */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Share2 className="w-4 h-4 text-emerald-400" />
          <span>Chamadas para Ação Nativas da Plataforma (CTAs)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ctas.map((cta) => (
            <div
              key={cta.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-emerald-400 block">{cta.goal}</span>
                <p className="text-xs text-slate-200 italic mt-2">"{cta.spokenCta}"</p>
                <div className="mt-2 text-[11px] font-mono text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800">
                  Rótulo: {cta.onScreenText}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                <strong className="text-slate-400">Regra:</strong> {cta.platformBestPractice}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
