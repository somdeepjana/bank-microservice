module.exports= class AccountDetailsDto{
	constructor(accoutModel){
		this.account_id= accoutModel.account_id;
		this.balance_amount= accoutModel.balance_amount;
		this.limit_amount= accoutModel.limit_amount,
    	this.lien_amount= accoutModel.lien_amount,
		this.effective_balance= this.balance_amount+this.limit_amount-this.lien_amount;
		this.currency= accoutModel.currency
	}
}