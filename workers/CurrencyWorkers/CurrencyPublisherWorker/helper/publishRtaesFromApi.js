const ExchangeRateService = require("../services/ExchangeRateService");

module.exports = (rabbitMqChannel, rabbitMqExchange) => {
  ExchangeRateService()
    .then((rateResponseDto) => {
      const sendString = JSON.stringify(rateResponseDto);

      rabbitMqChannel.publish(rabbitMqExchange, "", Buffer.from(sendString));
      console.log(
        " [x] Sent currency rates at %s",
        rateResponseDto.featch_date
      );
    })
    .catch((err) => {
      console.error(err);
      console.error("Faild to get the currency rates from remote server");
    });
};
