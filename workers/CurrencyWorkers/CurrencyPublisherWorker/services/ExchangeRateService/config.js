module.exports.ref_currency = process.env.REF_CURRENCY.toLowerCase();
module.exports.baseRoute = process.env.EXCHANGE_RATE_BASE_ROUTE;

module.exports.routes = {
  detailsRoute: `${this.baseRoute}.json`,
  ratesRoute: `${this.baseRoute}/${this.ref_currency}.json`,
};
