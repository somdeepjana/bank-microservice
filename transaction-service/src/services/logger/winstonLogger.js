const winston = require('winston');

const {winstonConfig}= require("../../config/winstonConfig")

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    // winston.format.json(),
    winston.format.errors({stack:true}),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    )
  );

const transports = [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      handleExceptions: true
    }),
    new winston.transports.File({ 
      filename: 'logs/all.log',
      handleExceptions: true
    }),
]

if(process.env.NODE_ENV!=="test"){
  transports.push(new winston.transports.Console({
    format: consoleFormat,
    handleExceptions: true
  }));
}


// instantiate a new Winston Logger with the settings defined above
const winstonLogger = winston.createLogger({
    level: level(),
    defaultMeta:{
      application: "transaction-microservice"
    },
    transports,
    exitOnError: false
})
  
 
module.exports = winstonLogger;