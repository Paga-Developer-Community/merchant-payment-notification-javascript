const {
  createMerchantService,
  getMerchantService
} = require("./merchant.service");

exports.createMerchantService = async (req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Accept", "application/json");
  try {
    const value = req.body;

    const data = await createMerchantService(value);
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

exports.getMerchantService = async (req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Accept", "application/json");
  try {
    if (Object.keys(req.body).length === 0 || !("isTest" in req.body)) {
      return res.status(400).json({
        status: "SERVER_ERROR",
        message: "Missing Parameter"
      });
    }
    const { isTest } = req.body;
    if (isTest === true || isTest === false) {
      const value = req.body;
      const data = await getMerchantService(value);
      if (data.error) {
        return res.status(200).json({
          status: "CLIENT_ERROR",
          message: data.message
        });
      }
      return res.status(200).json({
        status: "SUCCESS",
        services: data.message
      });
    }
  } catch (error) {
    res.status(500).json({
      success: "SERVER_ERROR",
      message: error.message
    });
  }
};
