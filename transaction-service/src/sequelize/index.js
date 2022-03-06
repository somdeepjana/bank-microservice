const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');


const sequelize = new Sequelize(process.env.SQLDB_CONNECTION_STRING,{
	// dialect: 'sqlite',
	// storage: './example-db.sqlite',
	logging: false,
	benchmark: true
});

const modelDefiners = [
	require('./models/account.model'),
	require('./models/transaction.model'),
	require("./models/currencyRate.model")
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;