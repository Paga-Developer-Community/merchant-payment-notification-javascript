const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function(req, res, next) {
  //Get the token from the header if present

  let token = req.headers["authorization"] || req.headers["x-auth-token"];
  //If no token found, return response (without going to the (without going the next middleware))
  if (!token)
    return res.status(401).json({
      status: "SERVER ERROR",
      message: "Access denied. No token provided"
    });
  token = token.slice(6, token.length);

  try {
    //If you can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.MYPRIVATEKEY);
    req.user = decoded;

    const { role } = decoded;
    if (role !== "Admin") {
      return res.status(401).json({
        status: "CLIENT ERROR",
        message: `Unauthorized`
      });
    }
    next();
  } catch (error) {
    //If invalid token
    res.status(400).send({
      status: "CLIENT ERROR",
      message: "Invalid token"
    });
  }
};
