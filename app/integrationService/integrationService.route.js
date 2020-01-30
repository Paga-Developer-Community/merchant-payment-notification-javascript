const { Router } = require("express");
const router = Router();
const IntegrationServiceController = require("./integration.controller");
const { basicAuth } = require("../customer/customer.controller");

const {
  createIntegrationService,
  getIntegrationServices
} = IntegrationServiceController;

router.route("/create").post(createIntegrationService);
router.route("/getIntegrationService").post(basicAuth, getIntegrationServices);

module.exports = router;
