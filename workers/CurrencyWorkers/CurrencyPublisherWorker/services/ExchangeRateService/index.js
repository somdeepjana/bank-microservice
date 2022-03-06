const currencyApiConfig = require("./config");
const CurrecyRateResponseDto = require("./models/CurrencyRateResponseDto");

const axios = require("axios").default;

module.exports = async () => {
  const currencyDetailsResult = await axios.get(
    currencyApiConfig.routes.detailsRoute
  );
  const ratesResult = await axios.get(currencyApiConfig.routes.ratesRoute);

  return new CurrecyRateResponseDto(
    currencyDetailsResult.data,
    ratesResult.data,
    currencyApiConfig.ref_currency
  );
};
