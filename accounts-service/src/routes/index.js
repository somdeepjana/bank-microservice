var express = require("express");

const keycloakInstance= require("../Config/keycloakConfig")._keycloakInstance;

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
	res.render("index", { title: "Express" });
});

const AccountsController= require("./Accounts/AccountsController");
router.get("/details/accounts", keycloakInstance.protect(), AccountsController.allAccounts);
router.get("/details/accounts/:accountId", keycloakInstance.protect(), AccountsController.getAccountById);
router.get("/details/check/:accountId", keycloakInstance.protect(), AccountsController.checkAccountCurrency);

const CurrencyRateController= require("./CurrencyRate/CurrencyRateController");
const CurrencyRateValidator= require("./CurrencyRate/CurrencyRateValidator");
router.get("/currency/rates", CurrencyRateController.allRates);
router.get("/currency/convert",CurrencyRateValidator.convertRate, CurrencyRateController.convertRate);

const NotifyTransactionController= require("./NotifyTransaction/NotifyTransactionController");
const NotifyTransactionValidator= require("./NotifyTransaction/NotifyTransactionValidator");
router.post("/notify/transaction", NotifyTransactionValidator.transferFund,keycloakInstance.protect(), NotifyTransactionController.transferFund);


module.exports = router;
