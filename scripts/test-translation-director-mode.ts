import { generateScriptSuite } from '../server/services/scriptService.js';
import { translateNaturally } from '../server/services/translationService.js';
import { ResearchRequest, ContentIdea } from '../src/types/index.js';

async function testTranslationAndDirectorMode() {
  console.log('=== TESTING NATURAL TRANSLATION & DIRECTOR MODE ===\n');

  // Test 1: Spanish market script generation with English translations & Director Notes
  const req: ResearchRequest = {
    topic: 'Cuota de Autónomos y Deducciones de Hacienda',
    market: 'es-ES',
    platform: 'youtube',
  };

  const idea: ContentIdea = {
    rank: 1,
    id: 'idea-1',
    title: 'El Error al Deducir Gastos de Autónomos en Hacienda',
    angle: 'Contrarian tax savings',
    format: '8-min YouTube Deep Dive',
    opportunityScore: 92,
    gapExploited: 'Confusion over deducible freelance expenses in Spain',
    targetAudiencePainPoint: 'Fear of tax inspection',
    viralityPotential: 'Very High',
    competitionLevel: 'Low',
    whyItWins: 'Direct actionable answers to IRS/Hacienda fears',
  };

  const suite = generateScriptSuite(req, idea, []);

  console.log('1. Verifying Spanish Scripts:');
  const script1 = suite.scripts[0];
  console.log(`- Style: ${script1.styleName}`);
  console.log(`- Native Spanish Spoken Hook: "${script1.sections[0].spokenText}"`);
  console.log(`- Natural English Translation: "${script1.sections[0].spokenTextTranslation}"`);
  console.log(`- Director Note: "${script1.sections[0].directorNote}"\n`);

  if (!script1.sections[0].spokenTextTranslation) {
    throw new Error('FAILED: Missing spokenTextTranslation in ScriptSection');
  }
  if (!script1.sections[0].directorNote) {
    throw new Error('FAILED: Missing directorNote in ScriptSection');
  }

  console.log('2. Verifying Section 2 (Pattern Interrupt):');
  console.log(`- Native Spanish Spoken: "${script1.sections[1].spokenText.slice(0, 80)}..."`);
  console.log(`- Natural English Translation: "${script1.sections[1].spokenTextTranslation?.slice(0, 80)}..."`);
  console.log(`- Director Note: "${script1.sections[1].directorNote}"\n`);

  console.log('3. Verifying Hooks:');
  const hook1 = suite.hooks[0];
  console.log(`- Native Spanish Spoken Hook: "${hook1.spokenHook}"`);
  console.log(`- Natural English Translation: "${hook1.spokenHookTranslation}"`);
  console.log(`- Director Note: "${hook1.directorNote}"\n`);

  if (!hook1.spokenHookTranslation) {
    throw new Error('FAILED: Missing spokenHookTranslation in HookIdea');
  }

  console.log('4. Verifying CTAs:');
  const cta1 = suite.ctas[0];
  console.log(`- Native Spanish Spoken CTA: "${cta1.spokenCta}"`);
  console.log(`- Natural English Translation: "${cta1.spokenCtaTranslation}"`);
  console.log(`- Director Note: "${cta1.directorNote}"\n`);

  if (!cta1.spokenCtaTranslation) {
    throw new Error('FAILED: Missing spokenCtaTranslation in CallToAction');
  }

  console.log('5. Verifying On-Demand Semantic Translation for Competitor Video:');
  const rawSpanishTitle = 'Cómo Hacer Bizcocho de Yogur Esponjoso y Fácil - Receta Tradicional';
  const transResult = await translateNaturally(rawSpanishTitle, 'en', 'competitor_title');
  console.log(`- Original Spanish Title: "${rawSpanishTitle}"`);
  console.log(`- Natural English Translation: "${transResult.translation}"`);
  console.log(`- Director Context: "${transResult.directorNote}"\n`);

  console.log('🎉 ALL NATURAL TRANSLATION & DIRECTOR MODE TESTS PASSED!');
}

testTranslationAndDirectorMode().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
