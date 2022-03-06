class TransactionAccountDetailsDto{
    account_id;
    balance_amount;
    limit_amount;
    lien_amount;
    effective_balance;
    currency;

    constructor(transactionAccountDetailsModel){
        this.account_id= transactionAccountDetailsModel.account_id;
		this.balance_amount= transactionAccountDetailsModel.balance_amount;
		this.limit_amount= transactionAccountDetailsModel.limit_amount,
    	this.lien_amount= transactionAccountDetailsModel.lien_amount,
		this.effective_balance= this.balance_amount+this.limit_amount-this.lien_amount;
		this.currency= transactionAccountDetailsModel.currency._id
    }
}
module.exports= class TransactionResponseDto{
    constructor( transcId, amount, transacFromAccountModel, transacToAccountModel, status, transac_currency, conversion_rate){
        this.transc_id= transcId;
        this.amount= amount;
        this.status= status;
        this.transac_currency= transac_currency;
        this.conversion_rate= conversion_rate;
        this.from_account= new TransactionAccountDetailsDto(transacFromAccountModel);
        this.to_account= new TransactionAccountDetailsDto(transacToAccountModel);
    }
}