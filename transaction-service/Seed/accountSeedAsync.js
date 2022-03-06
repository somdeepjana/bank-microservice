const {models}= require("../src/sequelize");

const accountSeedData= require("./seedData/accountSeedData.json");

const accountSeedAsync= async()=>{
    try{
        const seedResult= await models.account.bulkCreate(accountSeedData);

        console.log("Account data seeded completely");
        return seedResult;
    }
    catch(err){
        console.log(err);
        console.log("Account data seed faild");
        process.exit(1);
    }
}

module.exports= {accountSeedAsync};