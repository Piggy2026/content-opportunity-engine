import { ContentGap, ResearchRequest, CompetitorResult } from '../../src/types/index.js';

export function detectContentGaps(req: ResearchRequest, competitors: CompetitorResult[]): ContentGap[] {
  const { topic, market, platform } = req;
  const gaps: ContentGap[] = [];

  // Gap 1: Saturated vs Unanswered Nuance
  if (market === 'pt-PT') {
    gaps.push({
      id: 'gap-pt-1',
      category: 'underserved-market-need',
      title: 'Realidade Fiscal e Bancária Portuguesa vs Dicas Genéricas Importadas',
      description: `Muitos vídeos sobre ${topic} copiam formatos do Brasil ou dos EUA, esquecendo taxas da banca portuguesa, comissões de manutenção, regras do Banco de Portugal e retenção de IRS.`,
      whyCompetitorsMissedIt: 'Os criadores copiam guiões virais internacionais sem adaptar à legislação nacional e custos de vida em Portugal.',
      marketNuance: 'Portugal (pt-PT): Os utilizadores valorizam especificidade em euros, declaração de IRS, impacto das taxas Euribor e bancos locais (ActivoBank, CGD, Millennium, Moey).',
      opportunityLevel: 'critical',
    });
    gaps.push({
      id: 'gap-pt-2',
      category: 'unanswered-question',
      title: 'O Que Fazer no Primeiro Mês com Orçamento Realista em Portugal',
      description: `Com o salário mediano em Portugal a rondar os 1.100€ - 1.400€, vídeos a sugerir investimentos ou custos de 1.000€ mensais geram desconexão total. Falta o guia de passos com 50€ a 150€ por mês.`,
      whyCompetitorsMissedIt: 'Foco excessivo em números grandiosos para gerar thumbnail sensacionalista que afasta o público comum.',
      marketNuance: 'Portugal: Abordagem sóbria, sem falsas promessas de riqueza imediata, adaptada ao poder de compra médio português.',
      opportunityLevel: 'very-high',
    });
    gaps.push({
      id: 'gap-pt-3',
      category: 'oversaturated-angle',
      title: 'Chega de Teorias Básicas de Dicionário: Queremos Telas e Processos Reais',
      description: `Mais de 70% dos vídeos concorrentes explicam conceitos teóricos repetidos ("o que é X"). O público já sabe o que é; quer ver o ecrã, onde clicar, que documento preencher e que botão evitar.`,
      whyCompetitorsMissedIt: 'É mais fácil e rápido gravar uma pessoa a falar em estúdio do que fazer uma demonstração prática e transparente de ecrã.',
      marketNuance: 'Portugal: Alta procura por tutoriais práticos "screen-recording" sem rodeios nem música dramática de fundo.',
      opportunityLevel: 'high',
    });
    gaps.push({
      id: 'gap-pt-4',
      category: 'weak-competitor-execution',
      title: 'Ausência de Formatos Verticais Rápidos (Shorts/Reels) com Valor Prático Imediato',
      description: `Os concorrentes em Portugal ainda produzem vídeos longos lentos ou Shorts apenas com cortes de podcast. Falta o criador que entrega uma dica acionável de 45 segundos gravada especificamente para vertical.`,
      whyCompetitorsMissedIt: 'Cultura de reciclagem preguiçosa de podcasts em vez de criação nativa para algoritmos verticais.',
      marketNuance: 'Portugal: Algoritmo favorece criadores que falam português europeu com legendas limpas e ritmo moderno.',
      opportunityLevel: 'very-high',
    });
  } else if (market === 'pt-BR') {
    gaps.push({
      id: 'gap-br-1',
      category: 'underserved-market-need',
      title: 'Sobrevivência à Volatilidade Real e Inflação do Dia a Dia Brasileiro',
      description: `A maioria dos vídeos de ${topic} ignora a realidade de quem tem renda instável (freelancers, MEI, CLT com hora extra) e foca em cenários perfeitos de poupança linear.`,
      whyCompetitorsMissedIt: 'Fórmulas prontas de livros americanos traduzidos que não contemplam a realidade da economia brasileira e juros reais.',
      marketNuance: 'Brasil (pt-BR): Foco em reserva de emergência com liquidez diária, Pix, IOF, Selic real e proteção contra perda do poder de compra no mercado.',
      opportunityLevel: 'critical',
    });
    gaps.push({
      id: 'gap-br-2',
      category: 'oversaturated-angle',
      title: 'Saturação de "Fique Rico com Essa Moeda/Ação/Ferramenta Milagrosa"',
      description: `O público brasileiro está com fadiga extrema de promessas de enriquecimento rápido e cliques fáceis. Há uma busca crescente por criadores 'anti-guru' que falem a verdade sem pose de ostentação.`,
      whyCompetitorsMissedIt: 'Clickbait agressivo gera visualização inicial no YouTube/TikTok, mas destrói a retenção e fidelidade a médio prazo.',
      marketNuance: 'Brasil: Estilo autêntico, pé no chão, conversando de igual para igual sem carrões ou mansões alugadas no fundo.',
      opportunityLevel: 'very-high',
    });
    gaps.push({
      id: 'gap-br-3',
      category: 'unanswered-question',
      title: 'Como Implementar na Prática com Menos de 1 Hora por Semana',
      description: `A rotina de transporte público e jornada dupla do trabalhador brasileiro impede métodos complexos. Falta conteúdo focado em automação e rotinas mínimas viáveis de 15 minutos.`,
      whyCompetitorsMissedIt: 'Criadores produzem para outros criadores sem considerar o tempo escasso do público comum.',
      marketNuance: 'Brasil: Roteiros diretos ao ponto, com linguagem coloquial e foco em rapidez operacional.',
      opportunityLevel: 'high',
    });
    gaps.push({
      id: 'gap-br-4',
      category: 'weak-competitor-execution',
      title: 'Falta de Roteiros com Ganchos de Quebra de Padrão Baseados em Histórias Reais',
      description: `Concorrentes abrem os vídeos com introduções longas ("Olá pessoal, hoje eu vou..."). O público pula nos primeiros 3 segundos se não houver um gancho visual e verbal impactante.`,
      whyCompetitorsMissedIt: 'Falta de domínio de copywriting para vídeo curto e estruturas modernas de retenção.',
      marketNuance: 'Brasil: O gancho precisa de ritmo acelerado, corte de respiro e legenda dinâmica sincronizada.',
      opportunityLevel: 'very-high',
    });
  } else {
    // es-ES
    gaps.push({
      id: 'gap-es-1',
      category: 'underserved-market-need',
      title: 'Complejidad Regulatoria y Fiscal en España Explicada Sin Jerga Legal',
      description: `El contenido sobre ${topic} en España suele ser o bien un texto legal incomprensible de gestoría o bien un vídeo superficial sin base normativa real (Hacienda, IRPF, cuotas, deducciones).`,
      whyCompetitorsMissedIt: 'Pocos creadores se toman el tiempo de traducir la normativa del BOE o consultas vinculantes de la DGT a un lenguaje fresco y visual.',
      marketNuance: 'España (es-ES): Alto interés por consejos fiscalmente blindados, deducciones autonómicas y seguridad jurídica.',
      opportunityLevel: 'critical',
    });
    gaps.push({
      id: 'gap-es-2',
      category: 'oversaturated-angle',
      title: 'Quejas Vacías Sin Soluciones Ejecutables',
      description: `Muchos canales españoles se limitan a lamentar la situación económica o las subidas impositivas sin ofrecer un protocolo exacto de optimización para el ciudadano de a pie.`,
      whyCompetitorsMissedIt: 'La indignación fácil genera comentarios polarizados, pero el espectador que busca avanzar se marcha frustrado.',
      marketNuance: 'España: El público valora el pragmatismo, plantillas descargables y comparativas directas.',
      opportunityLevel: 'very-high',
    });
    gaps.push({
      id: 'gap-es-3',
      category: 'unanswered-question',
      title: 'Cómo Conciliar ${topic} con un Trabajo por Cuenta Ajena',
      description: `Existe un vacío notable sobre cómo compaginar ${topic} manteniendo un contrato laboral estándar en España sin incurrir en incompatibilidades o duplicidad de costes sociales.`,
      whyCompetitorsMissedIt: 'Casi todo el contenido asume que el espectador es 100% autónomo o 100% asalariado.',
      marketNuance: 'España: Pluriactividad, bonificaciones de cuota y deducción de gastos compartidos en el hogar.',
      opportunityLevel: 'high',
    });
    gaps.push({
      id: 'gap-es-4',
      category: 'weak-competitor-execution',
      title: 'Falta de Formatos Breves y Visuales con Datos de Pantalla',
      description: `En España predomina el vídeo largo de charla o entrevista. Hay un hueco enorme para creadores que sinteticen la clave en 45 segundos con gráficos dinámicos y llamada a la acción clara.`,
      whyCompetitorsMissedIt: 'Los creadores hispanohablantes tradicionales siguen anclados al formato de tertulia larga.',
      marketNuance: 'España: Dinamismo europeo, tono directo, ironía sutil y llamada a guardar el reel.',
      opportunityLevel: 'very-high',
    });
  }

  return gaps;
}
