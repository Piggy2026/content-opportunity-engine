async function testLive() {
  console.log('Testing live Netlify deployment...');
  
  // 1. Health check
  try {
    const healthRes = await fetch('https://content-opportunity-engine.netlify.app/api/health');
    const healthJson = await healthRes.json();
    console.log('Live /api/health response:', JSON.stringify(healthJson, null, 2));
  } catch (err: any) {
    console.error('Error fetching live /api/health:', err.message);
  }

  // 2. Frontend HTML check
  try {
    const htmlRes = await fetch('https://content-opportunity-engine.netlify.app/');
    const html = await htmlRes.text();
    console.log(`Live index.html status: ${htmlRes.status} (Length: ${html.length} bytes)`);
    console.log(`Contains root div: ${html.includes('id="root"')}`);
  } catch (err: any) {
    console.error('Error fetching live index.html:', err.message);
  }

  // 3. Test Live Analyze Endpoint
  try {
    console.log('Sending test analyze request to live Netlify function...');
    const analyzeRes = await fetch('https://content-opportunity-engine.netlify.app/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'Stocks and Shares ISA rules in the UK',
        market: 'en-GB',
        platform: 'youtube',
      }),
    });
    console.log('Live analyze status:', analyzeRes.status);
    const analyzeData = await analyzeRes.json();
    console.log('Live analyze results:');
    console.log('- Market:', analyzeData.request?.market);
    console.log('- Best Opportunity Title:', analyzeData.bestOpportunity?.title);
    console.log('- Ranked Ideas count:', analyzeData.rankedIdeas?.length);
    console.log('- Scripts count:', analyzeData.scripts?.length);
    console.log('- Script 1 Style:', analyzeData.scripts?.[0]?.styleName);
    console.log('- Script 1 Sample spoken text:', analyzeData.scripts?.[0]?.sections?.[0]?.spokenText?.slice(0, 100));
  } catch (err: any) {
    console.error('Error calling live /api/analyze:', err.message);
  }
}

testLive();
