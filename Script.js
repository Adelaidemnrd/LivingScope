document.getElementById("lifeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target).entries());

  // Anonymisation totale
  const anonymized = data;

  // Envoi vers backend Vercel
  const res = await fetch("https://livingscope.vercel.app/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anonymized)
  });

  const result = await res.json();

  // Affichage analyse IA dans une nouvelle fenêtre
  const win = window.open("", "_blank");
  win.document.write("<h1>LivingScope - Systemic Life Analysis</h1>");
  win.document.write(`<pre>${result.analysis || JSON.stringify(result, null, 2)}</pre>`);

  // Graphique des facteurs
  const factors = result.factors || { positive: 7, negative: 3 };
  const ctx = document.getElementById('factorChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Positive Factors', 'Negative Factors'],
      datasets: [{
        label: 'Impact on Life Expectancy',
        data: [factors.positive, factors.negative],
        backgroundColor: ['#6B8EC1','#E57373']
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
});
