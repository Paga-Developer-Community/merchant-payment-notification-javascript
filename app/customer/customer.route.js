const { Router } = require("express");
const router = Router();
const CustomerController = require("./customer.controller");
const { basicAuth } = require("../customer/customer.controller");

const { registerCustomer, validateCustomer } = CustomerController;

router.route("/createCustomer").post(registerCustomer);
router.route("/validateCustomer").post(basicAuth, validateCustomer);
router.route("/newSubsidiaryAccountDetails").post(basicAuth,validateCustomer);

module.exports = router;
