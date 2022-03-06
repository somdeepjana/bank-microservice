const{
    testUsername1,
    testUsername2
}= require("../config/authConfigs");

const accountTestData=[
    {
        account_id: "00001",
        balance_amount: 1000,
        limit_amount: 2000,
        lien_amount: 0,
        customer_id: testUsername1
    },
    {
        account_id: "00003",
        balance_amount: 5000,
        limit_amount: 3000,
        lien_amount: 0,
        customer_id: testUsername1
    },
    {
        account_id: "00002",
        balance_amount: 2000,
        limit_amount: 3000,
        lien_amount: 0,
        customer_id: testUsername2
    },
    {
        account_id: "00004",
        balance_amount: 7000,
        limit_amount: 3000,
        lien_amount: 0,
        customer_id: testUsername2
    }
];

module.exports= {accountTestData};