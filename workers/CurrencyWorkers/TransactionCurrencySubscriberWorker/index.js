require("dotenv").config();

const amqp = require("amqplib/callback_api");
const sequelize= require("./sequelize");
const updateCurrency= require("./helper/updateCurrency");

// start mongoose connections
sequelize.authenticate().then(() => {
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
                const exchange = process.env.EXCHANGE_NAME;

                channel.assertExchange(exchange, "fanout", { durable: false });

                channel.assertQueue("", { exclusive: true },
                    function (error2, q) {
                        if (error2) {
                            throw error2;
                        }
                        console.log(
                            " [*] Waiting for messages in %s. To exit press CTRL+C",
                            q.queue
                        );
                        channel.bindQueue(q.queue, exchange, "");

                        channel.consume( q.queue,
                            function (msg) {
                                if (msg.content) {
                                    const publishRateModel = JSON.parse(msg.content.toString());

                                    updateCurrency(publishRateModel);
                                }
                            },
                            { noAck: true }
                        );
                    }
                );
            });
        }
    );
});
