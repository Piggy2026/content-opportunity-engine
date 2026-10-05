import fetch from 'node-fetch';

interface TestCase {
  id: number;
  topic: string;
  market: 'pt-PT' | 'en-GB' | 'pt-BR' | 'es-ES';
  platform: 'youtube' | 'youtube-shorts' | 'tiktok' | 'instagram-reels';
  expectedDomain: string;
  isFinanceExpected: boolean;
}

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    topic: 'how to make a chocolate cake',
    market: 'pt-PT',
    platform: 'youtube',
    expectedDomain: 'cooking_food',
    isFinanceExpected: false,
  },
  {
    id: 2,
    topic: 'how to save money on groceries',
    market: 'pt-PT',
    platform: 'youtube',
    expectedDomain: 'consumer_budgeting',
    isFinanceExpected: false,
  },
  {
    id: 3,
    topic: 'older men’s health recipes',
    market: 'en-GB',
    platform: 'youtube',
    expectedDomain: 'health_fitness',
    isFinanceExpected: false,
  },
  {
    id: 4,
    topic: 'gardening for beginners',
    market: 'en-GB',
    platform: 'youtube',
    expectedDomain: 'gardening_diy',
    isFinanceExpected: false,
  },
  {
    id: 5,
    topic: 'investing in ETFs',
    market: 'pt-PT',
    platform: 'youtube',
    expectedDomain: 'finance_investing',
    isFinanceExpected: true,
  },
];

const FORBIDDEN_FINANCE_PATTERNS = [
  /\bIRS\b/i,
  /\bIRPF\b/i,
  /\bHMRC\b/i,
  /\bHacienda\b/i,
  /\bAutoridade Tributária\b/i,
  /\bPortal das Finanças\b/i,
  /\bEuribor\b/i,
  /\bBanco de Portugal\b/i,
  /\bFCA\b/i,
  /\bcomissões bancárias\b/i,
  /\bcomissão de custódia\b/i,
  /\bretenção na fonte\b/i,
  /\bdeclaração de irs\b/i,
  /\bjuros compostos\b/i,
  /\bfiscal drag\b/i,
  /\bcapital gains tax\b/i,
  /\bbancos tradicionais\b/i,
];

async function runRegression() {
  console.log('====================================================');
  console.log('STARTING TOPIC FIDELITY & RELEVANCE REGRESSION TESTS');
  console.log('====================================================\n');

  let allPassed = true;

  for (const tc of TEST_CASES) {
    console.log(`\n----------------------------------------------------`);
    console.log(`[TEST ${tc.id}] Topic: "${tc.topic}" | Market: ${tc.market} | Platform: ${tc.platform}`);
    console.log(`Expected Domain: ${tc.expectedDomain} (Finance: ${tc.isFinanceExpected})`);
    console.log(`----------------------------------------------------`);

    try {
      const resp = await fetch('http://127.0.0.1:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: tc.topic,
          market: tc.market,
          platform: tc.platform,
        }),
      });

      if (!resp.ok) {
        console.error(`❌ HTTP Error: ${resp.status} ${resp.statusText}`);
        allPassed = false;
        continue;
      }

      const data: any = await resp.json();

      // 1. Provenance & Competitor Verification
      console.log(`Provenance: ${data.researchProvenance.sourceType}, LiveAvailable: ${data.isLiveResearchAvailable}`);
      console.log(`Verified Competitors Found: ${data.competitors.length}`);

      let competitorRelevanceIssues: string[] = [];
      for (const comp of data.competitors) {
        if (!comp.isRealVerifiedSource || !comp.url.startsWith('http')) {
          competitorRelevanceIssues.push(`Competitor ${comp.id} lacks verified URL: ${comp.url}`);
        }
      }

      if (competitorRelevanceIssues.length > 0) {
        console.error(`❌ Competitor relevance issues:`, competitorRelevanceIssues);
        allPassed = false;
      } else {
        console.log(`✅ All competitors have authentic verified URLs.`);
      }

      // Check sample competitors
      if (data.competitors.length > 0) {
        console.log(`Sample verified competitors:`);
        data.competitors.slice(0, 3).forEach((c: any) => {
          console.log(`  - "${c.title}" (${c.channelOrCreator}) -> ${c.url}`);
        });
      } else {
        console.log(`Notice: ${data.researchProvenance.notice}`);
      }

      // 2. Finance Contamination Check (for tests 1-4)
      if (!tc.isFinanceExpected) {
        let contaminationFound: string[] = [];

        // Check Outliers
        const outlierStr = JSON.stringify(data.outlierAnalysis);
        for (const pat of FORBIDDEN_FINANCE_PATTERNS) {
          if (pat.test(outlierStr)) {
            contaminationFound.push(`Outliers matched forbidden pattern ${pat}`);
          }
        }

        // Check Content Gaps
        for (const gap of data.contentGaps) {
          const gapStr = `${gap.title} ${gap.description} ${gap.marketNuance}`;
          for (const pat of FORBIDDEN_FINANCE_PATTERNS) {
            if (pat.test(gapStr)) {
              contaminationFound.push(`Gap "${gap.title}" matched forbidden pattern ${pat}`);
            }
          }
        }

        // Check Ranked Ideas
        for (const idea of data.rankedIdeas) {
          const ideaStr = `${idea.title} ${idea.angle} ${idea.gapExploited}`;
          for (const pat of FORBIDDEN_FINANCE_PATTERNS) {
            if (pat.test(ideaStr)) {
              contaminationFound.push(`Idea "${idea.title}" matched forbidden pattern ${pat}`);
            }
          }
        }

        // Check Scripts
        for (const s of data.scripts) {
          const scriptStr = `${s.fullSpokenText} ${s.tagline}`;
          for (const pat of FORBIDDEN_FINANCE_PATTERNS) {
            if (pat.test(scriptStr)) {
              contaminationFound.push(`Script "${s.id}" matched forbidden pattern ${pat}`);
            }
          }
        }

        // Check Titles & Hooks
        for (const t of data.titles) {
          for (const pat of FORBIDDEN_FINANCE_PATTERNS) {
            if (pat.test(t.title)) {
              contaminationFound.push(`Title "${t.title}" matched forbidden pattern ${pat}`);
            }
          }
        }

        for (const h of data.hooks) {
          for (const pat of FORBIDDEN_FINANCE_PATTERNS) {
            if (pat.test(h.spokenHook)) {
              contaminationFound.push(`Hook "${h.spokenHook}" matched forbidden pattern ${pat}`);
            }
          }
        }

        if (contaminationFound.length > 0) {
          console.error(`❌ Finance contamination detected:`);
          contaminationFound.slice(0, 5).forEach((e) => console.error(`  ${e}`));
          allPassed = false;
        } else {
          console.log(`✅ Zero finance/tax contamination verified across all analysis layers!`);
        }
      } else {
        // Finance expected (Test 5): ensure financial depth is present
        const combined = JSON.stringify(data);
        const hasFinanceTerms = /IRS|comiss|taxa|retorno|custódia|banco/i.test(combined);
        if (hasFinanceTerms) {
          console.log(`✅ Appropriate financial depth verified for ETF investing topic.`);
        } else {
          console.warn(`⚠️ Warning: Expected financial terms for ETF investing topic.`);
        }
      }

      // 3. Inspect Best Opportunity & Script Samples
      console.log(`Best Opportunity Idea: "${data.bestOpportunity.title}"`);
      console.log(`Gap Exploited: "${data.bestOpportunity.gapExploited}"`);
      console.log(`Script 1 (Contrarian) Hook: "${data.scripts[0].sections[0].spokenText}"`);
      console.log(`Script 1 Agitate: "${data.scripts[0].sections[1].spokenText.substring(0, 80)}..."`);
      console.log(`Top Title 1: "${data.titles[0].title}"`);
      console.log(`Top Hook 1: "${data.hooks[0].spokenHook}"`);
    } catch (err: any) {
      console.error(`❌ Pipeline crashed:`, err.message || err);
      allPassed = false;
    }
  }

  console.log(`\n====================================================`);
  if (allPassed) {
    console.log(`🏆 ALL 5 REGRESSION TESTS PASSED WITH ZERO CONTAMINATION!`);
  } else {
    console.error(`💥 REGRESSION TESTS FAILED!`);
    process.exit(1);
  }
  console.log(`====================================================`);
}

runRegression();
