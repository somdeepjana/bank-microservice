const {models}= require("../src/sequelize");

const currencyRateSeedData= require("./seedData/currencyRateSeedData.json");

const currencyRateSeedAsync= async()=>{
    try{
        const seedResult= await models.currency_rate.bulkCreate(currencyRateSeedData);

        console.log("Currency rate data seeded completely");
        return seedResult;
    }
    catch(err){
        console.error(err);
        console.error("Currency data seed faild");
        process.exit(1);
    }
}

module.exports= {currencyRateSeedAsync};