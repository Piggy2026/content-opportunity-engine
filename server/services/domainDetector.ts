export type TopicDomain =
  | 'cooking_food'
  | 'gardening_diy'
  | 'health_fitness'
  | 'consumer_budgeting'
  | 'finance_investing'
  | 'tech_coding'
  | 'general';

export interface DetectedTopicInfo {
  domain: TopicDomain;
  primarySubject: string;
  isFinance: boolean;
  isBakingOrCooking: boolean;
  isGardening: boolean;
  isHealthOrFitness: boolean;
  isConsumerBudgeting: boolean;
}

const COOKING_KEYWORDS = [
  'cake', 'bolo', 'tarta', 'pastel', 'baking', 'bake', 'recipe', 'receita', 'receta',
  'cook', 'cooking', 'cozinhar', 'cocina', 'cocinar', 'kitchen', 'cozinha',
  'chocolate', 'dessert', 'sobremesa', 'postre', 'bread', 'pão', 'pan',
  'food', 'comida', 'meal', 'refeição', 'dinner', 'jantar', 'cenas',
  'pastry', 'pasta', 'sauce', 'molho', 'salsa', 'roast', 'assado',
  'culinária', 'culinary', 'gastronomia', 'airfryer', 'forno', 'oven',
];

const GARDENING_KEYWORDS = [
  'garden', 'gardening', 'jardim', 'jardinagem', 'jardinería', 'horta', 'huerto',
  'plants', 'plantas', 'soil', 'solo', 'tierra', 'seeds', 'sementes', 'semillas',
  'flower', 'flores', 'vegetables', 'legumes', 'verduras', 'prune', 'podar',
  'harvest', 'colheita', 'cosecha', 'adubo', 'fertilizer', 'compost', 'rega',
  'irrigation', 'seedlings', 'mudas',
];

const HEALTH_FITNESS_KEYWORDS = [
  'health', 'saúde', 'salud', 'fitness', 'workout', 'treino', 'entrenamiento',
  'exercise', 'exercício', 'ejercicio', 'gym', 'ginásio', 'gimnasio',
  'diet', 'dieta', 'nutrition', 'nutrição', 'nutrición', 'weight loss', 'emagrecer', 'perder peso',
  'muscle', 'músculo', 'mobility', 'mobilidade', 'men\'s health', 'saúde do homem',
  'older men', 'homens mais velhos', 'recovery', 'cardio', 'wellness', 'longevity', 'longevidade',
];

const CONSUMER_BUDGETING_KEYWORDS = [
  'groceries', 'supermercado', 'supermarket', 'grocery', 'compras do mês',
  'compras de supermercado', 'poupar no supermercado', 'save money on food',
  'save money on groceries', 'ahorrar en el supermercado', 'carrinho de compras',
  'contas do mês', 'despesas da casa', 'frugal', 'economizar comida',
];

const FINANCE_INVESTING_KEYWORDS = [
  'etf', 'etfs', 'stocks', 'shares', 'ações', 'acciones', 'crypto', 'bitcoin',
  'investing', 'investir', 'invertir', 'investimento', 'inversión',
  'isa', 'sip', 'sipp', 'hmrc', 'irs', 'irpf', 'hacienda', 'taxes', 'tax',
  'imposto', 'impostos', 'banco', 'bank', 'banca', 'euribor', 'juros', 'interest rates',
  'dividends', 'dividendos', 'capital gains', 'plusvalías', 'bolsa de valores',
  'corretora', 'broker', 'património', 'reserva de emergência', 'selic', 'cdi',
];

const TECH_CODING_KEYWORDS = [
  'coding', 'programação', 'programacion', 'python', 'javascript', 'typescript',
  'react', 'software', 'app', 'developer', 'desenvolvedor', 'ai', 'inteligência artificial',
  'chatgpt', 'prompt', 'web development', 'github', 'cloud', 'linux',
];

/**
 * Detects the semantic domain of a user topic to ensure zero domain contamination.
 */
export function detectTopicDomain(topic: string): DetectedTopicInfo {
  const normalized = topic.toLowerCase().trim();

  // Priority 1: Health / Fitness & Nutrition (takes precedence over generic recipes: e.g. "older men’s health recipes")
  const isHealth = HEALTH_FITNESS_KEYWORDS.some((kw) => normalized.includes(kw));

  // Priority 2: Consumer Budgeting (groceries, shopping, supermarket)
  const isConsumerBudgeting = !isHealth && CONSUMER_BUDGETING_KEYWORDS.some((kw) => normalized.includes(kw));

  // Priority 3: Cooking / Baking (e.g. "how to make a chocolate cake", "receita de bolo")
  const isCooking = !isHealth && !isConsumerBudgeting && COOKING_KEYWORDS.some((kw) => normalized.includes(kw));

  // Priority 4: Gardening
  const isGardening = !isHealth && GARDENING_KEYWORDS.some((kw) => normalized.includes(kw));

  // Priority 5: Finance & Investing (STRICT - only if explicitly financial and not consumer grocery shopping)
  const isFinance = !isCooking && !isGardening && !isConsumerBudgeting && !isHealth &&
    FINANCE_INVESTING_KEYWORDS.some((kw) => normalized.includes(kw));

  // Priority 6: Tech / Coding
  const isTech = TECH_CODING_KEYWORDS.some((kw) => normalized.includes(kw));

  let domain: TopicDomain = 'general';
  if (isHealth) {
    domain = 'health_fitness';
  } else if (isConsumerBudgeting) {
    domain = 'consumer_budgeting';
  } else if (isCooking) {
    domain = 'cooking_food';
  } else if (isGardening) {
    domain = 'gardening_diy';
  } else if (isFinance) {
    domain = 'finance_investing';
  } else if (isTech) {
    domain = 'tech_coding';
  }

  // Extract cleaned primary subject for dynamic template interpolation
  const primarySubject = topic
    .replace(/^(how to (make|cook|bake|grow|start|save money on|invest in)|como (fazer|cozinhar|preparar|poupar em|investir em)|cómo (hacer|cocinar|ahorrar en|invertir en))\s+/i, '')
    .replace(/\s+(in the uk|em portugal|no brasil|en españa|uk|portugal|brasil|españa)$/i, '')
    .trim();

  return {
    domain,
    primarySubject: primarySubject || topic,
    isFinance: domain === 'finance_investing',
    isBakingOrCooking: domain === 'cooking_food',
    isGardening: domain === 'gardening_diy',
    isHealthOrFitness: domain === 'health_fitness',
    isConsumerBudgeting: domain === 'consumer_budgeting',
  };
}
