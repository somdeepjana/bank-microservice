
const {body} = require("express-validator");

const validationRunner= require("../../middleware/validationRunner");

module.exports.initiateTransfer= validationRunner([
	body("from_account_id", "From account Id required").trim().notEmpty()
        .isLength({max:120}).withMessage("Account Id maximum length 120 supported"),

    body("to_account_id", "To account Id required").trim().notEmpty()
        .isLength({max:120}).withMessage("Account Id maximum length 120 supported"),

    body("amount", "Amount is required").trim().notEmpty()
        .isNumeric().withMessage("Numeric value is needed"),

    body("transac_currency").trim()
]);