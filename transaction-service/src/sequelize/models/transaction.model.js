const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('transaction', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			primaryKey: true,
            autoIncrement: true,
			type: DataTypes.INTEGER
		},
		fromaccount_id: {
			type: DataTypes.STRING(120),
			validate:{
				len: [1, 120]
			},
			trim: true
		},
        toaccount_id: {
			type: DataTypes.STRING(120),
			validate:{
				len: [1, 120]
			},
			trim: true
		},
		toaccount_currency:{
			type: DataTypes.STRING(3),
			validate:{
				len: [1, 3]
			},
			trim: true,
			references:{
				model: "currency_rates",
				key: "currency_code"
			}
		},
        trans_status: {
            allowNull: false,
			type: DataTypes.ENUM(['INPROGRESS', 'FAIL', 'COMPLETE'])
		},
		transaction_amount: {
			allowNull: false,
			type: DataTypes.FLOAT(17, 4)
		},
		transac_currency: {
			type: DataTypes.STRING(3),
			validate:{
				len: [1, 3]
			},
			// allowNull: false,
			trim: true,
			references:{
				model: "currency_rates",
				key: "currency_code"
			}
		},
		conversion_rate:{
			type: DataTypes.FLOAT(17, 4)
		}
	});
};