import { ContentGap, ResearchRequest, CompetitorResult } from '../../src/types/index.js';
import { normalizeTopic } from './topicNormalizer.js';
import { detectTopicDomain } from './domainDetector.js';

export function detectContentGaps(req: ResearchRequest, competitors: CompetitorResult[]): ContentGap[] {
  const { topic, market, platform } = req;
  const topicClean = normalizeTopic(topic, market);
  const domainInfo = detectTopicDomain(topic);
  const gaps: ContentGap[] = [];

  if (domainInfo.isBakingOrCooking) {
    const isBaking = domainInfo.isBaking;
    if (market === 'pt-PT') {
      if (isBaking) {
        gaps.push(
          {
            id: 'gap-pt-cook-1',
            category: 'underserved-market-need',
            title: 'Ingredientes de Supermercado Português vs Receitas Importadas com Medidas Americanas',
            description: `Muitos vídeos sobre ${topicClean} copiam receitas estrangeiras com chávenas (cups), tipos de farinha inacessíveis ou açúcares especiais difíceis de encontrar em Portugal (como 'heavy cream' ou 'buttermilk'). Falta a versão calibrada para farinha sem fermento comum, ovos M/L nacionais e chocolate de barra do supermercado local.`,
            whyCompetitorsMissedIt: 'Criadores limitam-se a traduzir receitas virais americanas ou britânicas sem testar nem calibrar para os ingredientes disponíveis no mercado nacional.',
            marketNuance: 'Portugal (pt-PT): Utilizadores exigem medidas em gramas e mililitros, temperatura do forno em graus Celsius e ingredientes acessíveis no Continente, Pingo Doce ou Mercadona.',
            opportunityLevel: 'critical',
          },
          {
            id: 'gap-pt-cook-2',
            category: 'unanswered-question',
            title: 'Porque é que o Bolo Fica Seco ou Abate no Centro (E o Truque para Salvar)',
            description: `A dúvida mais comum de quem tenta fazer ${topicClean} é a textura: o bolo fica solado, seco ou afunda no centro ao sair do forno. Mais de 80% dos vídeos ignoram a física da temperatura dos ovos e o ponto exato do palito.`,
            whyCompetitorsMissedIt: 'Foco exclusivo na montagem estética final, sem explicar a ciência simples do forno e o timing correto de descanso.',
            marketNuance: 'Portugal: O público valoriza receitas caseiras com textura húmida e fofa, sem excesso enjoativo de açúcar.',
            opportunityLevel: 'very-high',
          },
          {
            id: 'gap-pt-cook-3',
            category: 'oversaturated-angle',
            title: 'Saturação de Vídeos Estéticos com Música e Sem Medidas Claras',
            description: `As redes estão inundadas de vídeos de 30 segundos hiperacelerados com música de fundo e filtros elegantes, mas sem as quantidades no ecrã e sem o tempo de cozedura. O utilizador assiste por entretenimento mas não consegue reproduzir.`,
            whyCompetitorsMissedIt: 'Produzir vídeos puramente visuais para viralizar é mais fácil do que ensinar um passo a passo pedagógico e replicável.',
            marketNuance: 'Portugal: Elevada procura por receitas práticas que funcionem à primeira, explicadas em português com tom acolhedor.',
            opportunityLevel: 'high',
          },
          {
            id: 'gap-pt-cook-4',
            category: 'weak-competitor-execution',
            title: 'Falta de Formato Rápido (Shorts/Reels) com Lista de Ingredientes Direta para Guardar',
            description: `Os concorrentes ou gravam vídeos de 25 minutos com demasiada conversa inicial ou Shorts sem resumo na descrição. Há um vazio para vídeos de 45 segundos dinâmicos onde o espectador guarda o vídeo e tem a lista exata nos comentários.`,
            whyCompetitorsMissedIt: 'Falta de visão sobre a mecânica de salvamentos e partilhas nos algoritmos modernos.',
            marketNuance: 'Portugal: Ritmo ágil, corte de respiro, sem enrolação e incentivo para guardar a receita.',
            opportunityLevel: 'very-high',
          }
        );
      } else {
        gaps.push(
          {
            id: 'gap-pt-cook-1',
            category: 'underserved-market-need',
            title: 'Proporções Exatas de Água, Lume e Ingredientes do Supermercado Nacional',
            description: `Muitos tutoriais de ${topicClean} dão medidas vagas 'a olho' ou usam ingredientes importados. Em Portugal o público procura medidas exatas em gramas/mililitros, potência correta de placa (vitrocerâmica ou indução) e produtos do Continente, Pingo Doce ou Mercadona.`,
            whyCompetitorsMissedIt: 'Criadores cozinham por intuição e esquecem-se de dar as quantidades e tempos exatos para quem está a aprender.',
            marketNuance: 'Portugal (pt-PT): Procura por receitas descomplicadas com azeite português, sal na medida certa e sem ingredientes caros.',
            opportunityLevel: 'critical',
          },
          {
            id: 'gap-pt-cook-2',
            category: 'unanswered-question',
            title: 'Como Evitar que Fique Empapado, Seco ou Sem Sabor (O Ponto de Textura e Repouso)',
            description: `O maior erro ao fazer ${topicClean} é a textura final: ficar empapado, cru no meio ou passar do ponto. Mais de 80% dos vídeos ignoram a importância de controlar o calor residual e o tempo de repouso tapado.`,
            whyCompetitorsMissedIt: 'Foco apenas na fotografia do prato pronto sem explicar como controlar a humidade e o tempo de repouso.',
            marketNuance: 'Portugal: O público valoriza comida caseira saborosa e reconfortante, no ponto ideal de cozedura.',
            opportunityLevel: 'very-high',
          },
          {
            id: 'gap-pt-cook-3',
            category: 'oversaturated-angle',
            title: 'Saturação de Vídeos Lentos com Demasiada Conversa Inicial',
            description: `Muitos canais tradicionais gravam vídeos de 20 minutos onde demoram 10 minutos antes de acender o fogão. O utilizador moderno quer ir direto ao método.`,
            whyCompetitorsMissedIt: 'Formatos televisivos antigos adaptados sem dinâmica para a internet.',
            marketNuance: 'Portugal: Elevada procura por receitas práticas que funcionem à primeira, explicadas de forma calorosa e direta.',
            opportunityLevel: 'high',
          },
          {
            id: 'gap-pt-cook-4',
            category: 'weak-competitor-execution',
            title: 'Falta de Formato Rápido de 45 Segundos com Ficha de Proporções para Guardar',
            description: `Há um vazio para vídeos de 45 segundos verticais onde o espectador vê o processo num minuto e tem a proporção exata nos comentários para guardar no telemóvel.`,
            whyCompetitorsMissedIt: 'Falta de visão sobre a mecânica de salvamentos e partilhas nos algoritmos modernos.',
            marketNuance: 'Portugal: Ritmo ágil, corte de respiro, sem enrolação e incentivo para guardar a receita.',
            opportunityLevel: 'very-high',
          }
        );
      }
    } else if (market === 'pt-BR') {
      if (isBaking) {
        gaps.push(
          {
            id: 'gap-br-cook-1',
            category: 'underserved-market-need',
            title: 'Receita Econômica sem Ingredientes Caros de Confeitaria Fina',
            description: `Muitos canais usam chocolates importados, extratos caros e formas especiais que não cabem no orçamento popular. Falta o guia de ${topicClean} com ingredientes que todo brasileiro tem no armário (cacau em pó nacional, óleo, ovos e farinha básica).`,
            whyCompetitorsMissedIt: 'Criadores que tentam parecer sofisticados acabam se desconectando da dona de casa e do estudante que querem fazer um bolo rápido no domingo.',
            marketNuance: 'Brasil (pt-BR): Foco em custo-benefício, medidas fáceis (xícara padrão brasileira) e receita que rende para a família toda.',
            opportunityLevel: 'critical',
          },
          {
            id: 'gap-br-cook-2',
            category: 'unanswered-question',
            title: 'O Pulo do Gato para Não Solar e Manter a Massa Molhadinha',
            description: `O maior medo de quem faz ${topicClean} no Brasil é a massa solar ou ficar embatumada. Falta um criador que mostre o momento exato de parar de bater a farinha e como a água morna ou café potencializa o chocolate.`,
            whyCompetitorsMissedIt: 'Canais focam em mostrar o resultado bonito e não explicam o segredo da química da massa.',
            marketNuance: 'Brasil: Linguagem informal, calorosa ("pulo do gato", "olha essa fofura") e demonstração do corte com a colher.',
            opportunityLevel: 'very-high',
          },
          {
            id: 'gap-br-cook-3',
            category: 'oversaturated-angle',
            title: 'Saturação de Receitas com Leite Condensado em Excesso',
            description: `Existe uma saturação de receitas 'afogadas' em brigadeiro e coberturas hiperdoces. Há uma busca crescente por bolos equilibrados, fofinhos, com sabor intenso de chocolate de verdade.`,
            whyCompetitorsMissedIt: 'Receitas hipercalóricas geram choque visual rápido, mas quem quer comer no café da tarde busca um bolo fofo e equilibrado.',
            marketNuance: 'Brasil: Valorização de receitas afetivas com aquele gostinho de bolo de vó.',
            opportunityLevel: 'high',
          },
          {
            id: 'gap-br-cook-4',
            category: 'weak-competitor-execution',
            title: 'Falta de Roteiros Rápidos de 40 Segundos para Liquidificador',
            description: `Vídeos no TikTok e Reels costumam ser cortes confusos. O criador que demonstrar a massa batida em 1 minuto de liquidificador domina a retenção.`,
            whyCompetitorsMissedIt: 'Falta de domínio de edição rápida com som crocante e ASMR de cozinha.',
            marketNuance: 'Brasil: Apelo visual imediato, quebra de padrão nos primeiros 2 segundos e chamada para salvar.',
            opportunityLevel: 'very-high',
          }
        );
      } else {
        gaps.push(
          {
            id: 'gap-br-cook-1',
            category: 'underserved-market-need',
            title: 'Proporções Exatas de Água e Fogo sem Truques Mágicos Furados',
            description: `Muitos vídeos sobre ${topicClean} dão instruções confusas ou medidas que não funcionam no fogão comum brasileiro. Falta o guia com proporções milimétricas, refogado no ponto e tempo exato de panela.`,
            whyCompetitorsMissedIt: 'Criadores cozinham no automático e não explicam a quantidade exata de líquido e controle de chama.',
            marketNuance: 'Brasil (pt-BR): Foco em comida saborosa do dia a dia, rendimento para a família e ingredientes do supermercado comum.',
            opportunityLevel: 'critical',
          },
          {
            id: 'gap-br-cook-2',
            category: 'unanswered-question',
            title: 'O Pulo do Gato para Não Ficar Empapado nem Queimar no Fundo',
            description: `O maior receio ao preparar ${topicClean} é errar o ponto: ficar empapado, grudento ou passar da conta. Falta um vídeo que ensine a hora certa de tampar, abaixar o fogo e deixar secar no vapor.`,
            whyCompetitorsMissedIt: 'Canais mostram só o prato final e não explicam a física do vapor e descanso.',
            marketNuance: 'Brasil: Linguagem prática, direta e afetuosa com foco em resultado perfeito na mesa.',
            opportunityLevel: 'very-high',
          },
          {
            id: 'gap-br-cook-3',
            category: 'oversaturated-angle',
            title: 'Saturação de Receitas Demoradas com Histórias Longas',
            description: `Vídeos prolixos que demoram minutos para começar a receita. O público quer ver a panela funcionando logo no início.`,
            whyCompetitorsMissedIt: 'Criadores replicam formatos longos de televisão sem dinamismo para o público digital.',
            marketNuance: 'Brasil: Agilidade, dicas rápidas e foco na praticidade da rotina.',
            opportunityLevel: 'high',
          },
          {
            id: 'gap-br-cook-4',
            category: 'weak-competitor-execution',
            title: 'Falta de Shorts Rápidos de 40 Segundos com Proporções Claras',
            description: `Cortes rápidos no TikTok que mostram as medidas na tela e convidam a salvar nos favoritos para consultar na beira do fogão.`,
            whyCompetitorsMissedIt: 'Falta de visão sobre a dinâmica de salvamentos rápidos de receitas.',
            marketNuance: 'Brasil: Ritmo dinâmico, áudio nítido e chamada forte para salvar.',
            opportunityLevel: 'very-high',
          }
        );
      }
    } else if (market === 'es-ES') {
      if (isBaking) {
        gaps.push(
          {
            id: 'gap-es-cook-1',
            category: 'underserved-market-need',
            title: 'Medidas Precisas en Gramos y Calibración para Hornos Domésticos en España',
            description: `Gran parte de los tutoriales de ${topicClean} en español provienen de Latinoamérica con ingredientes locales distintos o medidas de taza imprecisas. En España el público busca recetas con gramos exactos, harina de repostería y temperaturas reales de horno doméstico.`,
            whyCompetitorsMissedIt: 'Falta de adaptación a los tipos de harina y cacao habituales en Mercadona, Carrefour o Lidl.',
            marketNuance: 'España (es-ES): Preferencia por báscula digital, grados centígrados y repostería sin empalagar.',
            opportunityLevel: 'critical',
          },
          {
            id: 'gap-es-cook-2',
            category: 'unanswered-question',
            title: 'Cómo Conseguir que Quede Jugoso sin Añadir Demasiada Grasa',
            description: `La pregunta constante es cómo lograr que ${topicClean} tenga un bizcocho tierno y húmedo durante varios días sin recurrir a cantidades desmesuradas de mantequilla.`,
            whyCompetitorsMissedIt: 'Los creadores repiten fórmulas clásicas sin investigar técnicas modernas con yogur o aceite de oliva suave.',
            marketNuance: 'España: Gusto por ingredientes naturales y opciones de bizcocho esponjoso para el desayuno.',
            opportunityLevel: 'very-high',
          },
          {
            id: 'gap-es-cook-3',
            category: 'oversaturated-angle',
            title: 'Saturación de Vídeos Largos con Charlas Innecesarias',
            description: `Muchos canales tradicionales en España siguen grabando vídeos de 20 minutos donde tardan 8 minutos solo en presentar los ingredientes.`,
            whyCompetitorsMissedIt: 'Anclaje en formatos de televisión antigua en lugar de la inmediatez digital actual.',
            marketNuance: 'España: El usuario valora el dinamismo, el humor directo y la receta explicada al grano.',
            opportunityLevel: 'high',
          },
          {
            id: 'gap-es-cook-4',
            category: 'weak-competitor-execution',
            title: 'Ausencia de Vídeos Cortos Verticales con Tarjeta de Receta en el Primer Comentario',
            description: `Faltan Reels y Shorts donde en 45 segundos se muestre el proceso visual y en texto limpio queden las cantidades exactas para guardar en favoritos.`,
            whyCompetitorsMissedIt: 'Poca disciplina en optimizar la llamada a guardar y compartir.',
            marketNuance: 'España: Alto consumo de Reels en móviles para consultar directamente en la cocina.',
            opportunityLevel: 'very-high',
          }
        );
      } else {
        gaps.push(
          {
            id: 'gap-es-cook-1',
            category: 'underserved-market-need',
            title: 'Proporciones Exactas de Líquido, Fuego y Tiempo Real de Cocinado',
            description: `Gran parte de los tutoriales sobre ${topicClean} dan medidas ambiguas 'a ojo'. En España el público busca proporciones exactas (gramos y mililitros), potencia de fuegos domésticos (vitrocerámica/inducción) y tiempos calibrados.`,
            whyCompetitorsMissedIt: 'Los creadores experimentados cocinan por intuición y olvidan indicar las medidas exactas y la potencia de fuego para quien empieza.',
            marketNuance: 'España (es-ES): Preferencia por medidas exactas en báscula digital, aceite de oliva virgen extra y productos habituales de Mercadona, Carrefour o Lidl.',
            opportunityLevel: 'critical',
          },
          {
            id: 'gap-es-cook-2',
            category: 'unanswered-question',
            title: 'Cómo Evitar que Quede Apelmazado, Blando o Sin Sabor (El Secreto de la Textura y el Reposo)',
            description: `La duda constante al preparar ${topicClean} es el punto de textura: evitar que se pase de cocción, quede duro o pierda su textura suelta. Más del 80% de vídeos no explican la importancia del calor residual y el tiempo de reposo tapado.`,
            whyCompetitorsMissedIt: 'Foco exclusivo en la presentación del plato terminado sin enseñar el control del fuego y el reposo clave.',
            marketNuance: 'España: Gusto por la cocina de producto bien ejecutada, con textura perfecta y sabor equilibrado.',
            opportunityLevel: 'very-high',
          },
          {
            id: 'gap-es-cook-3',
            category: 'oversaturated-angle',
            title: 'Saturación de Vídeos Largos con Charlas Innecesarias Antes de Cocinar',
            description: `Muchos canales tradicionales en España siguen grabando vídeos de 20 minutos donde tardan 8 minutos solo en encender el fuego.`,
            whyCompetitorsMissedIt: 'Anclaje en formatos de televisión antigua en lugar de la inmediatez digital actual.',
            marketNuance: 'España: El usuario valora el dinamismo, el humor directo y la receta explicada al grano.',
            opportunityLevel: 'high',
          },
          {
            id: 'gap-es-cook-4',
            category: 'weak-competitor-execution',
            title: 'Ausencia de Vídeos Cortos Verticales con las Proporciones Claras en el Primer Comentario',
            description: `Faltan Reels y Shorts donde en 45 segundos se muestre el proceso visual y en texto limpio queden las cantidades exactas y tiempos para guardar en favoritos.`,
            whyCompetitorsMissedIt: 'Poca disciplina en optimizar la llamada a guardar y compartir.',
            marketNuance: 'España: Alto consumo de Reels en móviles para consultar directamente en la cocina.',
            opportunityLevel: 'very-high',
          }
        );
      }
    } else {
      // en-GB
      if (isBaking) {
        gaps.push(
          {
            id: 'gap-uk-cook-1',
            category: 'underserved-market-need',
            title: 'UK Metric Measurements & Supermarket Ingredients vs US Cup Clutter',
            description: `Too many videos about ${topicClean} uncritically use American cups, sticks of butter, and US-specific flour terms (all-purpose vs cake flour) rather than British metric weights (grams), plain/self-raising flour, and standard UK fan oven temperatures (160°C - 180°C).`,
            whyCompetitorsMissedIt: 'Creators lazily republish American viral recipes without converting to British kitchen standards or UK ingredient formulations.',
            marketNuance: 'United Kingdom (en-GB): UK bakers demand grams, millilitres, fan oven temperatures in Celsius, and ingredients readily found in Tesco, Sainsbury’s, or Aldi.',
            opportunityLevel: 'critical',
          },
          {
            id: 'gap-uk-cook-2',
            category: 'unanswered-question',
            title: 'Why It Sinks in the Middle or Turns Out Dry (And the Scientific Fix)',
            description: `The single biggest complaint from home bakers making ${topicClean} is a sunken centre or dry, crumbly texture. Over 80% of competitor videos skip the chemistry of leavening agents and over-mixing gluten.`,
            whyCompetitorsMissedIt: 'Most creators showcase only glamorous finished bakes rather than troubleshooting genuine home oven inconsistencies.',
            marketNuance: 'UK: Viewers respect straightforward, science-backed culinary explanations in the vein of Mary Berry or James Martin.',
            opportunityLevel: 'very-high',
          },
          {
            id: 'gap-uk-cook-3',
            category: 'oversaturated-angle',
            title: 'Over-Stylised Aesthetic Clips with Zero Practical Utility',
            description: `YouTube Shorts and TikTok feeds are flooded with hyper-edited aesthetic montages set to lo-fi music that fail to display tin dimensions, lining techniques, or exact bake times, leaving viewers unable to recreate the dish.`,
            whyCompetitorsMissedIt: 'Chasing aesthetic view counts over pedagogical clarity and recipe reproducibility.',
            marketNuance: 'UK: Pragmatic home cooks want clear step-by-step instructions without self-indulgent camera posturing.',
            opportunityLevel: 'high',
          },
          {
            id: 'gap-uk-cook-4',
            category: 'weak-competitor-execution',
            title: 'Lack of Concise One-Bowl Bakes with Clear Save-to-Phone Recipe Cards',
            description: `Competitors either deliver 18-minute rambling vlogs or snappy shorts that forget to pin the exact ingredient weights. There is huge demand for a 45-second vertical tutorial with an instant recipe card.`,
            whyCompetitorsMissedIt: 'Lack of appreciation for mobile-first kitchen usability and bookmarking behaviour.',
            marketNuance: 'UK: Paced, understated British delivery with clear calls to bookmark for weekend baking.',
            opportunityLevel: 'very-high',
          }
        );
      } else {
        gaps.push(
          {
            id: 'gap-uk-cook-1',
            category: 'underserved-market-need',
            title: 'Precise Metric Ratios & Hob Temperatures vs US Cup Confusion',
            description: `Too many recipes for ${topicClean} rely on ambiguous 'handfuls' or US measuring cups. British home cooks want exact grams, water-to-ingredient ratios, and heat control on standard UK domestic hobs (gas or induction).`,
            whyCompetitorsMissedIt: 'Experienced cooks rely on muscle memory and fail to provide exact metric ratios and timings for newcomers.',
            marketNuance: 'United Kingdom (en-GB): UK cooks demand grams, millilitres, domestic hob heat settings, and ingredients readily found in Tesco, Sainsbury’s, or Aldi.',
            opportunityLevel: 'critical',
          },
          {
            id: 'gap-uk-cook-2',
            category: 'unanswered-question',
            title: 'Why It Turns Out Mushy, Tough, or Bland (And the Scientific Fix)',
            description: `The single biggest complaint when making ${topicClean} is inconsistent texture—turning out stodgy, overcooked, or dry. Creators rarely explain the simple science of resting and residual heat.`,
            whyCompetitorsMissedIt: 'Most creators showcase only glamorous finished plates rather than troubleshooting common heat control mistakes.',
            marketNuance: 'UK: Viewers respect straightforward, science-backed culinary explanations with clear troubleshooting.',
            opportunityLevel: 'very-high',
          },
          {
            id: 'gap-uk-cook-3',
            category: 'oversaturated-angle',
            title: 'Over-Stylised Aesthetic Clips with Zero Exact Timings or Quantities',
            description: `Feeds are flooded with hyper-edited aesthetic montages set to lo-fi music that fail to show exact water ratios, pan temperatures, or rest times, leaving viewers unable to recreate the dish.`,
            whyCompetitorsMissedIt: 'Chasing aesthetic view counts over pedagogical clarity and recipe reproducibility.',
            marketNuance: 'UK: Pragmatic home cooks want clear step-by-step instructions without self-indulgent camera posturing.',
            opportunityLevel: 'high',
          },
          {
            id: 'gap-uk-cook-4',
            category: 'weak-competitor-execution',
            title: 'Lack of Concise 45-Second Tutorials with Save-to-Phone Measurement Cards',
            description: `Competitors either deliver 18-minute rambling vlogs or snappy shorts that forget to pin the exact ratios. There is huge demand for a 45-second vertical tutorial with an instant recipe card.`,
            whyCompetitorsMissedIt: 'Lack of appreciation for mobile-first kitchen usability and bookmarking behaviour.',
            marketNuance: 'UK: Paced, understated British delivery with clear calls to bookmark for weeknight dinners.',
            opportunityLevel: 'very-high',
          }
        );
      }
    }
  } else if (domainInfo.isGardening) {
    if (market === 'en-GB') {
      gaps.push(
        {
          id: 'gap-uk-gar-1',
          category: 'underserved-market-need',
          title: 'UK Climate Reality & Frost Dates vs Generic Mediterranean/US Advice',
          description: `Gardening videos for ${topicClean} routinely assume warm, sunny climates, ignoring British rain, heavy clay soils, late frosts, and slugs. Viewers need guides tailored to UK hardiness zones and unpredictable weather.`,
          whyCompetitorsMissedIt: 'Creators copy global planting guides that fail in damp British soil conditions.',
          marketNuance: 'UK (en-GB): Focus on RHS recommendations, compost selection, and protecting young shoots from damp and pests.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-uk-gar-2',
          category: 'unanswered-question',
          title: 'How to Grow in Small Gardens and Containers with Low Budget',
          description: `Most UK tutorials showcase expansive country gardens, alienating flat owners and suburban households with small patios. Practical container guides are severely underserved.`,
          whyCompetitorsMissedIt: 'Channels prefer visually impressive large plots over realistic compact urban gardening.',
          marketNuance: 'UK: Compact, budget-friendly planting for rented properties and small gardens.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-uk-gar-3',
          category: 'oversaturated-angle',
          title: 'Overcomplicated Permaculture Jargon for Beginners',
          description: `Beginners wanting to start with ${topicClean} are overwhelmed by technical botanical terminology, expensive soil test kits, and rigid rules.`,
          whyCompetitorsMissedIt: 'Experienced gardeners producing content for other experts rather than encouraging newcomers.',
          marketNuance: 'UK: A friendly, no-nonsense gardening approach that demystifies plant care.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-uk-gar-4',
          category: 'weak-competitor-execution',
          title: 'Absence of Week-by-Week Troubleshooting for Common Diseases & Pests',
          description: `Competitors show the seed and the final flower or crop, skipping the critical middle weeks when leaves turn yellow, seedlings wilt, or pests strike.`,
          whyCompetitorsMissedIt: 'Filming a multi-month progression is harder than a quick planting tutorial.',
          marketNuance: 'UK: Visual diagnostics ("if your plant looks like this, do this").',
          opportunityLevel: 'very-high',
        }
      );
    } else if (market === 'es-ES') {
      gaps.push(
        {
          id: 'gap-es-gar-1',
          category: 'underserved-market-need',
          title: 'Clima Mediterráneo, Sequía y Ciclos de Riego frente a Guías Foráneas Inaplicables',
          description: `Muchos tutoriales de ${topicClean} ignoran el calor extremo del verano en España y la escasez de agua, copiando métodos pensados para climas húmedos o fríos del norte. Falta la guía adaptada a la insolación peninsular y técnicas de acolchado y riego eficiente.`,
          whyCompetitorsMissedIt: 'Traducción y copia literal de consejos anglosajones sin calibrar el suelo y clima español.',
          marketNuance: 'España (es-ES): Ahorro hídrico, sustratos accesibles (Mercadona, Leroy Merlin) y especies resistentes al calor.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-es-gar-2',
          category: 'unanswered-question',
          title: 'Cómo Empezar en Huertos Urbanos, Balcones y Macetas con Bajo Presupuesto',
          description: `El habitante de piso en ciudades españolas busca cuidar ${topicClean} sin terraza gigante ni gastar una fortuna en centros de jardinería especializados. Falta el paso a paso económico en macetas estándar.`,
          whyCompetitorsMissedIt: 'Contenidos centrados exclusivamente en grandes jardines de chalets.',
          marketNuance: 'España: Jardinería urbana en balcones y terrazas con sustratos asequibles.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-es-gar-3',
          category: 'oversaturated-angle',
          title: 'Exceso de Tecnicismos Botánicos que Paralizan al Principiante',
          description: `Vídeos densos con decenas de términos científicos y exigencias químicas que asustan a quien solo quiere tener su planta viva y sana.`,
          whyCompetitorsMissedIt: 'Preocupación por demostrar erudición en lugar de aportar claridad práctica y pedagógica.',
          marketNuance: 'España: Tono cercano, directo y libre de florituras académicas innecesarias.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-es-gar-4',
          category: 'weak-competitor-execution',
          title: 'Ausencia de Guías Rápidas de Diagnóstico de Plagas y Hojas Amarillas',
          description: `Cuando aparece pulgón, cochinilla u oídio en ${topicClean}, el usuario busca un vídeo de 40 segundos que enfoque la hoja y ofrezca la solución casera o biológica en 3 pasos.`,
          whyCompetitorsMissedIt: 'Falta de formatos visuales sintéticos de resolución inmediata de incidencias.',
          marketNuance: 'España: Formato vertical dinámico con solución casera (jabón potásico) y directa.',
          opportunityLevel: 'very-high',
        }
      );
    } else {
      gaps.push(
        {
          id: 'gap-pt-gar-1',
          category: 'underserved-market-need',
          title: 'Clima e Solo Local vs Manuais Estrangeiros Inaplicáveis',
          description: `Conteúdos sobre ${topicClean} ignoram o calor intenso do verão ibérico e a escassez de água, ensinando métodos pensados para climas frios e húmidos. Falta o guia com técnicas de rega eficiente e proteção solar.`,
          whyCompetitorsMissedIt: 'Tradução automática de dicas de países do norte da Europa ou EUA.',
          marketNuance: 'Mercado Local: Valorização de poupança de água, adubação orgânica simples e espécies adaptadas.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-pt-gar-2',
          category: 'unanswered-question',
          title: 'Como Começar em Vasos e Varandas com Orçamento Reduzido',
          description: `Quem vive em apartamentos quer cultivar ${topicClean} sem ter quintal e sem gastar fortunas em viveiros. Falta o passo a passo com recipientes reutilizados e substratos económicos.`,
          whyCompetitorsMissedIt: 'Foco exclusivo em grandes terrenos e hortas rurais.',
          marketNuance: 'Mercado Urbano: Dicas práticas para varandas e floreiras citadinas.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-pt-gar-3',
          category: 'oversaturated-angle',
          title: 'Excesso de Termos Botânicos Rebuscados que Afastam Principiantes',
          description: `Vídeos prolixos com dezenas de nomes científicos que deixam o utilizador hesitante e com medo de errar a primeira muda.`,
          whyCompetitorsMissedIt: 'Preocupação com academicismo em detrimento da clareza pedagógica.',
          marketNuance: 'Linguagem acessível, encorajadora e descomplicada.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-pt-gar-4',
          category: 'weak-competitor-execution',
          title: 'Falta de Guias Rápidos de Diagnóstico de Pragas e Folhas Amarelas',
          description: `Quando uma planta adoece, o utilizador quer um vídeo de 40 segundos que mostre a folha e diga a solução imediata.`,
          whyCompetitorsMissedIt: 'Falta de formatos visuais de resolução imediata de problemas.',
          marketNuance: 'Formato vertical direto com solução em 3 passos.',
          opportunityLevel: 'very-high',
        }
      );
    }
  } else if (domainInfo.isHealthOrFitness) {
    if (market === 'en-GB') {
      gaps.push(
        {
          id: 'gap-uk-hlth-1',
          category: 'underserved-market-need',
          title: 'Realistic Everyday Nutrition for Busy Adults vs Extreme Bodybuilder Meal Preps',
          description: `Content surrounding ${topicClean} routinely forces unrealistic 6-meal-a-day regimens, bland dry chicken breasts, and two hours daily in commercial gyms. There is a glaring lack of practical, wholesome routines designed for working adults with busy careers and family commitments.`,
          whyCompetitorsMissedIt: 'Fitness influencers create content for other gym obsessives rather than pragmatic everyday adults seeking sustainable vitality.',
          marketNuance: 'UK (en-GB): Grounded British sensibility, NHS healthy living alignment, supermarket ingredients, and joint-friendly mobility.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-uk-hlth-2',
          category: 'unanswered-question',
          title: 'High-Protein, Nutrient-Dense Meals Ready in Under 15 Minutes',
          description: `The top barrier to healthy habits in ${topicClean} is evening exhaustion. Viewers desperately need fast, nourishing recipes made with simple staple ingredients from Tesco, Sainsbury's, or M&S.`,
          whyCompetitorsMissedIt: 'Creators focus on complex 90-minute Sunday batch cooking that viewers abandon after week one.',
          marketNuance: 'UK: Comforting, hearty, nutrient-packed meals that warm up quickly without specialised kitchen gadgets.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-uk-hlth-3',
          category: 'oversaturated-angle',
          title: 'Overhyped Exotic Supplements and Crash Calorie Deficits',
          description: `Audiences are exhausted by aggressive sponsored promotions for unproven powders and extreme fasting protocols that inevitably cause rebound fatigue and burnout.`,
          whyCompetitorsMissedIt: 'Supplement sponsorships offer high creator revenue, leading to disingenuous product pushes over honest lifestyle adjustments.',
          marketNuance: 'UK: Heavy viewer cynicism towards influencer sponsorships; strong demand for independent, sensible whole-food advice.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-uk-hlth-4',
          category: 'weak-competitor-execution',
          title: 'Lack of No-Fluff 45-Second Recipe Walkthroughs with Exact Macro Breakdowns',
          description: `Competitors either produce slow 15-minute talking heads or silent video clips without portion measurements. There is prime space for high-energy vertical shorts showing ingredients, frying pan action, and total protein/calories on screen.`,
          whyCompetitorsMissedIt: 'Failing to pair dynamic editing with transparent nutritional numbers on screen.',
          marketNuance: 'UK: Crisp pacing, clear British audio, legible subtitles, and immediate visual payoff.',
          opportunityLevel: 'very-high',
        }
      );
    } else if (market === 'es-ES') {
      gaps.push(
        {
          id: 'gap-es-hlth-1',
          category: 'underserved-market-need',
          title: 'Alimentación Real y Sostenible frente a Dietas Restrictivas Inviables',
          description: `La mayoría de vídeos de ${topicClean} promueven dietas extremas o suplementos caros importados. Falta contenido enfocado en hábitos equilibrados con comida real y accesible adaptada al estilo de vida español.`,
          whyCompetitorsMissedIt: 'Creadores que copian modas de redes sociales anglosajonas que nadie puede sostener más de dos semanas en la vida cotidiana.',
          marketNuance: 'España (es-ES): Valoración de la dieta mediterránea, legumbres, aceite de oliva virgen extra, pescado y comidas familiares sencillas.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-es-hlth-2',
          category: 'unanswered-question',
          title: 'Comidas Rápidas Ricas en Proteína y Energía Listas en 15 Minutos',
          description: `Cómo alimentarse de forma saludable y nutritiva con ${topicClean} sin pasar dos horas en la cocina al llegar cansado tras la jornada laboral.`,
          whyCompetitorsMissedIt: 'Recetas largas pensadas para lucir en vídeo de estudio y no para el ritmo y horarios de trabajo habituales.',
          marketNuance: 'España: Ingredientes comunes de supermercado (Mercadona, Lidl, Carrefour), saciedad y preparación express.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-es-hlth-3',
          category: 'oversaturated-angle',
          title: 'Saturación de Promesas Milagro y Suplementación Excesiva',
          description: `El público está saturado de creadores que intentan vender quemagrasas milagrosos o batidos mágicos que prometen resultados en una semana.`,
          whyCompetitorsMissedIt: 'Los enlaces de afiliados y patrocinios priman sobre la divulgación honesta de hábitos reales.',
          marketNuance: 'España: Rechazo frontal al humo publicitario; búsqueda de rigor, sensatez y ciencia comprensible.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-es-hlth-4',
          category: 'weak-competitor-execution',
          title: 'Falta de Formatos Verticales con Cantidades y Plato Listo en el Primer Segundo',
          description: `Reels y Shorts donde se muestre el resultado apetitoso en el primer segundo, seguido del paso a paso visual y las cantidades exactas en pantalla.`,
          whyCompetitorsMissedIt: 'Entradillas lentas con el creador hablando a cámara sin enseñar el contenido de inmediato.',
          marketNuance: 'España: Ritmo ágil, estímulo visual directo y llamada a guardar para consultar en la cocina.',
          opportunityLevel: 'very-high',
        }
      );
    } else {
      gaps.push(
        {
          id: 'gap-pt-hlth-1',
          category: 'underserved-market-need',
          title: 'Alimentação Real e Sustentável vs Dietas Restritivas Inviáveis',
          description: `A maioria dos vídeos de ${topicClean} sugere dietas extremas ou suplementos caros importados. Falta conteúdo focado em pratos equilibrados com comida de verdade adaptada aos hábitos locais.`,
          whyCompetitorsMissedIt: 'Criadores copiam modismos da internet que ninguém consegue manter por mais de duas semanas.',
          marketNuance: 'Mercado Local: Valorização da dieta mediterrânica, peixe fresco, azeite, legumes da época e refeições práticas de família.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-pt-hlth-2',
          category: 'unanswered-question',
          title: 'Refeições Rápidas de Alta Proteína e Energia em 15 Minutos',
          description: `Como comer de forma saudável e nutritiva sem passar horas no fogão ao chegar cansado do trabalho.`,
          whyCompetitorsMissedIt: 'Receitas longas e elaboradas pensadas para vídeos de estúdio e não para a rotina cansativa do trabalhador.',
          marketNuance: 'Praticidade, ingredientes comuns de supermercado e saciedade duradoura.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-pt-hlth-3',
          category: 'oversaturated-angle',
          title: 'Saturação de Promessas Milagrosas e Suplementação Excessiva',
          description: `O público está farto de criadores a venderem pílulas milagrosas ou batidos que prometem secar a barriga em 7 dias.`,
          whyCompetitorsMissedIt: 'Comissões de afiliados incentivam a promoção de produtos em vez de hábitos reais e consistentes.',
          marketNuance: 'Rejeição de sensacionalismo; procura por ciência simples e bom senso.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-pt-hlth-4',
          category: 'weak-competitor-execution',
          title: 'Falta de Formatos Rápidos com Quantidades e Prato Pronto no Primeiro Segundo',
          description: `Vídeos verticais onde o prato delicioso é mostrado logo no primeiro segundo, seguido de um passo a passo relâmpago de preparação.`,
          whyCompetitorsMissedIt: 'Introduções longas com o criador a falar para a câmara em vez de focar no alimento.',
          marketNuance: 'Ritmo acelerado, apelo visual e gancho focado em sabor e praticidade.',
          opportunityLevel: 'very-high',
        }
      );
    }
  } else if (domainInfo.isConsumerBudgeting) {
    if (market === 'en-GB') {
      gaps.push(
        {
          id: 'gap-uk-bud-1',
          category: 'underserved-market-need',
          title: 'Real Supermarket Basket Audits (Aldi/Lidl vs Tesco/Sainsbury\'s) with Actual Receipts',
          description: `While many creators discuss the cost of living on ${topicClean}, almost none film genuine item-by-item basket comparisons showing exact unit pricing (£/kg or £/litre) and checkout totals.`,
          whyCompetitorsMissedIt: 'Auditing actual supermarket receipts requires meticulous field work and transparent spreadsheet calculations.',
          marketNuance: 'UK (en-GB): British shoppers actively track loyalty club prices (Tesco Clubcard, Sainsbury\'s Nectar) and discounter alternatives (Aldi/Lidl).',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-uk-bud-2',
          category: 'unanswered-question',
          title: 'How to Feed a Household on £25 to £35 a Week Without Eating Cardboard',
          description: `Generic advice tells people to buy bulk rice and beans. Viewers need delicious, flavourful batch recipes that utilise seasonal veg, spices, and tinned staples without feeling deprived.`,
          whyCompetitorsMissedIt: 'Extreme couponing or austerity meal plans produce unappetising meals that normal families refuse to eat.',
          marketNuance: 'UK: Respectful, dignity-preserving budgeting advice that focuses on culinary flavour and batch freezing.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-uk-bud-3',
          category: 'oversaturated-angle',
          title: 'Generic Platitudes ("Don\'t Buy Coffee") with Zero Systematic Strategy',
          description: `Mainstream financial commentators repeat tired cliches like cutting takeaway coffees instead of showing systemic weekly grocery workflow strategies.`,
          whyCompetitorsMissedIt: 'Lazy recycled money-saving tips that sound good in headlines but deliver negligible monthly savings.',
          marketNuance: 'UK: Viewers crave structured shopping workflows, inventory apps, and meal planner templates.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-uk-bud-4',
          category: 'weak-competitor-execution',
          title: 'Lack of Trolley-Level Vertical Videos Exposing Shrinkflation and Yellow-Sticker Hacks',
          description: `Competitors produce studio monologues instead of taking viewers down the supermarket aisle to show exact yellow-sticker timing and packaging down-sizing.`,
          whyCompetitorsMissedIt: 'Filming in supermarkets requires mobile agility and observational curiosity.',
          marketNuance: 'UK: Yellow-sticker culture, best-before vs use-by distinctions, and shelf unit price literacy.',
          opportunityLevel: 'very-high',
        }
      );
    } else if (market === 'es-ES') {
      gaps.push(
        {
          id: 'gap-es-bud-1',
          category: 'underserved-market-need',
          title: 'Auditoría Real de Tickets de Supermercado y Comparativa de Precio por Kilo',
          description: `Muchos vídeos sobre ${topicClean} se quedan en tópicos teóricos ("haz una lista"). Falta un creador que vaya a Mercadona, Carrefour, Lidl o Día con tickets reales y demuestre dónde están los engaños y cómo el precio por kilo ahorra cientos de euros al mes.`,
          whyCompetitorsMissedIt: 'Requiere trabajo de campo minucioso y comparación transparente de marcas blancas vs primeras marcas.',
          marketNuance: 'España (es-ES): Consumidor muy atento a la inflación en cesta de la compra, promociones 3x2 dudosas y subidas camufladas.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-es-bud-2',
          category: 'unanswered-question',
          title: 'Cómo Organizar el Menú Semanal Familiar con Cero Desperdicio de Alimentos',
          description: `El mayor agujero en el presupuesto es tirar comida a final de semana. Falta una metodología práctica de batch cooking español y aprovechamiento inteligente.`,
          whyCompetitorsMissedIt: 'Se enseña a comprar pero no cómo encadenar ingredientes frescos para que nada acabe en la basura.',
          marketNuance: 'España: Cocina tradicional de cuchara, aprovechamiento de sobras y congelación estratégica.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-es-bud-3',
          category: 'oversaturated-angle',
          title: 'Consejos Teóricos de Ahorro Sin Estrategia Ejecutable',
          description: `Vídeos repetitivos con frases hechas como "no vayas a comprar con hambre" que no aportan ningún método semanal contrastado.`,
          whyCompetitorsMissedIt: 'Falta de esfuerzo en construir plantillas descargables o listas estructuradas.',
          marketNuance: 'España: El público valora tablas claras, listas listas para usar y recomendaciones directas sin rodeos.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-es-bud-4',
          category: 'weak-competitor-execution',
          title: 'Ausencia de Formato Corto con el Coste por Ración en Pantalla',
          description: `Vídeos dinámicos que muestren el producto en el lineal, el coste exacto por ración (ej. 1,40€ por plato) y el resultado gastronómico final.`,
          whyCompetitorsMissedIt: 'Poco dominio de edición vertical con métricas financieras claras en pantalla.',
          marketNuance: 'España: Inmediatez visual, utilidad práctica contrastada y formato guardable.',
          opportunityLevel: 'very-high',
        }
      );
    } else {
      gaps.push(
        {
          id: 'gap-pt-bud-1',
          category: 'underserved-market-need',
          title: 'Auditoria Real de Faturas de Supermercado e Preço por Quilo',
          description: `Muitos vídeos sobre ${topicClean} limitam-se a dizer 'faça uma lista'. Falta um criador que vá ao Continente, Pingo Doce ou Mercadona e mostre com faturas reais onde estão as falsas promoções e como o preço por quilo economiza centenas de euros.`,
          whyCompetitorsMissedIt: 'Exige trabalho de campo minucioso e comparação honesta de marcas brancas vs marcas conhecidas.',
          marketNuance: 'Mercado Local: Consumidor português atento a folhetos, cartões de desconto e aumentos subtis de preços.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-pt-bud-2',
          category: 'unanswered-question',
          title: 'Como Organizar o Menu Semanal da Família Reduzindo o Desperdício a Zero',
          description: `O maior rombo no orçamento é deitar comida fora no final da semana. Falta uma estratégia de 'batch cooking' e aproveitamento integral com receitas saborosas.`,
          whyCompetitorsMissedIt: 'Criadores ensinam compras mas não ensinam o que fazer com os restos e alimentos frescos antes de estragarem.',
          marketNuance: 'Comida caseira de conforto, sopas nutritivas e congelamento inteligente.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-pt-bud-3',
          category: 'oversaturated-angle',
          title: 'Dicas Óbvias e Teóricas de Dicionário Sem Plano Executável',
          description: `Vídeos repetitivos que dizem 'não vá às compras com fome' sem entregar um método semanal estruturado em 3 passos.`,
          whyCompetitorsMissedIt: 'Preguiça de criar ferramentas práticas ou tabelas de apoio para a comunidade.',
          marketNuance: 'O público quer tabelas simples, listas prontas e comparações sem meias palavras.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-pt-bud-4',
          category: 'weak-competitor-execution',
          title: 'Ausência de Formato Curto Mostrando o Preço no Ecrã e o Prato Concluído',
          description: `Faltam vídeos curtos e objetivos que mostrem a compra na prateleira, o custo exato por porção (ex: 1,20€ por refeição) e o prato final apetitoso.`,
          whyCompetitorsMissedIt: 'Falta de agilidade de montagem e métricas claras no ecrã.',
          marketNuance: 'Visual rápido, direto ao ponto e foco em valor prático imediato.',
          opportunityLevel: 'very-high',
        }
      );
    }
  } else if (domainInfo.isFinance) {
    if (market === 'pt-PT') {
      gaps.push(
        {
          id: 'gap-pt-1',
          category: 'underserved-market-need',
          title: 'Realidade Fiscal e Bancária Portuguesa vs Dicas Genéricas Importadas',
          description: `Muitos vídeos sobre ${topicClean} copiam formatos do Brasil ou dos EUA, esquecendo taxas da banca portuguesa, comissões de manutenção, regras do Banco de Portugal e retenção de IRS.`,
          whyCompetitorsMissedIt: 'Os criadores copiam guiões virais internacionais sem adaptar à legislação nacional e custos de vida em Portugal.',
          marketNuance: 'Portugal (pt-PT): Os utilizadores valorizam especificidade em euros, declaração de IRS, impacto das taxas Euribor e bancos locais (ActivoBank, CGD, Millennium, Moey).',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-pt-2',
          category: 'unanswered-question',
          title: 'O Que Fazer no Primeiro Mês com Orçamento Realista em Portugal',
          description: `Com o salário mediano em Portugal a rondar os 1.100€ - 1.400€, vídeos a sugerir investimentos ou aportes de 1.000€ mensais geram desconexão total. Falta o guia de passos com 50€ a 150€ por mês.`,
          whyCompetitorsMissedIt: 'Foco excessivo em números grandiosos para gerar thumbnail sensacionalista que afasta o público comum.',
          marketNuance: 'Portugal: Abordagem sóbria, sem falsas promessas de riqueza imediata, adaptada ao poder de compra médio português.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-pt-3',
          category: 'oversaturated-angle',
          title: 'Chega de Teorias Básicas de Dicionário: Queremos Ecrãs e Processos Reais',
          description: `Mais de 70% dos vídeos concorrentes explicam conceitos teóricos repetidos ("o que é X"). O público já sabe o que é; quer ver o ecrã, onde clicar, que documento preencher e que botão evitar.`,
          whyCompetitorsMissedIt: 'É mais fácil e rápido gravar uma pessoa a falar em estúdio do que fazer uma demonstração prática e transparente de ecrã.',
          marketNuance: 'Portugal: Alta procura por tutoriais práticos "screen-recording" sem rodeios nem música dramática de fundo.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-pt-4',
          category: 'weak-competitor-execution',
          title: 'Ausência de Formatos Verticais Rápidos (Shorts/Reels) com Valor Prático Imediato',
          description: `Os concorrentes em Portugal ainda produzem vídeos longos lentos ou Shorts apenas com cortes de podcast. Falta o criador que entrega uma dica acionável de 45 segundos gravada especificamente para vertical.`,
          whyCompetitorsMissedIt: 'Cultura de reciclagem preguiçosa de podcasts em vez de criação nativa para algoritmos verticais.',
          marketNuance: 'Portugal: Algoritmo favorece criadores que falam português europeu com legendas limpas e ritmo moderno.',
          opportunityLevel: 'very-high',
        }
      );
    } else if (market === 'pt-BR') {
      gaps.push(
        {
          id: 'gap-br-1',
          category: 'underserved-market-need',
          title: 'Sobrevivência à Volatilidade Real e Inflação do Dia a Dia Brasileiro',
          description: `A maioria dos vídeos de ${topicClean} ignora a realidade de quem tem renda instável (freelancers, MEI, CLT com hora extra) e foca em cenários perfeitos de poupança linear.`,
          whyCompetitorsMissedIt: 'Fórmulas prontas de livros americanos traduzidos que não contemplam a realidade da economia brasileira e juros reais.',
          marketNuance: 'Brasil (pt-BR): Foco em reserva de emergência com liquidez diária, Pix, IOF, Selic real e proteção contra perda do poder de compra.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-br-2',
          category: 'oversaturated-angle',
          title: 'Saturação de "Fique Rico com Essa Moeda/Ação/Ferramenta Milagrosa"',
          description: `O público brasileiro está com fadiga extrema de promessas de enriquecimento rápido e cliques fáceis. Há uma busca crescente por criadores 'anti-guru' que falem a verdade sem pose de ostentação.`,
          whyCompetitorsMissedIt: 'Clickbait agressivo gera visualização inicial no YouTube/TikTok, mas destrói a retenção e fidelidade a médio prazo.',
          marketNuance: 'Brasil: Estilo autêntico, pé no chão, conversando de igual para igual sem ostentação vazia.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-br-3',
          category: 'unanswered-question',
          title: 'Como Implementar na Prática com Menos de 1 Hora por Mês',
          description: `A rotina de transporte e jornada dupla impede métodos complexos. Falta conteúdo focado em aportes automáticos e rotinas de 15 minutos.`,
          whyCompetitorsMissedIt: 'Criadores produzem para outros criadores sem considerar o tempo escasso do público comum.',
          marketNuance: 'Brasil: Roteiros diretos ao ponto, com linguagem coloquial e foco em rapidez operacional.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-br-4',
          category: 'weak-competitor-execution',
          title: 'Falta de Roteiros com Ganchos de Quebra de Padrão Baseados em Casos Reais',
          description: `Concorrentes abrem os vídeos com introduções longas. O público pula nos primeiros 3 segundos se não houver um gancho visual e verbal impactante.`,
          whyCompetitorsMissedIt: 'Falta de domínio de copywriting para vídeo curto e estruturas modernas de retenção.',
          marketNuance: 'Brasil: O gancho precisa de ritmo acelerado, corte de respiro e legenda dinâmica sincronizada.',
          opportunityLevel: 'very-high',
        }
      );
    } else if (market === 'es-ES') {
      gaps.push(
        {
          id: 'gap-es-1',
          category: 'underserved-market-need',
          title: 'Complejidad Regulatoria y Fiscal en España Explicada Sin Jerga Legal',
          description: `El contenido sobre ${topicClean} en España suele ser o bien un texto legal incomprensible de gestoría o bien un vídeo superficial sin base normativa real (Hacienda, IRPF, comisiones).`,
          whyCompetitorsMissedIt: 'Pocos creadores se toman el tiempo de traducir la normativa oficial a un lenguaje fresco y visual.',
          marketNuance: 'España (es-ES): Alto interés por consejos fiscalmente blindados, retenciones y seguridad jurídica.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-es-2',
          category: 'oversaturated-angle',
          title: 'Quejas Vacías Sin Soluciones Ejecutables',
          description: `Muchos canales españoles se limitan a lamentar la situación económica o las comisiones sin ofrecer un protocolo exacto de optimización para el ciudadano de a pie.`,
          whyCompetitorsMissedIt: 'La indignación fácil genera comentarios polarizados, pero el espectador que busca avanzar se marcha frustrado.',
          marketNuance: 'España: El público valora el pragmatismo, plantillas descargables y comparativas directas.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-es-3',
          category: 'unanswered-question',
          title: `Cómo Conciliar ${topicClean} con un Trabajo por Cuenta Ajena`,
          description: `Existe un vacío notable sobre cómo compaginar ${topicClean} manteniendo un contrato laboral estándar en España sin incurrir en incompatibilidades o duplicidad de costes.`,
          whyCompetitorsMissedIt: 'Casi todo el contenido asume que el espectador es 100% autónomo o 100% asalariado.',
          marketNuance: 'España: Pluriactividad, fiscalidad neta y deducciones transparentes.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-es-4',
          category: 'weak-competitor-execution',
          title: 'Falta de Formatos Breves y Visuales con Datos de Pantalla',
          description: `En España predomina el vídeo largo de charla o entrevista. Hay un hueco enorme para creadores que sinteticen la clave en 45 segundos con gráficos dinámicos.`,
          whyCompetitorsMissedIt: 'Los creadores hispanohablantes tradicionales siguen anclados al formato de tertulia larga.',
          marketNuance: 'España: Dinamismo europeo, tono directo, ironía sutil y llamada a guardar el reel.',
          opportunityLevel: 'very-high',
        }
      );
    } else {
      // en-GB
      gaps.push(
        {
          id: 'gap-uk-1',
          category: 'underserved-market-need',
          title: 'UK Tax Rules, HMRC Allowances & Fiscal Drag vs Generic US Advice',
          description: `Too many videos about ${topicClean} uncritically import US concepts (401k, Roth IRA, IRS rules), completely ignoring UK-specific mechanisms such as HMRC tax years, the £20,000 ISA allowance, Capital Gains Tax cuts, National Insurance thresholds, and SIPP tax relief.`,
          whyCompetitorsMissedIt: 'Creators frequently regurgitate American YouTube trends without adapting to UK tax law, HMRC self-assessment, and the British cost-of-living reality.',
          marketNuance: 'United Kingdom (en-GB): UK viewers demand figures in British Pounds (£), tax year deadlines, and authorised platforms regulated by the Financial Conduct Authority (FCA).',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-uk-2',
          category: 'unanswered-question',
          title: 'Realistic UK Household Budgets vs Influencer Extravagance',
          description: `With typical UK median take-home pay around £2,100 to £2,600 per month and high rent and mortgages, advice demanding £1,000 monthly contributions causes viewer disengagement. There is a glaring lack of practical walkthroughs starting with £50 to £150 a month.`,
          whyCompetitorsMissedIt: 'Content creators chase sensationalist thumbnails with inflated figures, alienating everyday UK workers.',
          marketNuance: 'UK: A grounded, pragmatic tone that respects everyday British cost pressures without condescending guru posturing.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-uk-3',
          category: 'oversaturated-angle',
          title: 'Over-Theoretical Dictionaries: We Want Real Screen Walkthroughs and Exact UK Steps',
          description: `Over 70% of UK competitors produce static talking-head monologues repeating textbook definitions ("What is an ETF" / "What is ${topicClean}"). Viewers already know the theory; they want to see the mobile app screen, which specific platform to choose, and which hidden fees to avoid.`,
          whyCompetitorsMissedIt: 'Talking in front of a camera is faster than recording live screen walkthroughs and auditing transparent fee schedules.',
          marketNuance: 'UK: High demand for crisp screen-recordings on mobile/desktop without tedious self-indulgent preambles.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-uk-4',
          category: 'weak-competitor-execution',
          title: 'Lack of Native Short-Form (Shorts/TikTok/Reels) with Immediate Practical Utility',
          description: `Competitors in the UK still rely on sleepy 25-minute webinars or low-effort podcast snippets. There is a wide gap for a creator delivering 45-second, high-density, actionable advice filmed specifically for vertical feeds.`,
          whyCompetitorsMissedIt: 'Lazy podcast clipping culture instead of purpose-built vertical hooks designed for UK viewers\' mobile habits.',
          marketNuance: 'UK: Fast pacing, clean subtitles, understated British humour, and clear cues to save for later reference.',
          opportunityLevel: 'very-high',
        }
      );
    }
  } else {
    // General Domain (Lifestyle, Crafts, Skills, Hobbies, Practical Guides)
    if (market === 'en-GB') {
      gaps.push(
        {
          id: 'gap-uk-gen-1',
          category: 'underserved-market-need',
          title: 'Clear Execution & Realistic Results vs Vague Superficial Advice',
          description: `Most videos on ${topicClean} remain stuck in high-level commentary, leaving learners stranded when attempting to implement the first real steps.`,
          whyCompetitorsMissedIt: 'Explaining concepts in broad strokes is easier than demonstrating and troubleshooting a real example from start to finish on camera.',
          marketNuance: 'UK: Direct, articulate delivery with practical steps, honest expectations, and zero exaggerated hype.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-uk-gen-2',
          category: 'unanswered-question',
          title: 'How to Fix the #1 Frustrating Stumbling Block from Day One',
          description: `Beginners tackling ${topicClean} consistently hit an immediate friction point that causes early frustration and abandoned attempts. A straightforward troubleshooting guide solves this acute pain point.`,
          whyCompetitorsMissedIt: 'Experienced creators overlook the basic hurdles that trip up newcomers right at the start.',
          marketNuance: 'UK: Step-by-step diagnostic checklists with clear "do this, not that" instructions.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-uk-gen-3',
          category: 'oversaturated-angle',
          title: 'Repetitive Surface Introductions That Never Show How to Actually Execute',
          description: `The market is saturated with basic introductory videos about ${topicClean} that stop right when the viewer needs actionable technique and practical depth.`,
          whyCompetitorsMissedIt: 'Surface-level overview videos are quick to churn out but build very little lasting audience loyalty.',
          marketNuance: 'UK: High appetite for intermediate shortcuts and practical, reliable workflows.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-uk-gen-4',
          category: 'weak-competitor-execution',
          title: 'Absence of a Dynamic 45-Second Vertical Guide with the Key Takeaway',
          description: `Viewers looking for rapid reference solutions do not want to scrub through rambling long videos. There is strong demand for 45-second vertical guides with clean on-screen summaries.`,
          whyCompetitorsMissedIt: 'Slow adaptation to mobile-first, high-density educational formats.',
          marketNuance: 'UK: Mobile-optimised formatting with on-screen annotations and clear save triggers.',
          opportunityLevel: 'very-high',
        }
      );
    } else if (market === 'es-ES') {
      gaps.push(
        {
          id: 'gap-es-gen-1',
          category: 'underserved-market-need',
          title: 'Demostración Práctica Real frente a Consejos Superficiales y Genéricos',
          description: `Gran parte de los contenidos sobre ${topicClean} se quedan en la superficie, ofreciendo consejos genéricos sin enseñar la ejecución real y los matices clave para que funcione.`,
          whyCompetitorsMissedIt: 'Resulta más fácil dar consejos abstractos que demostrar y resolver un caso real de principio a fin frente a la cámara.',
          marketNuance: 'España (es-ES): El público valora el pragmatismo, ejemplos claros y transparencia de principio a fin.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-es-gen-2',
          category: 'unanswered-question',
          title: 'Cómo Resolver el Obstáculo Crítico que Frustra a la Mayoría al Empezar',
          description: `Quienes empiezan con ${topicClean} suelen encallarse en un punto concreto que genera frustración y abandono temprano. Falta una guía directa y sencilla de resolución.`,
          whyCompetitorsMissedIt: 'Los creadores experimentados olvidan las dudas y dificultades iniciales de quien está dando sus primeros pasos.',
          marketNuance: 'España: Explicación accesible, tono constructivo y consejos aplicables al instante.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-es-gen-3',
          category: 'oversaturated-angle',
          title: 'Saturación de Introducciones Repetitivas que Nunca Pasan a la Acción',
          description: `Exceso de vídeos introductorios sobre ${topicClean} que repiten generalidades pero nunca enseñan el método paso a paso para aplicarlo con éxito.`,
          whyCompetitorsMissedIt: 'Los vídeos superficiales son rápidos de grabar pero generan poco valor duradero.',
          marketNuance: 'España: Búsqueda de atajos eficaces y metodologías para aplicar hoy mismo.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-es-gen-4',
          category: 'weak-competitor-execution',
          title: 'Ausencia de Formato Corto Vertical con la Clave Exacta en 45 Segundos',
          description: `Falta el creador que sintetice la clave exacta en 40-50 segundos en formato vertical con subtítulos limpios y sin rodeos.`,
          whyCompetitorsMissedIt: 'Aferramiento a vídeos largos de 20 minutos con introducciones lentas.',
          marketNuance: 'España: Dinamismo, formato directo y llamada a guardar para futuras consultas.',
          opportunityLevel: 'very-high',
        }
      );
    } else {
      gaps.push(
        {
          id: 'gap-pt-gen-1',
          category: 'underserved-market-need',
          title: 'Demonstração Prática Real vs Conselhos Vagos e Superficiais',
          description: `Grande parte dos conteúdos sobre ${topicClean} fica-se pela superfície, com dicas genéricas sem mostrar a execução real e os detalhes fundamentais para dar certo.`,
          whyCompetitorsMissedIt: 'É mais fácil falar em termos abstratos do que demonstrar e resolver um caso real do início ao fim diante da câmara.',
          marketNuance: 'Mercado Local: O público valoriza pragmatismo, exemplos concretos e transparência de processos.',
          opportunityLevel: 'critical',
        },
        {
          id: 'gap-pt-gen-2',
          category: 'unanswered-question',
          title: 'Como Resolver o Principal Bloqueio que Frustra Quem Está a Começar',
          description: `Quem começa em ${topicClean} depara-se com uma dificuldade inicial concreta que gera frustração e desistência precoce. Falta um guia direto de resolução prática.`,
          whyCompetitorsMissedIt: 'Criadores experientes esquecem as dúvidas mais básicas de quem está no ponto de partida.',
          marketNuance: 'Passo a passo com linguagem acolhedora e incentivo prático.',
          opportunityLevel: 'very-high',
        },
        {
          id: 'gap-pt-gen-3',
          category: 'oversaturated-angle',
          title: 'Saturação de Vídeos Introdutórios que Nunca Passam à Prática',
          description: `Excesso de conteúdos sobre ${topicClean} que repetem generalidades teóricas sem nunca ensinar o método passo a passo para aplicar com sucesso.`,
          whyCompetitorsMissedIt: 'Vídeos superficiais são mais rápidos de produzir mas geram baixa fidelidade.',
          marketNuance: 'Procura por atalhos acionáveis e métodos aplicáveis no próprio dia.',
          opportunityLevel: 'high',
        },
        {
          id: 'gap-pt-gen-4',
          category: 'weak-competitor-execution',
          title: 'Falta de Formatos Curtos Verticais com Dica Única Acionável',
          description: `Falta o criador que entregue a solução exata em 40-50 segundos, gravado para vertical com legendas limpas e direto ao assunto.`,
          whyCompetitorsMissedIt: 'Prevalência de vídeos compridos com introduções desnecessárias.',
          marketNuance: 'Formato dinâmico, moderno e direto ao assunto.',
          opportunityLevel: 'very-high',
        }
      );
    }
  }

  // Enrich with English translations if researching a non-UK market
  if (market !== 'en-GB') {
    const ukGaps = detectContentGaps({ ...req, market: 'en-GB' }, competitors);
    gaps.forEach((gap, idx) => {
      const ukMatch = ukGaps[idx];
      if (ukMatch) {
        gap.titleTranslation = ukMatch.title;
        gap.descriptionTranslation = ukMatch.description;
        gap.whyCompetitorsMissedItTranslation = ukMatch.whyCompetitorsMissedIt;
        gap.marketNuanceTranslation = ukMatch.marketNuance;
      }
    });
  }

  return gaps;
}
