document.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("state");
  const form = document.getElementById("taxForm");
  const closeBtn = document.getElementById("closeResult");
  const overlay = document.getElementById("chartTextOverlay");
  const chartWrapper = document.getElementById("chartWrapper");

  const states = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas",
    CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
    DC: "District of Columbia", FL: "Florida", GA: "Georgia", HI: "Hawaii",
    ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
    KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine",
    MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
    MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska",
    NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico",
    NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
    OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island",
    SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas",
    UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
    WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
  };

  const federalBrackets2025 = {
    single: [
      { rate: 0.10, cap: 11925 },
      { rate: 0.12, cap: 48475 },
      { rate: 0.22, cap: 103350 },
      { rate: 0.24, cap: 197300 },
      { rate: 0.32, cap: 250525 },
      { rate: 0.35, cap: 626350 },
      { rate: 0.37, cap: Infinity }
    ],
    married_joint: [
      { rate: 0.10, cap: 23850 },
      { rate: 0.12, cap: 96950 },
      { rate: 0.22, cap: 206700 },
      { rate: 0.24, cap: 394600 },
      { rate: 0.32, cap: 501050 },
      { rate: 0.35, cap: 751600 },
      { rate: 0.37, cap: Infinity }
    ],
    married_separate: [
      { rate: 0.10, cap: 11925 },
      { rate: 0.12, cap: 48475 },
      { rate: 0.22, cap: 103350 },
      { rate: 0.24, cap: 197300 },
      { rate: 0.32, cap: 250525 },
      { rate: 0.35, cap: 375800 },
      { rate: 0.37, cap: Infinity }
    ],
    head: [
      { rate: 0.10, cap: 17000 },
      { rate: 0.12, cap: 64850 },
      { rate: 0.22, cap: 103350 },
      { rate: 0.24, cap: 197300 },
      { rate: 0.32, cap: 250500 },
      { rate: 0.35, cap: 626350 },
      { rate: 0.37, cap: Infinity }
    ]
  };

  // Populate dropdown
  for (const [abbr, name] of Object.entries(states)) {
    const option = document.createElement("option");
    option.value = abbr;
    option.textContent = name;
    stateSelect.appendChild(option);
  }

  function calculateFederalTax2025(income, status) {
    let tax = 0, prevCap = 0;
    const brackets = federalBrackets2025[status];
    for (let { rate, cap } of brackets) {
      if (income > cap) {
        tax += (cap - prevCap) * rate;
        prevCap = cap;
      } else {
        tax += (income - prevCap) * rate;
        break;
      }
    }
    return tax;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const state = stateSelect.value;
    const income = parseFloat(document.getElementById("income").value);
    const status = document.getElementById("filingStatus").value;

    if (!state || isNaN(income) || income < 0 || !status) {
      alert("Please enter valid details for all fields.");
      return;
    }

    const taxRate = TaxRates[state];
    if (typeof taxRate === "undefined") {
      alert("Tax rate not found for selected state.");
      return;
    }

    const stateTax = income * taxRate;
    const federalTax = calculateFederalTax2025(income, status);
    const totalTax = stateTax + federalTax;
    const netIncome = income - totalTax;

    renderChart(stateTax, federalTax, netIncome);

    // Show overlay text
   document.getElementById("chartTextOverlay").innerHTML = `
    <h3>Tax Summary</h3>
    State: $${stateTax.toFixed(2)}<br>
    Federal: $${federalTax.toFixed(2)}<br>
    Total Tax: $${(stateTax + federalTax).toFixed(2)}<br>
    Net: $${netIncome.toFixed(2)}
  `;

    chartWrapper.style.display = "block";
    closeBtn.style.display = "inline-block";
  });

  closeBtn.addEventListener("click", () => {
    chartWrapper.style.display = "none";
    closeBtn.style.display = "none";
    overlay.innerHTML = "";
    form.reset();
  });
});