import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Search, Video, Eye, Calendar, AlertCircle } from 'lucide-react';
import { CompetitorResult, ResearchProvenance } from '../types/index.js';

interface CompetitorsSectionProps {
  competitors: CompetitorResult[];
  provenance?: ResearchProvenance;
  topic?: string;
}

export const CompetitorsSection: React.FC<CompetitorsSectionProps> = ({ competitors, provenance, topic }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = competitors.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.channelOrCreator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.snippet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="section-competitors" className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Pesquisa de Concorrentes & Conteúdos Ativos
            </h2>
            {competitors.length > 0 ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {competitors.length} Resultados Verificados
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                0 Concorrentes Diretos Indexados
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Fontes reais indexadas na web e plataformas. Cada item possui URL autêntica com distinção estrita entre
            fatos observados e dedução analítica da IA.
          </p>
        </div>

        {/* Search inside results (only when competitors exist) */}
        {competitors.length > 0 && (
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar concorrentes..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-brand-500"
            />
          </div>
        )}
      </div>

      {/* Distinction Banner */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3 text-xs">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-slate-300">
          <strong className="text-white font-semibold">Princípio de Integridade:</strong> Nenhum dado, concorrente
          ou link foi inventado. As tags com fundo escuro representam <span className="text-emerald-400 font-medium">fatos concretos</span> e as caixas lilás indicam <span className="text-brand-300 font-medium">inferência analítica da IA</span>.
        </div>
      </div>

      {/* Provenance Notice if available */}
      {provenance?.notice && (
        <div className="mt-3 p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-300 text-xs flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{provenance.notice}</span>
        </div>
      )}

      {/* Zero Competitors Honest Card */}
      {competitors.length === 0 && (
        <div className="mt-6 p-6 rounded-2xl bg-amber-950/20 border border-amber-800/40 text-amber-200 space-y-4">
          <div className="flex items-start gap-3.5">
            <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-2.5 text-xs sm:text-sm">
              <h4 className="font-bold text-amber-300 text-base">
                Pesquisa Pública Direta Indisponível para este Termo
              </h4>
              <p className="text-amber-200/90 leading-relaxed">
                A pesquisa aberta em tempo real não localizou vídeos concorrentes diretos ativos ou canais indexados publicamente para o termo <strong className="text-white">"{topic || 'pesquisado'}"</strong> na plataforma selecionada.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-900/40 text-slate-300 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Salvaguarda de Zero Fabricação</span>
                </div>
                <p>
                  Para manter integridade estrita, <strong className="text-white">nenhum canal de outro nicho foi substituído</strong> e nenhuma estatística foi inventada para preencher a tela.
                </p>
                <p className="text-slate-400">
                  As secções seguintes (<span className="text-brand-300 font-medium">Análise de Lacunas, 20 Ideias Rankeadas e Roteiros</span>) foram estruturadas através de <strong className="text-white">Dedução Analítica da IA</strong> a partir dos padrões de retenção da plataforma e do perfil de consumo do mercado.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of 10-20 Competitor Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition flex flex-col justify-between group"
          >
            <div>
              {/* Top row: Platform & Verified Badge */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px] uppercase">
                  {item.platform}
                </span>
                <span className="flex items-center space-x-1 text-emerald-400 text-[11px] font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Fonte Real Verificada</span>
                </span>
              </div>

              {/* Title & External Link */}
              <h3 className="font-semibold text-sm text-slate-100 group-hover:text-brand-300 transition line-clamp-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-start gap-1"
                >
                  <span>{item.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 text-brand-400 mt-1" />
                </a>
              </h3>

              {/* Channel & Meta */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                <span className="font-medium text-slate-300">{item.channelOrCreator}</span>
                {item.views && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Eye className="w-3 h-3 text-slate-500" />
                    {item.views}
                  </span>
                )}
                {item.publishedDate && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {item.publishedDate}
                  </span>
                )}
              </div>

              {/* Snippet / Observed Angle */}
              {item.detectedHookOrAngle && (
                <div className="mt-3 p-2 rounded bg-slate-900/90 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-medium block text-[10px] uppercase tracking-wider mb-0.5">
                    Ângulo / Gancho Observado:
                  </span>
                  <p className="text-slate-200 italic">"{item.detectedHookOrAngle}"</p>
                </div>
              )}
            </div>

            {/* Fact vs AI Inference footer */}
            <div className="mt-4 pt-3 border-t border-slate-900 space-y-2 text-xs">
              <div className="text-slate-400">
                <span className="text-emerald-400 font-medium">Fato:</span> {item.factSummary}
              </div>
              {item.aiInference && (
                <div className="p-2 rounded bg-brand-950/40 border border-brand-800/30 text-brand-200">
                  <span className="text-brand-400 font-medium">Dedução IA:</span> {item.aiInference}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
