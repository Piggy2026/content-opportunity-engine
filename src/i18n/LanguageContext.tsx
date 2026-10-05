import React, { createContext, useContext, useState, useEffect } from 'react';
import { UiLanguage, TranslationDictionary, translations } from './translations.js';
import { TargetMarket } from '../types/index.js';

interface LanguageContextType {
  uiLanguage: UiLanguage;
  setUiLanguage: (lang: UiLanguage) => void;
  t: TranslationDictionary;
  getOutputLanguageName: (market: TargetMarket) => string;
  getMarketDisplayName: (market: TargetMarket) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'coe_ui_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uiLanguage, setUiLanguageState] = useState<UiLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as UiLanguage | null;
      if (saved && (saved === 'pt' || saved === 'es' || saved === 'en')) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'pt';
  });

  const setUiLanguage = (lang: UiLanguage) => {
    setUiLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = translations[uiLanguage] || translations.pt;

  const getOutputLanguageName = (market: TargetMarket): string => {
    return t.researchForm.markets[market]?.outputLanguageName || market;
  };

  const getMarketDisplayName = (market: TargetMarket): string => {
    return t.researchForm.markets[market]?.name || market;
  };

  return (
    <LanguageContext.Provider
      value={{
        uiLanguage,
        setUiLanguage,
        t,
        getOutputLanguageName,
        getMarketDisplayName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
