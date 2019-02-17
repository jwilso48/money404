import {
    getTransactionsByDay
} from './TransactionsByDay';

const testCustomer = {
    customer: {
        _id: '5c6772ba322fa06b6779458f',
        first_name: 'Thelma',
        last_name: 'Gutmann',
        address: {
            street_number: '607',
            street_name: 'Powells Valley Road',
            city: 'Halifax',
            state: 'Pennsylvania',
            zip: '17032'
        }
    },
    accounts: [{
            account: {
                _id: '5c682f736759394351bec001',
                type: 'Credit Card',
                nickname: 'Test Account',
                rewards: 345,
                balance: 52670,
                customer_id: '5c6772ba322fa06b6779458f'
            },
            loans: [],
            withdrawals: [],
            deposits: [],
            transfers: [],
            purchases: [{
                _id: '5c6832446759394351bec005',
                merchant: 'Starbucks',
                medium: 'balance',
                purchase_date: '2019-02-16',
                amount: 4035,
                status: 'executed',
                description: 'string',
                type: 'merchant',
                merchant_name: 'Starbucks',
                payer_id: '5c682f736759394351bec001',
                payee_id: '5c6831176759394351bec003'
            }]
        },
        {
            account: {
                _id: '5c6772bb322fa06b67794591',
                type: 'Checking',
                nickname: 'Arnoldo\'s Account',
                rewards: 12188,
                balance: 48813,
                customer_id: '5c6772ba322fa06b6779458f'
            },
            loans: [],
            deposits: [{
                _id: '5c681e066759394351bec000',
                medium: 'balance',
                transaction_date: '2019-02-16',
                status: 'executed',
                description: 'string',
                amount: 5000,
                payee_id: '5c6772bb322fa06b67794591',
                type: 'deposit'
            }],
            withdrawals: [{
                _id: '5c6833346759394351bec006',
                medium: 'balance',
                transaction_date: '2019-02-10',
                status: 'pending',
                amount: 32500,
                description: 'Withdrawal to pay my portion of rent for the month',
                type: 'withdrawal',
                payer_id: '5c6772bb322fa06b67794591'
            }],
            purchases: [],
            transfers: []
        }
    ]
}


it('returns a list of transactions grouped by date for the given customer', () => {
    let expected1 = [{
            'cost': -4035,
            'account': 'Credit Card',
            'name': 'Starbucks',
            'date': new Date('2019-2-16')
        },
        {
            'cost': 5000,
            'account': 'Checking',
            'name': 'deposit',
            'date': new Date('2019-2-16')
        }
    ]
    let actual1 = getTransactionsByDay(testCustomer, new Date('2-16-2019'));
    expect(actual1.sort()).toEqual(expected1.sort());

    let expected2 = [{
        'cost': -32500,
        'account': 'Checking',
        'name': 'withdrawal',
        'date': new Date('2019-2-10')
    }, ]
    let actual2 = getTransactionsByDay(testCustomer, new Date('2-10-2019'));
    expect(actual2.sort()).toEqual(expected2.sort());

    let expected3 = expected1.concat(expected2);
    let actual3 = getTransactionsByDay(testCustomer);
    expect(actual3.sort()).toEqual(expected3.sort());
});