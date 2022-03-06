const { CurrencyRateModel } = require("../mongoose").models;

module.exports= (messageDataModel)=>{
    const upsertObjs = messageDataModel.rates.map((rate) => {

        const currencyId= rate.currency_code.toUpperCase();

        return {
            updateOne: {
                filter: { _id: currencyId },
                update: {
                    _id: currencyId,
                    rate_refto_usd: rate.rate,
                    description: rate.currency_name
                },
                upsert: true,
            },
        };
    });

    CurrencyRateModel.bulkWrite(upsertObjs)
    .then(() => {
        console.log(`Accounts Microservice Updated currency rates
         at ${messageDataModel.featch_date} 
         ref currency ${messageDataModel.referance_currency}`);
    })
    .catch((err) => {
        console.error(err);
        console.error("Fail to insert data in db");
    });
}