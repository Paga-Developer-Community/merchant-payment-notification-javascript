// const customerService = require("../customer/customer.service");

// const basicAuth = async (req, res, next) => {
//   //make an authenticate path
//   if (req.path === "/customer/authenticate") {
//     return next();
//   }

//   //check for basic auth header
//   if (
//     !req.headers.authorization ||
//     req.headers.authorization.indexOf("Basic") === -1
//   ) {
//     return res.status(401).json({
//       message: "Missing Authorization Header"
//     });
//   }

//   //verify auth credentials
//   const base64Credentials = req.headers.authorization.split(" ");
//   const credentials = Buffer.from(base64Credentials, "base64").toString(
//     "ascii"
//   );
//   const [username, password] = await customerService.validateCustomer();
// };
const expressJwt = require("express-jwt");
const dotenv = require("dotenv");
dotenv.config();

module.exports = authorize;

function authorize(roles = []) {
  const secret = process.env.MYPRIVATEKEY;
  if (typeof roles === "string") {
    roles = [roles];
  }
  return [
    expressJwt({ secret }),
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }
      next();
    }
  ];
}
// const getTokenFromHeaders = req => {
//   const {
//     headers: { authorization }
//   } = req;

//   if (authorization && authorization.split(" ")[0] === "BASIC") {
//     return authorization.split(" ")[1];
//   }
//   return null;
// };

// const auth = {
//   required: jwt({
//     secret: "secret",
//     userProperty: "payload",
//     getToken: getTokenFromHeaders
//   }),
//   optional: jwt({
//     secret: "secret",
//     userProperty: "payload",
//     getToken: getTokenFromHeaders,
//     credentialsRequired: false
//   })
// };

// module.exports = auth;
