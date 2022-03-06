
const winstonLogger= require("../../services/logger/winstonLogger");

const {AccountModel} = require("../../services/mongoose").models;

const ErrorResponseDto  = require("../../models/DTOs/ErrorResponseDto");
const AccountDetailsDto = require("../../models/DTOs/AccountDetailsDto");
const AccountCheckDto = require("../../models/DTOs/AccountCheckDto");
const ApplicationStatusCodes = require("../../helpers/ApplicationStatusCodes");

/**
 * Get a list of all the accounts associated with a user
 * 
 * user must be authenticated to access this route 
 */
module.exports.allAccounts= async (req, res) => {
	try {
		const token_content= req.kauth.grant.access_token.content;
		const username= token_content.preferred_username;

		const accounts= await AccountModel.find({customer_id: username});

		if(accounts.length > 0){
			return res.status(200).json(accounts.map(a=>new AccountDetailsDto(a)));
		}
		return res.status(404).json(
			new ErrorResponseDto(
				ApplicationStatusCodes.NO_ACCOUNT_FOUND_002,
				"No Account Found")
		);

	} catch (err) {
		winstonLogger.error(err);
		return res.status(500).json(new ErrorResponseDto(500, "Internal Server Error"));
	}
};

/**
 * Get a specific account complete details
 * *need req.params.accountId
 * 
 * user must be authenticated to access this route
 * 
 * only the used whole actually own the account will be able get any valid response
 */
module.exports.getAccountById= async (req, res) => {
	try{
		const token_content= req.kauth.grant.access_token.content;
		const username= token_content.preferred_username;

		const account= await AccountModel.findOne({
			customer_id: username,
			account_id: req.params.accountId
		});

		if(account){
			return res.status(200).json(new AccountDetailsDto(account));
		}
		return res.status(404).json(
			new ErrorResponseDto(
				ApplicationStatusCodes.ACCOUNT_NO_NOT_FOUND_001,
				"User dosent have a account with provided acccount id")
		);
	}
	catch(err){
		winstonLogger.error(err);
		return res.status(500).json(new ErrorResponseDto(500, "Internal Server Error"));
	}
};

/**
 * Get the currency details only of a account
 * *need req.params.accountId
 * 
 * User may not own the account but still be able to retrive the currency details
 * 
 * @param {Object} req 
 * @param {Object} res
 */
module.exports.checkAccountCurrency= async (req, res) => {
	try {
		const reqAccountId= req.params.accountId;

		const account= await AccountModel.findOne({account_id: reqAccountId});

		if(account){
			return res.status(200).json(new AccountCheckDto(account));
		}
		return res.status(404).json(
			new ErrorResponseDto(
				ApplicationStatusCodes.NO_ACCOUNT_FOUND_002,
				"No Account Found")
		);

	} catch (err) {
		winstonLogger.error(err);
		return res.status(500).json(new ErrorResponseDto(500, "Internal Server Error"));
	}
};

