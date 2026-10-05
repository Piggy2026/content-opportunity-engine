import { OpportunityEngineResult, ScriptVariation } from '../types/index.js';
import { UiLanguage } from '../i18n/translations.js';

export function generateMarkdownDossier(data: OpportunityEngineResult, uiLang: UiLanguage = 'pt'): string {
  const { request, competitors, outlierAnalysis, contentGaps, rankedIdeas, bestOpportunity, scripts, titles, hooks, ctas, sources } = data;

  const marketNames: Record<string, string> = {
    'pt-PT': 'Portugal (Português Europeu)',
    'pt-BR': 'Brasil (Português Brasileiro)',
    'es-ES': 'España (Español)',
    'en-GB': 'United Kingdom (British English)',
  };

  const isEn = uiLang === 'en';
  const isEs = uiLang === 'es';

  const labels = {
    reportTitle: isEn
      ? '# Strategic Report: Content Opportunity Engine'
      : isEs
      ? '# Informe Estratégico: Content Opportunity Engine'
      : '# Relatório Estratégico: Content Opportunity Engine',
    topic: isEn ? '**Niche / Topic:**' : isEs ? '**Nicho / Tema:**' : '**Nicho / Tópico:**',
    market: isEn ? '**Target Market:**' : isEs ? '**Mercado Objetivo:**' : '**Mercado Alvo:**',
    platform: isEn ? '**Platform:**' : isEs ? '**Plataforma:**' : '**Plataforma:**',
    date: isEn ? '**Analysis Date:**' : isEs ? '**Fecha del Análisis:**' : '**Data da Análise:**',
    cacheStatus: isEn ? '**Cache Status:**' : isEs ? '**Estado de Caché:**' : '**Estado da Cache:**',
    cached: isEn ? 'Loaded from Recent Cache' : isEs ? 'Cargado desde Caché Reciente' : 'Carregado de Cache Recente',
    live: isEn ? 'Live Real-Time Search' : isEs ? 'Búsqueda en Tiempo Real' : 'Pesquisa em Tempo Real',

    competitorsHeader: isEn
      ? `## 1. Competitor Research (${competitors.length} Verified Results)`
      : isEs
      ? `## 1. Investigación de Competidores (${competitors.length} Resultados Verificados)`
      : `## 1. Pesquisa de Concorrentes (${competitors.length} Resultados Verificados)`,
    competitorsNotice: isEn
      ? '*Note: All listed sources are authentic verified and indexed public URLs.*'
      : isEs
      ? '*Nota: Todas las fuentes listadas son URLs reales verificadas e indexadas.*'
      : '*Nota: Todas as fontes listadas são URLs reais verificadas e indexadas.*',
    channel: isEn ? 'Channel / Creator:' : isEs ? 'Canal / Creador:' : 'Canal / Criador:',
    views: isEn ? 'Views / Reach:' : isEs ? 'Visualizaciones / Alcance:' : 'Visualizações / Alcance:',
    observedHook: isEn ? 'Detected Angle / Hook:' : isEs ? 'Ángulo Detectado:' : 'Gancho / Ângulo Observado:',
    observedFact: isEn ? 'Observed Fact:' : isEs ? 'Hecho Observado:' : 'Fato Observado:',
    aiInference: isEn ? 'AI Strategic Inference:' : isEs ? 'Inferencia de IA:' : 'Dedução IA:',

    outliersHeader: isEn ? '## 2. Outlier Analysis' : isEs ? '## 2. Análisis de Outliers' : '## 2. Análise de Outliers',
    topFormat: isEn ? 'Dominant Outlier Format:' : isEs ? 'Formato Outlier Dominante:' : 'Formato Outlier Dominante:',
    observedFreq: isEn ? 'Observed Frequency:' : isEs ? 'Frecuencia Observada:' : 'Frequência Observada:',
    whyOutperforms: isEn ? 'Why it Outperforms:' : isEs ? 'Por qué Supera la Media:' : 'Por que Supera a Média:',
    hookPatternsHeader: isEn ? '### Most Effective Hook Patterns:' : isEs ? '### Patrones de Gancho Más Eficaces:' : '### Padrões de Gancho Mais Eficazes:',
    mechanics: isEn ? 'Mechanics:' : isEs ? 'Mecánica:' : 'Mecânica:',
    factsVsAi: isEn ? '### Observed Facts vs AI Deductions:' : isEs ? '### Hechos Observados vs Deducciones IA:' : '### Fatos vs Deduções da IA:',
    factsTitle: isEn ? '**Observed Facts:**' : isEs ? '**Hechos Observados:**' : '**Fatos Observados:**',
    aiTitle: isEn ? '**AI Deductions:**' : isEs ? '**Deducciones de IA:**' : '**Deduções da IA:**',

    gapsHeader: isEn ? '## 3. Content Gaps' : isEs ? '## 3. Brechas de Contenido (Content Gaps)' : '## 3. Lacunas de Conteúdo (Content Gaps)',
    gapPriority: isEn ? 'Priority:' : isEs ? 'Prioridad:' : 'Prioridade:',
    description: isEn ? 'Description:' : isEs ? 'Descripción:' : 'Descrição:',
    whyMissed: isEn ? 'Why Competitors Missed It:' : isEs ? 'Por qué Falló la Competencia:' : 'Por que Concorrentes Falharam:',
    marketNuance: isEn ? 'Local Market Nuance:' : isEs ? 'Matiz de Mercado Local:' : 'Nuance Local:',

    ideasHeader: isEn ? '## 4. Ranked Content Ideas' : isEs ? '## 4. Ideas de Contenido Clasificadas' : '## 4. Ideias de Conteúdo Ranqueadas',
    bestTag: isEn ? '⭐ [BEST OPPORTUNITY] ' : isEs ? '⭐ [MEJOR OPORTUNIDAD] ' : '⭐ [MELHOR OPORTUNIDADE] ',
    angle: isEn ? 'Angle:' : isEs ? 'Ángulo:' : 'Ângulo:',
    format: isEn ? 'Recommended Format:' : isEs ? 'Formato Recomendado:' : 'Formato Recomendado:',
    gapExploited: isEn ? 'Gap Exploited:' : isEs ? 'Brecha Explotada:' : 'Lacuna Explorada:',
    painPoint: isEn ? 'Audience Pain Point:' : isEs ? 'Dolor de la Audiencia:' : 'Dor do Público:',
    viralityComp: isEn ? 'Viral Potential:' : isEs ? 'Potencial Viral:' : 'Potencial Viral:',
    competition: isEn ? 'Competition:' : isEs ? 'Competencia:' : 'Concorrência:',
    whyWins: isEn ? 'Why it Wins:' : isEs ? 'Por qué Gana:' : 'Por Que Vence:',

    bestOpportunityHeader: isEn ? '## 5. Selected Best Opportunity' : isEs ? '## 5. Mejor Oportunidad Seleccionada' : '## 5. Melhor Oportunidade Selecionada',
    title: isEn ? 'Title:' : isEs ? 'Título:' : 'Título:',
    score: isEn ? 'Opportunity Score:' : isEs ? 'Puntuación de Oportunidad:' : 'Score de Oportunidade:',
    thesis: isEn ? 'Strategic Thesis:' : isEs ? 'Tesis Estratégica:' : 'Tese Estratégica:',

    scriptsHeader: isEn ? '## 6. Script Variations for Best Idea' : isEs ? '## 6. Variaciones de Guion para la Mejor Idea' : '## 6. Variações de Roteiro para a Melhor Ideia',
    estDuration: isEn ? 'Estimated Duration:' : isEs ? 'Duración Estimada:' : 'Duração Estimada:',
    words: isEn ? 'Target Word Count:' : isEs ? 'Recuento de Palabras:' : 'Contagem de Palavras:',
    premise: isEn ? 'Premise:' : isEs ? 'Premisa:' : 'Premissa:',
    scriptStructure: isEn ? '#### Script Structure:' : isEs ? '#### Estructura del Guion:' : '#### Estrutura do Roteiro:',
    spokenOnly: isEn ? '#### Spoken Text (Teleprompter Copy):' : isEs ? '#### Locución Continua (Teleprompter):' : '#### Fala Completa (Sem Cenas):',

    titlesHeader: isEn ? '## 7. High-CTR Titles' : isEs ? '## 7. Títulos de Alto Clic (CTR)' : '## 7. Títulos de Alto Clique (CTR)',
    hooksHeader: isEn ? '## 8. Critical First 3s Hooks' : isEs ? '## 8. Ganchos de Retención (Primeros 3 Segundos)' : '## 8. Ganchos dos Primeiros 3 Segundos',
    hookVisual: isEn ? 'Visual Hook:' : isEs ? 'Gancho Visual:' : 'Gancho Visual:',
    hookSpoken: isEn ? 'Spoken Hook:' : isEs ? 'Gancho Locutado:' : 'Gancho Falado:',
    hookOverlay: isEn ? 'On-Screen Text:' : isEs ? 'Texto en Pantalla:' : 'Texto na Tela:',

    ctasHeader: isEn ? '## 9. High-Conversion Calls to Action (CTAs)' : isEs ? '## 9. Llamadas a la Acción (CTAs)' : '## 9. Chamadas para Ação (CTAs Nativas)',
    ctaText: isEn ? 'Visual Text:' : isEs ? 'Texto en Pantalla:' : 'Texto na Tela:',
    ctaBestPractice: isEn ? 'Platform Best Practice:' : isEs ? 'Mejor Práctica:' : 'Boa Prática:',

    sourcesHeader: isEn ? '## 10. Sources & Research Provenance' : isEs ? '## 10. Fuentes y Proveniencia de la Investigación' : '## 10. Links e Citações de Origem',
    channelLabel: isEn ? 'Channel:' : isEs ? 'Canal:' : 'Canal:',
  };

  const md = `${labels.reportTitle}
${labels.topic} ${request.topic}
${labels.market} ${marketNames[request.market] || request.market}
${labels.platform} ${request.platform.toUpperCase()}
${labels.date} ${new Date(data.createdAt).toLocaleString()}
${labels.cacheStatus} ${data.cached ? labels.cached : labels.live}

---

${labels.competitorsHeader}
${labels.competitorsNotice}

${competitors
  .map(
    (c, i) => `### ${i + 1}. [${c.title}](${c.url})
- **${labels.channel}** ${c.channelOrCreator}
- **${labels.views}** ${c.views || 'N/D'}
- **${labels.observedHook}** ${c.detectedHookOrAngle || 'N/D'}
- **${labels.observedFact}** ${c.factSummary}
- **${labels.aiInference}** ${c.aiInference || 'N/D'}
`
  )
  .join('\n')}

---

${labels.outliersHeader}
- **${labels.topFormat}** ${outlierAnalysis.topFormatOutlier.format}
- **${labels.observedFreq}** ${outlierAnalysis.topFormatOutlier.frequencyObserved}
- **${labels.whyOutperforms}** ${outlierAnalysis.topFormatOutlier.whyItOutperforms}

${labels.hookPatternsHeader}
${outlierAnalysis.dominantHookPatterns
  .map(
    (h) => `- **${h.pattern}:** ${h.example}
  *${labels.mechanics}* ${h.whyItWorks}`
  )
  .join('\n')}

${labels.factsVsAi}
${labels.factsTitle}
${outlierAnalysis.observedFacts.map((f) => `- ${f}`).join('\n')}

${labels.aiTitle}
${outlierAnalysis.aiDeductions.map((d) => `- ${d}`).join('\n')}

---

${labels.gapsHeader}
${contentGaps
  .map(
    (g, i) => `### #${i + 1}: ${g.title} [${labels.gapPriority} ${g.opportunityLevel.toUpperCase()}]
- **${labels.description}** ${g.description}
- **${labels.whyMissed}** ${g.whyCompetitorsMissedIt}
- **${labels.marketNuance}** ${g.marketNuance}
`
  )
  .join('\n')}

---

${labels.ideasHeader}
${rankedIdeas
  .map(
    (idea) => `### #${idea.rank} ${idea.isBestOpportunity ? labels.bestTag : ''}${idea.title} (Score: ${idea.opportunityScore}/100)
- **${labels.angle}** ${idea.angle}
- **${labels.format}** ${idea.format}
- **${labels.gapExploited}** ${idea.gapExploited}
- **${labels.painPoint}** ${idea.targetAudiencePainPoint}
- **${labels.viralityComp}** ${idea.viralityPotential} | **${labels.competition}** ${idea.competitionLevel}
- **${labels.whyWins}** ${idea.whyItWins}
`
  )
  .join('\n')}

---

${labels.bestOpportunityHeader}
- **${labels.title}** ${bestOpportunity.title}
- **${labels.score}** ${bestOpportunity.opportunityScore}/100
- **${labels.thesis}** ${bestOpportunity.whyItWins}

---

${labels.scriptsHeader}
${scripts
  .map(
    (s) => `### ${s.styleName} (${s.badge})
*${labels.estDuration} ${s.estimatedDuration} | ${labels.words} ~${s.targetWordCount}*
*${labels.premise}* ${s.tagline}

${labels.scriptStructure}
${s.sections
  .map(
    (sec) => `**[${sec.timestamp}] - ${sec.stage}**
- ${sec.visualCue}
${sec.audioToneCue ? `- ${sec.audioToneCue}\n` : ''}> "${sec.spokenText}"
`
  )
  .join('\n')}

${labels.spokenOnly}
\`\`\`text
${s.fullSpokenText}
\`\`\`
`
  )
  .join('\n---\n')}

---

${labels.titlesHeader}
${titles.map((t, i) => `${i + 1}. **[${t.type}]** ${t.title} (CTR Score: ${t.score})`).join('\n')}

---

${labels.hooksHeader}
${hooks
  .map(
    (h, i) => `### #${i + 1} (${h.type})
- **${labels.hookVisual}** ${h.visualHook}
- **${labels.hookSpoken}** "${h.spokenHook}"
- **${labels.hookOverlay}** [${h.overlayText}]
`
  )
  .join('\n')}

---

${labels.ctasHeader}
${ctas
  .map(
    (c) => `- **${c.goal}:** "${c.spokenCta}"
  *${labels.ctaText}* ${c.onScreenText}
  *${labels.ctaBestPractice}* ${c.platformBestPractice}`
  )
  .join('\n')}

---

${labels.sourcesHeader}
${sources.map((s, i) => `${i + 1}. [${s.title}](${s.url}) - ${labels.channelLabel} ${s.channelOrHost} (${s.platform}) [${s.verificationStatus}]`).join('\n')}
`;

  return md;
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.warn('Falha ao copiar:', err);
    return false;
  }
}
