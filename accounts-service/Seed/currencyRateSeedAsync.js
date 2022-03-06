const mongoose = require("mongoose");

const {CurrencyRateModel}= require("../src/services/mongoose").models;
const currencyRateSeedData= require("./seedData/currencyRateSeedData.json");


const currencyRateSeedAsync= async()=> {

	try{

		const collectionsInDb= await mongoose.connection.db.listCollections({name:"currencyrates"}).toArray();

		if(collectionsInDb && collectionsInDb.length > 0){
			console.log("Currency rate collection already exist. droping it");
			await CurrencyRateModel.collection.drop();
			console.log("Currency rate collection dropped succesfullt");
		}

		console.log("Seeding Currency rate data");
		const seedResult= await CurrencyRateModel.insertMany(currencyRateSeedData);
		console.log("Currency rate data seede succesfully");

		return seedResult;
	}
	catch(err){
		console.error(err);
		console.error("Fail to seed or drop Currency rate collectio and data");
		process.exit(1);
	}
};

module.exports= {currencyRateSeedAsync};