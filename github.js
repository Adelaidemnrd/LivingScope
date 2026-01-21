document.getElementById("lifeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target).entries());

  // Data anonymization
  const anonymized = data;

  // Send to backend Vercel
  const res = await fetch("https://TON-PROJET.vercel.app/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anonymized)
  });

  const result = await res.json();

  // Display analysis in new window
  const win = window.open("", "_blank");
  win.document.write("<h1>Systemic Life Analysis</h1>");
  win.document.write(`<pre>${result.analysis}</pre>`);

  // Chart
  const factors = result.factors; 
  if(factors){
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
  }
});