
const statementUser1ExpectedData= {
    account1 : {
        account_id: "00001",
        balance_amount: 1000,
        limit_amount: 2000,
        lien_amount: 0,
        transactions: [
            {
                transaction_id: 5,
                from_account: "00001",
                to_account: "00002",
                amount: 2000,
                transaction_status: "COMPLETE",
                type: "DEBIT"
            },
            {
                transaction_id: 6,
                from_account: "00003",
                to_account: "00001",
                amount: 6000,
                transaction_status: "FAIL",
                type: "CREDIT"
            },
            {
                transaction_id: 8,
                from_account: "00001",
                to_account: "00003",
                amount: 2000,
                transaction_status: "FAIL",
                type: "DEBIT"
            }
        ]
    },

    account3: {
        account_id: "00003",
        balance_amount: 5000,
        limit_amount: 3000,
        lien_amount: 0,
        transactions: [
            {
                transaction_id: 6,
                from_account: "00003",
                to_account: "00001",
                amount: 6000,
                transaction_status: "FAIL",
                type: "DEBIT"
            },
            {
                transaction_id: 7,
                from_account: "00004",
                to_account: "00003",
                amount: 2000.2,
                transaction_status: "INPROGRESS",
                type: "CREDIT"
            },
            {
                transaction_id: 8,
                from_account: "00001",
                to_account: "00003",
                amount: 2000,
                transaction_status: "FAIL",
                type: "CREDIT"
            }
        ]
    }
}

module.exports= {statementUser1ExpectedData}