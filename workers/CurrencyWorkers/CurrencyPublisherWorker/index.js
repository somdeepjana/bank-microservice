require("dotenv").config();
var amqp = require("amqplib/callback_api");
const publishRatesFromApi = require("./helper/publishRtaesFromApi");

amqp.connect(
  process.env.RABBITMQ_CONNECTION_STRING,
  function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      var exchange = process.env.EXCHANGE_NAME;
      channel.assertExchange(exchange, "fanout", {
        durable: false,
      });

      console.log("start publishing Currency rates");
      publishRatesFromApi(channel, exchange);

      setInterval(() => {
        publishRatesFromApi(channel, exchange);
      }, process.env.CURRENCY_POLLING_RATE_IN_MINUTES * 60000);
    });
  }
);
