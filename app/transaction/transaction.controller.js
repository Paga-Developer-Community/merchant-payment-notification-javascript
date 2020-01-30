const { submitTransaction } = require("./transaction.service");
// const { Errorhandler } = require("../middleware/errorHandler");

exports.submitTransaction = async (req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Accept", "application/json");
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "SERVER_ERROR",
        message: "Missing Parameter"
      });
    }
    const { isTest } = req.body;
    if (isTest === true || isTest === false) {
      const value = req.body;
      const data = await submitTransaction(value);
      const { error, message } = data;
      if (error) {
        return res.status(200).json({
          status: "CLIENT_ERROR",
          message
        });
      }
      return res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json({
      status: "SERVER_ERROR",
      message: error.message
    });
  }
};
