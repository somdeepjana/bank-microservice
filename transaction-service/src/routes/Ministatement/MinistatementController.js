const winstonLogger= require("../../services/logger/winstonLogger");

const {Op}= require("sequelize");
const sequelize= require("../../sequelize");
const AccountModel= sequelize.models.account;
const TransactionModel= sequelize.models.transaction;

const ErrorResponseDto  = require("../../models/DTOs/ErrorResponseDto");
const TransactionDetailsDto = require("../../models/DTOs/TransactionDetailsDto");
const MiniStatementDto = require("../../models/DTOs/MiniStatementDto");

const ApplicationStatusCodes = require("../../helpers/ApplicationStatusCodes");

/**
 * Get a the ministatement of the provided account
 * *req.params.accountId
 * 
 * User must be authenticated for accessing this route
 */
module.exports.getStatement= async (req, res) => {
	const reqAccountId= req.params.accountId;

	const token_content= req.kauth.grant.access_token.content;
	const username= token_content.preferred_username;

	try {
		const accountDetails= await AccountModel.findOne({
			where:{
				[Op.and]:[
					{customer_id: username},
					{account_id: reqAccountId}
				]
			}
		})

		if(!accountDetails){
			return res.status(404).json(
				new ErrorResponseDto(
					ApplicationStatusCodes.ACCOUNT_NO_NOT_FOUND_001,
					"From account not found"));
		}

		const transactions= await TransactionModel.findAll({
			where:{
				[Op.or]:[
					{fromaccount_id: reqAccountId},
					{toaccount_id: reqAccountId}
				]
			},
			order:[
				["createdAt", "DESC"]
			],
			limit: 10
		});

		const transactionDtos= transactions.map((trans)=>{
			return new TransactionDetailsDto(reqAccountId,trans);
		});

		return res.status(200).json(
			new MiniStatementDto(
				accountDetails,
				transactionDtos
			));
	} catch (err) {
		winstonLogger.error(err);
		return res.status(500).json(new ErrorResponseDto(500, "Internal Server Error"));
	}
};
