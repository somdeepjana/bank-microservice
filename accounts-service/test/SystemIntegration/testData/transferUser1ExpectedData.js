

const {accountModelUser1TestData}= require("./accountModelUser1TestData");
const {accountModelUser2TestData}= require("./accountModelUser2TestData");

const transferUser1ExpectedData={

    self: {

        succed: (transId)=>{
            return {
                transc_id: transId,
                from_account: {
                    account_id: "00001",
                    balance_amount: 1000,
                    limit_amount: 2000,
                    lien_amount: 100.82,
                    effective_balance: 2899.18
                },
                to_account: {
                    account_id: "00002",
                    balance_amount: 2101.38,
                    limit_amount: 9000.07,
                    lien_amount: 165.91,
                    effective_balance: 10935.54
                },
                "amount": 100.82,
                "status": "COMPLETE"
            }
        }
    },
    
    other: {
        succed: (transId)=>{
            return {
                transc_id: transId,
                from_account: {
                    account_id: "00001",
                    balance_amount: 1000,
                    limit_amount: 2000,
                    lien_amount: 100.82,
                    effective_balance: 2899.18
                },
                to_account: {
                    account_id: "00003",
                    balance_amount: 1101.78,
                    limit_amount: 2000.56,
                    lien_amount: 100.9,
                    effective_balance: 3001.44
                },
                "amount": 100.82,
                "status": "COMPLETE"
            }
        }
    }
}

module.exports= {transferUser1ExpectedData}