import {
  ContentIdea,
  ResearchRequest,
  ScriptVariation,
  TitleIdea,
  HookIdea,
  CallToAction,
  SourceCitation,
  CompetitorResult,
  TargetMarket,
  Platform,
} from '../../src/types/index.js';
import { normalizeTopic, cleanTemplateText, formatScript1Opening, formatSpokenHook } from './topicNormalizer.js';
import { detectTopicDomain, DetectedTopicInfo } from './domainDetector.js';

interface ScriptBundle {
  scripts: ScriptVariation[];
  titles: TitleIdea[];
  hooks: HookIdea[];
  ctas: CallToAction[];
}

function buildCookingScriptBundle(
  topic: string,
  subject: string,
  market: TargetMarket,
  platform: Platform,
  isShorts: boolean
): ScriptBundle {
  const isUK = market === 'en-GB';
  const isPT = market === 'pt-PT';
  const isBR = market === 'pt-BR';
  const isES = market === 'es-ES';

  // 1. Scripts
  const scripts: ScriptVariation[] = [
    {
      id: `script-${market.toLowerCase()}-contrarian`,
      style: 'contrarian-mythbuster',
      styleName: isUK ? 'Variation 1: The Myth-Buster (Contrarian)' : 'Variação 1: O Quebrador de Mitos (Contrarian)',
      badge: isUK ? 'Highest Retention & Debate' : 'Maior Retenção & Debate',
      tagline: isUK
        ? 'Dismantles the most common kitchen baking blunder and demonstrates the reliable fix.'
        : 'Desmonta o erro mais comum na cozinha e demonstra o método certo para não arruinar a receita.',
      estimatedDuration: isShorts ? '45 seconds' : '12 minutes',
      targetWordCount: isShorts ? 135 : 1700,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: isUK
            ? '[VISUAL: Close-up of cutting into the finished dish, revealing a steaming, perfectly moist crumb texture]'
            : '[VISUAL: Grande plano a cortar a fatia perfeita, mostrando a textura fumegante, macia e húmida]',
          spokenText: formatScript1Opening(topic, market),
          audioToneCue: '[AUDIO: Crisp cut effect / no background music in first 2 seconds for intense focus]',
        },
        {
          timestamp: '0:03 - 0:12',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: isUK
            ? '[VISUAL: Quick side-by-side comparison: dry, sunken bake vs light, tall, bakery-quality slice]'
            : '[VISUAL: Comparação rápida lado a lado: fatia seca e abatida vs fatia fofa e volumosa]',
          spokenText: isUK
            ? '90% of recipes tell you to whisk everything vigorously all at once. The problem? Overworked gluten makes the crumb rubbery and causes the centre to sink in the oven.'
            : isPT
            ? '90% das receitas na internet dizem-te para bater tudo à pressa de uma só vez. O problema? O glúten desenvolve em excesso, a massa fica pesada e o centro afunda no forno.'
            : isBR
            ? '90% das receitas mandam bater tudo de uma vez sem parar. O resultado? O bolo sola, fica pesado e embatumado.'
            : 'El 90% de las recetas te dicen que batas todo a toda prisa. El problema es que la masa se apelmaza y se hunde en el centro.',
          audioToneCue: '[AUDIO: Subtle bass drop and building curiosity tempo]',
        },
        {
          timestamp: '0:12 - 0:32',
          stage: 'Core Value / Meat',
          visualCue: isUK
            ? '[VISUAL: Clean countertop demonstration: sifting dry ingredients and gently folding with a spatula]'
            : '[VISUAL: Demonstração na bancada: peneirar os secos e envolver suavemente com a espátula]',
          spokenText: isUK
            ? 'Look at this simple adjustment: keep eggs at room temperature, gently fold the dry ingredients until just combined, and bake at 160°C fan. That is how you lock in moisture for days.'
            : isPT
            ? 'Olha com atenção para este ajuste simples: ovos à temperatura ambiente, peneirar a farinha e envolver sem bater, com o forno ventilado a 160°C. É isto que garante humidade e leveza durante dias.'
            : isBR
            ? 'Olha esse pulo do gato: ovos em temperatura ambiente, farinha peneirada misturada com carinho e forno pré-aquecido na temperatura certa. A massa fica fofinha que desmancha.'
            : 'Mira este truque: huevos a temperatura ambiente, tamizar la harina e integrar con suavidad. Así consigues un bizcocho jugoso durante días.',
          audioToneCue: '[AUDIO: Dynamic, upbeat kitchen pacing]',
        },
        {
          timestamp: '0:32 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: isUK
            ? '[VISUAL: Returning to main camera holding the plate, pulling apart a tender piece]'
            : '[VISUAL: Regresso à câmara principal a segurar o prato e a abrir um pedaço macio]',
          spokenText: isUK
            ? 'The difference is never throwing wasted ingredients into the bin and always serving a bake you are genuinely proud of.'
            : isPT
            ? 'A diferença é nunca mais deitares ingredientes para o lixo nem teres vergonha de servir uma fatia aos teus convidados.'
            : isBR
            ? 'A diferença é não desperdiçar comida e ter sempre um bolo maravilhoso para o café da tarde.'
            : 'La diferencia es no tirar comida a la basura y disfrutar de un resultado de pastelería.',
          audioToneCue: '[AUDIO: Warm, satisfying resolution note]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Gesture towards bookmark button with on-screen text]',
          spokenText: isUK
            ? 'Save this video for your weekend bake, and comment "RECIPE" for the exact measurements in grams!'
            : isPT
            ? 'Guarda este vídeo para a tua próxima sobremesa e comenta "RECEITA" para te enviar a ficha completa em gramas!'
            : isBR
            ? 'Salva esse vídeo para não perder e comenta "RECEITA" que eu te mando as medidas certinhas!'
            : '¡Guarda este vídeo para el fin de semana y comenta "RECETA" para enviarte las cantidades exactas!',
          audioToneCue: '[AUDIO: Subtle notification chime]',
        },
      ],
      fullSpokenText: isUK
        ? `${formatScript1Opening(topic, market)} 90% of recipes tell you to whisk everything vigorously all at once. The problem? Overworked gluten makes the crumb rubbery and causes the centre to sink in the oven. Look at this simple adjustment: keep eggs at room temperature, gently fold the dry ingredients until just combined, and bake at 160°C fan. That is how you lock in moisture for days. The difference is never throwing wasted ingredients into the bin and always serving a bake you are genuinely proud of. Save this video for your weekend bake, and comment "RECIPE" for the exact measurements in grams!`
        : `${formatScript1Opening(topic, market)} 90% das receitas na internet dizem-te para bater tudo à pressa de uma só vez. O problema? O glúten desenvolve em excesso, a massa fica pesada e o centro afunda no forno. Olha com atenção para este ajuste simples: ovos à temperatura ambiente, peneirar a farinha e envolver sem bater, com o forno ventilado a 160°C. É isto que garante humidade e leveza durante dias. A diferença é nunca mais deitares ingredientes para o lixo nem teres vergonha de servir uma fatia aos teus convidados. Guarda este vídeo para a tua próxima sobremesa e comenta "RECEITA" para te enviar a ficha completa em gramas!`,
    },
    {
      id: `script-${market.toLowerCase()}-story`,
      style: 'story-driven-case-study',
      styleName: isUK ? 'Variation 2: Journey & Kitchen Fix (Story-Driven)' : 'Variação 2: Estudo de Caso & Experiência Prática',
      badge: isUK ? 'Peak Relatability' : 'Máxima Conexão & Empatia',
      tagline: isUK
        ? 'Relatable personal frustration of failed kitchen attempts until unlocking the foolproof method.'
        : 'A jornada real de frustração com receitas da internet até descobrir o método infalível.',
      estimatedDuration: isShorts ? '50 seconds' : '14 minutes',
      targetWordCount: isShorts ? 145 : 2000,
      sections: [
        {
          timestamp: '0:00 - 0:04',
          stage: 'Hook',
          visualCue: '[VISUAL: Looking disappointed at an overbaked, sunken attempt in the kitchen]',
          spokenText: isUK
            ? `For years, every single time I tried making ${subject}, it came out dry or burnt on the outside and raw in the middle.`
            : `Durante anos cometi sempre o mesmo erro ao tentar fazer ${subject}. E nenhuma receita me avisava.`,
          audioToneCue: '[AUDIO: Intimate, reflective storytelling tone]',
        },
        {
          timestamp: '0:04 - 0:15',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: '[VISUAL: Fast montage of confusing online recipe printouts and messy kitchen]',
          spokenText: isUK
            ? 'I followed popular viral videos to the letter, but my results were completely unpredictable. I nearly gave up entirely.'
            : 'Seguia receitas famosas da internet à risca, mas o resultado saía sempre ressequido ou pesado. Estive quase para desistir.',
          audioToneCue: '[AUDIO: Building musical pulse]',
        },
        {
          timestamp: '0:15 - 0:35',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Clean countertop setup showing simple bowl and measuring scale]',
          spokenText: isUK
            ? 'Until a pastry chef showed me the one golden rule: weigh everything accurately on a digital scale and stop opening the oven door before the 25-minute mark. Everything changed.'
            : 'Até que percebi a regra de ouro dos pasteleiros: usar balança em gramas e nunca abrir a porta do forno nos primeiros 25 minutos. Mudou tudo.',
          audioToneCue: '[AUDIO: Pacing becomes upbeat and confident]',
        },
        {
          timestamp: '0:35 - 0:43',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Golden, tender slice served effortlessly with a smile]',
          spokenText: isUK
            ? 'Now it takes me 15 minutes of prep and it turns out bakery-standard every single time.'
            : 'Hoje levo 15 minutos a preparar isto e sai sempre perfeito à primeira.',
          audioToneCue: '[AUDIO: Warm, celebratory melody]',
        },
        {
          timestamp: '0:43 - 0:50',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Finger pointing to follow/save button]',
          spokenText: isUK
            ? 'Bookmark this video for later and follow for more foolproof kitchen guides!'
            : 'Guarda este vídeo nos favoritos e segue o canal para mais receitas descomplicadas!',
          audioToneCue: '[AUDIO: Friendly sign-off chime]',
        },
      ],
      fullSpokenText: isUK
        ? `For years, every single time I tried making ${subject}, it came out dry or burnt on the outside and raw in the middle. I followed popular viral videos to the letter, but my results were completely unpredictable. I nearly gave up entirely. Until a pastry chef showed me the one golden rule: weigh everything accurately on a digital scale and stop opening the oven door before the 25-minute mark. Everything changed. Now it takes me 15 minutes of prep and it turns out bakery-standard every single time. Bookmark this video for later and follow for more foolproof kitchen guides!`
        : `Durante anos cometi sempre o mesmo erro ao tentar fazer ${subject}. E nenhuma receita me avisava. Seguia receitas famosas da internet à risca, mas o resultado saía sempre ressequido ou pesado. Estive quase para desistir. Até que percebi a regra de ouro dos pasteleiros: usar balança em gramas e nunca abrir a porta do forno nos primeiros 25 minutos. Mudou tudo. Hoje levo 15 minutos a preparar isto e sai sempre perfeito à primeira. Guarda este vídeo nos favoritos e segue o canal para mais receitas descomplicadas!`,
    },
    {
      id: `script-${market.toLowerCase()}-blueprint`,
      style: 'actionable-blueprint',
      styleName: isUK ? 'Variation 3: The 4-Step Action Blueprint' : 'Variação 3: O Passo a Passo Definitivo (Blueprint)',
      badge: isUK ? 'Highest Save & Share Rate' : 'Maior Taxa de Salvamento',
      tagline: isUK
        ? 'Clear, ordered kitchen steps taking viewers from zero prep to mouth-watering finish.'
        : 'Guia ordenado de 4 passos sem rodeios, da bancada ao prato.',
      estimatedDuration: isShorts ? '45 seconds' : '15 minutes',
      targetWordCount: isShorts ? 135 : 2100,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: '[VISUAL: Title card with ingredient lineup on clean kitchen board]',
          spokenText: isUK
            ? `Here is the complete 4-step blueprint to nail ${subject} on your very first try.`
            : `Aqui está o passo a passo em 4 etapas para acertares ${subject} à primeira.`,
          audioToneCue: '[AUDIO: Crisp, high-energy opening sound]',
        },
        {
          timestamp: '0:03 - 0:15',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Quick shots of weighing dry ingredients and whisking wet base]',
          spokenText: isUK
            ? 'Step 1: Bring your eggs and dairy to room temperature. Step 2: Whisk the wet ingredients until glossy and emulsified.'
            : 'Passo 1: Ingredientes à temperatura ambiente. Passo 2: Misturar os líquidos primeiro até emulsionar.',
          audioToneCue: '[AUDIO: Upbeat instructional rhythm]',
        },
        {
          timestamp: '0:15 - 0:30',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Sifter shaking flour into bowl, gentle folding, then into lined tin]',
          spokenText: isUK
            ? 'Step 3: Sift the dry ingredients and fold gently with a spatula. Step 4: Bake in a preheated oven without opening the door early.'
            : 'Passo 3: Peneirar os secos e envolver suavemente. Passo 4: Forno pré-aquecido à temperatura certa, sem abrir a porta antes do tempo.',
          audioToneCue: '[AUDIO: Satisfying kitchen sound effects]',
        },
        {
          timestamp: '0:30 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Finished bake cooling on rack with clean toothpick test]',
          spokenText: isUK
            ? 'Follow these four steps and you will get that tender, melt-in-the-mouth texture every time.'
            : 'Segue estas 4 etapas e tens sempre uma textura fofa e húmida garantida.',
          audioToneCue: '[AUDIO: Warm, confident conclusion]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: End screen with recipe checklist graphic]',
          spokenText: isUK
            ? 'Share this with someone who loves baking and comment "STEPS" for the free checklist!'
            : 'Partilha este vídeo com quem adora ir para a cozinha e comenta "GUIA" para receberes a lista!',
          audioToneCue: '[AUDIO: Subtle notification chime]',
        },
      ],
      fullSpokenText: isUK
        ? `Here is the complete 4-step blueprint to nail ${subject} on your very first try. Step 1: Bring your eggs and dairy to room temperature. Step 2: Whisk the wet ingredients until glossy and emulsified. Step 3: Sift the dry ingredients and fold gently with a spatula. Step 4: Bake in a preheated oven without opening the door early. Follow these four steps and you will get that tender, melt-in-the-mouth texture every time. Share this with someone who loves baking and comment "STEPS" for the free checklist!`
        : `Aqui está o passo a passo em 4 etapas para acertares ${subject} à primeira. Passo 1: Ingredientes à temperatura ambiente. Passo 2: Misturar os líquidos primeiro até emulsionar. Passo 3: Peneirar os secos e envolver suavemente. Passo 4: Forno pré-aquecido à temperatura certa, sem abrir a porta antes do tempo. Segue estas 4 etapas e tens sempre uma textura fofa e húmida garantida. Partilha este vídeo com quem adora ir para a cozinha e comenta "GUIA" para receberes a lista!`,
    },
  ];

  // 2. Titles
  const titles: TitleIdea[] = isUK
    ? [
        {
          id: 'title-1',
          type: 'Contrarian',
          title: `The #1 Mistake When Making ${subject} in UK Kitchens`,
          score: 96,
        },
        {
          id: 'title-2',
          type: 'Outcome / How-To',
          title: `How to Make Perfect ${subject} from Scratch (Foolproof Guide)`,
          score: 94,
        },
        {
          id: 'title-3',
          type: 'Curiosity Gap',
          title: `Budget Supermarket vs Premium Ingredients for ${subject}: Tested!`,
          score: 92,
        },
        {
          id: 'title-4',
          type: 'Fear of Missing Out / Loss',
          title: `Stop Doing This: 3 Mistakes Ruining Your ${subject}`,
          score: 91,
        },
        {
          id: 'title-5',
          type: 'Number / Listicle',
          title: `Easy 15-Minute Prep ${subject} (One Bowl & Zero Stress)`,
          score: 89,
        },
      ]
    : [
        {
          id: 'title-1',
          type: 'Contrarian',
          title: `O Maior Erro ao Fazer ${subject} que Deixa a Massa Seca (E Como Acertar)`,
          score: 96,
        },
        {
          id: 'title-2',
          type: 'Outcome / How-To',
          title: `Como Fazer ${subject} Perfeito do Zero Passo a Passo`,
          score: 94,
        },
        {
          id: 'title-3',
          type: 'Curiosity Gap',
          title: `Ingredientes Baratos vs Caros para ${subject}: Qual a Diferença Real?`,
          score: 92,
        },
        {
          id: 'title-4',
          type: 'Fear of Missing Out / Loss',
          title: `3 Erros Comuns ao Fazer ${subject} que Deves Parar Hoje`,
          score: 91,
        },
        {
          id: 'title-5',
          type: 'Number / Listicle',
          title: `${subject} Rápido em Menos de 15 Minutos de Preparação (Sem Batedeira)`,
          score: 89,
        },
      ];

  // 3. Hooks
  const hooks: HookIdea[] = isUK
    ? [
        {
          id: 'hook-1',
          type: 'Pattern Interrupt',
          spokenHook: formatSpokenHook(topic, market),
          visualHook: '[VISUAL: Cutting a generous slice showing steaming, tender crumb]',
          overlayText: 'STOP DOING THIS ⚠️',
        },
        {
          id: 'hook-2',
          type: 'Bold Statement',
          spokenHook: `Want to make bakery-standard ${subject} with standard supermarket staples? Here is the secret.`,
          visualHook: '[VISUAL: Displaying 4 simple pantry staples side-by-side on the board]',
          overlayText: 'THE SECRET TRICK 🤫',
        },
        {
          id: 'hook-3',
          type: 'Provocative Question',
          spokenHook: `If your ${subject} always comes out dry or sinks in the middle, the problem isn't you — it's this one step.`,
          visualHook: '[VISUAL: Expressive close-up showing a sunken bake with a sigh of relief]',
          overlayText: 'WHY BAKES FAIL ❌',
        },
        {
          id: 'hook-4',
          type: 'Story Opener',
          spokenHook: `Most online recipes tell you to whisk everything vigorously. Here is why that is actually ruining your bake.`,
          visualHook: '[VISUAL: Holding whisk with text "Stop overworking the batter" on screen]',
          overlayText: 'DO NOT WHISK 🚫',
        },
        {
          id: 'hook-5',
          type: 'Visual Shock',
          spokenHook: `There is one simple temperature trick that changes the texture of ${subject} completely.`,
          visualHook: '[VISUAL: Dialling oven thermometer to 160°C fan with dynamic sound]',
          overlayText: 'TEMPERATURE SECRET 🔥',
        },
      ]
    : [
        {
          id: 'hook-1',
          type: 'Pattern Interrupt',
          spokenHook: formatSpokenHook(topic, market),
          visualHook: '[VISUAL: Plano detalhado a cortar uma fatia fofa e húmida]',
          overlayText: 'PÁRA DE FAZER ISTO ⚠️',
        },
        {
          id: 'hook-2',
          type: 'Bold Statement',
          spokenHook: `Queres aprender a fazer ${subject} com textura de pastelaria usando apenas ingredientes simples de supermercado?`,
          visualHook: '[VISUAL: Ingredientes simples alinhados na bancada limpa]',
          overlayText: 'O TRUQUE SECRETO 🤫',
        },
        {
          id: 'hook-3',
          type: 'Provocative Question',
          spokenHook: `Se o teu ${subject} sai sempre seco ou afunda no centro, o problema não és tu — é esta regra que ninguém te conta.`,
          visualHook: '[VISUAL: Rosto expressivo com o bolo na mão e sorriso cúmplice]',
          overlayText: 'PORQUE FALHA ❌',
        },
        {
          id: 'hook-4',
          type: 'Story Opener',
          spokenHook: `A maioria das receitas manda bater a massa sem parar. Olha porque é que isso arruína a textura.`,
          visualHook: '[VISUAL: Texto no ecrã "Pára de bater a farinha" com som de alerta]',
          overlayText: 'NÃO BATAS A MASSA 🚫',
        },
        {
          id: 'hook-5',
          type: 'Visual Shock',
          spokenHook: `Existe um segredo simples de temperatura que muda completamente o resultado de ${subject}.`,
          visualHook: '[VISUAL: Ponto do forno ajustado com efeito sonoro rápido]',
          overlayText: 'SEGREDO DO FORNO 🔥',
        },
      ];

  // 4. CTAs
  const ctas: CallToAction[] = isUK
    ? [
        {
          id: 'cta-1',
          goal: 'Save / Bookmark',
          spokenCta: 'Save this video to your library right now so you have the exact steps ready for your next weekend bake!',
          onScreenText: 'SAVE THIS RECIPE 📌',
          platformBestPractice: 'Gesture towards the save button to maximise algorithmic bookmark weight.',
        },
        {
          id: 'cta-2',
          goal: 'Comment / Keyword Automation',
          spokenCta: 'Comment "RECIPE" down below and I will send the exact weights in grams straight to you!',
          onScreenText: 'COMMENT "RECIPE" FOR GRAMS 💬',
          platformBestPractice: 'Triggers high comment velocity within the first 30 minutes of publishing.',
        },
        {
          id: 'cta-3',
          goal: 'Follow / Subscribe',
          spokenCta: 'Subscribe to the channel for more foolproof, no-nonsense kitchen guides every week!',
          onScreenText: 'SUBSCRIBE FOR MORE RECIPES 🔔',
          platformBestPractice: 'Place end screen subscribe card in the final 15 seconds.',
        },
      ]
    : [
        {
          id: 'cta-1',
          goal: 'Save / Bookmark',
          spokenCta: 'Guarda este vídeo nos favoritos para teres a receita à mão quando fores para a cozinha!',
          onScreenText: 'GUARDA ESTA RECEITA 📌',
          platformBestPractice: 'Apontar para o botão de guardar no canto inferior direito.',
        },
        {
          id: 'cta-2',
          goal: 'Comment / Keyword Automation',
          spokenCta: 'Comenta "RECEITA" nos comentários para te enviar a ficha completa com as medidas exatas em gramas!',
          onScreenText: 'COMENTA "RECEITA" 👇',
          platformBestPractice: 'Aumenta a velocidade de comentários nos primeiros minutos.',
        },
        {
          id: 'cta-3',
          goal: 'Follow / Subscribe',
          spokenCta: 'Segue o canal para não perderes os próximos guias práticos de culinária descomplicada!',
          onScreenText: 'SEGUE PARA MAIS RECEITAS 🔔',
          platformBestPractice: 'Encerramento com sorriso e chamada de ação clara.',
        },
      ];

  return { scripts, titles, hooks, ctas };
}

function buildGardeningScriptBundle(
  topic: string,
  subject: string,
  market: TargetMarket,
  platform: Platform,
  isShorts: boolean
): ScriptBundle {
  const isUK = market === 'en-GB';

  const scripts: ScriptVariation[] = [
    {
      id: `script-${market.toLowerCase()}-contrarian`,
      style: 'contrarian-mythbuster',
      styleName: isUK ? 'Variation 1: The Myth-Buster (Contrarian)' : 'Variação 1: O Quebrador de Mitos (Contrarian)',
      badge: isUK ? 'Highest Retention & Debate' : 'Maior Retenção & Debate',
      tagline: isUK ? 'Challenges common plant watering habits and demonstrates root health.' : 'Desmonta erros comuns de rega e solo que sufocam as plantas.',
      estimatedDuration: isShorts ? '45 seconds' : '12 minutes',
      targetWordCount: isShorts ? 135 : 1700,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: '[VISUAL: Inspecting plant roots with clear drainage pot]',
          spokenText: formatScript1Opening(topic, market),
          audioToneCue: '[AUDIO: Crisp cut effect / no music in first 2 seconds]',
        },
        {
          timestamp: '0:03 - 0:12',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: '[VISUAL: Showing waterlogged, compacted soil vs aerated healthy mix]',
          spokenText: isUK
            ? 'Most gardening guides tell you to water on a rigid daily schedule. But in damp soil, over-watering rots roots from the bottom up before you even notice yellow leaves.'
            : 'A maioria dos manuais diz para regar todos os dias. Mas em solos sem drenagem, a água estagnada queima e apodrece as raízes antes de veres as folhas amarelas.',
          audioToneCue: '[AUDIO: Subtle bass drop]',
        },
        {
          timestamp: '0:12 - 0:32',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Demonstrating finger moisture check and adding perlite/organic compost]',
          spokenText: isUK
            ? 'Use the finger test 2 inches into the soil. Water deeply only when the top layer is dry, and ensure pots have proper drainage holes. That simple shift saves 90% of plants.'
            : 'Verifica a humidade a 3 centímetros de profundidade. Rega em profundidade apenas quando o topo estiver seco e garante furos de drenagem no vaso. Isto salva 90% das plantas.',
          audioToneCue: '[AUDIO: Upbeat botanical pacing]',
        },
        {
          timestamp: '0:32 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Healthy thriving foliage with lush green shoots]',
          spokenText: isUK
            ? 'The difference is watching your plants thrive with vibrant green growth instead of constantly replacing dead pots.'
            : 'A diferença é veres as tuas plantas a crescerem fortes e viçosas em vez de estares sempre a deitar vasos fora.',
          audioToneCue: '[AUDIO: Warm, satisfying resolution note]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Gesture towards bookmark button]',
          spokenText: isUK
            ? 'Save this video to save your garden, and comment "GARDEN" for the seasonal planting guide!'
            : 'Guarda este vídeo para protegeres as tuas plantas e comenta "JARDIM" para o calendário sazonal!',
          audioToneCue: '[AUDIO: Subtle notification chime]',
        },
      ],
      fullSpokenText: isUK
        ? `${formatScript1Opening(topic, market)} Most gardening guides tell you to water on a rigid daily schedule. But in damp soil, over-watering rots roots from the bottom up before you even notice yellow leaves. Use the finger test 2 inches into the soil. Water deeply only when the top layer is dry, and ensure pots have proper drainage holes. That simple shift saves 90% of plants. The difference is watching your plants thrive with vibrant green growth instead of constantly replacing dead pots. Save this video to save your garden, and comment "GARDEN" for the seasonal planting guide!`
        : `${formatScript1Opening(topic, market)} A maioria dos manuais diz para regar todos os dias. Mas em solos sem drenagem, a água estagnada queima e apodrece as raízes antes de veres as folhas amarelas. Verifica a humidade a 3 centímetros de profundidade. Rega em profundidade apenas quando o topo estiver seco e garante furos de drenagem no vaso. Isto salva 90% das plantas. A diferença é veres as tuas plantas a crescerem fortes e viçosas em vez de estares sempre a deitar vasos fora. Guarda este vídeo para protegeres as tuas plantas e comenta "JARDIM" para o calendário sazonal!`,
    },
    {
      id: `script-${market.toLowerCase()}-story`,
      style: 'story-driven-case-study',
      styleName: isUK ? 'Variation 2: Journey & Recovery (Story-Driven)' : 'Variação 2: Estudo de Caso & Recuperação',
      badge: isUK ? 'Peak Relatability' : 'Máxima Conexão & Empatia',
      tagline: isUK ? 'Personal journey from killing house plants to maintaining a flourishing garden.' : 'A jornada real de quem não tinha jeito para plantas até encontrar o método infalível.',
      estimatedDuration: isShorts ? '50 seconds' : '14 minutes',
      targetWordCount: isShorts ? 145 : 2000,
      sections: [
        {
          timestamp: '0:00 - 0:04',
          stage: 'Hook',
          visualCue: '[VISUAL: Showing a wilting pot from months ago with a wry smile]',
          spokenText: isUK
            ? `Two seasons ago, I thought I had black fingers and kept killing ${subject} every single month.`
            : `Há uns meses achava que não tinha jeito nenhum para plantas e estava sempre a perder ${subject}.`,
          audioToneCue: '[AUDIO: Intimate storytelling tone]',
        },
        {
          timestamp: '0:04 - 0:15',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: '[VISUAL: Montage of expensive chemical fertilisers and dead leaves]',
          spokenText: isUK
            ? 'I was buying expensive feeds and following conflicting internet advice, but leaves kept dropping.'
            : 'Gastava dinheiro em adubos caros e seguia conselhos confusos na internet, mas as folhas continuavam a cair.',
          audioToneCue: '[AUDIO: Building musical pulse]',
        },
        {
          timestamp: '0:15 - 0:35',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Simple compost mix and correct natural morning light positioning]',
          spokenText: isUK
            ? 'Until I focused strictly on natural light exposure and letting roots breathe in aerated compost. That one shift turned everything around.'
            : 'Até que mudei para um solo com boa drenagem e coloquei a planta onde apanha luz indireta da manhã. Foi a chave para tudo.',
          audioToneCue: '[AUDIO: Confident tempo]',
        },
        {
          timestamp: '0:35 - 0:43',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Lush, flourishing plant with healthy new shoots]',
          spokenText: isUK
            ? 'Now it takes me 10 minutes a week to care for and it thrives throughout the entire season.'
            : 'Agora levo 10 minutos por semana a cuidar disto e tenho folhas verdes todo o ano.',
          audioToneCue: '[AUDIO: Warm conclusion]',
        },
        {
          timestamp: '0:43 - 0:50',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Pointing to follow button]',
          spokenText: isUK
            ? 'Bookmark this video for later and follow for more straightforward, practical plant tips!'
            : 'Guarda este vídeo nos favoritos e segue o canal para mais dicas práticas de jardinagem!',
          audioToneCue: '[AUDIO: Sign-off chime]',
        },
      ],
      fullSpokenText: isUK
        ? `Two seasons ago, I thought I had black fingers and kept killing ${subject} every single month. I was buying expensive feeds and following conflicting internet advice, but leaves kept dropping. Until I focused strictly on natural light exposure and letting roots breathe in aerated compost. That one shift turned everything around. Now it takes me 10 minutes a week to care for and it thrives throughout the entire season. Bookmark this video for later and follow for more straightforward, practical plant tips!`
        : `Há uns meses achava que não tinha jeito nenhum para plantas e estava sempre a perder ${subject}. Gastava dinheiro em adubos caros e seguia conselhos confusos na internet, mas as folhas continuavam a cair. Até que mudei para um solo com boa drenagem e coloquei a planta onde apanha luz indireta da manhã. Foi a chave para tudo. Agora levo 10 minutos por semana a cuidar disto e tenho folhas verdes todo o ano. Guarda este vídeo nos favoritos e segue o canal para mais dicas práticas de jardinagem!`,
    },
    {
      id: `script-${market.toLowerCase()}-blueprint`,
      style: 'actionable-blueprint',
      styleName: isUK ? 'Variation 3: The 4-Step Action Blueprint' : 'Variação 3: O Passo a Passo Definitivo (Blueprint)',
      badge: isUK ? 'Highest Save & Share Rate' : 'Maior Taxa de Salvamento',
      tagline: isUK ? 'Clear, ordered planting steps from potting to flourishing foliage.' : 'Guia de 4 passos práticos para plantar e manter sem falhas.',
      estimatedDuration: isShorts ? '45 seconds' : '15 minutes',
      targetWordCount: isShorts ? 135 : 2100,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: '[VISUAL: Clean potting bench with plant pot, compost, and trowel]',
          spokenText: isUK
            ? `Here is the complete 4-step blueprint to keep ${subject} thriving without hassle.`
            : `Aqui está o passo a passo em 4 etapas para cuidares de ${subject} sem complicações.`,
          audioToneCue: '[AUDIO: High energy opening sound]',
        },
        {
          timestamp: '0:03 - 0:15',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Adding drainage pebbles and light organic potting mix]',
          spokenText: isUK
            ? 'Step 1: Choose a container with base holes and loose, well-draining compost. Step 2: Position in bright, indirect sunlight.'
            : 'Passo 1: Escolhe um vaso com furos e terra leve bem arejada. Passo 2: Coloca num local com boa luz natural indireta.',
          audioToneCue: '[AUDIO: Instructional rhythm]',
        },
        {
          timestamp: '0:15 - 0:30',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Deep watering at base and light organic liquid feed]',
          spokenText: isUK
            ? 'Step 3: Water deeply at soil level, never over leaves. Step 4: Prune dead leaves to direct energy to new growth.'
            : 'Passo 3: Rega junto à base sem molhar as folhas. Passo 4: Retira folhas secas para concentrar a energia em novos rebentos.',
          audioToneCue: '[AUDIO: Upbeat nature soundscape]',
        },
        {
          timestamp: '0:30 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Vibrant green plant with strong root stability]',
          spokenText: isUK
            ? 'Follow these 4 steps and your plants will flourish even through seasonal changes.'
            : 'Aplica estes 4 passos e as tuas plantas vão manter-se viçosas o ano inteiro.',
          audioToneCue: '[AUDIO: Confident resolution]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: On-screen checklist card graphic]',
          spokenText: isUK
            ? 'Share this with a fellow plant lover and comment "PLANTS" for the complete guide!'
            : 'Partilha este vídeo com quem adora plantas e comenta "PLANTAS" para receberes o guia!',
          audioToneCue: '[AUDIO: Notification chime]',
        },
      ],
      fullSpokenText: isUK
        ? `Here is the complete 4-step blueprint to keep ${subject} thriving without hassle. Step 1: Choose a container with base holes and loose, well-draining compost. Step 2: Position in bright, indirect sunlight. Step 3: Water deeply at soil level, never over leaves. Step 4: Prune dead leaves to direct energy to new growth. Follow these 4 steps and your plants will flourish even through seasonal changes. Share this with a fellow plant lover and comment "PLANTS" for the complete guide!`
        : `Aqui está o passo a passo em 4 etapas para cuidares de ${subject} sem complicações. Passo 1: Escolhe um vaso com furos e terra leve bem arejada. Passo 2: Coloca num local com boa luz natural indireta. Passo 3: Rega junto à base sem molhar as folhas. Passo 4: Retira folhas secas para concentrar a energia em novos rebentos. Aplica estes 4 passos e as tuas plantas vão manter-se viçosas o ano inteiro. Partilha este vídeo com quem adora plantas e comenta "PLANTAS" para receberes o guia!`,
    },
  ];

  const titles: TitleIdea[] = isUK
    ? [
        { id: 'title-1', type: 'Contrarian', title: `The Fatal Mistake with ${subject} in UK Gardens (And How to Fix It)`, score: 96 },
        { id: 'title-2', type: 'Outcome / How-To', title: `How to Grow ${subject} from Scratch on a Budget`, score: 94 },
        { id: 'title-3', type: 'Curiosity Gap', title: `Budget Supermarket Compost vs Garden Centre Soil for ${subject}: Tested!`, score: 92 },
        { id: 'title-4', type: 'Fear of Missing Out / Loss', title: `3 Common Plant Care Habits Ruining Your ${subject}`, score: 91 },
        { id: 'title-5', type: 'Number / Listicle', title: `The 10-Minute Weekly Care Routine for Thriving ${subject}`, score: 89 },
      ]
    : [
        { id: 'title-1', type: 'Contrarian', title: `O Maior Erro com ${subject} que Queima as Raízes (E Como Evitar)`, score: 96 },
        { id: 'title-2', type: 'Outcome / How-To', title: `Como Cuidar de ${subject} do Zero Passo a Passo`, score: 94 },
        { id: 'title-3', type: 'Curiosity Gap', title: `Substrato Barato vs Especial para ${subject}: Qual a Diferença Real?`, score: 92 },
        { id: 'title-4', type: 'Fear of Missing Out / Loss', title: `3 Hábitos de Rega que Arruínam ${subject} sem Saberes`, score: 91 },
        { id: 'title-5', type: 'Number / Listicle', title: `A Rotina de 10 Minutos por Semana para Manter ${subject} Saudável`, score: 89 },
      ];

  const hooks: HookIdea[] = isUK
    ? [
        { id: 'hook-1', type: 'Pattern Interrupt', spokenHook: formatSpokenHook(topic, market), visualHook: '[VISUAL: Showing healthy roots vs rotted root ball]', overlayText: 'STOP DOING THIS ⚠️' },
        { id: 'hook-2', type: 'Bold Statement', spokenHook: `Want to keep ${subject} thriving all year round with just 10 minutes a week? Here is how.`, visualHook: '[VISUAL: Lush green garden bed in morning light]', overlayText: '10-MINUTE METHOD 🌿' },
        { id: 'hook-3', type: 'Provocative Question', spokenHook: `If your leaves keep turning yellow and dropping off, the problem isn't your green fingers — it's this.`, visualHook: '[VISUAL: Showing a single yellowing leaf with diagnostic inspection]', overlayText: 'WHY LEAVES DROP ❌' },
        { id: 'hook-4', type: 'Story Opener', spokenHook: `Most people water their plants on a strict daily schedule. Here is why that's actually killing them.`, visualHook: '[VISUAL: Holding watering can with warning graphic]', overlayText: 'STOP WATERING DAILY 🚫' },
        { id: 'hook-5', type: 'Visual Shock', spokenHook: `There is one simple drainage trick that prevents 90% of plant failures with ${subject}.`, visualHook: '[VISUAL: Demonstrating proper drainage base holes]', overlayText: 'DRAINAGE SECRET 💧' },
      ]
    : [
        { id: 'hook-1', type: 'Pattern Interrupt', spokenHook: formatSpokenHook(topic, market), visualHook: '[VISUAL: Comparação visual entre raiz saudável e raiz asfixiada]', overlayText: 'PÁRA DE FAZER ISTO ⚠️' },
        { id: 'hook-2', type: 'Bold Statement', spokenHook: `Queres ter ${subject} verde e saudável o ano inteiro com apenas 10 minutos por semana?`, visualHook: '[VISUAL: Folhagem viçosa com luz natural]', overlayText: 'MÉTODO DE 10 MIN 🌿' },
        { id: 'hook-3', type: 'Provocative Question', spokenHook: `Se as folhas de ${subject} estão a amarelar, o problema não és tu — é este detalhe no solo.`, visualHook: '[VISUAL: Inspeção de folha com tom acolhedor]', overlayText: 'PORQUE AMARELAM ❌' },
        { id: 'hook-4', type: 'Story Opener', spokenHook: `Quase toda a gente rega as plantas todos os dias. Olha porque é que isso pode estar a sufocar as raízes.`, visualHook: '[VISUAL: Regador com aviso em texto no ecrã]', overlayText: 'NÃO REGUES ASSIM 🚫' },
        { id: 'hook-5', type: 'Visual Shock', spokenHook: `Existe um truque simples de drenagem que salva quase todas as mudas de ${subject}.`, visualHook: '[VISUAL: Demonstração de vaso com furos e pedras de drenagem]', overlayText: 'SEGREDO DA DRENAGEM 💧' },
      ];

  const ctas: CallToAction[] = isUK
    ? [
        { id: 'cta-1', goal: 'Save / Bookmark', spokenCta: 'Save this video to your library so you can refer back when tending your garden this weekend!', onScreenText: 'SAVE THIS GUIDE 📌', platformBestPractice: 'Gesture to save button.' },
        { id: 'cta-2', goal: 'Comment / Keyword Automation', spokenCta: 'Comment "PLANTS" below and I will send the seasonal care checklist straight to you!', onScreenText: 'COMMENT "PLANTS" 💬', platformBestPractice: 'Drives initial comment velocity.' },
        { id: 'cta-3', goal: 'Follow / Subscribe', spokenCta: 'Subscribe to the channel for more practical, honest gardening walkthroughs!', onScreenText: 'SUBSCRIBE FOR MORE GARDENING 🔔', platformBestPractice: 'Add end-screen subscribe card.' },
      ]
    : [
        { id: 'cta-1', goal: 'Save / Bookmark', spokenCta: 'Guarda este vídeo nos favoritos para teres o guia à mão no fim de semana!', onScreenText: 'GUARDA ESTE GUIA 📌', platformBestPractice: 'Apontar para o botão de guardar.' },
        { id: 'cta-2', goal: 'Comment / Keyword Automation', spokenCta: 'Comenta "PLANTAS" para receberes a lista sazonal de cuidados!', onScreenText: 'COMENTA "PLANTAS" 👇', platformBestPractice: 'Aumenta interação nos primeiros minutos.' },
        { id: 'cta-3', goal: 'Follow / Subscribe', spokenCta: 'Segue o canal para não perderes mais dicas simples de jardinagem!', onScreenText: 'SEGUE PARA MAIS DICAS 🔔', platformBestPractice: 'Encerramento acolhedor.' },
      ];

  return { scripts, titles, hooks, ctas };
}

function buildHealthScriptBundle(
  topic: string,
  subject: string,
  market: TargetMarket,
  platform: Platform,
  isShorts: boolean
): ScriptBundle {
  const isUK = market === 'en-GB';

  const scripts: ScriptVariation[] = [
    {
      id: `script-${market.toLowerCase()}-contrarian`,
      style: 'contrarian-mythbuster',
      styleName: isUK ? 'Variation 1: The Myth-Buster (Contrarian)' : 'Variação 1: O Quebrador de Mitos (Contrarian)',
      badge: isUK ? 'Highest Retention & Debate' : 'Maior Retenção & Debate',
      tagline: isUK ? 'Challenges unsustainable crash diets and reveals realistic nutritional vitality.' : 'Desmonta dietas restritivas e revela a rotina prática de nutrição sustentável.',
      estimatedDuration: isShorts ? '45 seconds' : '12 minutes',
      targetWordCount: isShorts ? 135 : 1700,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: '[VISUAL: Hearty, vibrant plate of real whole food on kitchen counter]',
          spokenText: formatScript1Opening(topic, market),
          audioToneCue: '[AUDIO: Crisp cut effect / no music in first 2 seconds]',
        },
        {
          timestamp: '0:03 - 0:12',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: '[VISUAL: Showing bland, dry diet food vs balanced colourful plate]',
          spokenText: isUK
            ? '90% of fitness advice tells you to cut all carbs and survive on plain chicken and lettuce. The problem? Your energy crashes and you quit by week two.'
            : '90% das dicas na internet mandam cortar tudo e passar fome com comida sem sabor. O problema? Ficas sem energia e desistes na segunda semana.',
          audioToneCue: '[AUDIO: Subtle bass drop and building rhythm]',
        },
        {
          timestamp: '0:12 - 0:32',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Quick pan action: cooking high-protein meal in 12 minutes with olive oil and greens]',
          spokenText: isUK
            ? 'Look at this simple shift: 30g of quality protein per meal, colourful fibrous vegetables, and healthy fats from olive oil or nuts. That is how you stay full and keep your metabolism firing.'
            : 'Olha para este ajuste simples: 30g de proteína de qualidade por refeição, legumes coloridos e gorduras boas como azeite. É isto que te dá saciedade e energia sem sofrimento.',
          audioToneCue: '[AUDIO: Upbeat, energetic kitchen audio]',
        },
        {
          timestamp: '0:32 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Energetic presenter taking a delicious bite with confidence]',
          spokenText: isUK
            ? 'The difference is enjoying your meals every single day while building lasting health and mobility.'
            : 'A diferença é teres prazer à mesa todos os dias e sentires uma energia constante da manhã à noite.',
          audioToneCue: '[AUDIO: Warm, motivating resolution]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Gesture towards save button with checklist graphic]',
          spokenText: isUK
            ? 'Save this video to your favourites and comment "HEALTH" for the 15-minute recipe guide!'
            : 'Guarda este vídeo nos favoritos e comenta "SAÚDE" para receberes o guia de receitas rápidas!',
          audioToneCue: '[AUDIO: Notification chime]',
        },
      ],
      fullSpokenText: isUK
        ? `${formatScript1Opening(topic, market)} 90% of fitness advice tells you to cut all carbs and survive on plain chicken and lettuce. The problem? Your energy crashes and you quit by week two. Look at this simple shift: 30g of quality protein per meal, colourful fibrous vegetables, and healthy fats from olive oil or nuts. That is how you stay full and keep your metabolism firing. The difference is enjoying your meals every single day while building lasting health and mobility. Save this video to your favourites and comment "HEALTH" for the 15-minute recipe guide!`
        : `${formatScript1Opening(topic, market)} 90% das dicas na internet mandam cortar tudo e passar fome com comida sem sabor. O problema? Ficas sem energia e desistes na segunda semana. Olha para este ajuste simples: 30g de proteína de qualidade por refeição, legumes coloridos e gorduras boas como azeite. É isto que te dá saciedade e energia sem sofrimento. A diferença é teres prazer à mesa todos os dias e sentires uma energia constante da manhã à noite. Guarda este vídeo nos favoritos e comenta "SAÚDE" para receberes o guia de receitas rápidas!`,
    },
    {
      id: `script-${market.toLowerCase()}-story`,
      style: 'story-driven-case-study',
      styleName: isUK ? 'Variation 2: Journey & Case Study (Story-Driven)' : 'Variação 2: Estudo de Caso & Mudança Real',
      badge: isUK ? 'Peak Relatability' : 'Máxima Conexão & Empatia',
      tagline: isUK ? 'Real journey from afternoon sluggishness to consistent vitality using simple habits.' : 'A jornada real de quem vivia cansado até desbloquear hábitos sustentáveis.',
      estimatedDuration: isShorts ? '50 seconds' : '14 minutes',
      targetWordCount: isShorts ? 145 : 2000,
      sections: [
        {
          timestamp: '0:00 - 0:04',
          stage: 'Hook',
          visualCue: '[VISUAL: Looking at clock showing 3pm with low energy]',
          spokenText: isUK
            ? `Two years ago I was having a massive 3pm energy crash every single day when dealing with ${subject}.`
            : `Há uns tempos sentia uma quebra de energia brutal a meio da tarde ao tentar cuidar de ${subject}.`,
          audioToneCue: '[AUDIO: Reflective piano intro]',
        },
        {
          timestamp: '0:04 - 0:15',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: '[VISUAL: Showing useless supplement pills and energy drinks]',
          spokenText: isUK
            ? 'I tried expensive powders and restrictive diet rules, but nothing gave me lasting focus.'
            : 'Gastava dinheiro em suplementos e seguia dietas malucas, mas nada me dava foco duradouro.',
          audioToneCue: '[AUDIO: Building tempo]',
        },
        {
          timestamp: '0:15 - 0:35',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Demonstrating a 15-minute whole food pan meal on the hob]',
          spokenText: isUK
            ? 'Until I focused on real supermarket whole foods and 15-minute prep times. That single shift gave me my energy back.'
            : 'Até que mudei para comida de verdade e refeições de 15 minutos na frigideira. Foi aí que tudo mudou.',
          audioToneCue: '[AUDIO: Upbeat, confident rhythm]',
        },
        {
          timestamp: '0:35 - 0:43',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: High energy lifestyle shot with smiling presenter]',
          spokenText: isUK
            ? 'Now I cook fast, hearty meals and maintain sharp focus all day long.'
            : 'Hoje cozinho rápido, como bem e sinto-me com energia o dia inteiro.',
          audioToneCue: '[AUDIO: Inspiring conclusion]',
        },
        {
          timestamp: '0:43 - 0:50',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Pointing to follow button]',
          spokenText: isUK
            ? 'Bookmark this video for later and follow for more sensible everyday health tips!'
            : 'Guarda este vídeo nos favoritos e segue o canal para mais dicas práticas de saúde!',
          audioToneCue: '[AUDIO: Sign-off chime]',
        },
      ],
      fullSpokenText: isUK
        ? `Two years ago I was having a massive 3pm energy crash every single day when dealing with ${subject}. I tried expensive powders and restrictive diet rules, but nothing gave me lasting focus. Until I focused on real supermarket whole foods and 15-minute prep times. That single shift gave me my energy back. Now I cook fast, hearty meals and maintain sharp focus all day long. Bookmark this video for later and follow for more sensible everyday health tips!`
        : `Há uns tempos sentia uma quebra de energia brutal a meio da tarde ao tentar cuidar de ${subject}. Gastava dinheiro em suplementos e seguia dietas malucas, mas nada me dava foco duradouro. Até que mudei para comida de verdade e refeições de 15 minutos na frigideira. Foi aí que tudo mudou. Hoje cozinho rápido, como bem e sinto-me com energia o dia inteiro. Guarda este vídeo nos favoritos e segue o canal para mais dicas práticas de saúde!`,
    },
    {
      id: `script-${market.toLowerCase()}-blueprint`,
      style: 'actionable-blueprint',
      styleName: isUK ? 'Variation 3: The 4-Step Action Blueprint' : 'Variação 3: O Passo a Passo Definitivo (Blueprint)',
      badge: isUK ? 'Highest Save & Share Rate' : 'Maior Taxa de Salvamento',
      tagline: isUK ? 'Structured 4-step framework for sustainable nutrition and strength.' : 'Guia de 4 passos para refeições rápidas e nutritivas.',
      estimatedDuration: isShorts ? '45 seconds' : '15 minutes',
      targetWordCount: isShorts ? 135 : 2100,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: '[VISUAL: Clean chopping board with fresh whole food ingredients]',
          spokenText: isUK
            ? `Here is the 4-step blueprint to nail ${subject} without spending hours cooking.`
            : `Aqui está o passo a passo em 4 etapas para dominares ${subject} sem passar horas no fogão.`,
          audioToneCue: '[AUDIO: Dynamic opening sound]',
        },
        {
          timestamp: '0:03 - 0:15',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Prepping high-protein base and fresh vegetables in a hot pan]',
          spokenText: isUK
            ? 'Step 1: Pick a lean, high-protein base. Step 2: Add two fistfuls of fibrous seasonal vegetables.'
            : 'Passo 1: Escolhe uma boa base de proteína. Passo 2: Junta duas porções generosas de legumes frescos.',
          audioToneCue: '[AUDIO: Pacing with frying sound]',
        },
        {
          timestamp: '0:15 - 0:30',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Drizzling extra virgin olive oil and serving on a plate]',
          spokenText: isUK
            ? 'Step 3: Season with natural spices and healthy oils. Step 4: Keep prep under 15 minutes to guarantee consistency.'
            : 'Passo 3: Tempera com azeite virgem e especiarias naturais. Passo 4: Mantém o tempo de preparação abaixo dos 15 minutos.',
          audioToneCue: '[AUDIO: Upbeat kitchen tempo]',
        },
        {
          timestamp: '0:30 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Steaming, delicious meal ready on plate in under 15 minutes]',
          spokenText: isUK
            ? 'Follow these 4 steps and you will build genuine vitality without restrictive fads.'
            : 'Aplica estes 4 passos e tens nutrição de verdade todos os dias com zero complicação.',
          audioToneCue: '[AUDIO: Confident resolution]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: On-screen card graphic with macro breakdown]',
          spokenText: isUK
            ? 'Share this with someone who needs quick healthy meals and comment "BLUEPRINT" for the guide!'
            : 'Partilha com quem precisa de refeições saudáveis e comenta "GUIA" para receberes o resumo!',
          audioToneCue: '[AUDIO: Notification chime]',
        },
      ],
      fullSpokenText: isUK
        ? `Here is the 4-step blueprint to nail ${subject} without spending hours cooking. Step 1: Pick a lean, high-protein base. Step 2: Add two fistfuls of fibrous seasonal vegetables. Step 3: Season with natural spices and healthy oils. Step 4: Keep prep under 15 minutes to guarantee consistency. Follow these 4 steps and you will build genuine vitality without restrictive fads. Share this with someone who needs quick healthy meals and comment "BLUEPRINT" for the guide!`
        : `Aqui está o passo a passo em 4 etapas para dominares ${subject} sem passar horas no fogão. Passo 1: Escolhe uma boa base de proteína. Passo 2: Junta duas porções generosas de legumes frescos. Passo 3: Tempera com azeite virgem e especiarias naturais. Passo 4: Mantém o tempo de preparação abaixo dos 15 minutos. Aplica estes 4 passos e tens nutrição de verdade todos os dias com zero complicação. Partilha com quem precisa de refeições saudáveis e comenta "GUIA" para receberes o resumo!`,
    },
  ];

  const titles: TitleIdea[] = isUK
    ? [
        { id: 'title-1', type: 'Contrarian', title: `The #1 Unsustainable Mistake with ${subject} (And How to Fix It)`, score: 96 },
        { id: 'title-2', type: 'Outcome / How-To', title: `Quick Nutrient-Dense Meals for ${subject} in Under 15 Minutes`, score: 94 },
        { id: 'title-3', type: 'Curiosity Gap', title: `Supermarket Whole Foods vs Expensive Powders for ${subject}: Tested!`, score: 92 },
        { id: 'title-4', type: 'Fear of Missing Out / Loss', title: `3 Health 'Hacks' for ${subject} You Should Stop Doing Today`, score: 91 },
        { id: 'title-5', type: 'Number / Listicle', title: `The 15-Minute Daily Habit for Lifelong Vitality with ${subject}`, score: 89 },
      ]
    : [
        { id: 'title-1', type: 'Contrarian', title: `O Maior Erro em ${subject} que Faz 90% das Pessoas Desistirem`, score: 96 },
        { id: 'title-2', type: 'Outcome / How-To', title: `Refeições Rápidas de Alta Proteína para ${subject} em 15 Minutos`, score: 94 },
        { id: 'title-3', type: 'Curiosity Gap', title: `Comida de Supermercado vs Suplementos Caros para ${subject}: A Verdade`, score: 92 },
        { id: 'title-4', type: 'Fear of Missing Out / Loss', title: `3 Modismos sobre ${subject} que Deves Parar Hoje`, score: 91 },
        { id: 'title-5', type: 'Number / Listicle', title: `A Rotina Diária de 15 Minutos para Vitalidade em ${subject}`, score: 89 },
      ];

  const hooks: HookIdea[] = isUK
    ? [
        { id: 'hook-1', type: 'Pattern Interrupt', spokenHook: formatSpokenHook(topic, market), visualHook: '[VISUAL: Showing balanced whole food plate vs powder tub]', overlayText: 'STOP STARVING ⚠️' },
        { id: 'hook-2', type: 'Bold Statement', spokenHook: `Want to build lasting energy and strength with simple supermarket foods? Here is the blueprint.`, visualHook: '[VISUAL: Sizzling pan meal ready in minutes]', overlayText: 'ENERGY BLUEPRINT ⚡' },
        { id: 'hook-3', type: 'Provocative Question', spokenHook: `If you feel sluggish every afternoon, the problem isn't your willpower — it's this simple meal balance.`, visualHook: '[VISUAL: Sympathetic expression cutting straight to plate]', overlayText: 'NO MORE CRASHES ❌' },
        { id: 'hook-4', type: 'Story Opener', spokenHook: `Most online fitness creators tell you to cut everything you enjoy. Here is why that ruins your results.`, visualHook: '[VISUAL: Holding plate of real food with text "Stop starving yourself"]', overlayText: 'STOP RESTRICTING 🚫' },
        { id: 'hook-5', type: 'Visual Shock', spokenHook: `There is one simple nutrition rule that keeps you full and energised all day long.`, visualHook: '[VISUAL: Protein breakdown on screen with clean audio]', overlayText: 'FULL ALL DAY 🥗' },
      ]
    : [
        { id: 'hook-1', type: 'Pattern Interrupt', spokenHook: formatSpokenHook(topic, market), visualHook: '[VISUAL: Prato delicioso de comida real vs suplementos caros]', overlayText: 'PÁRA DE PASSAR FOME ⚠️' },
        { id: 'hook-2', type: 'Bold Statement', spokenHook: `Queres ter energia constante o dia inteiro com ingredientes simples de supermercado?`, visualHook: '[VISUAL: Frigideira com refeição apetitosa em preparação]', overlayText: 'ENERGIA REAL ⚡' },
        { id: 'hook-3', type: 'Provocative Question', spokenHook: `Se sentes cansaço constante a meio da tarde, o problema não és tu — é esta regra no almoço.`, visualHook: '[VISUAL: Expressão acolhedora a mostrar o prato equilibrado]', overlayText: 'CHEGA DE CANSAÇO ❌' },
        { id: 'hook-4', type: 'Story Opener', spokenHook: `A maioria das dietas manda passar fome. Olha porque é que isso destrói o teu metabolismo.`, visualHook: '[VISUAL: Texto "Pára de passar fome" com som de alerta]', overlayText: 'DIETAS MALUCAS 🚫' },
        { id: 'hook-5', type: 'Visual Shock', spokenHook: `Existe um segredo simples de saciedade que acaba com as vontades de petiscar à tarde.`, visualHook: '[VISUAL: Demonstração de alimentos ricos em fibra e proteína]', overlayText: 'SACIEDADE TOTAL 🥗' },
      ];

  const ctas: CallToAction[] = isUK
    ? [
        { id: 'cta-1', goal: 'Save / Bookmark', spokenCta: 'Save this video to your library right now for your weekly health plan!', onScreenText: 'SAVE THIS RECIPE 📌', platformBestPractice: 'Gesture to save button.' },
        { id: 'cta-2', goal: 'Comment / Keyword Automation', spokenCta: 'Comment "HEALTH" below and I will send the 15-minute meal guide straight to you!', onScreenText: 'COMMENT "HEALTH" 💬', platformBestPractice: 'Drives initial comment velocity.' },
        { id: 'cta-3', goal: 'Follow / Subscribe', spokenCta: 'Subscribe to the channel for more sensible, evidence-based wellness tips!', onScreenText: 'SUBSCRIBE FOR HEALTH 🔔', platformBestPractice: 'Add end-screen card.' },
      ]
    : [
        { id: 'cta-1', goal: 'Save / Bookmark', spokenCta: 'Guarda este vídeo nos favoritos para teres a receita à mão durante a semana!', onScreenText: 'GUARDA ESTA RECEITA 📌', platformBestPractice: 'Apontar para o botão de guardar.' },
        { id: 'cta-2', goal: 'Comment / Keyword Automation', spokenCta: 'Comenta "SAÚDE" nos comentários para receberes o guia completo de refeições!', onScreenText: 'COMENTA "SAÚDE" 👇', platformBestPractice: 'Aumenta interação inicial.' },
        { id: 'cta-3', goal: 'Follow / Subscribe', spokenCta: 'Segue o canal para mais receitas saudáveis e práticas todos os dias!', onScreenText: 'SEGUE PARA MAIS DICAS 🔔', platformBestPractice: 'Encerramento acolhedor.' },
      ];

  return { scripts, titles, hooks, ctas };
}

function buildConsumerBudgetingScriptBundle(
  topic: string,
  subject: string,
  market: TargetMarket,
  platform: Platform,
  isShorts: boolean
): ScriptBundle {
  const isUK = market === 'en-GB';

  const scripts: ScriptVariation[] = [
    {
      id: `script-${market.toLowerCase()}-contrarian`,
      style: 'contrarian-mythbuster',
      styleName: isUK ? 'Variation 1: The Myth-Buster (Contrarian)' : 'Variação 1: O Quebrador de Mitos (Contrarian)',
      badge: isUK ? 'Highest Retention & Debate' : 'Maior Retenção & Debate',
      tagline: isUK ? 'Exposes supermarket trolley pricing traps and demonstrates genuine receipt savings.' : 'Desmonta as armadilhas de preço por quilo e mostra poupança real na fatura.',
      estimatedDuration: isShorts ? '45 seconds' : '12 minutes',
      targetWordCount: isShorts ? 135 : 1700,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: '[VISUAL: Close-up of supermarket receipt showing high total, then pointing to shelf tag]',
          spokenText: formatScript1Opening(topic, market),
          audioToneCue: '[AUDIO: Crisp cut effect / no music in first 2 seconds]',
        },
        {
          timestamp: '0:03 - 0:12',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: '[VISUAL: Showing misleading "Buy 2" promo sticker vs tiny unit price (£/kg or €/kg)]',
          spokenText: isUK
            ? '90% of shoppers look only at the big bold promotional tags. But sneaky shrinkflation and fake bulk deals actually charge you 30% more per kilogram.'
            : '90% das pessoas olham apenas para os cartazes amarelos de promoção. Mas com a redução de embalagens e falsos descontos, acabas a pagar 30% a mais por quilo.',
          audioToneCue: '[AUDIO: Subtle bass drop and building rhythm]',
        },
        {
          timestamp: '0:12 - 0:32',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Trolley breakdown: swapping name brand for own-brand and checking price per kilo]',
          spokenText: isUK
            ? 'Look at this receipt comparison: swapping branded staples for supermarket own-brands and checking unit pricing saves £35 on this exact trolley without sacrificing quality.'
            : 'Olha para esta comparação real de faturas: trocar marcas conhecidas por marcas próprias de qualidade e conferir o preço por quilo poupou 42€ neste mesmo carrinho de compras.',
          audioToneCue: '[AUDIO: Upbeat, dynamic pricing pacing]',
        },
        {
          timestamp: '0:32 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Satisfied shopper packing grocery bags with significant receipt savings]',
          spokenText: isUK
            ? 'The difference is keeping hundreds of pounds in your bank account every month without feeling deprived at dinner.'
            : 'A diferença é manter centenas de euros na tua conta todos os meses sem teres de comer mal.',
          audioToneCue: '[AUDIO: Warm, triumphant conclusion]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Gesture towards bookmark button with on-screen text]',
          spokenText: isUK
            ? 'Save this video before your next food shop, and comment "SAVE" for the weekly shopping list!'
            : 'Guarda este vídeo antes de ires às compras e comenta "POUPAR" para a lista semanal inteligente!',
          audioToneCue: '[AUDIO: Notification chime]',
        },
      ],
      fullSpokenText: isUK
        ? `${formatScript1Opening(topic, market)} 90% of shoppers look only at the big bold promotional tags. But sneaky shrinkflation and fake bulk deals actually charge you 30% more per kilogram. Look at this receipt comparison: swapping branded staples for supermarket own-brands and checking unit pricing saves £35 on this exact trolley without sacrificing quality. The difference is keeping hundreds of pounds in your bank account every month without feeling deprived at dinner. Save this video before your next food shop, and comment "SAVE" for the weekly shopping list!`
        : `${formatScript1Opening(topic, market)} 90% das pessoas olham apenas para os cartazes amarelos de promoção. Mas com a redução de embalagens e falsos descontos, acabas a pagar 30% a mais por quilo. Olha para esta comparação real de faturas: trocar marcas conhecidas por marcas próprias de qualidade e conferir o preço por quilo poupou 42€ neste mesmo carrinho de compras. A diferença é manter centenas de euros na tua conta todos os meses sem teres de comer mal. Guarda este vídeo antes de ires às compras e comenta "POUPAR" para a lista semanal inteligente!`,
    },
    {
      id: `script-${market.toLowerCase()}-story`,
      style: 'story-driven-case-study',
      styleName: isUK ? 'Variation 2: Journey & Receipt Audit (Story-Driven)' : 'Variação 2: Estudo de Caso & Auditoria de Fatura',
      badge: isUK ? 'Peak Relatability' : 'Máxima Conexão & Empatia',
      tagline: isUK ? 'Personal journey from overspending on groceries to a streamlined weekly meal strategy.' : 'A jornada real de quem gastava demasiado em compras até encontrar o método semanal.',
      estimatedDuration: isShorts ? '50 seconds' : '14 minutes',
      targetWordCount: isShorts ? 145 : 2000,
      sections: [
        {
          timestamp: '0:00 - 0:04',
          stage: 'Hook',
          visualCue: '[VISUAL: Looking shocked at a supermarket till receipt total]',
          spokenText: isUK
            ? `Six months ago, our household food bill had completely spiralled out of control when shopping for ${subject}.`
            : `Há uns meses, a conta do supermercado em ${subject} estava completamente fora de controlo cá em casa.`,
          audioToneCue: '[AUDIO: Reflective piano intro]',
        },
        {
          timestamp: '0:04 - 0:15',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: '[VISUAL: Food waste going into bin at the end of the week]',
          spokenText: isUK
            ? 'We were throwing away limp salad and forgotten produce every Sunday, literally throwing money in the bin.'
            : 'Ao domingo deitávamos comida estragada fora e a sensação era de deitar notas para o lixo.',
          audioToneCue: '[AUDIO: Building tension pulse]',
        },
        {
          timestamp: '0:15 - 0:35',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: 15-minute Sunday meal plan on fridge door with overlapping ingredients]',
          spokenText: isUK
            ? 'Until we adopted a 15-minute weekly plan: audit the pantry first, buy staple items by unit price, and batch cook bases. That cut our grocery spending by 35% immediately.'
            : 'Até que adotámos um método de 15 minutos: ver o que há na despensa primeiro, comprar por preço por quilo e planear a semana. Cortámos 35% na fatura logo no primeiro mês.',
          audioToneCue: '[AUDIO: Upbeat, confident tempo]',
        },
        {
          timestamp: '0:35 - 0:43',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Clean, organised fridge and delicious family meal on table]',
          spokenText: isUK
            ? 'Now we eat delicious, hearty meals every night and save over £150 every single month.'
            : 'Agora comemos muito melhor cá em casa e poupamos mais de 150€ todos os meses.',
          audioToneCue: '[AUDIO: Warm conclusion]',
        },
        {
          timestamp: '0:43 - 0:50',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Pointing to follow button]',
          spokenText: isUK
            ? 'Bookmark this video for later and follow for more honest money-saving grocery audits!'
            : 'Guarda este vídeo nos favoritos e segue o canal para mais dicas reais de poupança!',
          audioToneCue: '[AUDIO: Sign-off chime]',
        },
      ],
      fullSpokenText: isUK
        ? `Six months ago, our household food bill had completely spiralled out of control when shopping for ${subject}. We were throwing away limp salad and forgotten produce every Sunday, literally throwing money in the bin. Until we adopted a 15-minute weekly plan: audit the pantry first, buy staple items by unit price, and batch cook bases. That cut our grocery spending by 35% immediately. Now we eat delicious, hearty meals every night and save over £150 every single month. Bookmark this video for later and follow for more honest money-saving grocery audits!`
        : `Há uns meses, a conta do supermercado em ${subject} estava completamente fora de controlo cá em casa. Ao domingo deitávamos comida estragada fora e a sensação era de deitar notas para o lixo. Até que adotámos um método de 15 minutos: ver o que há na despensa primeiro, comprar por preço por quilo e planear a semana. Cortámos 35% na fatura logo no primeiro mês. Agora comemos muito melhor cá em casa e poupamos mais de 150€ todos os meses. Guarda este vídeo nos favoritos e segue o canal para mais dicas reais de poupança!`,
    },
    {
      id: `script-${market.toLowerCase()}-blueprint`,
      style: 'actionable-blueprint',
      styleName: isUK ? 'Variation 3: The 4-Step Action Blueprint' : 'Variação 3: O Passo a Passo Definitivo (Blueprint)',
      badge: isUK ? 'Highest Save & Share Rate' : 'Maior Taxa de Salvamento',
      tagline: isUK ? 'Clear 4-step framework to slash grocery spending without feeling restricted.' : 'Guia de 4 passos para reduzir o gasto no supermercado com método.',
      estimatedDuration: isShorts ? '45 seconds' : '15 minutes',
      targetWordCount: isShorts ? 135 : 2100,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: '[VISUAL: Shopping trolley in aisle with on-screen blueprint graphic]',
          spokenText: isUK
            ? `Here is the 4-step blueprint to cut your grocery bill on ${subject} by 30%.`
            : `Aqui está o passo a passo em 4 etapas para cortares 30% nas compras de ${subject}.`,
          audioToneCue: '[AUDIO: High energy opening sound]',
        },
        {
          timestamp: '0:03 - 0:15',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Checking pantry cupboards and checking unit prices on shelf]',
          spokenText: isUK
            ? 'Step 1: Shop your own pantry before leaving home. Step 2: Compare the small unit price (£/kg or €/kg) on shelf labels.'
            : 'Passo 1: Vê o que tens na despensa antes de sair de casa. Passo 2: Compara sempre o preço por quilo na etiqueta.',
          audioToneCue: '[AUDIO: Instructional rhythm]',
        },
        {
          timestamp: '0:15 - 0:30',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Picking own-brand staples and meal prepping 3 base meals]',
          spokenText: isUK
            ? 'Step 3: Swap brand names for supermarket own-brands. Step 4: Batch cook versatile bases that stretch across several days.'
            : 'Passo 3: Troca marcas conhecidas por marcas próprias de qualidade. Passo 4: Cozinha bases versáteis que rendem para vários dias.',
          audioToneCue: '[AUDIO: Upbeat shopping tempo]',
        },
        {
          timestamp: '0:30 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Lower till checkout total with delicious meals prepared]',
          spokenText: isUK
            ? 'Follow these 4 steps and you will instantly save tens of pounds at the checkout every single week.'
            : 'Aplica estes 4 passos e sentes o alívio imediato no bolso logo na próxima ida às compras.',
          audioToneCue: '[AUDIO: Confident resolution]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: On-screen trolley checklist graphic]',
          spokenText: isUK
            ? 'Share this with someone who manages the household food shop and comment "TROLLEY" for the guide!'
            : 'Partilha com quem faz as compras da casa e comenta "CARRINHO" para receberes o modelo!',
          audioToneCue: '[AUDIO: Notification chime]',
        },
      ],
      fullSpokenText: isUK
        ? `Here is the 4-step blueprint to cut your grocery bill on ${subject} by 30%. Step 1: Shop your own pantry before leaving home. Step 2: Compare the small unit price (£/kg or €/kg) on shelf labels. Step 3: Swap brand names for supermarket own-brands. Step 4: Batch cook versatile bases that stretch across several days. Follow these 4 steps and you will instantly save tens of pounds at the checkout every single week. Share this with someone who manages the household food shop and comment "TROLLEY" for the guide!`
        : `Aqui está o passo a passo em 4 etapas para cortares 30% nas compras de ${subject}. Passo 1: Vê o que tens na despensa antes de sair de casa. Passo 2: Compara sempre o preço por quilo na etiqueta. Passo 3: Troca marcas conhecidas por marcas próprias de qualidade. Passo 4: Cozinha bases versáteis que rendem para vários dias. Aplica estes 4 passos e sentes o alívio imediato no bolso logo na próxima ida às compras. Partilha com quem faz as compras da casa e comenta "CARRINHO" para receberes o modelo!`,
    },
  ];

  const titles: TitleIdea[] = isUK
    ? [
        { id: 'title-1', type: 'Contrarian', title: `The Sneaky Supermarket Trolley Trap on ${subject} (And How to Fix It)`, score: 96 },
        { id: 'title-2', type: 'Outcome / How-To', title: `How to Cut Your ${subject} Grocery Bill by 30% (Without Eating Cardboard)`, score: 94 },
        { id: 'title-3', type: 'Curiosity Gap', title: `Real Supermarket Price Audit for ${subject}: Aldi vs Tesco Tested!`, score: 92 },
        { id: 'title-4', type: 'Fear of Missing Out / Loss', title: `3 Supermarket 'Deals' on ${subject} You Should Stop Falling For`, score: 91 },
        { id: 'title-5', type: 'Number / Listicle', title: `The 15-Minute Weekly Meal Plan for ${subject} That Stops Food Waste`, score: 89 },
      ]
    : [
        { id: 'title-1', type: 'Contrarian', title: `A Armadilha Oculta no Supermercado ao Fazer Compras de ${subject}`, score: 96 },
        { id: 'title-2', type: 'Outcome / How-To', title: `Como Cortar 30% nas Compras de ${subject} Sem Comer Pior`, score: 94 },
        { id: 'title-3', type: 'Curiosity Gap', title: `Comparativo Real de Faturas: Onde Fica Mais Barato Comprar ${subject}?`, score: 92 },
        { id: 'title-4', type: 'Fear of Missing Out / Loss', title: `3 Falsas Promoções em ${subject} que Deves Evitar no Supermercado`, score: 91 },
        { id: 'title-5', type: 'Number / Listicle', title: `O Plano Semanal de 15 Minutos para Compras de ${subject} sem Desperdício`, score: 89 },
      ];

  const hooks: HookIdea[] = isUK
    ? [
        { id: 'hook-1', type: 'Pattern Interrupt', spokenHook: formatSpokenHook(topic, market), visualHook: '[VISUAL: Close-up of receipt total with shocked reaction]', overlayText: 'STOP OVERPAYING ⚠️' },
        { id: 'hook-2', type: 'Bold Statement', spokenHook: `Want to cut 30% off your food shopping bill this week without sacrificing flavour? Here is how.`, visualHook: '[VISUAL: Full shopping trolley with budget receipt total]', overlayText: 'SAVE 30% ON FOOD 🛒' },
        { id: 'hook-3', type: 'Provocative Question', spokenHook: `If your supermarket receipts keep climbing every week, you are probably falling for this sneaky shelf-edge trap.`, visualHook: '[VISUAL: Showing misleading promo tag in aisle]', overlayText: 'SHELF-EDGE TRAP ❌' },
        { id: 'hook-4', type: 'Story Opener', spokenHook: `Most shoppers assume buying in bulk is always cheaper. Look at why that is often a complete myth.`, visualHook: '[VISUAL: Unit price comparison showing smaller pack is cheaper per kilo]', overlayText: 'BULK BUY MYTH 🚫' },
        { id: 'hook-5', type: 'Visual Shock', spokenHook: `There is one tiny number on the supermarket price tag that will save you hundreds every year.`, visualHook: '[VISUAL: Magnifying glass highlighting unit price on shelf label]', overlayText: 'CHECK UNIT PRICE 🔍' },
      ]
    : [
        { id: 'hook-1', type: 'Pattern Interrupt', spokenHook: formatSpokenHook(topic, market), visualHook: '[VISUAL: Plano detalhado da fatura com total elevado e olhar atento]', overlayText: 'PÁRA DE PAGAR A MAIS ⚠️' },
        { id: 'hook-2', type: 'Bold Statement', spokenHook: `Queres poupar 30% nas compras do mês sem abdicar de refeições saborosas e nutritivas?`, visualHook: '[VISUAL: Carrinho cheio com produtos de qualidade a preço reduzido]', overlayText: 'POUPA 30% NO SUPER 🛒' },
        { id: 'hook-3', type: 'Provocative Question', spokenHook: `Se a fatura do supermercado não pára de subir, o mais provável é estares a cair nesta armadilha de prateleira.`, visualHook: '[VISUAL: Cartaz amarelo de falsa promoção]', overlayText: 'ARMADILHA DE PREÇO ❌' },
        { id: 'hook-4', type: 'Story Opener', spokenHook: `Muita gente pensa que comprar pacotes gigantes é sempre mais barato. Olha porque é que isso nem sempre é verdade.`, visualHook: '[VISUAL: Comparativo de preço por quilo no ecrã]', overlayText: 'MITO DO TAMANHO 🚫' },
        { id: 'hook-5', type: 'Visual Shock', spokenHook: `Existe um número minúsculo na etiqueta do supermercado que te poupa centenas de euros por ano.`, visualHook: '[VISUAL: Foco no preço por quilo com som sonoro de revelação]', overlayText: 'PREÇO POR QUILO 🔍' },
      ];

  const ctas: CallToAction[] = isUK
    ? [
        { id: 'cta-1', goal: 'Save / Bookmark', spokenCta: 'Save this video to your library right now before your next supermarket run!', onScreenText: 'SAVE THIS VIDEO 📌', platformBestPractice: 'Gesture to save button.' },
        { id: 'cta-2', goal: 'Comment / Keyword Automation', spokenCta: 'Comment "SAVE" below and I will send the weekly shopping checklist straight to you!', onScreenText: 'COMMENT "SAVE" 💬', platformBestPractice: 'Drives initial comment velocity.' },
        { id: 'cta-3', goal: 'Follow / Subscribe', spokenCta: 'Subscribe to the channel for more honest, money-saving supermarket audits every week!', onScreenText: 'SUBSCRIBE FOR SAVINGS 🔔', platformBestPractice: 'Add end-screen card.' },
      ]
    : [
        { id: 'cta-1', goal: 'Save / Bookmark', spokenCta: 'Guarda este vídeo nos favoritos para consultares antes da tua próxima ida às compras!', onScreenText: 'GUARDA ESTE VÍDEO 📌', platformBestPractice: 'Apontar para o botão de guardar.' },
        { id: 'cta-2', goal: 'Comment / Keyword Automation', spokenCta: 'Comenta "POUPAR" nos comentários para receberes a lista semanal inteligente!', onScreenText: 'COMENTA "POUPAR" 👇', platformBestPractice: 'Aumenta interação inicial.' },
        { id: 'cta-3', goal: 'Follow / Subscribe', spokenCta: 'Segue o canal para mais dicas reais de poupança no supermercado!', onScreenText: 'SEGUE PARA MAIS DICAS 🔔', platformBestPractice: 'Encerramento acolhedor.' },
      ];

  return { scripts, titles, hooks, ctas };
}

function buildGenericOrFinanceBundle(
  topic: string,
  subject: string,
  market: TargetMarket,
  platform: Platform,
  isShorts: boolean,
  domainInfo: DetectedTopicInfo
): ScriptBundle {
  const isUK = market === 'en-GB';
  const isFinance = domainInfo.isFinance;

  const scripts: ScriptVariation[] = [
    {
      id: `script-${market.toLowerCase()}-contrarian`,
      style: 'contrarian-mythbuster',
      styleName: isUK ? 'Variation 1: The Myth-Buster (Contrarian)' : 'Variação 1: O Quebrador de Mitos (Contrarian)',
      badge: isUK ? 'Highest Retention & Debate' : 'Maior Retenção & Debate',
      tagline: isFinance
        ? (isUK ? 'Dismantles outdated advice and reveals the tax and fee reality.' : 'Desmonta conselhos antigos e revela a realidade fiscal e de comissões.')
        : (isUK ? 'Dismantles standard ineffective advice and reveals the actionable fix.' : 'Desmonta conselhos genéricos e apresenta a alternativa prática.'),
      estimatedDuration: isShorts ? '45 seconds' : '12 minutes',
      targetWordCount: isShorts ? 135 : 1700,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: '[VISUAL: Direct to camera, serious expression with mobile or notes in hand]',
          spokenText: formatScript1Opening(topic, market),
          audioToneCue: '[AUDIO: Crisp cut effect / no music in first 2 seconds]',
        },
        {
          timestamp: '0:03 - 0:12',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: '[VISUAL: Quick cut to comparison screen highlighting the standard error in red]',
          spokenText: isFinance
            ? (isUK
                ? '90% of creators tell you to follow the standard generic rule. The problem? Platform fees and HMRC tax thresholds eat away your real net returns.'
                : '90% dos conselhos dizem-te para seguir a receita antiga. O problema? As taxas e comissões comem qualquer benefício real.')
            : (isUK
                ? '90% of tutorials tell you to follow the standard method. The problem? It wastes hours of effort without moving the needle on results.'
                : '90% dos tutoriais dizem-te para seguir o método tradicional. O problema? Perdes horas de esforço sem ver resultados tangíveis.'),
          audioToneCue: '[AUDIO: Subtle bass drop and building tension]',
        },
        {
          timestamp: '0:12 - 0:32',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Clean screen walkthrough or demonstration showing the 3-step solution]',
          spokenText: isFinance
            ? (isUK
                ? 'Look closely at this comparison: with the standard setup you lose an avoidable percentage to fees. By making this 3-step adjustment, you protect your net bottom line.'
                : 'Olha com atenção para esta comparação: no método habitual perdes logo uma percentagem em custos. Com este ajuste simples de 3 passos, proteges os teus resultados líquidos.')
            : (isUK
                ? 'Look closely at this comparison: the standard approach leads to immediate roadblocks. If you implement this 3-step workflow instead, everything runs smoothly.'
                : 'Olha com atenção para esta comparação: a abordagem habitual gera bloqueios imediatos. Se fizeres este fluxo de 3 passos, tudo flui com facilidade.'),
          audioToneCue: '[AUDIO: Dynamic, confident instructional pacing]',
        },
        {
          timestamp: '0:32 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Return to main camera with clear proof graphic]',
          spokenText: isUK
            ? 'The difference is having complete peace of mind and not being caught out by avoidable mistakes.'
            : 'A diferença é teres paz de espírito e não seres apanhado de surpresa.',
          audioToneCue: '[AUDIO: Inspiring, conclusive transition]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Pointing to bookmark/follow button on screen]',
          spokenText: isUK
            ? 'Save this video to reference when you put this into practice, and comment "GUIDE" for the complete breakdown!'
            : 'Guarda este vídeo para consultares quando fores tratar disto e comenta "GUIA" para o resumo completo!',
          audioToneCue: '[AUDIO: Subtle notification chime]',
        },
      ],
      fullSpokenText: isFinance
        ? (isUK
            ? `${formatScript1Opening(topic, market)} 90% of creators tell you to follow the standard generic rule. The problem? Platform fees and HMRC tax thresholds eat away your real net returns. Look closely at this comparison: with the standard setup you lose an avoidable percentage to fees. By making this 3-step adjustment, you protect your net bottom line. The difference is having complete peace of mind and not being caught out by avoidable mistakes. Save this video to reference when you put this into practice, and comment "GUIDE" for the complete breakdown!`
            : `${formatScript1Opening(topic, market)} 90% dos conselhos dizem-te para seguir a receita antiga. O problema? As taxas e comissões comem qualquer benefício real. Olha com atenção para esta comparação: no método habitual perdes logo uma percentagem em custos. Com este ajuste simples de 3 passos, proteges os teus resultados líquidos. A diferença é teres paz de espírito e não seres apanhado de surpresa. Guarda este vídeo para consultares quando fores tratar disto e comenta "GUIA" para o resumo completo!`)
        : (isUK
            ? `${formatScript1Opening(topic, market)} 90% of tutorials tell you to follow the standard method. The problem? It wastes hours of effort without moving the needle on results. Look closely at this comparison: the standard approach leads to immediate roadblocks. If you implement this 3-step workflow instead, everything runs smoothly. The difference is having complete peace of mind and not being caught out by avoidable mistakes. Save this video to reference when you put this into practice, and comment "GUIDE" for the complete breakdown!`
            : `${formatScript1Opening(topic, market)} 90% dos tutoriais dizem-te para seguir o método tradicional. O problema? Perdes horas de esforço sem ver resultados tangíveis. Olha com atenção para esta comparação: a abordagem habitual gera bloqueios imediatos. Se fizeres este fluxo de 3 passos, tudo flui com facilidade. A diferença é teres paz de espírito e não seres apanhado de surpresa. Guarda este vídeo para consultares quando fores tratar disto e comenta "GUIA" para o resumo completo!`),
    },
    {
      id: `script-${market.toLowerCase()}-story`,
      style: 'story-driven-case-study',
      styleName: isUK ? 'Variation 2: Journey & Case Study (Story-Driven)' : 'Variação 2: Estudo de Caso & Jornada Pessoal',
      badge: isUK ? 'Peak Authority' : 'Máxima Conexão & Autoridade',
      tagline: isUK ? 'Chronicles the initial frustration of starting from scratch until finding the smooth path.' : 'Narra a frustração real de começar do zero até encontrar a rota sem atritos.',
      estimatedDuration: isShorts ? '50 seconds' : '14 minutes',
      targetWordCount: isShorts ? 145 : 2000,
      sections: [
        {
          timestamp: '0:00 - 0:04',
          stage: 'Hook',
          visualCue: '[VISUAL: Sitting at desk reflecting on past frustrations]',
          spokenText: isUK
            ? `When I first started with ${subject}, I made the most frustrating mistake possible. And nobody warned me.`
            : `Quando comecei em ${subject}, cometi o erro mais frustrante possível. E ninguém me avisou.`,
          audioToneCue: '[AUDIO: Reflective piano intro]',
        },
        {
          timestamp: '0:04 - 0:15',
          stage: 'Agitate / Pattern Interrupt',
          visualCue: '[VISUAL: Fast montage of confusing documents or endless tabs]',
          spokenText: isUK
            ? 'I was putting in hours of work, trusting generic internet guides, but progress completely stalled.'
            : 'Passava horas a estudar e a confiar nos conselhos padrão da internet, mas os resultados eram zero.',
          audioToneCue: '[AUDIO: Building intensity]',
        },
        {
          timestamp: '0:15 - 0:35',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Clean dashboard opening up with 3 clear metrics]',
          spokenText: isUK
            ? 'Until I stripped out 80% of the noise and focused strictly on these three fundamental rules. That transformed everything.'
            : 'Até que decidi cortar 80% do ruído e focar apenas nestas 3 regras fundamentais. Foi exatamente isto que transformou os meus resultados.',
          audioToneCue: '[AUDIO: Cadenced clarity rhythm]',
        },
        {
          timestamp: '0:35 - 0:43',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Clear success metrics on screen with calm confidence]',
          spokenText: isUK
            ? 'Now it takes me 15 minutes a week to manage with complete confidence.'
            : 'Hoje levo 15 minutos por semana a gerir isto com total tranquilidade.',
          audioToneCue: '[AUDIO: Positive resolution]',
        },
        {
          timestamp: '0:43 - 0:50',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Pointing to bookmark button]',
          spokenText: isUK
            ? 'Save this video for later and follow for more straightforward, practical walkthroughs!'
            : 'Guarda este vídeo nos favoritos e segue o canal para mais análises práticas!',
          audioToneCue: '[AUDIO: Sign-off chime]',
        },
      ],
      fullSpokenText: isUK
        ? `When I first started with ${subject}, I made the most frustrating mistake possible. And nobody warned me. I was putting in hours of work, trusting generic internet guides, but progress completely stalled. Until I stripped out 80% of the noise and focused strictly on these three fundamental rules. That transformed everything. Now it takes me 15 minutes a week to manage with complete confidence. Save this video for later and follow for more straightforward, practical walkthroughs!`
        : `Quando comecei em ${subject}, cometi o erro mais frustrante possível. E ninguém me avisou. Passava horas a estudar e a confiar nos conselhos padrão da internet, mas os resultados eram zero. Até que decidi cortar 80% do ruído e focar apenas nestas 3 regras fundamentais. Foi exatamente isto que transformou os meus resultados. Hoje levo 15 minutos por semana a gerir isto com total tranquilidade. Guarda este vídeo nos favoritos e segue o canal para mais análises práticas!`,
    },
    {
      id: `script-${market.toLowerCase()}-blueprint`,
      style: 'actionable-blueprint',
      styleName: isUK ? 'Variation 3: The Step-by-Step Blueprint' : 'Variação 3: O Passo a Passo Definitivo (Blueprint)',
      badge: isUK ? 'Highest Save & Share Rate' : 'Maior Taxa de Salvamento',
      tagline: isUK ? 'Direct 4-step implementation guide taking viewers from zero to competent.' : 'Guia de execução em 4 passos sem rodeios.',
      estimatedDuration: isShorts ? '45 seconds' : '15 minutes',
      targetWordCount: isShorts ? 135 : 2100,
      sections: [
        {
          timestamp: '0:00 - 0:03',
          stage: 'Hook',
          visualCue: '[VISUAL: Clear title card with steps on screen]',
          spokenText: isUK
            ? `Here is the complete 4-step blueprint for ${subject} from absolute scratch.`
            : `Aqui está o passo a passo em 4 etapas para dominares ${subject} do zero.`,
          audioToneCue: '[AUDIO: High energy opening sound]',
        },
        {
          timestamp: '0:03 - 0:15',
          stage: 'Core Value / Meat',
          visualCue: '[VISUAL: Live demonstration of step 1 setup and account/tool configuration]',
          spokenText: isUK
            ? 'Step 1: Set up the correct foundation without paying unnecessary upfront fees. Step 2: Establish your automated workflow.'
            : 'Passo 1: Configurar a base correta sem custos desnecessários. Passo 2: Estabelecer o teu fluxo de trabalho automático.',
          audioToneCue: '[AUDIO: Upbeat instructional rhythm]',
        },
        {
          timestamp: '0:15 - 0:30',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Live demonstration of step 3 execution and step 4 verification]',
          spokenText: isUK
            ? 'Step 3: Execute with strict consistency. Step 4: Perform a quarterly 10-minute audit to keep everything optimised.'
            : 'Passo 3: Executar com consistência rigorosa. Passo 4: Fazer uma auditoria rápida para manter tudo otimizado.',
          audioToneCue: '[AUDIO: Dynamic pace with woosh transitions]',
        },
        {
          timestamp: '0:30 - 0:40',
          stage: 'Payoff / Turnaround',
          visualCue: '[VISUAL: Checklist graphic checkmarks completing]',
          spokenText: isUK
            ? 'Follow these 4 steps and you will be ahead of 90% of people who get stuck in theoretical circles.'
            : 'Aplica estes 4 passos e ficas à frente de 90% das pessoas que ficam presas na teoria.',
          audioToneCue: '[AUDIO: Confident resolution]',
        },
        {
          timestamp: '0:40 - 0:45',
          stage: 'Call to Action',
          visualCue: '[VISUAL: Gesture towards bookmark button]',
          spokenText: isUK
            ? 'Share this with someone who needs this today and comment "STEPS" for the free template!'
            : 'Partilha com quem precisa de ver isto e comenta "GUIA" para o modelo gratuito!',
          audioToneCue: '[AUDIO: Notification chime]',
        },
      ],
      fullSpokenText: isUK
        ? `Here is the complete 4-step blueprint for ${subject} from absolute scratch. Step 1: Set up the correct foundation without paying unnecessary upfront fees. Step 2: Establish your automated workflow. Step 3: Execute with strict consistency. Step 4: Perform a quarterly 10-minute audit to keep everything optimised. Follow these 4 steps and you will be ahead of 90% of people who get stuck in theoretical circles. Share this with someone who needs this today and comment "STEPS" for the free template!`
        : `Aqui está o passo a passo em 4 etapas para dominares ${subject} do zero. Passo 1: Configurar a base correta sem custos desnecessários. Passo 2: Estabelecer o teu fluxo de trabalho automático. Passo 3: Executar com consistência rigorosa. Passo 4: Fazer uma auditoria rápida para manter tudo otimizado. Aplica estes 4 passos e ficas à frente de 90% das pessoas que ficam presas na teoria. Partilha com quem precisa de ver isto e comenta "GUIA" para o modelo gratuito!`,
    },
  ];

  const titles: TitleIdea[] = isUK
    ? [
        { id: 'title-1', type: 'Contrarian', title: `The Costly Mistake with ${subject} in the UK (And How to Fix It)`, score: 96 },
        { id: 'title-2', type: 'Outcome / How-To', title: `How to Master ${subject} from Scratch Step-by-Step`, score: 94 },
        { id: 'title-3', type: 'Curiosity Gap', title: `Option A vs Option B for ${subject}: Which Is Genuinely Worth It?`, score: 92 },
        { id: 'title-4', type: 'Fear of Missing Out / Loss', title: `3 Critical Traps with ${subject} You Should Stop Doing Today`, score: 91 },
        { id: 'title-5', type: 'Number / Listicle', title: `The 15-Minute Routine for ${subject} (Zero Fluff)`, score: 89 },
      ]
    : [
        { id: 'title-1', type: 'Contrarian', title: `O Maior Erro com ${subject} que Quase Ninguém Te Avisa`, score: 96 },
        { id: 'title-2', type: 'Outcome / How-To', title: `Como Dominar ${subject} do Zero Passo a Passo`, score: 94 },
        { id: 'title-3', type: 'Curiosity Gap', title: `Opção A vs Opção B para ${subject}: Qual a Escolha Certa?`, score: 92 },
        { id: 'title-4', type: 'Fear of Missing Out / Loss', title: `3 Erros Críticos em ${subject} que Deves Parar Hoje`, score: 91 },
        { id: 'title-5', type: 'Number / Listicle', title: `A Rotina de 15 Minutos para ${subject} sem Complicações`, score: 89 },
      ];

  const hooks: HookIdea[] = isUK
    ? [
        { id: 'hook-1', type: 'Pattern Interrupt', spokenHook: formatSpokenHook(topic, market), visualHook: '[VISUAL: Serious expression pointing directly to screen comparison]', overlayText: 'STOP DOING THIS ⚠️' },
        { id: 'hook-2', type: 'Bold Statement', spokenHook: `Want to get real, tangible results with ${subject} without wasting hours every week? Here is the blueprint.`, visualHook: '[VISUAL: Clean summary dashboard with 3 key pillars]', overlayText: 'REAL RESULTS 🎯' },
        { id: 'hook-3', type: 'Provocative Question', spokenHook: `If you feel stuck or overwhelmed trying to figure out ${subject}, the problem isn't you — it's the advice you're following.`, visualHook: '[VISUAL: Sympathetic expression cutting straight to the solution]', overlayText: 'WHY YOU GET STUCK ❌' },
        { id: 'hook-4', type: 'Story Opener', spokenHook: `Most online advice about ${subject} tells you to do this. Here is why that is actually slowing you down.`, visualHook: '[VISUAL: Crossing out the standard advice with a bold red line]', overlayText: 'OUTDATED ADVICE 🚫' },
        { id: 'hook-5', type: 'Visual Shock', spokenHook: `There is one fundamental rule behind ${subject} that experienced practitioners use every day.`, visualHook: '[VISUAL: Revealing the key rule highlighted on screen]', overlayText: 'THE #1 RULE 🔑' },
      ]
    : [
        { id: 'hook-1', type: 'Pattern Interrupt', spokenHook: formatSpokenHook(topic, market), visualHook: '[VISUAL: Expressão séria a apontar diretamente para a comparação]', overlayText: 'PÁRA DE FAZER ISTO ⚠️' },
        { id: 'hook-2', type: 'Bold Statement', spokenHook: `Queres obter resultados reais em ${subject} sem perder horas todas as semanas? Aqui está o método.`, visualHook: '[VISUAL: Ecrã limpo com os 3 pilares essenciais]', overlayText: 'RESULTADOS REAIS 🎯' },
        { id: 'hook-3', type: 'Provocative Question', spokenHook: `Se estás a sentir bloqueio ao tentar implementar ${subject}, o problema não és tu — é o conselho padrão que estás a seguir.`, visualHook: '[VISUAL: Tom acolhedor a mostrar a solução prática]', overlayText: 'PORQUE BLOQUEIAS ❌' },
        { id: 'hook-4', type: 'Story Opener', spokenHook: `A maioria das pessoas diz para fazeres isto em ${subject}. Olha porque é que isso só te faz perder tempo.`, visualHook: '[VISUAL: Cortar o conselho habitual a vermelho]', overlayText: 'CONSELHO ERRADO 🚫' },
        { id: 'hook-5', type: 'Visual Shock', spokenHook: `Existe uma regra não escrita em ${subject} que muda completamente os teus resultados.`, visualHook: '[VISUAL: Revelação da regra chave destacada no ecrã]', overlayText: 'A REGRA DE OURO 🔑' },
      ];

  const ctas: CallToAction[] = isUK
    ? [
        { id: 'cta-1', goal: 'Save / Bookmark', spokenCta: 'Save this video to your library right now so you can refer back when you implement this!', onScreenText: 'SAVE THIS VIDEO 📌', platformBestPractice: 'Gesture towards save button.' },
        { id: 'cta-2', goal: 'Comment / Keyword Automation', spokenCta: 'Comment "GUIDE" below and I will send the complete summary straight to you!', onScreenText: 'COMMENT "GUIDE" 💬', platformBestPractice: 'Drives initial comment velocity.' },
        { id: 'cta-3', goal: 'Follow / Subscribe', spokenCta: 'Subscribe to the channel for more no-nonsense, practical breakdowns every single week!', onScreenText: 'SUBSCRIBE FOR MORE 🔔', platformBestPractice: 'Add end-screen subscribe card.' },
      ]
    : [
        { id: 'cta-1', goal: 'Save / Bookmark', spokenCta: 'Guarda este vídeo nos favoritos para teres a estratégia à mão quando fores implementar!', onScreenText: 'GUARDA ESTE VÍDEO 📌', platformBestPractice: 'Apontar para o botão de guardar.' },
        { id: 'cta-2', goal: 'Comment / Keyword Automation', spokenCta: 'Comenta "GUIA" nos comentários para receberes o resumo completo!', onScreenText: 'COMENTA "GUIA" 👇', platformBestPractice: 'Aumenta interação inicial.' },
        { id: 'cta-3', goal: 'Follow / Subscribe', spokenCta: 'Segue o canal para não perderes os próximos guias práticos!', onScreenText: 'SEGUE PARA MAIS 🔔', platformBestPractice: 'Encerramento claro com chamada de ação.' },
      ];

  return { scripts, titles, hooks, ctas };
}

export function generateScriptSuite(
  req: ResearchRequest,
  idea: ContentIdea,
  competitors: CompetitorResult[]
): {
  scripts: ScriptVariation[];
  titles: TitleIdea[];
  hooks: HookIdea[];
  ctas: CallToAction[];
  sources: SourceCitation[];
} {
  const { topic, market, platform } = req;
  const isShorts = platform === 'youtube-shorts' || platform === 'tiktok' || platform === 'instagram-reels';
  const topicClean = normalizeTopic(topic, market);
  const domainInfo = detectTopicDomain(topic);
  const subject = domainInfo.primarySubject || topicClean;

  let bundle: ScriptBundle;

  if (domainInfo.isHealthOrFitness) {
    bundle = buildHealthScriptBundle(topic, subject, market, platform, isShorts);
  } else if (domainInfo.isConsumerBudgeting) {
    bundle = buildConsumerBudgetingScriptBundle(topic, subject, market, platform, isShorts);
  } else if (domainInfo.isBakingOrCooking) {
    bundle = buildCookingScriptBundle(topic, subject, market, platform, isShorts);
  } else if (domainInfo.isGardening) {
    bundle = buildGardeningScriptBundle(topic, subject, market, platform, isShorts);
  } else {
    bundle = buildGenericOrFinanceBundle(topic, subject, market, platform, isShorts, domainInfo);
  }

  // REAL SOURCE CITATIONS strictly derived from verified competitors
  const sources: SourceCitation[] = competitors
    .filter((c) => c.isRealVerifiedSource && c.url && c.url.startsWith('http'))
    .map((c, idx) => ({
      id: `src-${idx + 1}`,
      title: c.title,
      url: c.url,
      platform: c.platform,
      channelOrHost: c.channelOrCreator,
      type: 'competitor_video',
      verificationStatus: 'verified_real_url',
      retrievedAt: new Date().toISOString(),
      snippet: c.snippet || c.factSummary,
    }));

  return {
    scripts: bundle.scripts,
    titles: bundle.titles.map((t) => ({ ...t, title: cleanTemplateText(t.title) })),
    hooks: bundle.hooks,
    ctas: bundle.ctas,
    sources,
  };
}
