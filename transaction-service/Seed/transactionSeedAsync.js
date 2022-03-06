const {models}= require("../src/sequelize");

const transactionSeedData= require("./seedData/transactionSeedData.json");

const transactionSeedAsync= async ()=>{
    try {
        const seedResult= await models.transaction.bulkCreate(transactionSeedData);

        console.log("Transaction data seeded succesfully");
        return seedResult;
    } catch (error) {
        console.log(error);
        console.log("Faild to seed the transaction data");
        process.exit(1);
    }
}

module.exports= {transactionSeedAsync};