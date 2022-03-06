const morgan= require("morgan");

const winstonLogger= require("./winstonLogger");

const stream = {
    // Use the http severity
    write: (message) => winstonLogger.info(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

// Build the morgan middleware
const morganLoggerMiddleware = morgan(
    // Define message format string (this is the default one).
    // The message format is made from tokens, and each token is
    // defined inside the Morgan library.
    ":method :url :status :res[content-length] - :response-time ms",
    // Options: in this case, I overwrote the stream and the skip logic.
    { stream, skip }
  );

module.exports= morganLoggerMiddleware