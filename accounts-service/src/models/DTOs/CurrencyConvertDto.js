module.exports= class CurrencyConvertDto{
	constructor(fromCurrencyCode, toCurrencyCode, fromAmount, toAmount, convresionRate){
		this.from_currency_code= fromCurrencyCode;
		this.to_currency_code= toCurrencyCode;
		this.from_amount= fromAmount;
		this.to_amount= toAmount;
		this.convresion_rate= convresionRate;
	}
}