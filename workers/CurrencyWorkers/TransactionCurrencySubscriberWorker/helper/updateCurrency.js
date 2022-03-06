const CurrencyRateModel = require("../sequelize").models.currency_rate;

module.exports= (messageDataModel)=>{
    const upsertObjs = messageDataModel.rates.map((rate) => {

        const currencyId= rate.currency_code.toUpperCase();

        return {
            currency_code: currencyId,
            rate_refto_usd: rate.rate,
            description: rate.currency_name
        };
    });

    CurrencyRateModel.bulkCreate(upsertObjs, {
        updateOnDuplicate: ["currency_code"]
    })
    .then(() => {
        console.log(`Transaction Microservice Updated currency rates
         at ${messageDataModel.featch_date} 
         ref currency ${messageDataModel.referance_currency}`);
    })
    .catch((err) => {
        console.error(err);
        console.error("Fail to insert data in db");
    });
}