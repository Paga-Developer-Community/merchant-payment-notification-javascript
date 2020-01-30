const customerValidation = require("../customer/customer.validation");
const merchantValidation = require("../merchant/merchant.validation");
const transactionValidation = require("../transaction/transaction.validation");

module.exports = {
  "/customer/*": customerValidation,
  "/merchantService/*": merchantValidation,
  "/transaction/*": transactionValidation
};
