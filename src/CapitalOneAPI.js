const request = require('request-promise');

const API_KEY = process.env.REACT_APP_CAPITAL_ONE_API_KEY;

/**
 * Send a GET request to the specified endpoint of the Capital One API
 * @param {string} endpoint - the route of the Capital One api to call. E.g.
 * '/customers'
 * @param {function} callback - a function of the form (err, data) to handle the result of the get request
 */
function get(endpoint, callback) {
    let url = `http://api.reimaginebanking.com${endpoint}?key=${API_KEY}`
    request(url, {
            json: true
        })
        .then(data => {
            return callback(null, data);
        })
        .catch(err => {
            return callback(err);
        });
}

/**
 * Get a list of deposits for the specified account
 * @param {string} accoundId the id of the account to query
 * @param {function} callback - a function of the form (err, data) to handle the result of the get request
 */
async function getDepositsByAccountId(accoundId, callback) {
    get(`/accounts/${accoundId}/deposits`, (err, deposits) => {
        if (err) {
            return callback(err);
        }
        return callback(null, deposits);
    });
}

/**
 * Get a list of purchases for the specified account
 * @param {string} accoundId the id of the account to query
 * @param {function} callback - a function of the form (err, data) to handle the result of the get request
 */
async function getPurchasesByAccountId(accoundId, callback) {
    get(`/accounts/${accoundId}/purchases`, async (err, purchases) => {
        if (err) {
            return callback(err);
        }
        let merchantPromises = [];
        purchases.forEach(purchase => {
            merchantPromises.push(new Promise((resolve, reject) => {
                get(`/merchants/${purchase.merchant_id}`, async (err, merchant) => {
                    if (err) {
                        reject(err);
                    }
                    purchase.merchant_name = merchant.name;
                    resolve();
                });
            }));
        });
        await Promise.all(merchantPromises);
        return callback(null, purchases);
    });
}

/**
 * Get a list of transfers for the specified account
 * @param {string} accoundId the id of the account to query
 * @param {function} callback - a function of the form (err, data) to handle the result of the get request
 */
async function getTransfersByAccountId(accoundId, callback) {
    get(`/accounts/${accoundId}/transfers`, (err, transfers) => {
        if (err) {
            return callback(err);
        }
        return callback(null, transfers);
    });
}

/**
 * Get a list of withdrawals for the specified account
 * @param {string} accoundId the id of the account to query
 * @param {function} callback - a function of the form (err, data) to handle the result of the get request
 */
async function getWithdrawalsByAccountId(accoundId, callback) {
    get(`/accounts/${accoundId}/withdrawals`, (err, withdrawals) => {
        if (err) {
            return callback(err);
        }
        return callback(null, withdrawals);
    });
}

/**
 * Get a list of loans for the specified account
 * @param {string} accoundId the id of the account to query
 * @param {function} callback - a function of the form (err, data) to handle the result of the get request
 */
async function getLoansByAccountId(accoundId, callback) {
    get(`/accounts/${accoundId}/withdrawals`, (err, loans) => {
        if (err) {
            return callback(err);
        }
        return callback(null, loans);
    });
}

/**
 * Return the transaction history for the account specified
 * @param {string} accountId - the id of the account
 * @param {function} callback - a function of the form (err, data) to handle the result of the get request
 */
async function getTransactionHistoryByAccountId(accountId, callback) {
    let accountData = {};
    get(`/accounts/${accountId}`, async (err, account) => {
        if (err) {
            return callback(err);
        }
        accountData.account = account;
        let accountActionPromises = [];
        accountActionPromises.push(new Promise((resolve, reject) => {
            getDepositsByAccountId(accountId, (err, deposits) => {
                if (err) {
                    reject(err);
                }
                accountData.deposits = deposits;
                resolve();
            });
        }));
        accountActionPromises.push(new Promise((resolve, reject) => {
            getTransfersByAccountId(accountId, (err, transfers) => {
                if (err) {
                    reject(err);
                }
                accountData.transfers = transfers;
                resolve();
            });
        }));
        accountActionPromises.push(new Promise((resolve, reject) => {
            getPurchasesByAccountId(accountId, (err, purchases) => {
                if (err) {
                    reject(err);
                }
                accountData.purchases = purchases;
                resolve();
            });
        }));
        accountActionPromises.push(new Promise((resolve, reject) => {
            getWithdrawalsByAccountId(accountId, (err, withdrawals) => {
                if (err) {
                    reject(err);
                }
                accountData.withdrawals = withdrawals;
                resolve();
            });
        }));
        accountActionPromises.push(new Promise((resolve, reject) => {
            getLoansByAccountId(accountId, (err, loans) => {
                if (err) {
                    reject(err);
                }
                accountData.loans = loans;
                resolve();
            });
        }));
        await Promise.all(accountActionPromises);
        return callback(null, accountData);
    });
}

/**
 * Get a wholistic view of a customer's bank information given their ID
 * @param {string} customerId the id of the customer to look up
 * @param {function} callback - a function of the form (err, data) to handle the result of the get request
 */
function getCustomerDataById(customerId, callback) {
    let customerData = {};
    get(`/customers/${customerId}`, (err, customer) => {
        if (err) {
            return callback(err);
        }
        customerData.customer = customer;
        get(`/customers/${customerId}/accounts`, async (err, accounts) => {
            if (err) {
                return callback(err);
            }
            customerData.accounts = [];
            let accountPromises = [];
            accounts.forEach(account => {
                accountPromises.push(new Promise((resolve, reject) => {
                    getTransactionHistoryByAccountId(account._id, (err, accountData) => {
                        if (err) {
                            reject(err);
                        }
                        customerData.accounts.push(accountData);
                        resolve();
                    });
                }));
            });
            await Promise.all(accountPromises);
            return callback(null, customerData);
        });
    });
}

export {
    getCustomerDataById
};