
const {query} = require("express-validator");

const validationRunner= require("../../middlewares/validationRunner");

module.exports.convertRate= validationRunner([
    query("from", "From currency code required").trim().notEmpty(),
	query("to", "to currency code required").trim().notEmpty(),
	query("amount", "Amount is required").trim().notEmpty().isNumeric().withMessage("Amount must be numeric value")
]);