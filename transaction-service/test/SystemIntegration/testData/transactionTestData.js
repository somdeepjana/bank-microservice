const transactionTestData=[
    {
        fromaccount_id: "00001",
        toaccount_id: "00002",
        trans_status: "COMPLETE",
        transaction_amount: 2000
    },
    {
        fromaccount_id: "00003",
        toaccount_id: "00001",
        trans_status: "FAIL",
        transaction_amount: 6000
    },
    {
        fromaccount_id: "00004",
        toaccount_id: "00003",
        trans_status: "INPROGRESS",
        transaction_amount: 2000.2
    },
    {
        fromaccount_id: "00001",
        toaccount_id: "00003",
        trans_status: "FAIL",
        transaction_amount: 2000
    }
];

module.exports= {transactionTestData};