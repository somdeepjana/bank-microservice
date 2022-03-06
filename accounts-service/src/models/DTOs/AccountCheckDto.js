module.exports= class AccountCheckDto{
	constructor(accoutModel){
		this.account_id= accoutModel.account_id;
		this.currency= accoutModel.currency
	}
}