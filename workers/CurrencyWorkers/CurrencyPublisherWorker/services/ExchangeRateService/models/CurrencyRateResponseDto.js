const CurrencyRateModel = require("./CurrencyRateModel");

module.exports = class CurrencyRateResponseDto {
  featch_date;
  referance_currency;
  rates;

  constructor(currencyDetailsFeatch, currencyRatesFeatch, featchCurrency) {
    this.featch_date = currencyRatesFeatch.date;
    this.referance_currency = featchCurrency;

    const fetchRatesWrtFetchCurrency = currencyRatesFeatch[featchCurrency];
    this.rates = Object.keys(fetchRatesWrtFetchCurrency).map((keys, idx) => {
      return new CurrencyRateModel(
        keys,
        fetchRatesWrtFetchCurrency[keys],
        currencyDetailsFeatch[keys]
      );
    });
  }
};
