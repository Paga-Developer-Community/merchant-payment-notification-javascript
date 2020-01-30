"use strict";

/**
 * Module dependencies.
 */

// const home = require("../app/routes/home");
const express = require("express");
const router = express.Router();
const integrationService = require("../app/integrationService/integrationService.route");
const customer = require("../app/customer/customer.route");
const merchantServices = require("../app/merchant/merchant.route");
const transaction = require("../app/transaction/transaction.route");

router.use(customer);
router.use(integrationService);
router.use(merchantServices);
router.use(transaction);
module.exports = router;
