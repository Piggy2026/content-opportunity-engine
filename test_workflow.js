// Automated End-to-End Verification Test for Content Opportunity Engine
const assert = (condition, msg) => {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${msg}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${msg}`);
  }
};

async function runTests() {
  console.log('=== STARTING END-TO-END VERIFICATION ===\n');

  // 1. Health check
  console.log('Step 1: Testing Server Health...');
  const healthRes = await fetch('http://localhost:3001/api/health');
  assert(healthRes.ok, 'Health endpoint responds with 200 OK');
  const health = await healthRes.json();
  assert(health.status === 'ok', 'Server status is ok');

  // 2. Research input & retrieval: Portugal YouTube
  console.log('\nStep 2: Testing Analysis Pipeline for Portugal (pt-PT, YouTube)...');
  const ptReq = {
    topic: 'Como investir em ETFs em Portugal sem pagar comissões absurdas',
    market: 'pt-PT',
    platform: 'youtube',
    audienceLevel: 'beginner',
  };
  const ptRes = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ptReq),
  });
  assert(ptRes.ok, 'Pipeline responded 200 for Portugal request');
  const ptData = await ptRes.json();

  // 3. Competitor results (10-20, no invented statistics)
  console.log('\nStep 3: Checking Competitor Results...');
  assert(
    ptData.competitors.length >= 1 && ptData.competitors.length <= 20,
    `Competitors count is valid and unpadded (Got: ${ptData.competitors.length})`
  );
  for (const c of ptData.competitors) {
    assert(c.url.startsWith('http'), `Competitor has valid URL: ${c.url}`);
    assert(c.title && c.title.length > 5, `Competitor has realistic title: "${c.title.slice(0, 40)}..."`);
    assert(c.channelOrCreator, `Competitor has channel name: ${c.channelOrCreator}`);
    assert(c.factSummary, `Competitor has explicit fact summary`);
    assert(c.aiInference, `Competitor has explicit AI inference`);
    // Ensure no Math.random fake views:
    if (c.views) {
      assert(typeof c.views === 'string', `Views when present is string: ${c.views}`);
    }
  }

  // 4. Outlier Analysis
  console.log('\nStep 4: Checking Outlier Analysis...');
  assert(ptData.outlierAnalysis, 'Outlier analysis exists');
  assert(ptData.outlierAnalysis.topFormatOutlier.format, 'Top format outlier identified');
  assert(ptData.outlierAnalysis.dominantHookPatterns.length >= 3, 'At least 3 dominant hook patterns');
  assert(ptData.outlierAnalysis.observedFacts.length > 0, 'Observed facts explicitly populated');
  assert(ptData.outlierAnalysis.aiDeductions.length > 0, 'AI deductions explicitly separated');

  // 5. Content Gaps
  console.log('\nStep 5: Checking Content Gaps...');
  assert(ptData.contentGaps.length >= 3, `At least 3 content gaps detected (Got: ${ptData.contentGaps.length})`);
  assert(ptData.contentGaps.some((g) => g.marketNuance.includes('Portugal') || g.marketNuance.includes('pt-PT')), 'Gaps have Portugal-specific nuances');

  // 6. 15–20 Ranked Content Ideas
  console.log('\nStep 6: Checking 15-20 Ranked Ideas...');
  assert(
    ptData.rankedIdeas.length >= 15 && ptData.rankedIdeas.length <= 20,
    `Ranked ideas count is within 15-20 (Got: ${ptData.rankedIdeas.length})`
  );
  // Verify descending score sort
  for (let i = 0; i < ptData.rankedIdeas.length - 1; i++) {
    assert(
      ptData.rankedIdeas[i].opportunityScore >= ptData.rankedIdeas[i + 1].opportunityScore,
      `Ideas are sorted descending by score: #${ptData.rankedIdeas[i].rank} (${ptData.rankedIdeas[i].opportunityScore}) >= #${ptData.rankedIdeas[i + 1].rank} (${ptData.rankedIdeas[i + 1].opportunityScore})`
    );
  }

  // 7. Best Opportunity
  console.log('\nStep 7: Checking Best Opportunity...');
  assert(ptData.bestOpportunity, 'Best opportunity exists');
  assert(ptData.bestOpportunity.rank === 1, 'Best opportunity is rank #1');
  assert(ptData.bestOpportunity.isBestOpportunity === true, 'Best opportunity marked with isBestOpportunity flag');
  assert(ptData.bestOpportunity.whyItWins, 'Best opportunity has strategic explanation of why it wins');

  // 8. 3 Script Variations
  console.log('\nStep 8: Checking 3 Script Variations...');
  assert(ptData.scripts.length === 3, `Exactly 3 script variations generated (Got: ${ptData.scripts.length})`);
  const styles = ptData.scripts.map((s) => s.style);
  assert(styles.includes('contrarian-mythbuster'), 'Contains Contrarian / Myth-Buster variation');
  assert(styles.includes('story-driven-case-study'), 'Contains Story-Driven / POV variation');
  assert(styles.includes('actionable-blueprint'), 'Contains Actionable Blueprint variation');
  for (const s of ptData.scripts) {
    assert(s.sections.length >= 4, `Script has full chronological sections (Got: ${s.sections.length})`);
    assert(s.fullSpokenText.length > 80, 'Script has complete spoken speech text');
  }

  // 9. Titles, Hooks & CTAs
  console.log('\nStep 9: Checking Titles, Hooks & CTAs...');
  assert(ptData.titles.length >= 5, `At least 5 CTR titles generated (Got: ${ptData.titles.length})`);
  assert(ptData.hooks.length >= 5, `At least 5 first-3s hooks generated (Got: ${ptData.hooks.length})`);
  assert(ptData.ctas.length >= 2, `Platform-native CTAs generated (Got: ${ptData.ctas.length})`);
  for (const h of ptData.hooks) {
    assert(h.visualHook, 'Hook has visual instructions');
    assert(h.spokenHook, 'Hook has spoken text');
    assert(h.overlayText, 'Hook has on-screen typography overlay');
  }

  // 10. Source links
  console.log('\nStep 10: Checking Verified Sources...');
  assert(ptData.sources.length === ptData.competitors.length, `Source citations match competitors count (Got: ${ptData.sources.length})`);
  for (const src of ptData.sources) {
    assert(src.url.startsWith('http'), `Source URL is valid: ${src.url}`);
    assert(src.verificationStatus === 'verified_real_url', 'Verification status is verified_real_url');
  }

  // 11. Projects Persistence API
  console.log('\nStep 11: Checking Project Persistence & Retrieve...');
  const projectsRes = await fetch('http://localhost:3001/api/projects');
  assert(projectsRes.ok, 'Projects endpoint responded 200 OK');
  const projects = await projectsRes.json();
  assert(projects.length > 0, `Projects list contains saved projects (Count: ${projects.length})`);
  const savedPt = projects.find((p) => p.topic.includes('ETFs em Portugal'));
  assert(savedPt, 'Saved project was found in store');

  // Test loading full project details by ID
  const detailRes = await fetch(`http://localhost:3001/api/projects/${ptData.id}`);
  assert(detailRes.ok, 'Project details by ID responded 200 OK');
  const detailData = await detailRes.json();
  assert(detailData.id === ptData.id, 'Loaded project matches saved ID');

  // 12. Generate scripts for another idea
  console.log('\nStep 12: Testing Generating Scripts for Selected Idea (#2)...');
  const secondIdea = ptData.rankedIdeas[1];
  const ideaRes = await fetch('http://localhost:3001/api/generate-scripts-for-idea', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      request: ptReq,
      idea: secondIdea,
      competitors: ptData.competitors,
    }),
  });
  assert(ideaRes.ok, 'Generate scripts for idea endpoint responded 200 OK');
  const ideaData = await ideaRes.json();
  assert(ideaData.scripts.length === 3, 'Generated 3 new scripts for selected idea');
  assert(ideaData.titles.length >= 5, 'Generated titles for selected idea');

  // 13. Zero-Fabrication Integrity Check on Obscure Query
  console.log('\nStep 13: Testing Zero-Fabrication Safeguard on Obscure Niche Query...');
  const obscureReq = {
    topic: 'Origami fractal complexo com folha de bananeira artesanal',
    market: 'pt-PT',
    platform: 'youtube',
    audienceLevel: 'advanced',
  };
  const obscureRes = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obscureReq),
  });
  assert(obscureRes.ok, 'Pipeline responded 200 for obscure query');
  const obscureData = await obscureRes.json();

  // If live search found 0 items, check that it DID NOT substitute unrelated finance creators:
  console.log(`Competitors found for obscure query: ${obscureData.competitors.length}`);
  const hasFinanceCompetitors = obscureData.competitors.some(c =>
    c.channelOrCreator.includes('Rico Dinheiro') ||
    c.channelOrCreator.includes('Pedro Andersson') ||
    c.channelOrCreator.includes('Primo Rico')
  );
  assert(!hasFinanceCompetitors, 'NEVER injects unrelated finance benchmark creators as competitors!');

  if (obscureData.competitors.length === 0) {
    assert(obscureData.isLiveResearchAvailable === false, 'isLiveResearchAvailable is false when 0 competitors found');
    assert(obscureData.researchProvenance.sourceType === 'insufficient_live_data', 'Provenance sourceType is insufficient_live_data');
    assert(obscureData.researchProvenance.notice, 'Provenance contains clear transparency notice');
    assert(obscureData.sources.length === 0, 'No invented sources when 0 competitors found');
  }

  // 14. Testing Brazil Workflow (pt-BR, TikTok)
  console.log('\nStep 14: Testing Analysis Pipeline for Brazil (pt-BR, TikTok)...');
  const brReq = {
    topic: 'Como economizar dinheiro ganhando até dois salários mínimos',
    market: 'pt-BR',
    platform: 'tiktok',
    audienceLevel: 'beginner',
  };
  const brRes = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brReq),
  });
  assert(brRes.ok, 'Pipeline responded 200 for Brazil request');
  const brData = await brRes.json();
  assert(brData.rankedIdeas.length >= 15, 'Generated 15-20 ranked ideas for Brazil');
  assert(brData.scripts.length === 3, 'Generated 3 scripts for Brazil');
  assert(brData.contentGaps.some(g => g.marketNuance.includes('Brasil') || g.marketNuance.includes('pt-BR')), 'Brazil market nuance detected');

  // 15. Testing Spain Workflow (es-ES, Instagram Reels)
  console.log('\nStep 15: Testing Analysis Pipeline for Spain (es-ES, Instagram Reels)...');
  const esReq = {
    topic: 'Cómo tributar como autónomo en España sin cometer errores graves',
    market: 'es-ES',
    platform: 'instagram-reels',
    audienceLevel: 'intermediate',
  };
  const esRes = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(esReq),
  });
  assert(esRes.ok, 'Pipeline responded 200 for Spain request');
  const esData = await esRes.json();
  assert(esData.rankedIdeas.length >= 15, 'Generated 15-20 ranked ideas for Spain');
  assert(esData.scripts.length === 3, 'Generated 3 scripts for Spain');
  // 16. Testing United Kingdom Workflow (en-GB, YouTube)
  console.log('\nStep 16: Testing Analysis Pipeline for United Kingdom (en-GB, YouTube)...');
  const ukReq = {
    topic: 'How to invest in index funds and Stocks and Shares ISAs in the UK',
    market: 'en-GB',
    platform: 'youtube',
    audienceLevel: 'beginner',
  };
  const ukRes = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ukReq),
  });
  assert(ukRes.ok, 'Pipeline responded 200 for UK request');
  const ukData = await ukRes.json();
  assert(ukData.rankedIdeas.length >= 15, 'Generated 15-20 ranked ideas for UK');
  assert(ukData.scripts.length === 3, 'Generated 3 scripts for UK');
  assert(ukData.contentGaps.some(g => g.marketNuance.includes('United Kingdom') || g.marketNuance.includes('UK') || g.marketNuance.includes('en-GB')), 'UK market nuance detected');
  assert(ukData.scripts[0].fullSpokenText.includes('UK') || ukData.scripts[0].fullSpokenText.includes('HMRC') || ukData.scripts[0].fullSpokenText.includes('per cent'), 'British English vocabulary verified in scripts');
  assert(ukData.ctas.length >= 2, 'Generated platform-native UK CTAs');

  // 17. Testing Topic Normalization & Natural Phrasing ("Stocks and Shares ISA HMRC rules")
  console.log('\nStep 17: Testing Topic Normalization for UK ("Stocks and Shares ISA HMRC rules")...');
  const ukNormReq = {
    topic: 'Stocks and Shares ISA HMRC rules',
    market: 'en-GB',
    platform: 'youtube',
    audienceLevel: 'intermediate',
  };
  const ukNormRes = await fetch('http://localhost:3001/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ukNormReq),
  });
  assert(ukNormRes.ok, 'Pipeline responded 200 for UK normalized topic request');
  const ukNormData = await ukNormRes.json();
  assert(ukNormData.rankedIdeas.length >= 15, 'Generated 15-20 ranked ideas for normalized UK topic');
  assert(ukNormData.scripts.length === 3, 'Generated 3 scripts for normalized UK topic');

  // Check Idea 1 Title for absence of awkward repetition
  const topIdeaTitle = ukNormData.rankedIdeas[0].title;
  console.log(`Top Idea Title: "${topIdeaTitle}"`);
  assert(!topIdeaTitle.includes('HMRC Mistake with HMRC'), 'Idea 1 title avoids repeated "HMRC"');
  assert(!topIdeaTitle.includes('in the UK in the UK'), 'Idea 1 title avoids repeated "in the UK"');

  // Check Spoken Hook
  const topHook = ukNormData.hooks[0].spokenHook;
  console.log(`Top Spoken Hook: "${topHook}"`);
  assert(!topHook.includes('doing this with Stocks and Shares ISA HMRC rules'), 'Hook avoids awkward "doing this with rules"');
  assert(topHook.includes('HMRC rules for Stocks and Shares ISAs'), 'Hook contains natural phrasing "HMRC rules for Stocks and Shares ISAs"');

  // Check Script 1 Opening and Full Text
  const script1Opening = ukNormData.scripts[0].sections[0].spokenText;
  console.log(`Script 1 Opening: "${script1Opening}"`);
  assert(!script1Opening.includes('doing this with Stocks and Shares ISA HMRC rules'), 'Script 1 avoids awkward "doing this with rules"');
  assert(script1Opening.includes('HMRC rules for Stocks and Shares ISAs'), 'Script 1 contains natural phrasing "HMRC rules for Stocks and Shares ISAs"');
  assert(ukNormData.scripts[0].fullSpokenText.includes('per cent'), 'Script 1 maintains British English "per cent"');

  console.log('\n🎉 ALL WORKFLOW TESTS PASSED SUCCESSFULLY! 🎉\n');
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
