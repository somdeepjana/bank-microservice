const mongoose= require("mongoose");

module.exports.connection= async()=>{
    try {
		const mongooseConnection= await mongoose.connect(process.env.MONGODB_URL,
			{ useNewUrlParser: true, useUnifiedTopology: true });
		if(process.env.NODE_ENV !== "test") {
			console.log("mongoose to %s", process.env.MONGODB_URL);
		}

        return mongooseConnection;
	} catch (error) {
		console.error(error)
		console.error("Mongoose connection error shutting down the app...");
		console.error(`mongoose url:${process.env.MONGODB_URL}`);
		process.exit(1);
	}
}

module.exports.models={
    AccountModel: mongoose.model("Account", require("./models/AccountModel")),
    CurrencyRateModel: mongoose.model("CurrencyRate", require("./models/CurrencyRateModel"))
}