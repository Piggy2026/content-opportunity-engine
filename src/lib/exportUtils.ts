import { OpportunityEngineResult, ScriptVariation } from '../types/index.js';

export function generateMarkdownDossier(data: OpportunityEngineResult): string {
  const { request, competitors, outlierAnalysis, contentGaps, rankedIdeas, bestOpportunity, scripts, titles, hooks, ctas, sources } = data;

  const marketNames: Record<string, string> = {
    'pt-PT': 'Portugal (Português Europeu)',
    'pt-BR': 'Brasil (Português Brasileiro)',
    'es-ES': 'España (Español)',
  };

  const md = `# Relatório Estratégico: Content Opportunity Engine
**Nicho / Tópico:** ${request.topic}
**Mercado Alvo:** ${marketNames[request.market] || request.market}
**Plataforma:** ${request.platform.toUpperCase()}
**Data da Análise:** ${new Date(data.createdAt).toLocaleString()}
**Estado da Cache:** ${data.cached ? 'Carregado de Cache Recente' : 'Pesquisa em Tempo Real'}

---

## 1. Pesquisa de Concorrentes (${competitors.length} Resultados Verificados)
*Nota: Todas as fontes listadas são URLs reais verificadas e indexadas.*

${competitors
  .map(
    (c, i) => `### ${i + 1}. [${c.title}](${c.url})
- **Canal / Criador:** ${c.channelOrCreator}
- **Visualizações / Alcance:** ${c.views || 'N/D'}
- **Gancho / Ângulo Observado:** ${c.detectedHookOrAngle || 'N/D'}
- **Fato Observado:** ${c.factSummary}
- **Dedução IA:** ${c.aiInference || 'N/D'}
`
  )
  .join('\n')}

---

## 2. Análise de Outliers
- **Formato Outlier Dominante:** ${outlierAnalysis.topFormatOutlier.format}
- **Frequência Observada:** ${outlierAnalysis.topFormatOutlier.frequencyObserved}
- **Por que Supera a Média:** ${outlierAnalysis.topFormatOutlier.whyItOutperforms}

### Padrões de Gancho Mais Eficazes:
${outlierAnalysis.dominantHookPatterns
  .map(
    (h) => `- **${h.pattern}:** ${h.example}
  *Mecânica:* ${h.whyItWorks}`
  )
  .join('\n')}

### Fatos vs Deduções da IA:
**Fatos Observados:**
${outlierAnalysis.observedFacts.map((f) => `- ${f}`).join('\n')}

**Deduções da IA:**
${outlierAnalysis.aiDeductions.map((d) => `- ${d}`).join('\n')}

---

## 3. Lacunas de Conteúdo (Content Gaps)
${contentGaps
  .map(
    (g, i) => `### Lacuna #${i + 1}: ${g.title} [Prioridade: ${g.opportunityLevel.toUpperCase()}]
- **Descrição:** ${g.description}
- **Por que Concorrentes Falharam:** ${g.whyCompetitorsMissedIt}
- **Nuance Local (${request.market}):** ${g.marketNuance}
`
  )
  .join('\n')}

---

## 4. Ideias de Conteúdo Ranqueadas (15–20 Ideias)
${rankedIdeas
  .map(
    (idea) => `### #${idea.rank} ${idea.isBestOpportunity ? '⭐ [MELHOR OPORTUNIDADE] ' : ''}${idea.title} (Score: ${idea.opportunityScore}/100)
- **Ângulo:** ${idea.angle}
- **Formato Recomendado:** ${idea.format}
- **Lacuna Explorada:** ${idea.gapExploited}
- **Dor do Público:** ${idea.targetAudiencePainPoint}
- **Potencial Viral:** ${idea.viralityPotential} | **Concorrência:** ${idea.competitionLevel}
- **Por Que Vence:** ${idea.whyItWins}
`
  )
  .join('\n')}

---

## 5. Melhor Oportunidade Selecionada
**Título:** ${bestOpportunity.title}
**Score de Oportunidade:** ${bestOpportunity.opportunityScore}/100
**Tese Estratégica:** ${bestOpportunity.whyItWins}

---

## 6. Variações de Roteiro para a Melhor Ideia
${scripts
  .map(
    (s, i) => `### ${s.styleName} (${s.badge})
*Duração Estimada: ${s.estimatedDuration} | Contagem de Palavras: ~${s.targetWordCount}*
*Premissa:* ${s.tagline}

#### Estrutura do Roteiro:
${s.sections
  .map(
    (sec) => `**[${sec.timestamp}] - ${sec.stage}**
- ${sec.visualCue}
${sec.audioToneCue ? `- ${sec.audioToneCue}\n` : ''}> "${sec.spokenText}"
`
  )
  .join('\n')}

#### Fala Completa (Sem Cenas):
\`\`\`text
${s.fullSpokenText}
\`\`\`
`
  )
  .join('\n---\n')}

---

## 7. Títulos de Alto Clique (CTR)
${titles.map((t, i) => `${i + 1}. **[${t.type}]** ${t.title} (CTR Score: ${t.score})`).join('\n')}

---

## 8. Ganchos dos Primeiros 3 Segundos
${hooks
  .map(
    (h, i) => `### Gancho #${i + 1} (${h.type})
- **Gancho Visual:** ${h.visualHook}
- **Gancho Falado:** "${h.spokenHook}"
- **Texto na Tela:** [${h.overlayText}]
`
  )
  .join('\n')}

---

## 9. Chamadas para Ação (CTAs Nativas)
${ctas
  .map(
    (c) => `- **${c.goal}:** "${c.spokenCta}"
  *Texto na Tela:* ${c.onScreenText}
  *Boa Prática:* ${c.platformBestPractice}`
  )
  .join('\n')}

---

## 10. Links e Citações de Origem
${sources.map((s, i) => `${i + 1}. [${s.title}](${s.url}) - Canal: ${s.channelOrHost} (${s.platform}) [${s.verificationStatus}]`).join('\n')}
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
