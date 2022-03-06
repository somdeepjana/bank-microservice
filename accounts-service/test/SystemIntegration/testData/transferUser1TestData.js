

const {accountModelUser1TestData}= require("./accountModelUser1TestData");
const {accountModelUser2TestData}= require("./accountModelUser2TestData");

const transferUser1TestData={

    self: {

        succed: (s2sKey)=>{
            return {
                from_account: "00001",
                to_account: "00002",
                amount: 100.82,
                s2s: s2sKey,
                transc_id: "1",
                transac_currency: "USD"
            }
        },

        lowbalance: (s2sKey)=>{
            return {
                from_account: "00001",
                to_account: "00002",
                amount: 10000000,
                s2s: s2sKey,
                transc_id: "2",
                transac_currency: "USD"
            }
        }
    },
    
    other: {
        succed: (s2sKey)=>{
            return {
                from_account: "00001",
                to_account: "00003",
                amount: 100.82,
                s2s: s2sKey,
                transc_id: "3",
                transac_currency: "USD"
            }
        },

        lowbalance: (s2sKey)=>{
            return {
                from_account: "00001",
                to_account: "00003",
                amount: 100000000,
                s2s: s2sKey,
                transc_id: "4",
                transac_currency: "USD"
            }
        }
    }
}

module.exports= {transferUser1TestData}