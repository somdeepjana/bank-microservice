
const {body} = require("express-validator");

const validationRunner= require("../../middlewares/validationRunner");

module.exports.transferFund= validationRunner([
    body("transc_id", "Transaction Id is required").trim().notEmpty(),

    body("from_account", "From account Id required").trim().notEmpty()
        .isLength({max:120}).withMessage("Account Id maximum length 120 supported"),

    body("to_account", "To account Id required").trim().notEmpty()
        .isLength({max:120}).withMessage("Account Id maximum length 120 supported"),

    body("amount", "Amount is required").trim().notEmpty()
        .isNumeric().withMessage("Numeric value is needed"),

    body("transac_currency", "currency is required").trim().notEmpty(),

    body("s2s").trim().notEmpty().withMessage("s2s key required")
        .custom(s2s=>{
            if(s2s!==process.env.S2S_INTREGRITY_KEY){
                return Promise.reject("s2s key invalid");
            }
            return true;
        })
]);