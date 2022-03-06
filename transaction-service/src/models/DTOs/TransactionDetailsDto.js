module.exports= class TransactionDetailsDto{
	constructor(sourceAccountId,transactionModel){
		this.transaction_id= transactionModel.id;
		this.from_account= transactionModel.fromaccount_id;
		this.to_account= transactionModel.toaccount_id;
		this.toaccount_currency= transactionModel.toaccount_currency;
		this.amount= transactionModel.transaction_amount;
		this.transaction_status= transactionModel.trans_status;
		this.requested_at= transactionModel.createdAt;
		this.updated_at= transactionModel.updatedAt;
		this.type= sourceAccountId==this.from_account ? "DEBIT" : "CREDIT";
		this.transac_currency= transactionModel.transac_currency;
		this.conversion_rate= transactionModel.conversion_rate;
	}
}