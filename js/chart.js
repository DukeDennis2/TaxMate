let taxChart;

function renderChart(stateTax, federalTax, netIncome) {
  const ctx = document.getElementById("taxChart")?.getContext("2d");
  if (!ctx) {
    console.error("Canvas not found");
    return;
  }

  if (taxChart) taxChart.destroy();

  taxChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["State Tax", "Federal Tax", "Net Income"],
      datasets: [{
        data: [stateTax, federalTax, netIncome],
        backgroundColor: ["#ff6384", "#36a2eb", "#4caf50"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}