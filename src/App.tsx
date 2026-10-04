import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { WorkflowProgress } from './components/WorkflowProgress.js';
import { ResearchInputForm } from './components/ResearchInputForm.js';
import { CompetitorsSection } from './components/CompetitorsSection.js';
import { OutlierAnalysisSection } from './components/OutlierAnalysisSection.js';
import { ContentGapsSection } from './components/ContentGapsSection.js';
import { RankedIdeasSection } from './components/RankedIdeasSection.js';
import { BestOpportunityBadge } from './components/BestOpportunityBadge.js';
import { ScriptStudioSection } from './components/ScriptStudioSection.js';
import { TitlesHooksCtaSection } from './components/TitlesHooksCtaSection.js';
import { SourcesDrawer } from './components/SourcesDrawer.js';
import { SavedProjectsModal } from './components/SavedProjectsModal.js';
import { SettingsModal } from './components/SettingsModal.js';
import { ExportModal } from './components/ExportModal.js';
import {
  OpportunityEngineResult,
  ResearchRequest,
  ContentIdea,
} from './types/index.js';
import {
  runOpportunityAnalysis,
  generateScriptsForIdea,
  fetchProjectDetails,
} from './lib/api.js';
import { Download, Sparkles, FolderArchive, ArrowUp, AlertCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [result, setResult] = useState<OpportunityEngineResult | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState('');
  const [isGeneratingIdeaScripts, setIsGeneratingIdeaScripts] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isSavedProjectsOpen, setIsSavedProjectsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // User configured API Key
  const [userApiKey, setUserApiKey] = useState(() => {
    return localStorage.getItem('coe_gemini_api_key') || '';
  });

  const handleSaveApiKey = (key: string) => {
    setUserApiKey(key);
    localStorage.setItem('coe_gemini_api_key', key);
  };

  // Run full analysis
  const handleStartAnalysis = async (request: ResearchRequest) => {
    setIsLoading(true);
    setErrorMessage(null);

    const progressSteps = [
      '1/5: Pesquisando concorrentes reais e vídeos indexados...',
      '2/5: Analisando formatos outliers e velocidade de engajamento...',
      '3/5: Identificando lacunas de conteúdo e nuances de mercado...',
      '4/5: Gerando e calculando score das 20 oportunidades...',
      '5/5: Produzindo 3 variações de roteiro, ganchos e CTAs...',
    ];

    let stepIdx = 0;
    setLoadingProgress(progressSteps[0]);
    const progressTimer = setInterval(() => {
      stepIdx++;
      if (stepIdx < progressSteps.length) {
        setLoadingProgress(progressSteps[stepIdx]);
      }
    }, 1500);

    try {
      const payload: ResearchRequest = {
        ...request,
        apiKey: userApiKey || undefined,
      };

      const data = await runOpportunityAnalysis(payload);
      clearInterval(progressTimer);
      setResult(data);
      setSelectedIdea(data.bestOpportunity || data.rankedIdeas[0]);

      // Smooth scroll to top of results
      setTimeout(() => {
        const compEl = document.getElementById('section-competitors');
        if (compEl) {
          compEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } catch (err: any) {
      clearInterval(progressTimer);
      console.error(err);
      setErrorMessage(err.message || 'Falha ao processar pesquisa. Tente novamente.');
    } finally {
      setIsLoading(false);
      setLoadingProgress('');
    }
  };

  // Switch to another idea and generate tailored scripts
  const handleSelectIdea = async (idea: ContentIdea) => {
    if (!result) return;
    if (selectedIdea?.id === idea.id) {
      const scriptEl = document.getElementById('section-scripts');
      if (scriptEl) scriptEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setSelectedIdea(idea);
    setIsGeneratingIdeaScripts(true);

    try {
      const scriptSuite = await generateScriptsForIdea(
        result.request,
        idea,
        result.competitors
      );

      setResult((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          scripts: scriptSuite.scripts,
          titles: scriptSuite.titles,
          hooks: scriptSuite.hooks,
          ctas: scriptSuite.ctas,
        };
      });

      const scriptEl = document.getElementById('section-scripts');
      if (scriptEl) scriptEl.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.warn('Erro ao atualizar roteiros para nova ideia:', err);
    } finally {
      setIsGeneratingIdeaScripts(false);
    }
  };

  // Load a saved project
  const handleLoadProject = async (id: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const proj = await fetchProjectDetails(id);
      if (proj) {
        setResult(proj);
        setSelectedIdea(proj.bestOpportunity || proj.rankedIdeas[0]);
      }
    } catch (err: any) {
      setErrorMessage('Não foi possível carregar o projeto.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToStage = (stageIndex: number) => {
    const anchors: Record<number, string> = {
      1: 'section-input',
      2: 'section-competitors',
      3: 'section-outliers',
      4: 'section-gaps',
      5: 'section-ideas',
      6: 'section-best',
      7: 'section-scripts',
      8: 'section-hooks',
      9: 'section-sources',
    };
    const target = document.getElementById(anchors[stageIndex]);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500/30 selection:text-white">
      {/* Top Navigation */}
      <Header
        onOpenProjects={() => setIsSavedProjectsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onReset={() => {
          setResult(null);
          setSelectedIdea(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentMarket={result?.request.market}
        currentPlatform={result?.request.platform}
      />

      {/* Workflow Progress Bar */}
      <WorkflowProgress
        currentStage={result ? 9 : 1}
        onSelectStage={scrollToStage}
        isProcessing={isLoading}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span className="flex-1">{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-rose-400 hover:underline"
            >
              Fechar
            </button>
          </div>
        )}

        {/* 1. Research Input Form */}
        <ResearchInputForm
          onSubmit={handleStartAnalysis}
          isLoading={isLoading}
          loadingProgress={loadingProgress}
        />

        {/* Results Container */}
        {result && (
          <>
            {/* Quick Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Análise Concluída</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">
                  Nicho: <strong className="text-white">{result.request.topic}</strong>
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">
                  {result.cached ? '⚡ Carregado de Cache (24h)' : '🌐 Pesquisa em Tempo Real'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium transition flex items-center space-x-1.5 shadow-sm shadow-brand-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar Relatório</span>
                </button>
              </div>
            </div>

            {/* 2. Competitors Section (10–20 results) */}
            <CompetitorsSection competitors={result.competitors} />

            {/* 3. Outlier Analysis Section */}
            <OutlierAnalysisSection analysis={result.outlierAnalysis} />

            {/* 4. Content Gaps Section */}
            <ContentGapsSection gaps={result.contentGaps} />

            {/* 5. Ranked Ideas Section (15–20 ideas) */}
            <RankedIdeasSection
              ideas={result.rankedIdeas}
              selectedIdeaId={selectedIdea?.id || result.bestOpportunityId}
              onSelectIdea={handleSelectIdea}
              isGeneratingScripts={isGeneratingIdeaScripts}
            />

            {/* 6. Best Opportunity Spotlight */}
            <BestOpportunityBadge
              idea={result.bestOpportunity}
              onJumpToScripts={() => {
                const scriptEl = document.getElementById('section-scripts');
                if (scriptEl) scriptEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 7. Script Studio (3 distinct variations) */}
            {selectedIdea && (
              <ScriptStudioSection
                scripts={result.scripts}
                selectedIdea={selectedIdea}
              />
            )}

            {/* 8. Titles, Hooks & CTAs */}
            <TitlesHooksCtaSection
              titles={result.titles}
              hooks={result.hooks}
              ctas={result.ctas}
            />

            {/* 9. Sources & Citations */}
            <SourcesDrawer sources={result.sources} />
          </>
        )}
      </main>

      {/* Floating Action for Quick Export & Top Navigation */}
      {result && (
        <div className="fixed bottom-6 right-6 z-30 flex items-center space-x-2">
          <button
            onClick={() => setIsExportOpen(true)}
            className="px-4 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-xl shadow-brand-500/30 flex items-center space-x-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Relatório</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shadow-xl transition"
            title="Voltar ao Topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modals */}
      <SavedProjectsModal
        isOpen={isSavedProjectsOpen}
        onClose={() => setIsSavedProjectsOpen(false)}
        onSelectProject={handleLoadProject}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userApiKey={userApiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      {result && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          result={result}
        />
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            <strong>Content Opportunity Engine</strong> • Pesquisa & Análise Estratégica de Conteúdo
          </p>
          <p className="text-slate-400">
            Mercados Alvo: Portugal (pt-PT) • Brasil (pt-BR) • Espanha (es-ES)
          </p>
        </div>
      </footer>
    </div>
  );
}
