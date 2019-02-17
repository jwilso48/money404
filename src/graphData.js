/**
 * Transform a customer data object into data for a two-line graph
 * @param {object} customerData - the customer data to summarize
 */
function getGraphData(customerData) {
    let graphData = [];
    let startingAssets = 0;
    let startingDebts = 0;
    console.log(customerData.accounts)
    customerData.accounts.forEach(account => {
        startingAssets += account.account.balance;
        account.loans.forEach(loan => {
            startingDebts += loan.amount;
        });
    });
    customerData.accounts.forEach(account => {
        account.loans.forEach(loan => {
            startingDebts += loan.amount;
        });
    });
    return graphData;
}

export {
    getGraphData
}