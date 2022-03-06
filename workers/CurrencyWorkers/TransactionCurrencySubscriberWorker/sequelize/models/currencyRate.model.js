const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('currency_rate', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		currency_code: {
			primaryKey: true,
			type: DataTypes.STRING(5),
			trim: true
		},
		rate_refto_usd: {
			type: DataTypes.FLOAT(17, 4),
			allowNull: false
		},
        description: {
			type: DataTypes.STRING(40),
			trim: true,
			allowNull: false,
			validate:{
				len: [1, 40]
			}
		}
	});
};