export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const data = req.body;

  // Exemple minimal pour test immédiat
  // Remplacer par ton appel réel OpenAI plus tard
  const analysisText = `
Systemic Life Analysis (LivingScope):
- Received ${Object.keys(data).length} questions
- Positive factors: 7
- Negative factors: 3
- Recommendations: Maintain sleep, exercise, healthy diet
`;

  const factors = { positive: 7, negative: 3 };

  res.status(200).json({ analysis: analysisText, factors });
}
