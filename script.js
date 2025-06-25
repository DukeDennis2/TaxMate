document.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("state");
  const form = document.getElementById("taxForm");
  const resultDiv = document.getElementById("result");

  // Load state names
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

  // Populate the dropdown
  for (const [abbr, name] of Object.entries(states)) {
    const option = document.createElement("option");
    option.value = abbr;
    option.textContent = name;
    stateSelect.appendChild(option);
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
  e.preventDefault();

  const state = stateSelect.value;
  const income = parseFloat(document.getElementById("income").value);

  if (!state || isNaN(income) || income < 0) {
    resultDiv.textContent = "Please enter valid details.";
    resultDiv.style.display = "block";
    return;
  }

  const taxRate = TaxRates[state]; // <-- use your exact variable name here

  if (typeof taxRate === "undefined") {
    resultDiv.textContent = "Tax rate not found for selected state.";
    resultDiv.style.display = "block";
    return;
  }

  const tax = income * taxRate;
  const netIncome = income - tax;

  resultDiv.innerHTML = `
    <h3>Here is your results:</h3>
    <strong>State:</strong> ${states[state]}<br>
    <strong>Tax Rate:</strong> ${(taxRate * 100).toFixed(2)}%<br>
    <strong>Tax Amount:</strong> $${tax.toFixed(2)}<br>
    <strong>Net Income:</strong> $${netIncome.toFixed(2)}
    <button id="closeResult" class="close-btn">Close Results</button>

  `;
  resultDiv.style.display = "block";

    // Attach event listener to close button
    document.getElementById("closeResult").addEventListener("click", () => {
    resultDiv.style.display = "none";

        // Reset the state dropdown to the default option
    document.getElementById("state").selectedIndex = 0;

    // Optionally reset the income field as well:
    document.getElementById("income").value = '';
        });
});
});

