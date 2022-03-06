module.exports= class CurrencyRateDto{
	constructor(currencyRateModel){
		this.currency_code= currencyRateModel._id;
		this.rate_refto_usd= currencyRateModel.rate_refto_usd;
		this.description= currencyRateModel.description;
	}
}