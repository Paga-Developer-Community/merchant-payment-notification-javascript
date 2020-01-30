const {
  registerCustomer,
  validateCustomer,
  authenticate
} = require("./customer.service");
exports.registerCustomer = async (req, res) => {
  try {
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");
    const value = req.body;
    const data = await registerCustomer(value);
    console.log(data);
    if (data.error) {
      return res.status(200).json({
        success: false,
        message: data.msg
      });
    }
    const {
      error,
      message,
      user: { token, customerAccountNumber }
    } = data;

    //or writeHead method
    res
      .status(201)
      .header("Authorization", token)
      .send({
        error,
        message,
        token,
        customerAccountNumber
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.validateCustomer = async (req, res) => {
  try {
    res.set("Content-Type", "application/json");
    res.set("Accept", "application/json");
    if (Object.keys(req.body).length === 0 || !("isTest" in req.body)) {
      return res.status(400).json({
        status: "SERVER_ERROR",
        message: "Missing Parameter"
      });
    }
    const value = req.body;
    const data = await validateCustomer(value);
    if (data.error) {
      return res.status(200).json({
        status: "CLIENT_ERROR",
        message: data.msg
      });
    }

    return res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      status: "SERVER_ERROR",
      message: error.message
    });
  }
};

exports.basicAuth = async function(req, res, next) {
  //Check for the basic auth header
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic") === -1
  ) {
    return res.status(401).json({
      message: "Missing Authorization Header"
    });
  }

  //Verify auth credentials
  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );

  const [username, password] = credentials.split(":");

  const customer = await authenticate(username, password);
  if (customer.error) {
    return res.status(401).json({
      error: true,
      message: "Invalid Authentication Credentials"
    });
  }
  //Attach customer to the request object
  // req.customer = customer;
  next();
};
