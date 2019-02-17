import {
    getTransactionsByDay
} from './TransactionsByDay'

function compare(a, b) {
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }
    return 0;
}

function filterOutNaNDates(arr) {
    let newArr = [];
    arr.forEach(obj => {
        if (obj.date instanceof Date && !isNaN(obj.date)) {
            newArr.push(obj);
        }
    });
    return newArr;
}

/**
 * Transform a customer data object into data for a two-line graph
 * @param {object} customerData - the customer data to summarize
 */
function getGraphData(customerData) {
    let graphData = [];
    let startingAssets = 0;
    let startingDebts = 0;
    customerData.accounts.forEach(account => {
        startingAssets += account.account.balance;
        account.loans.forEach(loan => {
            startingDebts += loan.amount;
        });
    });
    let allTransactions = filterOutNaNDates(getTransactionsByDay(customerData)).sort(compare);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let currentDate = today;
    let i = 0;
    while (i < allTransactions.length) {
        while (allTransactions[i].date.valueOf() === currentDate.valueOf()) {
            startingAssets -= allTransactions[i].cost;
            i++;
        }
        graphData.push({
            'date': currentDate,
            'assets': startingAssets,
            'debts': startingDebts
        })
        currentDate = allTransactions[i].date;
        i++;
    }
    return graphData;
}

export {
    getGraphData
}