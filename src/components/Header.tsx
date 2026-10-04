import React from 'react';
import { Sparkles, FolderArchive, Settings, RefreshCw, Compass } from 'lucide-react';
import { TargetMarket, Platform } from '../types/index.js';

interface HeaderProps {
  onOpenProjects: () => void;
  onOpenSettings: () => void;
  onReset: () => void;
  currentMarket?: TargetMarket;
  currentPlatform?: Platform;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenProjects,
  onOpenSettings,
  onReset,
  currentMarket,
  currentPlatform,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-rose-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-white tracking-tight">
                Content Opportunity <span className="text-brand-400">Engine</span>
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-full">
                MVP
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Pesquisa Real • Outliers • Gaps • 20 Ideias • 3 Roteiros
            </p>
          </div>
        </div>

        {/* Current Target Badges */}
        <div className="hidden md:flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Mercados: 🇵🇹 PT • 🇧🇷 BR • 🇪🇸 ES
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60">
            YouTube • Shorts • TikTok • Reels
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenProjects}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition"
            title="Projetos Guardados"
          >
            <FolderArchive className="w-4 h-4 text-brand-400" />
            <span className="hidden sm:inline">Projetos</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition"
            title="Configurações e Chaves de API"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">API</span>
          </button>

          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Nova Pesquisa"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
