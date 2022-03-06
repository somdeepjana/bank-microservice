function applyExtraSetup(sequelize) {
	const { transaction, account } = sequelize.models;

	account.hasMany(transaction, {foreignKey:"fromaccount_id", sourceKey: "account_id"});
	transaction.belongsTo(account, {foreignKey:"fromaccount_id", sourceKey: "account_id"});

    account.hasMany(transaction, {foreignKey:"toaccount_id", sourceKey: "account_id"});
	transaction.belongsTo(account, {foreignKey:"toaccount_id", sourceKey: "account_id"});
}

module.exports = { applyExtraSetup };