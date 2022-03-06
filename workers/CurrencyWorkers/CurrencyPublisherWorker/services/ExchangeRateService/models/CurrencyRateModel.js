module.exports = class CurrencyRateModel {
  currency_code;
  rate;
  currency_name;

  constructor(currency_code, rate, currency_name) {
    this.currency_code = currency_code;
    this.rate = rate;
    this.currency_name = currency_name;
  }
};
