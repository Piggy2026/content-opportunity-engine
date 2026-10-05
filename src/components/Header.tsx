import React from 'react';
import { Sparkles, FolderArchive, Settings, RefreshCw, Compass, Globe } from 'lucide-react';
import { TargetMarket, Platform } from '../types/index.js';
import { useLanguage } from '../i18n/LanguageContext.js';
import { UiLanguage } from '../i18n/translations.js';

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
  const { uiLanguage, setUiLanguage, t, getOutputLanguageName, getMarketDisplayName } = useLanguage();

  const activeMarket = currentMarket || 'pt-PT';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={onReset}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-rose-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-white tracking-tight">
                {t.header.title} <span className="text-brand-400">{t.header.engineWord}</span>
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-full">
                {t.header.mvpBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.header.tagline}
            </p>
          </div>
        </div>

        {/* Current Active Language Architecture Badge (UI vs Target Market vs Content Output) */}
        <div className="hidden lg:flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 flex items-center gap-1.5 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-brand-400" />
            <span>{t.meta.archBadge.uiLabel}: <strong className="text-white">{t.meta.langName}</strong></span>
            <span className="text-slate-500">|</span>
            <span>{t.meta.archBadge.marketLabel}: <strong className="text-white">{getMarketDisplayName(activeMarket)}</strong></span>
            <span className="text-slate-500">|</span>
            <span>{t.meta.archBadge.outputLabel}: <strong className="text-brand-300">{getOutputLanguageName(activeMarket)}</strong></span>
          </span>
        </div>

        {/* Action Controls & Compact UI Language Selector */}
        <div className="flex items-center space-x-2">
          {/* Compact UI Language Selector */}
          <div className="flex items-center rounded-lg bg-slate-950/80 p-0.5 border border-slate-800 text-xs">
            {(
              [
                { id: 'pt' as UiLanguage, label: 'PT', flag: '🇵🇹', title: 'Interface em Português' },
                { id: 'es' as UiLanguage, label: 'ES', flag: '🇪🇸', title: 'Interfaz en Español' },
                { id: 'en' as UiLanguage, label: 'EN', flag: '🇬🇧', title: 'UI in English' },
              ] as const
            ).map((lang) => {
              const isSelected = uiLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => setUiLanguage(lang.id)}
                  className={`px-2 py-1 rounded-md font-medium text-xs transition flex items-center gap-1 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                  title={lang.title}
                >
                  <span className="text-[11px]">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenProjects}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition"
            title={t.header.projectsBtn}
          >
            <FolderArchive className="w-4 h-4 text-brand-400" />
            <span className="hidden sm:inline">{t.header.projectsBtn}</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition"
            title={t.header.apiBtn}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">{t.header.apiBtn}</span>
          </button>

          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title={t.header.newResearchBtn}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
