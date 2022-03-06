
const winstonLogger= require("../../services/logger/winstonLogger");

const ApplicationStatusCodes = require("../../helpers/ApplicationStatusCodes");

const {AccountModel} = require("../../services/mongoose").models;

const ErrorResponseDto = require("../../models/DTOs/ErrorResponseDto");
const TransactionResponseDto= require("../../models/DTOs/TransactionResponseDto");

/**
 * perform the from account debit and to account credit
 * *req.body.transc_id, *req.body.amount, *req.body.from_account
 * *req.body.to_account, *req.body.transac_currency
 * 
 * User must be authenticated to access this controller
 * 
 */
module.exports.transferFund= async (req, res)=>{
    const reqTransactionId= req.body.transc_id;
    const reqAmount= parseFloat(req.body.amount);
    const reqFromAccountId= req.body.from_account;
    const reqToAccountId= req.body.to_account;
    const reqTransacCurrecny= req.body.transac_currency;

    const token_content= req.kauth.grant.access_token.content;
    const username= token_content.preferred_username;

    let transferSession;

    try{
        let form_db_account;
        let to_db_account;

        transferSession= await AccountModel.startSession();
        await transferSession.startTransaction();

        form_db_account= AccountModel.findOne({
            account_id: reqFromAccountId,
            customer_id: username
        }).populate("currency").session(transferSession);
        to_db_account= AccountModel.findOne({account_id:reqToAccountId}).populate("currency").session(transferSession);

        [form_db_account, to_db_account]= await Promise.all([form_db_account, to_db_account]);
        if(form_db_account==null){
            await transferSession.abortTransaction();
            return res.status(400).json(
                new ErrorResponseDto(
                    ApplicationStatusCodes.FROM_ACCOUNT_ID_INVALID_004,
                    "From account id invalid"));
        }
        if(to_db_account==null){
            await transferSession.abortTransaction();
            return res.status(400).json(
                new ErrorResponseDto(
                    ApplicationStatusCodes.TO_ACCOUNT_ID_INVALID_006,
                    "To account id invalid"));
        }

        const fromAccountCurrencyCode = form_db_account.currency._id;
        const fromAccountCurrencyRate = parseFloat(form_db_account.currency.rate_refto_usd)
        const toAccountCurrencyCode = to_db_account.currency._id;
        const toAccountCurrencyRate = parseFloat(to_db_account.currency.rate_refto_usd)

        if(fromAccountCurrencyCode!==reqTransacCurrecny && toAccountCurrencyCode!==reqTransacCurrecny){
            await transferSession.abortTransaction();
            return res.status(400).json(
                new ErrorResponseDto(
                    ApplicationStatusCodes.CURRENCY_TRANSFER_NOT_SUPPORTED_008,
                    "Currency should be equal to either from account currency or to account currency"
                )
            )
        }

        let convertedDebitAmount;
        let convertedCreditAmount;
        let convertionRate;

        if(fromAccountCurrencyCode===reqTransacCurrecny){
            convertedDebitAmount = reqAmount;
            convertionRate= (toAccountCurrencyRate/fromAccountCurrencyRate);
            convertedCreditAmount = convertionRate*reqAmount;
        }else{
            convertionRate = (fromAccountCurrencyRate/toAccountCurrencyRate);
            convertedDebitAmount = convertionRate*reqAmount;
            convertedCreditAmount = reqAmount;
        }

        const formAccountBalance= parseFloat(form_db_account.balance_amount);
        const fromAccountLimit= parseFloat(form_db_account.limit_amount);
        const fromAccountLean= parseFloat(form_db_account.lien_amount);

        const toAccountBalance= parseFloat(to_db_account.balance_amount);

        if((formAccountBalance+fromAccountLimit-fromAccountLean) < convertedDebitAmount){
            await transferSession.abortTransaction();
            return res.status(400).json(
                new ErrorResponseDto(
                    ApplicationStatusCodes.NOT_ENOUGH_BALANCE_005,
                    "Not enoughbalance"));
        }

        form_db_account.lien_amount= fromAccountLean+convertedDebitAmount;
        to_db_account.balance_amount= toAccountBalance+convertedCreditAmount;

        await form_db_account.save();
        await to_db_account.save();

        await transferSession.commitTransaction();
        return res.status(200).json(
            new TransactionResponseDto(
                reqTransactionId,
                reqAmount,
                form_db_account,
                to_db_account,
                "COMPLETE",
                reqTransacCurrecny,
                convertionRate
            )
        );
    }
    catch(err){
        if(transferSession){
            await transferSession.abortTransaction();
        }

        winstonLogger.error(err);
        // await session.abortTransaction();
        return res.status(500).json(new ErrorResponseDto(500, "Internal Server Error"));
    }
    finally{
        if(transferSession){
            await transferSession.endSession();
        }
    }
    // const session= await AccountModel.startSession();
}