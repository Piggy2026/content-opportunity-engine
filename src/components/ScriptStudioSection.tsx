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
import { useLanguage } from '../i18n/LanguageContext.js';

interface ScriptStudioSectionProps {
  scripts: ScriptVariation[];
  selectedIdea: ContentIdea;
}

export const ScriptStudioSection: React.FC<ScriptStudioSectionProps> = ({ scripts, selectedIdea }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const currentScript = scripts[activeTab] || scripts[0];

  const handleCopyFull = async () => {
    if (!currentScript) return;
    const formatted = `${currentScript.styleName} (${currentScript.badge})
${t.scripts.durationLabel} ${currentScript.estimatedDuration} | ~${currentScript.targetWordCount} ${t.scripts.wordsLabel}
${t.scripts.txtHeaderIdea} ${selectedIdea.title}

${currentScript.sections
  .map(
    (s) => `[${s.timestamp}] ${s.stage}
${s.visualCue}
${s.audioToneCue ? s.audioToneCue + '\n' : ''}${t.scripts.spokenLabel.toUpperCase()}: "${s.spokenText}"`
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
    const formatted = `CONTENT OPPORTUNITY ENGINE
${t.scripts.txtHeaderIdea} ${selectedIdea.title}
${t.scripts.txtHeaderStyle} ${currentScript.styleName}
${t.scripts.txtHeaderDuration} ${currentScript.estimatedDuration}
${t.scripts.txtHeaderWords} ${currentScript.targetWordCount}

${t.scripts.txtSectionTechnical}
${currentScript.sections
  .map(
    (s) => `[${s.timestamp}] - ${s.stage}
${t.scripts.sceneLabel} ${s.visualCue}
${s.audioToneCue ? t.scripts.audioLabel + ': ' + s.audioToneCue + '\n' : ''}${t.scripts.spokenLabel} "${s.spokenText}"`
  )
  .join('\n\n')}

${t.scripts.txtSectionTeleprompter}
${currentScript.fullSpokenText}
`;
    downloadFile(formatted, `script_${currentScript.style}.txt`, 'text/plain;charset=utf-8');
  };

  if (!currentScript) return null;

  return (
    <div id="section-scripts" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
            {t.scripts.step}
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {t.scripts.title}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {t.scripts.badge}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              {t.scripts.subtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyFull}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center space-x-1.5"
          >
            {copiedType === 'full' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-brand-400" />
            )}
            <span>{copiedType === 'full' ? t.scripts.copied : t.scripts.copyTechnicalBtn}</span>
          </button>

          <button
            onClick={handleCopySpokenOnly}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center space-x-1.5"
          >
            {copiedType === 'spoken' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span>{copiedType === 'spoken' ? t.scripts.copied : t.scripts.copyTeleprompterBtn}</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-sm shadow-indigo-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.scripts.downloadTxtBtn}</span>
          </button>
        </div>
      </div>

      {/* Variation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scripts.map((script, idx) => {
          const isSelected = activeTab === idx;
          return (
            <button
              key={script.id || idx}
              onClick={() => setActiveTab(idx)}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                    {script.badge}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {script.estimatedDuration}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{script.styleName}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{script.tagline}</p>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>~{script.targetWordCount} {t.scripts.wordsLabel}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Script Breakdown (Timeline Cues) */}
      <div className="space-y-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase">
                {currentScript.badge}
              </span>
              <h3 className="font-bold text-base text-white">{currentScript.styleName}</h3>
            </div>
            <p className="text-xs text-slate-400">{currentScript.tagline}</p>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-300 font-bold block">{currentScript.estimatedDuration}</span>
            <span className="text-slate-500">~{currentScript.targetWordCount} {t.scripts.wordsLabel}</span>
          </div>
        </div>

        {/* Section Cards */}
        <div className="space-y-3">
          {currentScript.sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold text-brand-400">
                    {sec.timestamp}
                  </span>
                  <span className="text-xs font-bold text-slate-200">{sec.stage}</span>
                </div>
              </div>

              {/* Visual Cue */}
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs flex items-start space-x-2 text-indigo-300">
                <Video className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong className="text-indigo-200">{t.scripts.sceneLabel}</strong> {sec.visualCue}
                </span>
              </div>

              {/* Audio Cue if present */}
              {sec.audioToneCue && (
                <div className="p-2 rounded bg-slate-900/60 border border-slate-800/50 text-[11px] flex items-start space-x-2 text-rose-300/90 italic">
                  <Volume2 className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="not-italic">{t.scripts.audioLabel}</strong> {sec.audioToneCue}
                  </span>
                </div>
              )}

              {/* Spoken Script */}
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/90 text-sm text-slate-100 font-normal leading-relaxed">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block mb-1">
                  {t.scripts.spokenLabel}
                </span>
                "{sec.spokenText}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
