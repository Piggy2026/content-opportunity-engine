import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { checkServerHealth } from '../lib/api.js';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userApiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userApiKey,
  onSaveApiKey,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState(userApiKey);
  const [serverHealth, setServerHealth] = useState<{
    status: string;
    hasGeminiKey: boolean;
    hasYouTubeKey: boolean;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setApiKeyInput(userApiKey);
      checkServerHealth().then(setServerHealth);
    }
  }, [isOpen, userApiKey]);

  const handleSave = () => {
    onSaveApiKey(apiKeyInput.trim());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-brand-400" />
            <h3 className="font-bold text-lg text-white">Configurações & Chaves de API</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm">
          {/* Server status indicator */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">
                Estado do Servidor Local
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Ativo
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-slate-900">
              <span>Chave Gemini no Servidor (.env):</span>
              <span className={serverHealth?.hasGeminiKey ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                {serverHealth?.hasGeminiKey ? '✓ Configurada' : 'Não detetada'}
              </span>
            </div>
          </div>

          {/* Gemini API Key input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-200">
              Google Gemini API Key (Opcional - Ativa Google Search Grounding)
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 bg-slate-950 rounded-xl border border-slate-800 focus:border-brand-500 text-white placeholder-slate-600 font-mono text-xs"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Obtenha gratuitamente no Google AI Studio</span>
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-brand-400 hover:underline flex items-center gap-1"
              >
                <span>Google AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-brand-950/30 border border-brand-800/30 text-xs text-brand-200 space-y-1">
            <div className="font-semibold text-brand-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Modo Zero-Cost e Fallback Automático</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Se não fornecer uma chave, o sistema utiliza automaticamente o scraper gratuito integrado de
              pesquisa pública na web e concorrentes em tempo real, sem qualquer custo!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-900 border border-slate-800 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-sm shadow-brand-500/20 transition"
          >
            Guardar Configurações
          </button>
        </div>
      </div>
    </div>
  );
};
