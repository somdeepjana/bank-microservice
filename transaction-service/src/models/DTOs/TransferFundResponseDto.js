const TransactionDetailsDto = require("./TransactionDetailsDto");

class TransferFundResponseDto{
    account_id;
    balance_amount;
    limit_amount;
    lien_amount;
    effective_balance;
    account_currency;

    transaction_details;

    constructor(fromAccountModel, transferdetailsModel){
        this.account_id= fromAccountModel.account_id;
        this.balance_amount= fromAccountModel.balance_amount;
        this.limit_amount= fromAccountModel.limit_amount;
        this.lien_amount= fromAccountModel.lien_amount;
        this.account_currency= fromAccountModel.currency;
        this.effective_balance= this.balance_amount+this.limit_amount-this.lien_amount;

        this.transaction_details= new TransactionDetailsDto(transferdetailsModel.fromaccount_id, transferdetailsModel);
    }
}

module.exports= TransferFundResponseDto;