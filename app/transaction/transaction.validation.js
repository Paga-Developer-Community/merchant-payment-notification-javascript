const Joi = require("@hapi/joi");

const transactionValidation = Joi.object({
  utcTransactionDateTime: Joi.date(),
  transactionType: Joi.string().valid(["BILL_PAY"]),
  totalAmount: Joi.number(),
  isCredit: Joi.boolean().valid([true, false]),
  pageTransactionId: Joi.string(),
  merchantTransactionId: Joi.string(),
  currency: Joi.string(),
  channels: Joi.string().valid([
    "SMS",
    "ONLINE",
    "VOICE",
    "EMAIL",
    "USSD",
    "E-WIDGET"
  ]),
  description: Joi.string().max(100),
  status: Joi.string().valid(["SUCCESS", "CLIENT_ERROR", "SERVER_ERROR"])
});

module.exports = transactionValidation;
