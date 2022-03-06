const {testUsername2}= require("../config/authConfigs");

const accountModelUser2TestData= [
    {
        account_id: "00003",
        balance_amount: 1000.96,
        limit_amount: 2000.56,
        lien_amount: 100.9,
        customer_id: testUsername2,
        currency: "USD"
    },
    {
        account_id: "00004",
        balance_amount: 2000.56,
        limit_amount: 4000.07,
        lien_amount: 165.91,
        customer_id: testUsername2,
        currency: "USD"
    }
]

module.exports= {accountModelUser2TestData};