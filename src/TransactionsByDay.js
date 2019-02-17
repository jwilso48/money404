/**
 * Format a date as a string in the form yyyy-mm-dd
 * @param {Date} date
 */
function formatDateStr(date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split('T')[0];
}

/**
 * Return a list of all transactions for a given date
 * @param {object} customerData - the Capital One customer data object from which to pull transactions
 * @param {Date} date - the date for which to pull transactions
 */
function getTransactionsByDay(customerData, date = null) {
    let dateStr;
    try {
        dateStr = formatDateStr(date);
    } catch (err) {
        dateStr = null;
    }

    let normalFields = [{
            'name': 'withdrawals',
            'date_field': 'transaction_date',
            'sign': -1
        },
        {
            'name': 'deposits',
            'date_field': 'transaction_date',
            'sign': 1
        },
        {
            'name': 'loans',
            'date_field': 'creation_date',
            'sign': -1
        },
        {
            'name': 'transfers',
            'date_field': 'transaction_date',
            'sign': -1
        }
    ];
    let transactions = [];
    customerData.accounts.forEach(account => {
        normalFields.forEach(field => {
            account[field.name].forEach(transaction => {
                if (dateStr == null || transaction[field.date_field] === dateStr) {
                    transactions.push({
                        'cost': transaction.amount * field.sign,
                        'account': account.account.type,
                        'name': field.name.slice(0, -1),
                        'date': new Date(transaction[field.date_field])
                    });
                }
            });
        });
        account['purchases'].forEach(transaction => {
            if (dateStr == null || transaction['purchase_date'] === dateStr) {
                transactions.push({
                    'cost': transaction.amount * -1,
                    'account': account.account.type,
                    'name': transaction.merchant_name,
                    'date': new Date(transaction['purchase_date'])
                })
            }
        })
    });
    return transactions;
}

export {
    getTransactionsByDay
};