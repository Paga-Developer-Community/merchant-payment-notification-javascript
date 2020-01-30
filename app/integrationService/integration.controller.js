const {
  createIntegrationService,
  getIntegrationServices
} = require("./integrationService.service");

exports.createIntegrationService = async (req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Accept", "application/json");
  try {
    const value = req.body;
    const data = await createIntegrationService(value);
    if (data.error) {
      return res.status(200).json({
        success: false,
        message: data.msg
      });
    }
    return res.status(200).json({
      success: true,
      message: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
/**
 * getIntegrationService method fetches all the integration services of a merchant
 */
exports.getIntegrationServices = async (req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Accept", "application/json");
  try {
    req.headers["Content-Type"] = "application/json";
    req.headers["Accept"] = "application/json";
    const value = req.body;

    if (Object.keys(req.body).length === 0 || !("isTest" in req.body)) {
      return res.status(400).json({
        status: "SERVER_ERROR",
        message: "Missing Parameter"
      });
    }
    const { isTest } = req.body;
    if (isTest === true || isTest === false) {
      const data = await getIntegrationServices(value);
      if (data.error) {
        return res.status(200).json({
          status: "CLIENT_ERROR",
          message: data.message
        });
      }
      return res.status(200).json({ services: data.message });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
