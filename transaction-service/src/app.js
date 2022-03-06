require("dotenv").config();

const path = require("path");

const express = require("express");
const sequelize= require("./sequelize");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const createHttpErrors= require("http-errors")
const winstonLogger = require("./services/logger/winstonLogger");
const morganLoggerMiddleware = require("./services/logger/morganLoggerMiddleware");
const keycloak= require("./config/keycloakConfig");

const indexRouter = require("./routes/index");

sequelize.authenticate().then(()=>{
	console.log("Application database connection open Succesfully");
}).catch(err=>{
	console.error(err);
	console.error("Application database connection error");
	process.exit(1);
})


var app = express();

//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(morganLoggerMiddleware);
}
app.set( 'trust proxy', true );

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());
app.use(keycloak._keycloakSession);
app.use(keycloak._keycloakInstance.middleware());
//Route Prefixes
app.use("/", indexRouter);

// throw 404 if URL not found
app.use(function(req, res, next) {
	// return apiResponse.notFoundResponse(res, "Page not found");
	return next(createHttpErrors(404));
});

app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	const errMessage = err.message;
	const errDetails = req.app.get('env') === 'development' ? err : {};
  
	winstonLogger.error(err);

	// render the error page
	res.status(err.status || 500);
	res.json({
		message: errMessage,
		details: errDetails
	});
});

module.exports = app;
