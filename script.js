function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function calculateProceeds() {
    // Get input values
    const salePrice = parseFloat(document.getElementById('salePrice').value) || 0;
    const mortgageBalance = parseFloat(document.getElementById('mortgageBalance').value) || 0;
    const otherLiens = parseFloat(document.getElementById('otherLiens').value) || 0;
    const traditionalCommissionRate = parseFloat(document.getElementById('traditionalCommission').value) || 0;
    const lowFeeCommissionRate = parseFloat(document.getElementById('lowFeeCommission').value) || 0;
    const transferTaxRate = parseFloat(document.getElementById('transferTax').value) || 0;
    const recordingFees = parseFloat(document.getElementById('recordingFees').value) || 0;
    const titleInsurance = parseFloat(document.getElementById('titleInsurance').value) || 0;
    const settlementFee = parseFloat(document.getElementById('settlementFee').value) || 0;
    const attorneyFees = parseFloat(document.getElementById('attorneyFees').value) || 0;
    const resalePackage = parseFloat(document.getElementById('resalePackage').value) || 0;
    const hoaProrations = parseFloat(document.getElementById('hoaProrations').value) || 0;
    const moveOutFees = parseFloat(document.getElementById('moveOutFees').value) || 0;
    const prepCosts = parseFloat(document.getElementById('prepCosts').value) || 0;
    const creditsAndConcessions = parseFloat(document.getElementById('creditsAndConcessions').value) || 0;
    const otherCosts = parseFloat(document.getElementById('otherCosts').value) || 0;

    // Calculate commissions
    const traditionalCommission = salePrice * (traditionalCommissionRate / 100);
    const lowFeeCommission = salePrice * (lowFeeCommissionRate / 100);

    // Calculate transfer tax
    const transferTax = salePrice * (transferTaxRate / 100);

    // Calculate fixed costs (same for both scenarios)
    const fixedCosts = recordingFees + titleInsurance + settlementFee + attorneyFees + 
                     resalePackage + hoaProrations + moveOutFees + prepCosts + 
                     creditsAndConcessions + otherCosts + transferTax;

    // Calculate total costs for each scenario
    const traditionalTotalCosts = traditionalCommission + fixedCosts + mortgageBalance + otherLiens;
    const lowFeeTotalCosts = lowFeeCommission + fixedCosts + mortgageBalance + otherLiens;

    // Calculate net proceeds
    const traditionalNet = salePrice - traditionalTotalCosts;
    const lowFeeNet = salePrice - lowFeeTotalCosts;
    const savings = lowFeeNet - traditionalNet;

    // Update results
    document.getElementById('traditionalNet').textContent = formatCurrency(traditionalNet);
    document.getElementById('lowFeeNet').textContent = formatCurrency(lowFeeNet);
    document.getElementById('savings').textContent = formatCurrency(savings);

    // Update breakdowns
    updateBreakdown('traditionalBreakdown', salePrice, traditionalCommission, fixedCosts, mortgageBalance, otherLiens, traditionalNet);
    updateBreakdown('lowFeeBreakdown', salePrice, lowFeeCommission, fixedCosts, mortgageBalance, otherLiens, lowFeeNet);
}

function updateBreakdown(tableId, salePrice, commission, fixedCosts, mortgageBalance, otherLiens, netProceeds) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = `
        <tr><td>Sale Price</td><td>${formatCurrency(salePrice)}</td></tr>
        <tr><td>Commission</td><td>-${formatCurrency(commission)}</td></tr>
        <tr><td>Taxes & Fees</td><td>-${formatCurrency(fixedCosts)}</td></tr>
        <tr><td>Mortgage Payoff</td><td>-${formatCurrency(mortgageBalance)}</td></tr>
        <tr><td>Other Liens</td><td>-${formatCurrency(otherLiens)}</td></tr>
        <tr><td><strong>Net Proceeds</strong></td><td><strong>${formatCurrency(netProceeds)}</strong></td></tr>
    `;
}

// Initialize calculations on page load
calculateProceeds();