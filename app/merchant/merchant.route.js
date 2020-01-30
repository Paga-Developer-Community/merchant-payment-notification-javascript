const { Router } = require("express");
const router = Router();
const { basicAuth } = require("../customer/customer.controller");

const MerchantController = require("./merchant.controller");
const { createMerchantService, getMerchantService } = MerchantController;

router.route("/create").post(createMerchantService);
router.route("/getMerchantServices").post(basicAuth, getMerchantService);

module.exports = router;
