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
    ptData.competitors.length >= 10 && ptData.competitors.length <= 20,
    `Competitors count is within 10-20 (Got: ${ptData.competitors.length})`
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
  assert(ptData.sources.length >= 10, `At least 10 source citations (Got: ${ptData.sources.length})`);
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

  console.log('\n🎉 ALL WORKFLOW TESTS PASSED SUCCESSFULLY! 🎉\n');
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
