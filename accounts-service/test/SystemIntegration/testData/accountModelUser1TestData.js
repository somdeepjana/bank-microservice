const {testUsername1}= require("../config/authConfigs");

const accountModelUser1TestData= [
    {
        account_id: "00001",
        balance_amount: 1000,
        limit_amount: 2000,
        lien_amount: 0,
        customer_id: testUsername1,
        currency: "USD"
    },
    {
        account_id: "00002",
        balance_amount: 2000.56,
        limit_amount: 9000.07,
        lien_amount: 165.91,
        customer_id: testUsername1,
        currency: "USD"
    }
]

module.exports= {accountModelUser1TestData};