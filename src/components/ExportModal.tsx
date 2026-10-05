import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, Code2 } from 'lucide-react';
import { OpportunityEngineResult } from '../types/index.js';
import { generateMarkdownDossier, downloadFile, copyToClipboard } from '../lib/exportUtils.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: OpportunityEngineResult;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, result }) => {
  const { t } = useLanguage();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const markdownContent = generateMarkdownDossier(result);
  const jsonContent = JSON.stringify(result, null, 2);

  const handleCopyMarkdown = async () => {
    const ok = await copyToClipboard(markdownContent);
    if (ok) {
      setCopiedType('markdown');
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  const handleCopyJson = async () => {
    const ok = await copyToClipboard(jsonContent);
    if (ok) {
      setCopiedType('json');
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  const handleDownloadMarkdown = () => {
    const cleanTopic = result.request.topic.toLowerCase().replace(/[^a-z0-9]/gi, '_');
    downloadFile(markdownContent, `report_${cleanTopic}.md`, 'text/markdown;charset=utf-8');
  };

  const handleDownloadJson = () => {
    const cleanTopic = result.request.topic.toLowerCase().replace(/[^a-z0-9]/gi, '_');
    downloadFile(jsonContent, `data_${cleanTopic}.json`, 'application/json;charset=utf-8');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-brand-400" />
            <h3 className="font-bold text-lg text-white">{t.exportModal.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-400">
            {t.exportModal.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Markdown Export Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-brand-400 mb-1">
                  <FileText className="w-4 h-4" />
                  <span className="font-bold text-sm text-white">{t.exportModal.markdownCard.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.exportModal.markdownCard.desc}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-1.5"
                >
                  {copiedType === 'markdown' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedType === 'markdown'
                      ? t.exportModal.markdownCard.copied
                      : t.exportModal.markdownCard.copyBtn}
                  </span>
                </button>

                <button
                  onClick={handleDownloadMarkdown}
                  className="w-full py-2 px-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition flex items-center justify-center space-x-1.5 shadow-sm shadow-brand-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportModal.markdownCard.downloadBtn}</span>
                </button>
              </div>
            </div>

            {/* JSON Raw Data Export Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-indigo-400 mb-1">
                  <Code2 className="w-4 h-4" />
                  <span className="font-bold text-sm text-white">{t.exportModal.jsonCard.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.exportModal.jsonCard.desc}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCopyJson}
                  className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-1.5"
                >
                  {copiedType === 'json' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copiedType === 'json'
                      ? t.exportModal.jsonCard.copied
                      : t.exportModal.jsonCard.copyBtn}
                  </span>
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center justify-center space-x-1.5 shadow-sm shadow-indigo-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportModal.jsonCard.downloadBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            {t.exportModal.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
