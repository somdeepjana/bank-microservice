const winstonLogger= require("../../services/logger/winstonLogger");

const {CurrencyRateModel} = require("../../services/mongoose").models;

const ErrorResponseDto  = require("../../models/DTOs/ErrorResponseDto");
const CurrencyRateDto = require("../../models/DTOs/CurrencyRateDto");
const CurrencyConvertDto = require("../../models/DTOs/CurrencyConvertDto");
const ApplicationStatusCodes = require("../../helpers/ApplicationStatusCodes");



/**
 * Get a list of all rates with respect to USD
 * 
 * User can access this route without authorization
 */
module.exports.allRates= async (req, res) => {
	try {
		const currencyRates= await CurrencyRateModel.find();

		return res.status(200).json(currencyRates.map(a=>new CurrencyRateDto(a)));

	} catch (err) {
		winstonLogger.error(err);
		return res.status(500).json(new ErrorResponseDto(500, "Internal Server Error"));
	}
};

/**
 * Get the converted amount
 * *req.query.from, *req.query.to, *req.query.amount needed
 * 
 * User can access this route without authorization
 * 
 */
module.exports.convertRate= async (req, res) => {
	try {
		const reqSourceCurrencyId= req.query.from.toUpperCase();
		const reqDestinationCurrencyId= req.query.to.toUpperCase();
		const reqFromAmount= parseFloat(req.query.amount);

		let fromCurrency= CurrencyRateModel.findOne({_id:reqSourceCurrencyId});
		let toCurrency= CurrencyRateModel.findOne({_id:reqDestinationCurrencyId});

		[fromCurrency, toCurrency]= await Promise.all([fromCurrency, toCurrency]);
		if(fromCurrency===null || toCurrency===null){
			return res.status(400).json(
				new ErrorResponseDto(
					ApplicationStatusCodes.CURRENCY_CODE_NOT_FOUND_007,
					"Currency code not found"));
		}

		const conversionRate= (toCurrency.rate_refto_usd/fromCurrency.rate_refto_usd)
		const convertedAmount= reqFromAmount*conversionRate;

		return res.status(200).json(
			new CurrencyConvertDto(
				fromCurrency.currency_code,
				toCurrency.currency_code,
				reqFromAmount,
				convertedAmount,
				conversionRate
			));

	} catch (err) {
		winstonLogger.error(err);
		return res.status(500).json(new ErrorResponseDto(500, "Internal Server Error"));
	}
};

