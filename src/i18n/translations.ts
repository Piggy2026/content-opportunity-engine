export type UiLanguage = 'pt' | 'es' | 'en';

export interface TranslationDictionary {
  meta: {
    langName: string;
    langFlag: string;
    archBadge: {
      uiLabel: string;
      marketLabel: string;
      outputLabel: string;
      summaryText: (ui: string, market: string, output: string) => string;
    };
  };
  header: {
    title: string;
    engineWord: string;
    mvpBadge: string;
    tagline: string;
    supportedMarkets: string;
    platforms: string;
    projectsBtn: string;
    apiBtn: string;
    newResearchBtn: string;
    uiLangLabel: string;
  };
  workflow: {
    input: string;
    competitors: string;
    outliers: string;
    gaps: string;
    ideas: string;
    bestOpportunity: string;
    scripts: string;
    hooks: string;
    sources: string;
  };
  researchForm: {
    badge: string;
    title: string;
    subtitle: string;
    archClarification: {
      title: string;
      body: string;
    };
    quickPresets: string;
    topicLabel: string;
    topicPlaceholder: string;
    marketLabel: string;
    marketHelp: string;
    platformLabel: string;
    platformHelp: string;
    advancedToggle: string;
    audienceLabel: string;
    audienceLevels: {
      all: string;
      beginner: string;
      intermediate: string;
      advanced: string;
    };
    seedCompetitorsLabel: string;
    seedCompetitorsPlaceholder: string;
    submitBtnIdle: string;
    submitBtnLoading: string;
    footerNotice: string;
    markets: Record<
      'pt-PT' | 'pt-BR' | 'es-ES' | 'en-GB',
      {
        name: string;
        language: string;
        outputLanguageName: string;
        description: string;
      }
    >;
    platforms: Record<
      'youtube' | 'youtube-shorts' | 'tiktok' | 'instagram-reels',
      {
        format: string;
        recommendedLength: string;
        description: string;
      }
    >;
  };
  statusBar: {
    analysisComplete: string;
    nicheLabel: string;
    uiLanguageLabel: string;
    marketLabel: string;
    outputLanguageLabel: string;
    provenance: {
      cache: string;
      googleGrounding: string;
      webSearch: string;
      curated: string;
      aiDeduction: string;
    };
    exportBtn: string;
    zeroFabricationAlertTitle: string;
    zeroFabricationAlertText: (market: string, outputLang: string, uiLang: string) => string;
  };
  competitors: {
    step: string;
    title: string;
    verifiedBadge: (count: number) => string;
    zeroBadge: string;
    subtitle: string;
    searchPlaceholder: string;
    integrityTitle: string;
    integrityText: string;
    factsBadge: string;
    aiBadge: string;
    cardChannel: string;
    cardFact: string;
    cardAi: string;
    cardAngle: string;
    cardOpenSource: string;
    zeroCard: {
      title: string;
      body: (topic: string) => string;
      safeguardTitle: string;
      safeguardBody: string;
    };
  };
  outliers: {
    step: string;
    title: string;
    subtitle: string;
    formatCalloutTitle: string;
    formatFrequency: string;
    hooksTitle: string;
    patternLabel: (n: number) => string;
    whyItWorks: string;
    velocityTitle: string;
    triggersTitle: string;
    observedFactsTitle: string;
    aiDeductionsTitle: string;
  };
  gaps: {
    step: string;
    title: string;
    subtitle: string;
    categories: {
      underserved: string;
      oversaturated: string;
      unanswered: string;
      weakExecution: string;
    };
    priorities: {
      critical: string;
      veryHigh: string;
      high: string;
    };
    whyCompetitorsMissed: string;
    marketNuance: string;
  };
  ideas: {
    step: string;
    title: (count: number) => string;
    scoreBadge: string;
    subtitle: string;
    filterViralityLabel: string;
    filterAll: string;
    filterViralityLevels: {
      all: string;
      Exceptional: string;
      VeryHigh: string;
      High: string;
    };
    bestOpportunityTag: string;
    angleLabel: string;
    gapLabel: string;
    painPointLabel: string;
    formatLabel: string;
    viralityLabel: string;
    competitionLabel: string;
    whyItWinsLabel: string;
    opportunityScoreLabel: string;
    generatingScripts: string;
    selectScriptBtn: string;
  };
  bestOpportunity: {
    badge: string;
    thesisLabel: string;
    formatLabel: string;
    viralityLabel: string;
    competitionLabel: string;
    scoreLabel: string;
    viewScriptsBtn: string;
  };
  scripts: {
    step: string;
    title: string;
    badge: string;
    subtitle: string;
    durationLabel: string;
    wordsLabel: string;
    copyTechnicalBtn: string;
    copyTeleprompterBtn: string;
    downloadTxtBtn: string;
    copied: string;
    sceneLabel: string;
    audioLabel: string;
    spokenLabel: string;
    txtHeaderIdea: string;
    txtHeaderStyle: string;
    txtHeaderDuration: string;
    txtHeaderWords: string;
    txtSectionTechnical: string;
    txtSectionTeleprompter: string;
  };
  titlesHooksCta: {
    step: string;
    title: string;
    subtitle: string;
    titlesHeading: string;
    ctrScoreLabel: string;
    copyTitleTooltip: string;
    hooksHeading: string;
    visualLabel: string;
    spokenLabel: string;
    overlayLabel: string;
    copyHookTooltip: string;
    ctaHeading: string;
    ctaSpokenLabel: string;
    ctaVisualLabel: string;
    ctaBestPracticeLabel: string;
    copyCtaTooltip: string;
  };
  sources: {
    step: string;
    title: string;
    verifiedBadge: (count: number) => string;
    subtitle: string;
    verifiedTag: string;
    channelHostLabel: string;
    platformLabel: string;
    openLinkTooltip: string;
    zeroSourcesTitle: string;
    zeroSourcesBody: string;
  };
  exportModal: {
    title: string;
    subtitle: string;
    markdownCard: {
      title: string;
      desc: string;
      copyBtn: string;
      copied: string;
      downloadBtn: string;
    };
    jsonCard: {
      title: string;
      desc: string;
      copyBtn: string;
      copied: string;
      downloadBtn: string;
    };
    closeBtn: string;
  };
  settingsModal: {
    title: string;
    serverStatusLabel: string;
    serverActive: string;
    serverEnvKeyLabel: string;
    serverEnvConfigured: string;
    serverEnvNotDetected: string;
    inputKeyLabel: string;
    inputKeyHelp: string;
    aiStudioLink: string;
    saveBtn: string;
    cancelBtn: string;
  };
  savedProjectsModal: {
    title: string;
    loading: string;
    emptyTitle: string;
    emptySubtitle: string;
    bestIdeaLabel: string;
    dateLabel: string;
    confirmDelete: string;
    deleteTooltip: string;
  };
  footer: {
    tagline: string;
    supportedMarkets: string;
    backToTop: string;
  };
}

export const translations: Record<UiLanguage, TranslationDictionary> = {
  pt: {
    meta: {
      langName: 'Português',
      langFlag: '🇵🇹',
      archBadge: {
        uiLabel: 'Interface',
        marketLabel: 'Mercado',
        outputLabel: 'Saída',
        summaryText: (ui, market, output) =>
          `Interface: ${ui} • Mercado Alvo: ${market} • Saída de Roteiros: ${output}`,
      },
    },
    header: {
      title: 'Content Opportunity',
      engineWord: 'Engine',
      mvpBadge: 'MVP',
      tagline: 'Pesquisa Real • Outliers • Gaps • 20 Ideias • 3 Roteiros',
      supportedMarkets: 'Mercados: 🇵🇹 PT • 🇧🇷 BR • 🇪🇸 ES • 🇬🇧 UK',
      platforms: 'YouTube • Shorts • TikTok • Reels',
      projectsBtn: 'Projetos',
      apiBtn: 'API',
      newResearchBtn: 'Nova Pesquisa',
      uiLangLabel: 'Idioma da Interface',
    },
    workflow: {
      input: 'Entrada / Nicho',
      competitors: '10–20 Concorrentes',
      outliers: 'Outliers',
      gaps: 'Gaps de Conteúdo',
      ideas: '20 Ideias Ranqueadas',
      bestOpportunity: 'Melhor Oportunidade',
      scripts: '3 Variações Roteiro',
      hooks: 'Títulos / Ganchos / CTA',
      sources: 'Fontes Reais',
    },
    researchForm: {
      badge: 'Pesquisa Baseada em Dados Reais',
      title: 'Descubra o que já está a funcionar e transforme gaps em roteiros de alta retenção.',
      subtitle:
        'Insira o seu tópico ou nicho. O motor pesquisa criadores reais no mercado selecionado, analisa outliers, deteta o que a concorrência não respondeu e gera 20 oportunidades com 3 roteiros completos.',
      archClarification: {
        title: 'Arquitetura de Idiomas Desacoplada',
        body: 'O Mercado Alvo define onde a pesquisa é realizada e o idioma do conteúdo gerado (roteiros, ganchos e títulos no idioma nativo do mercado). O seletor no topo altera apenas os textos da interface.',
      },
      quickPresets: 'Exemplos rápidos:',
      topicLabel: 'Tópico, Palavra-Chave ou Nicho de Conteúdo',
      topicPlaceholder: 'Ex: Como investir em ETFs em Portugal sem comissões escondidas',
      marketLabel: 'Mercado Alvo & Saída do Conteúdo',
      marketHelp: 'Define o mercado pesquisado e o idioma gerado',
      platformLabel: 'Plataforma Principal',
      platformHelp: 'Ajusta ritmo e ganchos',
      advancedToggle: 'Opções avançadas (Canais de referência, nível do público)',
      audienceLabel: 'Nível de Conhecimento do Público',
      audienceLevels: {
        all: 'Todos os Níveis',
        beginner: 'Iniciantes / Leigos',
        intermediate: 'Intermédio',
        advanced: 'Avançado / Profissional',
      },
      seedCompetitorsLabel: 'Canais Concorrentes de Referência ou URLs Específicas (Opcional)',
      seedCompetitorsPlaceholder:
        'Insira um canal ou link por linha. Ex:\nhttps://www.youtube.com/@RicoDinheiro\n@prigorico\nCanal Autonomos España',
      submitBtnIdle: 'Executar Motor de Oportunidades de Conteúdo',
      submitBtnLoading: 'Pesquisando Concorrentes & Analisando Gaps...',
      footerNotice: 'Pesquisa real na web e plataformas sem alucinação de dados • Cache inteligente de 24h',
      markets: {
        'pt-PT': {
          name: 'Portugal',
          language: 'Português Europeu',
          outputLanguageName: 'Português Europeu (pt-PT)',
          description: 'Gramática portuguesa (ecrã, telemóvel, faturas), IRS, banca local e taxas Euribor.',
        },
        'pt-BR': {
          name: 'Brasil',
          language: 'Português Brasileiro',
          outputLanguageName: 'Português Brasileiro (pt-BR)',
          description: 'Comunicação dinâmica (celular, tela, grana), Selic, Pix, juros reais e classe média.',
        },
        'es-ES': {
          name: 'España',
          language: 'Español Peninsular',
          outputLanguageName: 'Espanhol Peninsular (es-ES)',
          description: 'Castellano (móvil, Hacienda, autónomos, IRPF), deducciones y marco legal comunitario.',
        },
        'en-GB': {
          name: 'United Kingdom',
          language: 'British English',
          outputLanguageName: 'Inglês Britânico (en-GB)',
          description: 'Natural British English (mobile, flat, holiday, CV), HMRC, ISA, NI, VAT e custo de vida britânico.',
        },
      },
      platforms: {
        youtube: {
          format: 'Long-form (10–18 min)',
          recommendedLength: '12-16 min',
          description: 'Vídeos aprofundados com demonstração de tela, alta retenção de meio de vídeo e autoridade.',
        },
        'youtube-shorts': {
          format: 'Vertical (9:16, 30–60s)',
          recommendedLength: '45 seg',
          description: 'Ritmo acelerado, gancho nos primeiros 2 segundos, legendas dinâmicas e loop final.',
        },
        tiktok: {
          format: 'Vertical (9:16, 35–50s)',
          recommendedLength: '40 seg',
          description: 'Estilo autêntico lo-fi, quebra de padrão, gatilhos de debate e chamada para favoritos.',
        },
        'instagram-reels': {
          format: 'Vertical (9:16, 40–55s)',
          recommendedLength: '45 seg',
          description: 'Alta estética, salvamento para consulta posterior e automação de palavras-chave no direct.',
        },
      },
    },
    statusBar: {
      analysisComplete: 'Análise Concluída',
      nicheLabel: 'Nicho:',
      uiLanguageLabel: 'Interface:',
      marketLabel: 'Mercado Alvo:',
      outputLanguageLabel: 'Saída de Conteúdo:',
      provenance: {
        cache: '⚡ Carregado de Cache (24h)',
        googleGrounding: '🌐 Google Grounding em Tempo Real',
        webSearch: '🌐 Pesquisa Web em Tempo Real',
        curated: '📚 Base Curada (Correspondência Direta)',
        aiDeduction: '⚠️ Dedução Analítica IA (Sem concorrência direta)',
      },
      exportBtn: 'Exportar Relatório',
      zeroFabricationAlertTitle: 'Aviso de Proveniência & Zero Fabricação:',
      zeroFabricationAlertText: (market, outputLang, uiLang) =>
        `Não foram encontrados vídeos concorrentes diretos ativos em fontes públicas abertas para este termo. Para cumprir estritamente o princípio de zero fabricação, nenhum canal substituto ou estatística inventada foi apresentado. A análise (lacunas, 20 ideias e roteiros) baseia-se em dedução estratégica da IA para o mercado selecionado (${market}), gerada em ${outputLang}, enquanto a interface é apresentada em ${uiLang}.`,
    },
    competitors: {
      step: '2',
      title: 'Pesquisa de Concorrentes & Conteúdos Ativos',
      verifiedBadge: (count) => `${count} Resultados Verificados`,
      zeroBadge: '0 Concorrentes Diretos Indexados',
      subtitle:
        'Fontes reais indexadas na web e plataformas. Cada item possui URL autêntica com distinção estrita entre fatos observados e dedução analítica da IA.',
      searchPlaceholder: 'Filtrar concorrentes...',
      integrityTitle: 'Princípio de Integridade:',
      integrityText:
        'Nenhum dado, concorrente ou link foi inventado. As tags com fundo escuro representam fatos concretos e as caixas lilás indicam inferência analítica da IA.',
      factsBadge: 'Fatos Observados',
      aiBadge: 'Inferência IA',
      cardChannel: 'Canal/Criador:',
      cardFact: 'Fato Observado:',
      cardAi: 'Inferência da IA:',
      cardAngle: 'Ângulo Detetado:',
      cardOpenSource: 'Abrir link original',
      zeroCard: {
        title: 'Pesquisa Pública Direta Indisponível para este Termo',
        body: (topic) =>
          `A pesquisa aberta em tempo real não localizou vídeos concorrentes diretos ativos ou canais indexados publicamente para o termo "${topic}" na plataforma selecionada.`,
        safeguardTitle: 'Salvaguarda de Zero Fabricação',
        safeguardBody:
          'Para manter integridade estrita, nenhum canal de outro nicho foi substituído e nenhuma estatística foi inventada para preencher a tela.',
      },
    },
    outliers: {
      step: '3',
      title: 'Análise de Outliers & Padrões Vencedores',
      subtitle: 'O que faz determinados conteúdos superarem a média de visualizações e retenção do nicho.',
      formatCalloutTitle: 'Formato Outlier Mais Eficaz no Mercado',
      formatFrequency: 'Frequência no Top:',
      hooksTitle: 'Padrões de Gancho (Primeiros 3 a 5 Segundos)',
      patternLabel: (n) => `Padrão #${n}`,
      whyItWorks: 'Por que funciona:',
      velocityTitle: 'Tópicos com Maior Velocidade de Busca',
      triggersTitle: 'Gatilhos Psicológicos de Conversão',
      observedFactsTitle: 'Fatos Observados (Dados Verificáveis)',
      aiDeductionsTitle: 'Deduções & Hipóteses da IA (Análise Preditiva)',
    },
    gaps: {
      step: '4',
      title: 'Deteção de Lacunas de Conteúdo (Content Gaps)',
      subtitle: 'O que os concorrentes repetem em excesso vs o que o público procura e não encontra.',
      categories: {
        underserved: 'Necessidade Local Desatendida',
        oversaturated: 'Ângulo Saturado a Evitar',
        unanswered: 'Dúvida Sem Resposta Prática',
        weakExecution: 'Execução Fraca dos Concorrentes',
      },
      priorities: {
        critical: 'Oportunidade Crítica',
        veryHigh: 'Oportunidade Muito Alta',
        high: 'Oportunidade Alta',
      },
      whyCompetitorsMissed: 'Por que a concorrência falhou:',
      marketNuance: 'Nuance de mercado:',
    },
    ideas: {
      step: '5',
      title: (count) => `${count} Ideias de Conteúdo Ranqueadas`,
      scoreBadge: 'Score 0–100',
      subtitle: 'Classificadas por demanda de busca, fraqueza da concorrência e adequação ao formato da plataforma.',
      filterViralityLabel: 'Filtrar viralidade:',
      filterAll: 'Todas',
      filterViralityLevels: {
        all: 'Todas',
        Exceptional: 'Excecional',
        VeryHigh: 'Muito Alta',
        High: 'Alta',
      },
      bestOpportunityTag: 'Melhor Oportunidade (#1)',
      angleLabel: 'Ângulo:',
      gapLabel: 'Gap:',
      painPointLabel: 'Dor do Público:',
      formatLabel: 'Formato:',
      viralityLabel: 'Potencial Viral:',
      competitionLabel: 'Concorrência:',
      whyItWinsLabel: 'Por que vence:',
      opportunityScoreLabel: 'Score de Oportunidade',
      generatingScripts: 'A gerar roteiros personalizados...',
      selectScriptBtn: 'Ver Roteiros',
    },
    bestOpportunity: {
      badge: 'Melhor Oportunidade Ranqueada (#1 de 20)',
      thesisLabel: 'Tese Estratégica:',
      formatLabel: 'Formato:',
      viralityLabel: 'Potencial Viral:',
      competitionLabel: 'Concorrência:',
      scoreLabel: 'Score de Oportunidade',
      viewScriptsBtn: 'Ver os 3 Roteiros Gerados',
    },
    scripts: {
      step: '7',
      title: 'Estúdio de Roteiros: 3 Variações Completas',
      badge: 'Prontos para Gravação',
      subtitle:
        'Roteiros completos estruturados para retenção máxima, com indicações visuais, tom de áudio e teleprompter.',
      durationLabel: 'Duração:',
      wordsLabel: 'palavras',
      copyTechnicalBtn: 'Copiar Roteiro Técnico',
      copyTeleprompterBtn: 'Copiar Texto Corrido (Teleprompter)',
      downloadTxtBtn: 'Descarregar .txt',
      copied: 'Copiado!',
      sceneLabel: 'Cena:',
      audioLabel: 'Áudio:',
      spokenLabel: 'Fala:',
      txtHeaderIdea: 'Ideia:',
      txtHeaderStyle: 'Estilo:',
      txtHeaderDuration: 'Duração:',
      txtHeaderWords: 'Contagem de palavras:',
      txtSectionTechnical: '--- ROTEIRO TÉCNICO (CENAS E FALA) ---',
      txtSectionTeleprompter: '--- TEXTO CORRIDO PARA TELEPROMPTER ---',
    },
    titlesHooksCta: {
      step: '8',
      title: 'Títulos de Alto Clique, Ganchos de 3s & CTAs',
      subtitle:
        'Otimizados psicologicamente para maximizar a taxa de clique inicial (CTR) e a retenção nos primeiros segundos.',
      titlesHeading: '5+ Variações de Títulos por Gatilho Psicológico',
      ctrScoreLabel: 'CTR Score',
      copyTitleTooltip: 'Copiar título',
      hooksHeading: 'Ganchos de Retenção Crítica (Primeiros 3 Segundos)',
      visualLabel: 'Visual:',
      spokenLabel: 'Fala:',
      overlayLabel: 'Texto no Ecrã:',
      copyHookTooltip: 'Copiar gancho',
      ctaHeading: 'Chamadas para Ação (CTAs) de Alta Conversão',
      ctaSpokenLabel: 'Fala Final:',
      ctaVisualLabel: 'Texto Visual:',
      ctaBestPracticeLabel: 'Boas Práticas:',
      copyCtaTooltip: 'Copiar CTA',
    },
    sources: {
      step: '9',
      title: 'Fontes & Proveniência da Pesquisa',
      verifiedBadge: (count) => `${count} Links Verificados`,
      subtitle: 'Links diretos para conteúdos e canais de referência analisados pelo motor.',
      verifiedTag: 'Verificado',
      channelHostLabel: 'Canal/Host:',
      platformLabel: 'Plataforma:',
      openLinkTooltip: 'Abrir link original',
      zeroSourcesTitle: 'Nenhuma fonte direta indexada para este termo',
      zeroSourcesBody:
        'Como a pesquisa aberta em tempo real não retornou URLs de vídeos específicos para o termo pesquisado, nenhuma fonte externa ou link fictício foi gerado. Os roteiros foram construídos através de engenharia de ganchos e modelos de retenção.',
    },
    exportModal: {
      title: 'Exportar & Copiar Relatório Completo',
      subtitle:
        'Exporte todo o dossiê com a pesquisa de concorrentes, outliers, gaps identificados, as 20 ideias ranqueadas e os 3 roteiros completos com marcações técnicas.',
      markdownCard: {
        title: 'Dossiê em Markdown (.md)',
        desc: 'Ideal para Notion, Obsidian, GitHub ou envio direto para a equipa de produção.',
        copyBtn: 'Copiar Markdown',
        copied: 'Copiado!',
        downloadBtn: 'Descarregar .md',
      },
      jsonCard: {
        title: 'Dados Estruturados em JSON (.json)',
        desc: 'Ideal para desenvolvedores, automações com n8n/Make ou integração com bases de dados.',
        copyBtn: 'Copiar JSON',
        copied: 'Copiado!',
        downloadBtn: 'Descarregar .json',
      },
      closeBtn: 'Fechar',
    },
    settingsModal: {
      title: 'Configurações & Chaves de API',
      serverStatusLabel: 'Estado do Servidor Local',
      serverActive: 'Ativo',
      serverEnvKeyLabel: 'Chave Gemini no Servidor (.env):',
      serverEnvConfigured: '✓ Configurada',
      serverEnvNotDetected: 'Não detetada',
      inputKeyLabel: 'Google Gemini API Key (Opcional - Ativa Google Search Grounding)',
      inputKeyHelp: 'Obtenha gratuitamente no Google AI Studio',
      aiStudioLink: 'Google AI Studio',
      saveBtn: 'Guardar Alterações',
      cancelBtn: 'Cancelar',
    },
    savedProjectsModal: {
      title: 'Projetos & Pesquisas Guardadas',
      loading: 'A carregar projetos...',
      emptyTitle: 'Nenhum projeto guardado ainda.',
      emptySubtitle: 'Execute uma pesquisa no formulário principal para guardar automaticamente.',
      bestIdeaLabel: 'Melhor ideia:',
      dateLabel: 'Data:',
      confirmDelete: 'Tem a certeza que deseja eliminar este projeto guardado?',
      deleteTooltip: 'Eliminar projeto',
    },
    footer: {
      tagline: 'Content Opportunity Engine • Pesquisa & Análise Estratégica de Conteúdo',
      supportedMarkets: 'Mercados Alvo: Portugal (pt-PT) • Brasil (pt-BR) • Espanha (es-ES) • Reino Unido (en-GB)',
      backToTop: 'Voltar ao Topo',
    },
  },

  es: {
    meta: {
      langName: 'Español',
      langFlag: '🇪🇸',
      archBadge: {
        uiLabel: 'Interfaz',
        marketLabel: 'Mercado',
        outputLabel: 'Salida',
        summaryText: (ui, market, output) =>
          `Interfaz: ${ui} • Mercado Objetivo: ${market} • Salida de Guiones: ${output}`,
      },
    },
    header: {
      title: 'Content Opportunity',
      engineWord: 'Engine',
      mvpBadge: 'MVP',
      tagline: 'Investigación Real • Outliers • Gaps • 20 Ideas • 3 Guiones',
      supportedMarkets: 'Mercados: 🇵🇹 PT • 🇧🇷 BR • 🇪🇸 ES • 🇬🇧 UK',
      platforms: 'YouTube • Shorts • TikTok • Reels',
      projectsBtn: 'Proyectos',
      apiBtn: 'API',
      newResearchBtn: 'Nueva Investigación',
      uiLangLabel: 'Idioma de la Interfaz',
    },
    workflow: {
      input: 'Entrada / Nicho',
      competitors: '10–20 Competidores',
      outliers: 'Outliers',
      gaps: 'Gaps de Contenido',
      ideas: '20 Ideas Clasificadas',
      bestOpportunity: 'Mejor Oportunidad',
      scripts: '3 Variaciones Guion',
      hooks: 'Títulos / Ganchos / CTA',
      sources: 'Fuentes Reales',
    },
    researchForm: {
      badge: 'Investigación Basada en Datos Reales',
      title: 'Descubre qué está funcionando y convierte los vacíos en guiones de alta retención.',
      subtitle:
        'Introduce tu tema o nicho. El motor investiga creadores reales en el mercado seleccionado, analiza outliers, detecta lo que la competencia omitió y genera 20 oportunidades con 3 guiones completos.',
      archClarification: {
        title: 'Arquitectura de Idiomas Desacoplada',
        body: 'El Mercado Objetivo define dónde se investiga y el idioma del contenido generado (guiones, ganchos y títulos en el idioma nativo del mercado). El selector superior cambia solo los textos de la interfaz.',
      },
      quickPresets: 'Ejemplos rápidos:',
      topicLabel: 'Tema, Palabra Clave o Nicho de Contenido',
      topicPlaceholder: 'Ej: Cuota de Autónomos y Deducciones Legales de Hacienda en España',
      marketLabel: 'Mercado Objetivo y Salida de Contenido',
      marketHelp: 'Define el mercado investigado y el idioma generado',
      platformLabel: 'Plataforma Principal',
      platformHelp: 'Ajusta ritmo y ganchos',
      advancedToggle: 'Opciones avanzadas (Canales de referencia, nivel de audiencia)',
      audienceLabel: 'Nivel de Conocimiento de la Audiencia',
      audienceLevels: {
        all: 'Todos los Niveles',
        beginner: 'Principiantes',
        intermediate: 'Intermedio',
        advanced: 'Avanzado / Profesional',
      },
      seedCompetitorsLabel: 'Canales Competidores de Referencia o URLs Específicas (Opcional)',
      seedCompetitorsPlaceholder:
        'Introduce un canal o enlace por línea. Ej:\nhttps://www.youtube.com/@CanalFinanzas\n@creador_espana',
      submitBtnIdle: 'Ejecutar Motor de Oportunidades de Contenido',
      submitBtnLoading: 'Buscando Competidores y Analizando Gaps...',
      footerNotice: 'Investigación real en web y plataformas sin alucinaciones • Caché inteligente de 24h',
      markets: {
        'pt-PT': {
          name: 'Portugal',
          language: 'Português Europeu',
          outputLanguageName: 'Portugués Europeo (pt-PT)',
          description: 'Gramática portuguesa (ecrã, telemóvel, faturas), IRS, banca local y Euríbor.',
        },
        'pt-BR': {
          name: 'Brasil',
          language: 'Português Brasileiro',
          outputLanguageName: 'Portugués Brasileño (pt-BR)',
          description: 'Comunicación dinámica (celular, tela, grana), Selic, Pix, tipos reales y clase media.',
        },
        'es-ES': {
          name: 'España',
          language: 'Español Peninsular',
          outputLanguageName: 'Español Peninsular (es-ES)',
          description: 'Castellano (móvil, Hacienda, autónomos, IRPF), deducciones y marco legal comunitario.',
        },
        'en-GB': {
          name: 'United Kingdom',
          language: 'British English',
          outputLanguageName: 'Inglés Británico (en-GB)',
          description: 'Inglés británico natural (mobile, flat, holiday, CV), HMRC, ISA, NI, VAT y coste de vida.',
        },
      },
      platforms: {
        youtube: {
          format: 'Long-form (10–18 min)',
          recommendedLength: '12-16 min',
          description: 'Vídeos en profundidad con demostración en pantalla, alta retención y autoridad.',
        },
        'youtube-shorts': {
          format: 'Vertical (9:16, 30–60s)',
          recommendedLength: '45 seg',
          description: 'Ritmo rápido, gancho en los primeros 2 segundos, subtítulos dinámicos y bucle final.',
        },
        tiktok: {
          format: 'Vertical (9:16, 35–50s)',
          recommendedLength: '40 seg',
          description: 'Estilo lo-fi auténtico, ruptura de patrón, disparadores de debate y llamada a favoritos.',
        },
        'instagram-reels': {
          format: 'Vertical (9:16, 40–55s)',
          recommendedLength: '45 seg',
          description: 'Alta estética, guardado para consulta posterior y automatización de mensajes directos.',
        },
      },
    },
    statusBar: {
      analysisComplete: 'Análisis Completado',
      nicheLabel: 'Nicho:',
      uiLanguageLabel: 'Interfaz:',
      marketLabel: 'Mercado Objetivo:',
      outputLanguageLabel: 'Salida de Contenido:',
      provenance: {
        cache: '⚡ Cargado desde Caché (24h)',
        googleGrounding: '🌐 Google Grounding en Tiempo Real',
        webSearch: '🌐 Búsqueda Web en Tiempo Real',
        curated: '📚 Base Curada (Coincidencia Directa)',
        aiDeduction: '⚠️ Deducción Analítica IA (Sin competencia directa)',
      },
      exportBtn: 'Exportar Informe',
      zeroFabricationAlertTitle: 'Aviso de Proveniencia y Cero Fabricación:',
      zeroFabricationAlertText: (market, outputLang, uiLang) =>
        `No se encontraron vídeos competidores directos activos en fuentes públicas abiertas para este término. Para cumplir estrictamente el principio de cero fabricación, ningún canal sustituto o métrica inventada fue presentado. El análisis (gaps, 20 ideas y guiones) se basa en deducción estratégica de IA para el mercado seleccionado (${market}), generada en ${outputLang}, mientras que la interfaz se presenta en ${uiLang}.`,
    },
    competitors: {
      step: '2',
      title: 'Investigación de Competidores y Contenidos Activos',
      verifiedBadge: (count) => `${count} Resultados Verificados`,
      zeroBadge: '0 Competidores Directos Indexados',
      subtitle:
        'Fuentes reales indexadas en la web y plataformas. Cada elemento tiene URL auténtica con distinción estricta entre hechos observados e inferencias de la IA.',
      searchPlaceholder: 'Filtrar competidores...',
      integrityTitle: 'Principio de Integridad:',
      integrityText:
        'No se ha inventado ningún dato, competidor o enlace. Las etiquetas con fondo oscuro representan hechos concretos y las cajas violetas indican inferencia analítica de IA.',
      factsBadge: 'Hechos Observados',
      aiBadge: 'Inferencia IA',
      cardChannel: 'Canal/Creador:',
      cardFact: 'Hecho Observado:',
      cardAi: 'Inferencia de IA:',
      cardAngle: 'Ángulo Detectado:',
      cardOpenSource: 'Abrir fuente original',
      zeroCard: {
        title: 'Búsqueda Pública Directa No Disponible para este Término',
        body: (topic) =>
          `La búsqueda abierta en tiempo real no localizó vídeos competidores directos activos o canales indexados públicamente para el término "${topic}" en la plataforma seleccionada.`,
        safeguardTitle: 'Salvaguarda de Cero Fabricación',
        safeguardBody:
          'Para mantener una integridad estricta, no se sustituyó ningún canal de otro nicho ni se inventaron estadísticas para rellenar la pantalla.',
      },
    },
    outliers: {
      step: '3',
      title: 'Análisis de Outliers y Patrones Ganadores',
      subtitle: 'Qué hace que ciertos contenidos superen el promedio de reproducciones y retención del nicho.',
      formatCalloutTitle: 'Formato Outlier Más Eficaz del Mercado',
      formatFrequency: 'Frecuencia en el Top:',
      hooksTitle: 'Patrones de Gancho (Primeros 3 a 5 Segundos)',
      patternLabel: (n) => `Patrón #${n}`,
      whyItWorks: 'Por qué funciona:',
      velocityTitle: 'Temas con Mayor Velocidad de Búsqueda',
      triggersTitle: 'Disparadores Psicológicos de Conversión',
      observedFactsTitle: 'Hechos Observados (Datos Verificables)',
      aiDeductionsTitle: 'Deducciones e Hipótesis de IA (Análisis Predictivo)',
    },
    gaps: {
      step: '4',
      title: 'Detección de Brechas de Contenido (Content Gaps)',
      subtitle: 'Lo que los competidores repiten en exceso vs lo que la audiencia busca y no encuentra.',
      categories: {
        underserved: 'Necesidad Local Desatendida',
        oversaturated: 'Ángulo Saturado a Evitar',
        unanswered: 'Duda Sin Respuesta Práctica',
        weakExecution: 'Ejecución Débil de Competidores',
      },
      priorities: {
        critical: 'Oportunidad Crítica',
        veryHigh: 'Oportunidad Muy Alta',
        high: 'Oportunidad Alta',
      },
      whyCompetitorsMissed: 'Por qué falló la competencia:',
      marketNuance: 'Matiz de mercado:',
    },
    ideas: {
      step: '5',
      title: (count) => `${count} Ideas de Contenido Clasificadas`,
      scoreBadge: 'Puntuación 0–100',
      subtitle: 'Clasificadas por demanda de búsqueda, debilidad de la competencia y adecuación al formato.',
      filterViralityLabel: 'Filtrar viralidad:',
      filterAll: 'Todas',
      filterViralityLevels: {
        all: 'Todas',
        Exceptional: 'Excepcional',
        VeryHigh: 'Muy Alta',
        High: 'Alta',
      },
      bestOpportunityTag: 'Mejor Oportunidad (#1)',
      angleLabel: 'Ángulo:',
      gapLabel: 'Brecha:',
      painPointLabel: 'Dolor del Público:',
      formatLabel: 'Formato:',
      viralityLabel: 'Potencial Viral:',
      competitionLabel: 'Competencia:',
      whyItWinsLabel: 'Por qué gana:',
      opportunityScoreLabel: 'Puntuación de Oportunidad',
      generatingScripts: 'Generando guiones personalizados...',
      selectScriptBtn: 'Ver Guiones',
    },
    bestOpportunity: {
      badge: 'Mejor Oportunidad Clasificada (#1 de 20)',
      thesisLabel: 'Tesis Estratégica:',
      formatLabel: 'Formato:',
      viralityLabel: 'Potencial Viral:',
      competitionLabel: 'Competencia:',
      scoreLabel: 'Puntuación de Oportunidad',
      viewScriptsBtn: 'Ver los 3 Guiones Generados',
    },
    scripts: {
      step: '7',
      title: 'Estudio de Guiones: 3 Variaciones Completas',
      badge: 'Listos para Grabar',
      subtitle:
        'Guiones completos estructurados para máxima retención, con indicaciones visuales, tono y teleprompter.',
      durationLabel: 'Duración:',
      wordsLabel: 'palabras',
      copyTechnicalBtn: 'Copiar Guion Técnico',
      copyTeleprompterBtn: 'Copiar Texto Corrido (Teleprompter)',
      downloadTxtBtn: 'Descargar .txt',
      copied: '¡Copiado!',
      sceneLabel: 'Escena:',
      audioLabel: 'Audio:',
      spokenLabel: 'Locución:',
      txtHeaderIdea: 'Idea:',
      txtHeaderStyle: 'Estilo:',
      txtHeaderDuration: 'Duración:',
      txtHeaderWords: 'Recuento de palabras:',
      txtSectionTechnical: '--- GUION TÉCNICO (ESCENAS Y LOCUCIÓN) ---',
      txtSectionTeleprompter: '--- TEXTO CORRIDO PARA TELEPROMPTER ---',
    },
    titlesHooksCta: {
      step: '8',
      title: 'Títulos de Alto Clic, Ganchos de 3s & CTAs',
      subtitle:
        'Optimizados psicológicamente para maximizar el CTR inicial y la retención en los primeros segundos.',
      titlesHeading: '5+ Variaciones de Títulos por Disparador Psicológico',
      ctrScoreLabel: 'Punt. CTR',
      copyTitleTooltip: 'Copiar título',
      hooksHeading: 'Ganchos de Retención Crítica (Primeros 3 Segundos)',
      visualLabel: 'Visual:',
      spokenLabel: 'Locución:',
      overlayLabel: 'Texto en Pantalla:',
      copyHookTooltip: 'Copiar gancho',
      ctaHeading: 'Llamadas a la Acción (CTAs) de Alta Conversión',
      ctaSpokenLabel: 'Locución Final:',
      ctaVisualLabel: 'Texto Visual:',
      ctaBestPracticeLabel: 'Mejores Prácticas:',
      copyCtaTooltip: 'Copiar CTA',
    },
    sources: {
      step: '9',
      title: 'Fuentes y Proveniencia de la Investigación',
      verifiedBadge: (count) => `${count} Enlaces Verificados`,
      subtitle: 'Enlaces directos a contenidos y canales de referencia analizados por el motor.',
      verifiedTag: 'Verificado',
      channelHostLabel: 'Canal/Host:',
      platformLabel: 'Plataforma:',
      openLinkTooltip: 'Abrir enlace original',
      zeroSourcesTitle: 'Ninguna fuente directa indexada para este término',
      zeroSourcesBody:
        'Como la búsqueda abierta en tiempo real no devolvió URLs de vídeos específicos para este término, no se generó ninguna fuente ficticia ni enlace falso. Los guiones se construyeron mediante modelos de retención e ingeniería de ganchos.',
    },
    exportModal: {
      title: 'Exportar y Copiar Informe Completo',
      subtitle:
        'Exporta todo el expediente con competidores, outliers, gaps, 20 ideas clasificadas y 3 guiones completos con marcas técnicas.',
      markdownCard: {
        title: 'Informe en Markdown (.md)',
        desc: 'Ideal para Notion, Obsidian, GitHub o entrega al equipo de producción.',
        copyBtn: 'Copiar Markdown',
        copied: '¡Copiado!',
        downloadBtn: 'Descargar .md',
      },
      jsonCard: {
        title: 'Datos Estructurados en JSON (.json)',
        desc: 'Ideal para desarrolladores, automatizaciones en n8n/Make o integración con bases de datos.',
        copyBtn: 'Copiar JSON',
        copied: '¡Copiado!',
        downloadBtn: 'Descargar .json',
      },
      closeBtn: 'Cerrar',
    },
    settingsModal: {
      title: 'Configuraciones y Claves de API',
      serverStatusLabel: 'Estado del Servidor Local',
      serverActive: 'Activo',
      serverEnvKeyLabel: 'Clave Gemini en Servidor (.env):',
      serverEnvConfigured: '✓ Configurada',
      serverEnvNotDetected: 'No detectada',
      inputKeyLabel: 'Google Gemini API Key (Opcional - Activa Google Search Grounding)',
      inputKeyHelp: 'Consíguela gratis en Google AI Studio',
      aiStudioLink: 'Google AI Studio',
      saveBtn: 'Guardar Cambios',
      cancelBtn: 'Cancelar',
    },
    savedProjectsModal: {
      title: 'Proyectos e Investigaciones Guardadas',
      loading: 'Cargando proyectos...',
      emptyTitle: 'No hay proyectos guardados todavía.',
      emptySubtitle: 'Ejecuta una búsqueda en el formulario principal para guardar automáticamente.',
      bestIdeaLabel: 'Mejor idea:',
      dateLabel: 'Fecha:',
      confirmDelete: '¿Seguro que deseas eliminar este proyecto guardado?',
      deleteTooltip: 'Eliminar proyecto',
    },
    footer: {
      tagline: 'Content Opportunity Engine • Investigación y Análisis Estratégico de Contenido',
      supportedMarkets: 'Mercados Objetivo: Portugal (pt-PT) • Brasil (pt-BR) • España (es-ES) • Reino Unido (en-GB)',
      backToTop: 'Volver Arriba',
    },
  },

  en: {
    meta: {
      langName: 'English',
      langFlag: '🇬🇧',
      archBadge: {
        uiLabel: 'UI',
        marketLabel: 'Market',
        outputLabel: 'Output',
        summaryText: (ui, market, output) =>
          `UI Language: ${ui} • Target Market: ${market} • Output Scripts: ${output}`,
      },
    },
    header: {
      title: 'Content Opportunity',
      engineWord: 'Engine',
      mvpBadge: 'MVP',
      tagline: 'Real Research • Outliers • Gaps • 20 Ideas • 3 Scripts',
      supportedMarkets: 'Markets: 🇵🇹 PT • 🇧🇷 BR • 🇪🇸 ES • 🇬🇧 UK',
      platforms: 'YouTube • Shorts • TikTok • Reels',
      projectsBtn: 'Projects',
      apiBtn: 'API',
      newResearchBtn: 'New Research',
      uiLangLabel: 'UI Language',
    },
    workflow: {
      input: 'Input / Niche',
      competitors: '10–20 Competitors',
      outliers: 'Outliers',
      gaps: 'Content Gaps',
      ideas: '20 Ranked Ideas',
      bestOpportunity: 'Best Opportunity',
      scripts: '3 Script Variations',
      hooks: 'Titles / Hooks / CTAs',
      sources: 'Real Sources',
    },
    researchForm: {
      badge: 'Real-Data Grounded Research',
      title: 'Discover what is already working and transform content gaps into high-retention scripts.',
      subtitle:
        'Enter your topic or niche. The engine researches real creators in the selected market, analyzes outliers, detects unanswered questions, and generates 20 opportunities with 3 complete scripts.',
      archClarification: {
        title: 'Decoupled Language Architecture',
        body: 'Target Market sets creator research geography and generated content language (scripts, hooks, titles in the market language). The UI toggle at the top controls only static interface text.',
      },
      quickPresets: 'Quick examples:',
      topicLabel: 'Topic, Keyword or Content Niche',
      topicPlaceholder: 'e.g. How to Invest in Stocks & Shares ISAs and Minimise Capital Gains Tax in the UK',
      marketLabel: 'Target Market & Content Output',
      marketHelp: 'Sets creator research market and output script language',
      platformLabel: 'Primary Platform',
      platformHelp: 'Adjusts pacing and hooks',
      advancedToggle: 'Advanced options (Reference channels, audience level)',
      audienceLabel: 'Audience Knowledge Level',
      audienceLevels: {
        all: 'All Levels',
        beginner: 'Beginners / Laymen',
        intermediate: 'Intermediate',
        advanced: 'Advanced / Professional',
      },
      seedCompetitorsLabel: 'Reference Competitor Channels or Specific URLs (Optional)',
      seedCompetitorsPlaceholder:
        'Enter one channel or link per line. e.g.:\nhttps://www.youtube.com/@DamianTalksMoney\n@AliAbdaal',
      submitBtnIdle: 'Run Content Opportunity Engine',
      submitBtnLoading: 'Researching Competitors & Analyzing Gaps...',
      footerNotice: 'Authentic web & platform research with zero data hallucination • 24h intelligent cache',
      markets: {
        'pt-PT': {
          name: 'Portugal',
          language: 'Português Europeu',
          outputLanguageName: 'European Portuguese (pt-PT)',
          description: 'European Portuguese grammar (ecrã, telemóvel), IRS, local banking and Euribor.',
        },
        'pt-BR': {
          name: 'Brasil',
          language: 'Português Brasileiro',
          outputLanguageName: 'Brazilian Portuguese (pt-BR)',
          description: 'Dynamic phrasing (celular, tela, grana), Selic, Pix, real interest rates, and Brazilian middle class.',
        },
        'es-ES': {
          name: 'España',
          language: 'Español Peninsular',
          outputLanguageName: 'Peninsular Spanish (es-ES)',
          description: 'Castellano (móvil, Hacienda, autónomos, IRPF), deductions, and Spanish market framework.',
        },
        'en-GB': {
          name: 'United Kingdom',
          language: 'British English',
          outputLanguageName: 'British English (en-GB)',
          description: 'Natural UK English (mobile, flat, holiday, CV), HMRC, ISA, NI, VAT, and UK cost of living.',
        },
      },
      platforms: {
        youtube: {
          format: 'Long-form (10–18 min)',
          recommendedLength: '12-16 min',
          description: 'In-depth videos with screen demonstrations, strong mid-roll retention, and authority.',
        },
        'youtube-shorts': {
          format: 'Vertical (9:16, 30–60s)',
          recommendedLength: '45 sec',
          description: 'Fast-paced, hook in first 2 seconds, dynamic captions, and seamless replay loop.',
        },
        tiktok: {
          format: 'Vertical (9:16, 35–50s)',
          recommendedLength: '40 sec',
          description: 'Authentic lo-fi style, pattern interrupts, debate triggers, and save-to-favorites prompt.',
        },
        'instagram-reels': {
          format: 'Vertical (9:16, 40–55s)',
          recommendedLength: '45 sec',
          description: 'High visual aesthetic, save-for-reference utility, and direct-message keyword triggers.',
        },
      },
    },
    statusBar: {
      analysisComplete: 'Analysis Complete',
      nicheLabel: 'Niche:',
      uiLanguageLabel: 'UI:',
      marketLabel: 'Target Market:',
      outputLanguageLabel: 'Content Output:',
      provenance: {
        cache: '⚡ Loaded from Cache (24h)',
        googleGrounding: '🌐 Real-Time Google Grounding',
        webSearch: '🌐 Real-Time Web Search',
        curated: '📚 Curated Dataset (Direct Match)',
        aiDeduction: '⚠️ Analytical AI Deduction (No direct competition)',
      },
      exportBtn: 'Export Report',
      zeroFabricationAlertTitle: 'Provenance & Zero-Fabrication Notice:',
      zeroFabricationAlertText: (market, outputLang, uiLang) =>
        `No active direct competitor videos were found in public sources for this query. Under our strict zero-fabrication principle, no unrelated channels or invented statistics were substituted. The subsequent analysis (content gaps, 20 ranked ideas, and scripts) is strategically deduced by AI for the selected market (${market}), generated in ${outputLang}, while the UI is displayed in ${uiLang}.`,
    },
    competitors: {
      step: '2',
      title: 'Competitor Research & Active Content',
      verifiedBadge: (count) => `${count} Verified Results`,
      zeroBadge: '0 Direct Competitors Indexed',
      subtitle:
        'Authentic sources indexed across web and video platforms. Each item features a genuine URL with strict separation between observed facts and AI inference.',
      searchPlaceholder: 'Filter competitors...',
      integrityTitle: 'Integrity Principle:',
      integrityText:
        'No data, competitors, or links are fabricated. Dark-badge cards represent observed facts and purple boxes indicate analytical AI inferences.',
      factsBadge: 'Observed Facts',
      aiBadge: 'AI Inference',
      cardChannel: 'Channel/Creator:',
      cardFact: 'Observed Fact:',
      cardAi: 'AI Inference:',
      cardAngle: 'Detected Angle:',
      cardOpenSource: 'Open original link',
      zeroCard: {
        title: 'Direct Public Search Unavailable for this Query',
        body: (topic) =>
          `Live search did not locate active direct competitor videos or publicly indexed channels for "${topic}" on the selected platform.`,
        safeguardTitle: 'Zero-Fabrication Safeguard',
        safeguardBody:
          'To maintain strict integrity, no channels from other niches were substituted, and no fictional view metrics were generated.',
      },
    },
    outliers: {
      step: '3',
      title: 'Outlier Analysis & Winning Patterns',
      subtitle: 'What causes certain content to significantly beat average niche viewership and retention.',
      formatCalloutTitle: 'Most Effective Outlier Format in Market',
      formatFrequency: 'Top Frequency:',
      hooksTitle: 'Hook Patterns (First 3 to 5 Seconds)',
      patternLabel: (n) => `Pattern #${n}`,
      whyItWorks: 'Why it works:',
      velocityTitle: 'High-Velocity Search Topics',
      triggersTitle: 'Psychological Conversion Triggers',
      observedFactsTitle: 'Observed Facts (Verifiable Data)',
      aiDeductionsTitle: 'AI Deductions & Hypotheses (Predictive Analysis)',
    },
    gaps: {
      step: '4',
      title: 'Content Gap Detection',
      subtitle: 'What competitors repeatedly duplicate vs what audiences search for and cannot find.',
      categories: {
        underserved: 'Underserved Local Need',
        oversaturated: 'Oversaturated Angle to Avoid',
        unanswered: 'Unanswered Practical Question',
        weakExecution: 'Weak Competitor Execution',
      },
      priorities: {
        critical: 'Critical Opportunity',
        veryHigh: 'Very High Opportunity',
        high: 'High Opportunity',
      },
      whyCompetitorsMissed: 'Why competitors missed it:',
      marketNuance: 'Market nuance:',
    },
    ideas: {
      step: '5',
      title: (count) => `${count} Ranked Content Ideas`,
      scoreBadge: 'Score 0–100',
      subtitle: 'Ranked by search volume demand, competitor weakness, and native platform format fit.',
      filterViralityLabel: 'Filter virality:',
      filterAll: 'All',
      filterViralityLevels: {
        all: 'All',
        Exceptional: 'Exceptional',
        VeryHigh: 'Very High',
        High: 'High',
      },
      bestOpportunityTag: 'Best Opportunity (#1)',
      angleLabel: 'Angle:',
      gapLabel: 'Gap:',
      painPointLabel: 'Audience Pain Point:',
      formatLabel: 'Format:',
      viralityLabel: 'Viral Potential:',
      competitionLabel: 'Competition:',
      whyItWinsLabel: 'Why it wins:',
      opportunityScoreLabel: 'Opportunity Score',
      generatingScripts: 'Generating custom scripts...',
      selectScriptBtn: 'View Scripts',
    },
    bestOpportunity: {
      badge: 'Top Ranked Opportunity (#1 of 20)',
      thesisLabel: 'Strategic Thesis:',
      formatLabel: 'Format:',
      viralityLabel: 'Viral Potential:',
      competitionLabel: 'Competition:',
      scoreLabel: 'Opportunity Score',
      viewScriptsBtn: 'View 3 Generated Scripts',
    },
    scripts: {
      step: '7',
      title: 'Script Studio: 3 Full Variations',
      badge: 'Ready to Record',
      subtitle:
        'Complete scripts engineered for peak audience retention, with visual cues, delivery pacing, and teleprompter copy.',
      durationLabel: 'Est. Duration:',
      wordsLabel: 'words',
      copyTechnicalBtn: 'Copy Technical Script',
      copyTeleprompterBtn: 'Copy Teleprompter Copy',
      downloadTxtBtn: 'Download .txt',
      copied: 'Copied!',
      sceneLabel: 'Scene:',
      audioLabel: 'Audio:',
      spokenLabel: 'Spoken:',
      txtHeaderIdea: 'Idea:',
      txtHeaderStyle: 'Style:',
      txtHeaderDuration: 'Duration:',
      txtHeaderWords: 'Word count:',
      txtSectionTechnical: '--- TECHNICAL SCRIPT (SCENES & SPOKEN) ---',
      txtSectionTeleprompter: '--- TELEPROMPTER COPY ---',
    },
    titlesHooksCta: {
      step: '8',
      title: 'High-CTR Titles, 3s Hooks & CTAs',
      subtitle:
        'Psychologically engineered to maximize initial click-through rate (CTR) and first-few-seconds retention.',
      titlesHeading: '5+ Title Variations by Psychological Trigger',
      ctrScoreLabel: 'CTR Score',
      copyTitleTooltip: 'Copy title',
      hooksHeading: 'Critical Retention Hooks (First 3 Seconds)',
      visualLabel: 'Visual:',
      spokenLabel: 'Spoken:',
      overlayLabel: 'On-Screen Text:',
      copyHookTooltip: 'Copy hook',
      ctaHeading: 'High-Conversion Calls to Action (CTAs)',
      ctaSpokenLabel: 'Spoken CTA:',
      ctaVisualLabel: 'Visual Text:',
      ctaBestPracticeLabel: 'Best Practice:',
      copyCtaTooltip: 'Copy CTA',
    },
    sources: {
      step: '9',
      title: 'Sources & Research Provenance',
      verifiedBadge: (count) => `${count} Verified Links`,
      subtitle: 'Direct links to reference content and channels analyzed by the engine.',
      verifiedTag: 'Verified',
      channelHostLabel: 'Channel/Host:',
      platformLabel: 'Platform:',
      openLinkTooltip: 'Open original link',
      zeroSourcesTitle: 'No direct sources indexed for this query',
      zeroSourcesBody:
        'As live search returned no specific video URLs for this query, no fictitious external links were generated. Scripts were structured using retention models and hook engineering.',
    },
    exportModal: {
      title: 'Export & Copy Complete Report',
      subtitle:
        'Export the full research dossier including competitors, outliers, identified gaps, 20 ranked ideas, and 3 full scripts with technical cues.',
      markdownCard: {
        title: 'Markdown Dossier (.md)',
        desc: 'Ideal for Notion, Obsidian, GitHub, or direct delivery to your production team.',
        copyBtn: 'Copy Markdown',
        copied: 'Copied!',
        downloadBtn: 'Download .md',
      },
      jsonCard: {
        title: 'Structured JSON Data (.json)',
        desc: 'Ideal for developers, n8n/Make automations, or direct database ingestion.',
        copyBtn: 'Copy JSON',
        copied: 'Copied!',
        downloadBtn: 'Download .json',
      },
      closeBtn: 'Close',
    },
    settingsModal: {
      title: 'Settings & API Keys',
      serverStatusLabel: 'Local Server Status',
      serverActive: 'Active',
      serverEnvKeyLabel: 'Server Gemini Key (.env):',
      serverEnvConfigured: '✓ Configured',
      serverEnvNotDetected: 'Not detected',
      inputKeyLabel: 'Google Gemini API Key (Optional - Enables Google Search Grounding)',
      inputKeyHelp: 'Get one free on Google AI Studio',
      aiStudioLink: 'Google AI Studio',
      saveBtn: 'Save Changes',
      cancelBtn: 'Cancel',
    },
    savedProjectsModal: {
      title: 'Saved Projects & Research',
      loading: 'Loading saved projects...',
      emptyTitle: 'No saved projects yet.',
      emptySubtitle: 'Run a research query in the main form to save automatically.',
      bestIdeaLabel: 'Best idea:',
      dateLabel: 'Date:',
      confirmDelete: 'Are you sure you want to delete this saved project?',
      deleteTooltip: 'Delete project',
    },
    footer: {
      tagline: 'Content Opportunity Engine • Strategic Content Research & Opportunity Engine',
      supportedMarkets: 'Supported Markets: Portugal (pt-PT) • Brazil (pt-BR) • Spain (es-ES) • United Kingdom (en-GB)',
      backToTop: 'Back to Top',
    },
  },
};
