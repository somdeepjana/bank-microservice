const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('account', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		account_id: {
			primaryKey: true,
			type: DataTypes.STRING(120),
			validate:{
				len: [1, 120]
			},
			trim: true
		},
		balance_amount: {
			type: DataTypes.FLOAT(17, 4),
			allowNull: false
		},
        limit_amount: {
			type: DataTypes.FLOAT(17, 4),
			allowNull: false
		},
        lien_amount: {
			type: DataTypes.FLOAT(17, 4),
			allowNull: false
		},
		customer_id: {
			type: DataTypes.STRING,
			allowNull: false,
			trim: true
		},
		currency: {
			type: DataTypes.STRING(3),
			validate:{
				len: [1, 3]
			},
			trim: true,
			references:{
				model: "currency_rates",
				key: "currency_code"
			}
		}
	});
};