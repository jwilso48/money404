const request = require('request-promise');

const API_KEY = process.env.REACT_APP_CAPITAL_ONE_API_KEY;

/*
SEED VALUES
*/

const CUSTOMER = {
    "first_name": "Johnny",
    "last_name": "Test",
    "address": {
        "street_number": "404",
        "street_name": "Address",
        "city": "Not Found",
        "state": "CA",
        "zip": "00000"
    }
}

const SAVINGS_ACCT = {
    "type": "Savings",
    "nickname": "Rainy Day Fund",
    "rewards": 2437,
    "balance": 65509
}

const CHECKING_ACCT = {
    "type": "Checking",
    "nickname": "Main Checking Account",
    "rewards": 0,
    "balance": 43891
}

const CHECKING_DEPOSITS = [{
        "medium": "balance",
        "transaction_date": "2019-02-01",
        "status": "pending",
        "description": "Regular salary",
        "amount": 100000
    },
    {
        "medium": "balance",
        "transaction_date": "2019-02-03",
        "status": "pending",
        "description": "Brother paid me back",
        "amount": 7500
    },
    {
        "medium": "balance",
        "transaction_date": "2019-02-11",
        "status": "pending",
        "description": "Tax refund",
        "amount": 45000
    }
]

const SAVINGS_DEPOSITS = [{
        "medium": "balance",
        "transaction_date": "2019-02-03",
        "status": "pending",
        "description": "Windfall",
        "amount": 5000
    },
    {
        "medium": "balance",
        "transaction_date": "2019-02-10",
        "status": "pending",
        "description": "Financial responsibility",
        "amount": 10300
    },
    {
        "medium": "balance",
        "transaction_date": "2019-02-16",
        "status": "pending",
        "description": "every little bit helps",
        "amount": 200
    }
]

const CHECKING_WITHDRAWALS = [{
        "medium": "balance",
        "transaction_date": "2019-02-07",
        "status": "pending",
        "amount": 10500,
        "description": "Need to pay babysitter"
    },
    {
        "medium": "balance",
        "transaction_date": "2019-01-30",
        "status": "pending",
        "amount": 1500,
        "description": "Replenish standing petty cash in wallet"
    },
    {
        "medium": "balance",
        "transaction_date": "2019-02-15",
        "status": "pending",
        "amount": 3000,
        "description": "Dining out with cash"
    }
]

/*must not be added more than once since IDs need to be stable for Purchase objects*/
// const MERCHANTS = [{
//     "id": "5c688e486759394351bec0e5"
//         "name": "Starbucks",
//         "category": "Dining Out",
//         "address": {
//             "street_number": "100",
//             "street_name": "Calvert St.",
//             "city": "Baltimore",
//             "state": "MD",
//             "zip": "21201"
//         },
//         "geocode": {
//             "lat": 79,
//             "lng": 39
//         }
//     },
//     {
//     "id": "5c688e486759394351bec0e3"
//         "name": "Safeway",
//         "category": "Groceries",
//         "address": {
//             "street_number": "101",
//             "street_name": "Calvert St.",
//             "city": "Baltimore",
//             "state": "MD",
//             "zip": "21201"
//         },
//         "geocode": {
//             "lat": 79,
//             "lng": 39
//         }
//     },
//     {
//         "id": "5c688e486759394351bec0e4"
//         "name": "Literally Nothing But Absinth",
//         "category": "Drugs & Alcohol",
//         "address": {
//             "street_number": "103",
//             "street_name": "Calvert St.",
//             "city": "Baltimore",
//             "state": "MD",
//             "zip": "21201"
//         },
//         "geocode": {
//             "lat": 79,
//             "lng": 39
//         }
//     },
//     {
//         "id":"5c688e486759394351bec0e6"
//         "name": "GameStop",
//         "category": "Entertainment",
//         "address": {
//             "street_number": "104",
//             "street_name": "Calvert St.",
//             "city": "Baltimore",
//             "state": "MD",
//             "zip": "21201"
//         },
//         "geocode": {
//             "lat": 79,
//             "lng": 39
//         }
//     },
//     {
//         "id": "5c688e486759394351bec0e7"
//         "name": "Draft Kings",
//         "category": "Gambling",
//         "address": {
//             "street_number": "106",
//             "street_name": "Calvert St.",
//             "city": "Baltimore",
//             "state": "MD",
//             "zip": "21201"
//         },
//         "geocode": {
//             "lat": 79,
//             "lng": 39
//         }
//     }
// ]

const PURCHASES = [{
        "merchant_id": "5c688e486759394351bec0e7", //draft kings
        "medium": "balance",
        "purchase_date": "2019-01-29",
        "amount": 12498,
        "status": "pending",
        "description": "losses"
    },
    {
        "merchant_id": "5c688e486759394351bec0e6", //gamestop
        "medium": "balance",
        "purchase_date": "2019-02-13",
        "amount": 7500,
        "status": "pending",
        "description": "games"
    },
    {
        "merchant_id": "5c688e486759394351bec0e4", //absinth
        "medium": "balance",
        "purchase_date": "2019-02-16",
        "amount": 5500,
        "status": "pending",
        "description": "alcohol"
    },
    {
        "merchant_id": "5c688e486759394351bec0e3", //safeway
        "medium": "balance",
        "purchase_date": "2019-02-15",
        "amount": 15257,
        "status": "pending",
        "description": "groceries"
    },
    {
        "merchant_id": "5c688e486759394351bec0e7", //draft kings
        "medium": "balance",
        "purchase_date": "2019-02-06",
        "amount": 8910,
        "status": "pending",
        "description": "losses"
    },
    {
        "merchant_id": "5c688e486759394351bec0e5", //starbucks
        "medium": "balance",
        "purchase_date": "2019-02-02",
        "amount": 1503,
        "status": "pending",
        "description": "coffee"
    },
    {
        "merchant_id": "5c688e486759394351bec0e3", //safeway
        "medium": "balance",
        "purchase_date": "2019-01-29",
        "amount": 12399,
        "status": "pending",
        "description": "groceries"
    },
    {
        "merchant_id": "5c688e486759394351bec0e5", //starbucks
        "medium": "balance",
        "purchase_date": "2019-01-27",
        "amount": 856,
        "status": "pending",
        "description": "coffee"
    },
    {
        "merchant_id": "5c688e486759394351bec0e5", //starbucks
        "medium": "balance",
        "purchase_date": "2019-02-10",
        "amount": 1188,
        "status": "pending",
        "description": "coffee"
    }
]

const LOANS = [{
        "type": "home",
        "status": "pending",
        "credit_score": 687,
        "monthly_payment": 360,
        "amount": 40000,
        "description": "student loan"
    },
    {
        "type": "home",
        "status": "pending",
        "credit_score": 687,
        "monthly_payment": 250,
        "amount": 10000,
        "description": "car loan"
    }
]

/**
 * Send a POST request to the specified endpoint of the Capital One API
 * @param {string} endpoint - the route of the Capital One api to call. E.g.
 * '/customers'
 * @param {object} body - the body of the POST request to send
 * @param {function} callback - a function of the form (err, data) to handle the result of the get request
 */
function post(endpoint, body, callback) {
    let uri = `http://api.reimaginebanking.com${endpoint}?key=${API_KEY}`
    request({
            uri: uri,
            json: true,
            body: body,
            method: 'POST'
        })
        .then(parsedBody => {
            return callback(null, parsedBody);
        })
        .catch(err => {
            return callback(err);
        });
}

/**
 * Delete all records from the corresponding endpoint
 * @param {string} endpoint the name of the endpoint to delete
 * @param {function} callback a callback to handle the server response
 */
function deleteData(endpoint, callback) {
    let uri = `http://api.reimaginebanking.com/data?type=${endpoint}&key=${API_KEY}`;
    request({
            uri: uri,
            method: 'DELETE',
        })
        .then(() => {
            return callback();
        })
        .catch(err => {
            if (err.message === '404 - \\"{\\"code\\":404,\\"message\\":\\"No data to delete\\"}\\"') {
                return callback();
            }
            return callback(err);
        });
}

/**
 * Delete all data in the API
 */
async function wipeDatabase() {
    let deletePromises = []
    let endpoints = [
        'Accounts', 'Customers', 'Deposits', 'Loans',
        'Purchases', 'Withdrawals'
    ]
    endpoints.forEach(endpoint => {
        deletePromises.push(new Promise((resolve, reject) => {
            deleteData(endpoint, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        }));
    });
    await Promise.all(deletePromises);
    return;
}

/**
 * Add a list of data objects to the specified endpoint
 *
 * @param {array} dataObjects - the the data objects to import
 * @param {string} endpoint - the endpoint to which you are adding the transactions (e.g. accounts/deposits, merchants, etc)
 * @param {function} callback - a function to handle the server response
 */
async function addArrayOfData(dataObjects, endpoint, callback) {
    let transactionPromises = [];
    let transactionIds = [];
    dataObjects.forEach(transaction => {
        transactionPromises.push(new Promise((resolve, reject) => {
            post(endpoint, transaction, (err, res) => {
                if (err) {
                    reject(err);
                }
                transactionIds.push(res.objectCreated._id);
                resolve();
            });
        }));
    });
    await Promise.all(transactionPromises);
    return callback(null, transactionIds);
}

/**
 * Seed the API database with test values for demo purposes
 * @param {function} callback - a function to handle the server response
 */
function seedTestData(callback) {
    // wipeDatabase((err) => {
    //     if (err) {
    //         return callback(err);
    //     }
    post('/customers', CUSTOMER, (err, res) => {
        if (err) {
            return callback(err);
        }
        let customerId = res.objectCreated._id;
        post(`/customers/${customerId}/accounts`, SAVINGS_ACCT, (err, res) => {
            if (err) {
                return callback(err);
            }
            let savingsId = res.objectCreated._id;
            post(`/customers/${customerId}/accounts`, CHECKING_ACCT, (err, res) => {
                if (err) {
                    return callback(err);
                }
                let checkingId = res.objectCreated._id;
                addArrayOfData(CHECKING_DEPOSITS, `/accounts/${checkingId}/deposits`, (err, res) => {
                    if (err) {
                        return callback(err);
                    }
                    addArrayOfData(SAVINGS_DEPOSITS, `/accounts/${savingsId}/deposits`, (err, res) => {
                        if (err) {
                            return callback(err);
                        }
                        addArrayOfData(CHECKING_WITHDRAWALS, `/accounts/${checkingId}/withdrawals`, (err, res) => {
                            if (err) {
                                return callback(err);
                            }
                            addArrayOfData(PURCHASES, `/accounts/${checkingId}/purchases`, (err, res) => {
                                if (err) {
                                    return callback(err);
                                }
                                addArrayOfData(LOANS, `/accounts/${checkingId}/loans`, (err, res) => {
                                    if (err) {
                                        return callback(err);
                                    }
                                    return callback(null, 201);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    // });


}

export {
    seedTestData
};