import { TargetMarket } from '../../src/types/index.js';

/**
 * Normalizes user-entered research topics into natural, fluent wording
 * before insertion into titles, hooks, content ideas, and scripts.
 *
 * Example:
 *   "Stocks and Shares ISA HMRC rules" -> "HMRC rules for Stocks and Shares ISAs"
 *   "Stocks and Shares ISA HMRC rules in the UK" -> "HMRC rules for Stocks and Shares ISAs"
 *   "Crypto taxes UK" -> "taxes on Crypto"
 *   "Alojamento Local regras IRS" -> "regras de IRS para Alojamento Local"
 *   "Autónomos deducciones Hacienda" -> "deducciones de Hacienda para Autónomos"
 */

// Common countable financial acronyms in UK/Global investing
const COUNTABLE_ACRONYMS = new Set(['ISA', 'SIPP', 'LISA', 'JISA', 'ETF', 'PPR']);

// Uncountable nouns that should not have 's' appended
const UNCOUNTABLE_WORDS = new Set([
  'crypto',
  'cryptocurrency',
  'bitcoin',
  'ethereum',
  'cash',
  'property',
  'gold',
  'silver',
  'wealth',
  'income',
  'debt',
  'freelance',
  'money',
  'capital gains',
  'real estate',
  'vat',
  'tax',
  'taxes',
  'inflation',
  'marketing',
  'productivity',
]);

/**
 * Intelligent noun phrase pluralizer for financial and business subjects.
 */
export function pluralizeSubject(subject: string): string {
  const trimmed = subject.trim();
  if (!trimmed) return trimmed;

  const parts = trimmed.split(/\s+/);
  const lastWord = parts[parts.length - 1];
  const lastWordUpper = lastWord.toUpperCase();

  // If already ends in 's' or 'es', keep as is (e.g. Shares, Savings, Funds, Accounts)
  if (lastWord.toLowerCase().endsWith('s')) {
    return trimmed;
  }

  // If it's a known countable acronym (ISA -> ISAs, SIPP -> SIPPs, ETF -> ETFs)
  if (COUNTABLE_ACRONYMS.has(lastWordUpper)) {
    parts[parts.length - 1] = `${lastWordUpper}s`;
    return parts.join(' ');
  }

  // If uncountable, preserve
  if (UNCOUNTABLE_WORDS.has(lastWord.toLowerCase())) {
    return trimmed;
  }

  // Regular countable nouns
  const countableEndings: Record<string, string> = {
    account: 'accounts',
    pension: 'pensions',
    trader: 'traders',
    landlord: 'landlords',
    investor: 'investors',
    worker: 'workers',
    hustle: 'hustles',
    mortgage: 'mortgages',
    fund: 'funds',
    bond: 'bonds',
    deduction: 'deductions',
    allowance: 'allowances',
    trap: 'traps',
    mistake: 'mistakes',
  };

  const lowerLast = lastWord.toLowerCase();
  if (countableEndings[lowerLast]) {
    // Preserve original capitalization
    const isCapitalized = lastWord[0] === lastWord[0].toUpperCase();
    const replacement = countableEndings[lowerLast];
    parts[parts.length - 1] = isCapitalized ? replacement[0].toUpperCase() + replacement.slice(1) : replacement;
    return parts.join(' ');
  }

  return trimmed;
}

/**
 * Strips location and market suffixes that would duplicate template phrases.
 */
export function stripLocationSuffix(topic: string, market?: TargetMarket): string {
  let cleaned = topic.trim();

  // Strip English location markers
  cleaned = cleaned
    .replace(/\s+(?:in\s+the\s+uk|in\s+uk|for\s+the\s+uk|for\s+uk|uk)$/i, '')
    .replace(/\s+-\s*uk$/i, '')
    .trim();

  // Strip Portuguese location markers
  cleaned = cleaned
    .replace(/\s+(?:em\s+portugal|de\s+portugal|para\s+portugal|pt)$/i, '')
    .replace(/\s+(?:no\s+brasil|do\s+brasil|para\s+o\s+brasil|br)$/i, '')
    .trim();

  // Strip Spanish location markers
  cleaned = cleaned
    .replace(/\s+(?:en\s+españa|de\s+españa|para\s+españa|es)$/i, '')
    .trim();

  // Strip platform markers if typed as trailing keywords
  cleaned = cleaned
    .replace(/\s+(?:youtube|shorts|reels|tiktok|video)$/i, '')
    .trim();

  return cleaned;
}

/**
 * Converts keyword-heavy search topics into natural, human-phrased topics.
 */
export function normalizeTopic(topic: string, market?: TargetMarket): string {
  if (!topic || typeof topic !== 'string') return '';

  let cleaned = stripLocationSuffix(topic, market);

  // If market is UK / English (or default)
  if (market === 'en-GB' || !market) {
    // 1. Inverted pattern: [Subject] [Authority] [RuleWord]
    // Example: "Stocks and Shares ISA HMRC rules" -> "HMRC rules for Stocks and Shares ISAs"
    const authorityRuleMatch = cleaned.match(
      /^(.+?)\s+(HMRC|FCA|tax|taxes|government|gov\.uk)\s+(rules|guidelines|regulations|guidance|laws|allowances|thresholds|limits|rates|traps)$/i
    );
    if (authorityRuleMatch) {
      const subject = authorityRuleMatch[1].trim();
      const authorityRaw = authorityRuleMatch[2].trim();
      const ruleWord = authorityRuleMatch[3].trim().toLowerCase();

      // Standardize authority casing (HMRC, FCA, etc.)
      const authority = authorityRaw.toUpperCase() === 'HMRC' || authorityRaw.toUpperCase() === 'FCA'
        ? authorityRaw.toUpperCase()
        : authorityRaw.toLowerCase();

      const pluralSubject = pluralizeSubject(subject);
      return `${authority} ${ruleWord} for ${pluralSubject}`;
    }

    // 2. Inverted pattern: [Subject] [RuleWord] (without authority)
    // Example: "Stocks and Shares ISA rules" -> "rules for Stocks and Shares ISAs"
    const generalRuleMatch = cleaned.match(
      /^(.+?)\s+(rules|guidelines|regulations|guidance|laws|allowances|thresholds|limits)$/i
    );
    if (generalRuleMatch && !generalRuleMatch[1].toLowerCase().startsWith('how to')) {
      const subject = generalRuleMatch[1].trim();
      const ruleWord = generalRuleMatch[2].trim().toLowerCase();
      const pluralSubject = pluralizeSubject(subject);
      return `${ruleWord} for ${pluralSubject}`;
    }

    // 3. Inverted pattern: [Subject] [taxes/tax]
    // Example: "Crypto taxes" -> "taxes on Crypto"
    const taxMatch = cleaned.match(/^(.+?)\s+(taxes|tax)$/i);
    if (taxMatch && !taxMatch[1].toLowerCase().endsWith('income') && !taxMatch[1].toLowerCase().endsWith('capital gains')) {
      const subject = taxMatch[1].trim();
      const pluralSubject = pluralizeSubject(subject);
      return `taxes on ${pluralSubject}`;
    }

    // 4. Inverted pattern: [Subject] beginners
    // Example: "investing beginners" -> "investing for beginners"
    const beginnerMatch = cleaned.match(/^(.+?)\s+(?:for\s+)?(beginners|dummies)$/i);
    if (beginnerMatch) {
      const subject = beginnerMatch[1].trim();
      return `${subject} for beginners`;
    }

    // 5. Comparison: [Sub1] vs [Sub2]
    const vsMatch = cleaned.match(/^(.+?)\s+vs\.?\s+(.+)$/i);
    if (vsMatch) {
      const sub1 = pluralizeSubject(vsMatch[1].trim());
      const sub2 = pluralizeSubject(vsMatch[2].trim());
      return `${sub1} vs ${sub2}`;
    }
  }

  // Portuguese (pt-PT / pt-BR)
  if (market === 'pt-PT' || market === 'pt-BR') {
    // 1. [Assunto] regras [IRS|IRC|Finanças|IVA]
    // Example: "Alojamento Local regras IRS" -> "regras de IRS para Alojamento Local"
    const ptAuthRuleMatch = cleaned.match(
      /^(.+?)\s+regras\s+(?:de\s+|do\s+|das\s+)?(IRS|IRC|Finanças|IVA)$/i
    );
    if (ptAuthRuleMatch) {
      const subject = ptAuthRuleMatch[1].trim();
      const authority = ptAuthRuleMatch[2].trim().toUpperCase();
      return `regras de ${authority} para ${subject}`;
    }

    // 2. [Assunto] regras
    const ptRuleMatch = cleaned.match(/^(.+?)\s+regras$/i);
    if (ptRuleMatch) {
      const subject = ptRuleMatch[1].trim();
      return `regras para ${subject}`;
    }

    // 3. [Assunto] impostos
    const ptTaxMatch = cleaned.match(/^(.+?)\s+impostos$/i);
    if (ptTaxMatch) {
      const subject = ptTaxMatch[1].trim();
      return `impostos sobre ${subject}`;
    }

    // 4. [Assunto] iniciantes
    const ptBeginnerMatch = cleaned.match(/^(.+?)\s+(?:para\s+)?iniciantes$/i);
    if (ptBeginnerMatch) {
      const subject = ptBeginnerMatch[1].trim();
      return `${subject} para iniciantes`;
    }
  }

  // Spanish (es-ES)
  if (market === 'es-ES') {
    // 1. [Tema] deducciones/reglas/impuestos Hacienda
    const esAuthRuleMatch = cleaned.match(
      /^(.+?)\s+(reglas|normativa|deducciones|impuestos)\s+(?:de\s+)?(Hacienda|IRPF|IVA)$/i
    );
    if (esAuthRuleMatch) {
      const subject = esAuthRuleMatch[1].trim();
      const type = esAuthRuleMatch[2].trim().toLowerCase();
      const authority = esAuthRuleMatch[3].trim();
      return `${type} de ${authority} para ${subject}`;
    }

    // 2. [Tema] normativa / reglas
    const esRuleMatch = cleaned.match(/^(.+?)\s+(reglas|normativa)$/i);
    if (esRuleMatch) {
      const subject = esRuleMatch[1].trim();
      const type = esRuleMatch[2].trim().toLowerCase();
      return `${type} para ${subject}`;
    }

    // 3. [Tema] impuestos
    const esTaxMatch = cleaned.match(/^(.+?)\s+impuestos$/i);
    if (esTaxMatch) {
      const subject = esTaxMatch[1].trim();
      return `impuestos sobre ${subject}`;
    }

    // 4. [Tema] principiantes
    const esBeginnerMatch = cleaned.match(/^(.+?)\s+(?:para\s+)?principiantes$/i);
    if (esBeginnerMatch) {
      const subject = esBeginnerMatch[1].trim();
      return `${subject} para principiantes`;
    }
  }

  return cleaned;
}

/**
 * Checks whether a topic represents regulatory, rule-based, or tax guidance.
 */
export function isRuleOrGuidanceTopic(topic: string): boolean {
  return /rules|guidelines|regulations|guidance|regras|normativa|deducciones|allowances|taxes|impostos|impuestos/i.test(topic);
}

/**
 * Formats a natural spoken opening hook based on whether the topic is a noun/asset or rules/guidance.
 */
export function formatSpokenHook(topic: string, market: TargetMarket): string {
  const normTopic = normalizeTopic(topic, market);
  const isRule = isRuleOrGuidanceTopic(normTopic);

  if (market === 'en-GB') {
    if (isRule) {
      return `If you're still following standard guidance on ${normTopic} in the UK, you are quietly throwing money away.`;
    }
    return `If you're still doing this with ${normTopic} in the UK, you are quietly throwing money away.`;
  }

  if (market === 'pt-PT') {
    if (isRule) {
      return `Se ainda estás a seguir o conselho padrão sobre ${normTopic} em Portugal, estás a perder dinheiro sem saber.`;
    }
    return `Se ainda estás a fazer isto com ${normTopic} em Portugal, estás a perder dinheiro sem saber.`;
  }

  if (market === 'pt-BR') {
    if (isRule) {
      return `Pára tudo o que você tá fazendo e olha esse detalhe aqui sobre ${normTopic}!`;
    }
    return `Se você ainda tá fazendo isso com ${normTopic}, você tá perdendo dinheiro sem perceber.`;
  }

  // es-ES
  return `Si vives en España y aplicas el consejo habitual sobre ${normTopic}, estás cometiendo un error monumental.`;
}

/**
 * Deduplicates repeated institutional words and market tags caused by template collisions.
 */
export function cleanTemplateText(text: string): string {
  let result = text;

  // Deduplicate repeated market location
  result = result.replace(/\b(in the UK|in UK)\s+(in the UK|in UK)\b/gi, 'in the UK');
  result = result.replace(/\b(em Portugal)\s+(em Portugal)\b/gi, 'em Portugal');
  result = result.replace(/\b(no Brasil)\s+(no Brasil)\b/gi, 'no Brasil');
  result = result.replace(/\b(en España)\s+(en España)\b/gi, 'en España');

  // Deduplicate repeated HMRC / IRS / Hacienda
  result = result.replace(/\bThe Costly HMRC Mistake with HMRC rules for\b/gi, 'The Costly Mistake with HMRC rules for');
  result = result.replace(/\bThe Unwritten UK Rule of HMRC rules for (.+?) That Changes Everything\b/gi, 'The Unwritten HMRC Rules for $1 That Change Everything');
  result = result.replace(/\bThe Unwritten UK Rule of rules for (.+?) That Changes Everything\b/gi, 'The Unwritten UK Rules for $1 That Change Everything');
  result = result.replace(/\bThe Unwritten UK Rule of HMRC rules for\b/gi, 'The Unwritten HMRC Rules for');
  result = result.replace(/\bThe Unwritten UK Rule of rules for\b/gi, 'The Unwritten UK Rules for');
  result = result.replace(/\bThe Unwritten HMRC Rules for (.+?) That Changes Everything\b/gi, 'The Unwritten HMRC Rules for $1 That Change Everything');

  // Editorial smoothing when topic starts with "HMRC rules for " or "rules for "
  result = result.replace(/\bHow to Start with (?:the )?HMRC rules for\b/gi, 'How to Navigate HMRC rules for');
  result = result.replace(/\bHow to Start with (?:the )?rules for\b/gi, 'How to Navigate the rules for');
  result = result.replace(/\bHow to Set Up (?:the )?HMRC rules for\b/gi, 'How to Set Up Accounts under HMRC rules for');
  result = result.replace(/\bHow to Set Up (?:the )?rules for\b/gi, 'How to Get Started under the rules for');
  result = result.replace(/\bHow to Organise (?:the )?HMRC rules for\b/gi, 'How to Organise Your Strategy for');
  result = result.replace(/\bStop Copying US Advice for (?:the )?HMRC rules for\b/gi, 'Stop Copying US Advice: UK HMRC rules for');
  result = result.replace(/\bThe Biggest Waste of Money in (?:the )?HMRC rules for\b/gi, 'The Costliest Mistakes in HMRC rules for');

  // IRS deduplication (Portugal)
  result = result.replace(/\bO Erro no IRS \/ Custos em Portugal com regras de IRS para\b/gi, 'O Erro de IRS em Portugal com');
  result = result.replace(/\bO Erro no IRS \/ Finanças com regras de IRS para\b/gi, 'O Erro com regras de IRS para');
  result = result.replace(/\bA Regra Não Escrita de regras de IRS para\b/gi, 'As Regras de IRS para');
  result = result.replace(/\bComo Começar em regras de IRS para\b/gi, 'Como Começar a Respeitar as Regras de IRS para');

  // Hacienda deduplication (Spain)
  result = result.replace(/\bLa Trampa Fiscal de deducciones de Hacienda para\b/gi, 'La Trampa con las Deducciones de Hacienda para');
  result = result.replace(/\bLa Trampa Fiscal de normativa de Hacienda para\b/gi, 'La Trampa de Hacienda para');
  result = result.replace(/\bCómo Empezar en normativa de Hacienda para\b/gi, 'Cómo Cumplir la Normativa de Hacienda para');

  return result;
}

/**
 * Formats Script 1 (Contrarian) spoken opening based on topic type.
 */
export function formatScript1Opening(topic: string, market: TargetMarket): string {
  const normTopic = normalizeTopic(topic, market);
  const isRule = isRuleOrGuidanceTopic(normTopic);

  if (market === 'en-GB') {
    if (isRule) {
      return `If you are still following standard guidance on ${normTopic} in the UK, I'm sorry to say, but you are throwing money away every single month.`;
    }
    return `If you are still doing this with ${normTopic} in the UK, I'm sorry to say, but you are throwing money away every single month.`;
  }

  if (market === 'pt-PT') {
    if (isRule) {
      return `Se ainda estás a seguir o conselho tradicional sobre ${normTopic} em Portugal, lamento dizer-te, mas estás a deitar dinheiro ao lixo todos os meses.`;
    }
    return `Se ainda estás a fazer isto com ${normTopic} em Portugal, lamento dizer-te, mas estás a deitar dinheiro ao lixo todos os meses.`;
  }

  if (market === 'es-ES') {
    return `Si sigues aplicando este consejo sobre ${normTopic} en España, estás regalando literalmente tu dinero.`;
  }

  // pt-BR
  return `Se você ainda tá seguindo a receita de bolo sobre ${normTopic}, você tá deixando muito dinheiro na mesa todo mês.`;
}

