export default async function handler(req, res) {
  res.status(200).json({ message: "Hello from Vercel API" });
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const data = req.body;
  ...
}
  const prompt = `
You are a global life expectancy and lifestyle expert.
Analyze the following anonymous responses.
You must NEVER provide information that is not scientifically verified.
Check internally for consistency and rely only on facts supported by scientific literature.
Return:
- Systemic personal analysis
- Factors increasing life expectancy
- Factors reducing life expectancy
- Overall score
- Recommendations
- Provide a simple JSON with counts of positive and negative factors

Data:
${JSON.stringify(data)}
`;

  const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const json = await aiResponse.json();
  const analysisText = json.choices[0].message.content;

  // Exemple simplifié pour graphique
  const factors = {positive: 7, negative: 3};

  res.status(200).json({ analysis: analysisText, factors });
}
