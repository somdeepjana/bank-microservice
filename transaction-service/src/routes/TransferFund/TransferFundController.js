const winstonLogger= require("../../services/logger/winstonLogger");

const axios = require("axios").default;

const sequelize= require("../../sequelize");
const AccountModel= sequelize.models.account;
const TransactionModel= sequelize.models.transaction;
const CurrencyRate= sequelize.models.currency_rate;

const ErrorResponseDto  = require("../../models/DTOs/ErrorResponseDto");
const TransferFundResponseDto= require("../../models/DTOs/TransferFundResponseDto");
const ApplicationStatusCodes = require("../../helpers/ApplicationStatusCodes");

const accountsServiceRoutes= require("../../config/accountsServiceRoutes");

const axiosErrorFilter= require("../../helpers/axiosErrorFilter");

/**
 * initiate the transfer sequence 
 * *req.body.from_account_id, *req.body.to_account_id, *req.body.amount
 * 
 * User must be authenticated before accessing this controller
 */
module.exports.initiateTransfer= async(req, res) => {
	const reqFromAccountId= req.body.from_account_id;
	const reqToAccountId= req.body.to_account_id;
	const reqAmount= req.body.amount;
	let reqTransacCurrency;

	const tokenContent= req.kauth.grant.access_token.content;
	const accessToken= req.kauth.grant.access_token.token;

	try {
		let transResponse;
		let updatedTransactionModel;

		if(!req.body.transac_currency){
			let fromAcoount= AccountModel.findByPk(reqFromAccountId);
			let toAcoount= AccountModel.findByPk(reqToAccountId);

			[fromAcoount, toAcoount]= await Promise.all([fromAcoount, toAcoount]);

			if(!fromAcoount){
				return res.status(400).json(
					new ErrorResponseDto(
						ApplicationStatusCodes.FROM_ACCOUNT_ID_INVALID_004,
						"From account id invalid"));
			}

			if(!toAcoount){
				return res.status(400).json(
					new ErrorResponseDto(
						ApplicationStatusCodes.TO_ACCOUNT_ID_INVALID_006,
						"To account id invalid"));
			}

			if(fromAcoount.currency!=toAcoount.currency){
				return res.status(400).json(
					new ErrorResponseDto(
						ApplicationStatusCodes.CROSS_CURRENCY_CODE_REQUIRED_009,
						"for cross currency transaction provide transac_currency code"
					)
				);
			}

			reqTransacCurrency= fromAcoount.currency;
		}else{
			const currencyRate= await CurrencyRate.findByPk(req.body.transac_currency.toUpperCase());
			if(!currencyRate){
				return res.status(400).json(
					new ErrorResponseDto(
						ApplicationStatusCodes.CURRENCY_CODE_NOT_FOUND_007,
						"Provide a valid currency code"
					)
				);
			}
			reqTransacCurrency= currencyRate.currency_code;
		}

		const transactionResult= await sequelize.transaction(async(t)=>{

			const transactionEntry= await TransactionModel.create({
				fromaccount_id: reqFromAccountId,
				toaccount_id: reqToAccountId,
				transaction_amount: reqAmount,
				trans_status: "INPROGRESS",
				transac_currency: reqTransacCurrency
			}, {transaction: t});

			transResponse= await axios.post(
				accountsServiceRoutes.notifyTransfer,
				{
					transc_id: transactionEntry.id,
					from_account: reqFromAccountId,
					to_account: reqToAccountId,
					amount: reqAmount,
					s2s: process.env.S2S_INTREGRITY_KEY,
					transac_currency: reqTransacCurrency
				},
				{
					headers:{
						Authorization: `Bearer ${accessToken}`
					}
				}
			);

			// Update transaction status
			updatedTransactionModel= await transactionEntry.update({
				toaccount_currency: transResponse.data.to_account.currency,
				trans_status: transResponse.data.status,
				conversion_rate: transResponse.data.conversion_rate
			}, {transaction:t});

			// Update to account data
			await AccountModel.update({
				balance_amount: transResponse.data.to_account.balance_amount,
				limit_amount: transResponse.data.to_account.limit_amount,
				lien_amount: transResponse.data.to_account.lien_amount
			},{
				where:{
					account_id: transResponse.data.to_account.account_id
				},
				transaction: t
			});

			// Update from account data
			const updatedFromAccountModel= await AccountModel.update({
				balance_amount: transResponse.data.from_account.balance_amount,
				limit_amount: transResponse.data.from_account.limit_amount,
				lien_amount: transResponse.data.from_account.lien_amount
			},{
				where:{
					account_id: transResponse.data.from_account.account_id
				},
				transaction:t
			});
		});

		const responseDto= new TransferFundResponseDto(
			transResponse.data.from_account,
			updatedTransactionModel
		);

		return res.status(200).json(responseDto);
	} catch (error) {
		if(axios.isAxiosError(error)){

			// microservice is rechable but response is bad
			if(error.response){

				// Unauthorized response for some reson
				if(error.response.status===403){
					return res.status(403).json("Accounts Miceroservice access denied");
				}

				// Account microservice response is in application status range
				if(error.response.data.errorCode){
					return res.status(error.response.status).json(
						error.response.data
					);
				}
			}

			axiosErrorFilter(error);
		}
		winstonLogger.error(error);
		return res.status(500).json(new ErrorResponseDto(500, "Internal Server Error"));
	}	
}