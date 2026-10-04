import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  Volume2,
  Video,
  Clock,
  Sparkles,
  Layers,
  MessageSquare,
} from 'lucide-react';
import { ScriptVariation, ContentIdea } from '../types/index.js';
import { copyToClipboard, downloadFile } from '../lib/exportUtils.js';

interface ScriptStudioSectionProps {
  scripts: ScriptVariation[];
  selectedIdea: ContentIdea;
}

export const ScriptStudioSection: React.FC<ScriptStudioSectionProps> = ({ scripts, selectedIdea }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const currentScript = scripts[activeTab] || scripts[0];

  const handleCopyFull = async () => {
    if (!currentScript) return;
    const formatted = `${currentScript.styleName} (${currentScript.badge})
Duração: ${currentScript.estimatedDuration} | ~${currentScript.targetWordCount} palavras
Ideia: ${selectedIdea.title}

${currentScript.sections
  .map(
    (s) => `[${s.timestamp}] ${s.stage}
${s.visualCue}
${s.audioToneCue ? s.audioToneCue + '\n' : ''}FALA: "${s.spokenText}"`
  )
  .join('\n\n')}`;

    const ok = await copyToClipboard(formatted);
    if (ok) {
      setCopiedType('full');
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  const handleCopySpokenOnly = async () => {
    if (!currentScript) return;
    const ok = await copyToClipboard(currentScript.fullSpokenText);
    if (ok) {
      setCopiedType('spoken');
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  const handleDownloadTxt = () => {
    if (!currentScript) return;
    const formatted = `CONTENT OPPORTUNITY ENGINE - ROTEIRO DE VÍDEO
Ideia: ${selectedIdea.title}
Estilo: ${currentScript.styleName}
Duração: ${currentScript.estimatedDuration}
Contagem de palavras: ${currentScript.targetWordCount}

--- ROTEIRO TÉCNICO (CENAS E FALA) ---
${currentScript.sections
  .map(
    (s) => `[${s.timestamp}] - ${s.stage}
Cena: ${s.visualCue}
${s.audioToneCue ? 'Áudio: ' + s.audioToneCue + '\n' : ''}Fala: "${s.spokenText}"`
  )
  .join('\n\n')}

--- TEXTO CORRIDO PARA TELEPROMPTER ---
${currentScript.fullSpokenText}
`;
    downloadFile(formatted, `roteiro_${currentScript.style}.txt`, 'text/plain;charset=utf-8');
  };

  if (!currentScript) return null;

  return (
    <div id="section-scripts" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
            7
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Estúdio de Roteiros: 3 Variações Completas
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Prontos para Gravação
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Roteiros estruturados com indicações visuais de corte, falas cronometradas e ganchos nativos.
            </p>
          </div>
        </div>

        {/* Global Script Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopySpokenOnly}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition flex items-center space-x-1.5"
            title="Copiar apenas o texto de fala para teleprompter"
          >
            {copiedType === 'spoken' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>{copiedType === 'spoken' ? 'Copiado!' : 'Copiar Fala (Teleprompter)'}</span>
          </button>

          <button
            onClick={handleCopyFull}
            className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium transition flex items-center space-x-1.5 shadow-sm shadow-brand-500/20"
            title="Copiar roteiro técnico completo com cenas e tempos"
          >
            {copiedType === 'full' ? (
              <Check className="w-3.5 h-3.5 text-emerald-300" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedType === 'full' ? 'Copiado!' : 'Copiar Roteiro Técnico'}</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Baixar Roteiro (.txt)"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Idea Context Pill */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="text-slate-500">Roteiro gerado para:</span>
          <strong className="text-white">{selectedIdea.title}</strong>
        </div>
        <span className="text-brand-400 font-mono font-medium">Score {selectedIdea.opportunityScore}/100</span>
      </div>

      {/* Variation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scripts.map((script, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={script.id || idx}
              onClick={() => setActiveTab(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-brand-950/40 border-brand-500 text-white ring-1 ring-brand-500/40'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-brand-300">{script.badge}</span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {script.estimatedDuration}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-slate-100">{script.styleName}</h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{script.tagline}</p>
            </button>
          );
        })}
      </div>

      {/* Active Script Breakdown */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-4">
          <div>
            <h3 className="font-bold text-base text-white">{currentScript.styleName}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{currentScript.tagline}</p>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
            <span>Duração: ~{currentScript.estimatedDuration}</span>
            <span>•</span>
            <span>Palavras: ~{currentScript.targetWordCount}</span>
          </div>
        </div>

        {/* Chronological Script Sections */}
        <div className="space-y-4">
          {currentScript.sections.map((section, sIdx) => (
            <div
              key={sIdx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2 hover:border-slate-700/80 transition"
            >
              {/* Timestamp & Stage */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono font-bold text-[11px]">
                    {section.timestamp}
                  </span>
                  <span className="font-semibold text-slate-200">{section.stage}</span>
                </div>
              </div>

              {/* Visual Cue */}
              <div className="p-2 rounded bg-slate-950 border border-slate-800 text-xs text-indigo-300 flex items-start space-x-2">
                <Video className="w-3.5 h-3.5 shrink-0 mt-0.5 text-indigo-400" />
                <span className="font-mono text-[11px]">{section.visualCue}</span>
              </div>

              {/* Audio Tone Cue */}
              {section.audioToneCue && (
                <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1.5 pl-1">
                  <Volume2 className="w-3 h-3 text-slate-500" />
                  <span>{section.audioToneCue}</span>
                </div>
              )}

              {/* Spoken Words */}
              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold mb-1">
                  Texto Falado:
                </span>
                <p className="text-sm text-slate-100 font-medium leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/50">
                  "{section.spokenText}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
