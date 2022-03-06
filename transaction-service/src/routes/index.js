const express = require("express");

const keycloakInstance= require("../config/keycloakConfig")._keycloakInstance;

const router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
	res.render("index", { title: "Express" });
});

const MinistatementController= require("./Ministatement/MinistatementController");
router.get("/transaction/statement/:accountId", keycloakInstance.protect(), MinistatementController.getStatement);

const TransferFundController= require("./TransferFund/TransferFundController");
const TransferFundValidator= require("./TransferFund/TransferFundValidator");
router.post("/transaction/createtransaction", TransferFundValidator.initiateTransfer, keycloakInstance.protect(), TransferFundController.initiateTransfer);

module.exports = router;
