const mongoose = require("mongoose");

const {AccountModel}= require("../src/services/mongoose").models;
const accountSeedData= require("./seedData/accountSeedData.json");


const accountSeedAsync= async()=> {

	try{

		const collectionsInDb= await mongoose.connection.db.listCollections({name:"accounts"}).toArray();

		if(collectionsInDb && collectionsInDb.length > 0){
			console.log("Accounts collection already exist. droping it");
			await AccountModel.collection.drop();
			console.log("Accounts collection dropped succesfullt");
		}

		console.log("Seeding Accounts data");
		const seedResult= await AccountModel.insertMany(accountSeedData);
		console.log("Accounts data seede succesfully");

		return seedResult;
	}
	catch(err){
		console.error(err);
		console.error("Fail to seed or drop accounts collectio and data");
		process.exit(1);
	}
};

module.exports= {accountSeedAsync};