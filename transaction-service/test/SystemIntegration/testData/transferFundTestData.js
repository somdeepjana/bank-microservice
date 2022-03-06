const transferFundTestData= {
    success: {
        from_account_id: "00001",
        to_account_id: "00002",
        amount: 100.56
    },

    invalidFromAccount: {
        from_account_id: "certainly not a valid account",
        to_account_id: "00003",
        amount: 100.56
    },

    lowbalance: {
        from_account_id: "00001",
        to_account_id: "00002",
        amount: 999999999
    }
}

module.exports= {transferFundTestData}