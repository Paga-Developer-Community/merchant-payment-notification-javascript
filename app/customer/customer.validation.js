const Joi = require("@hapi/joi");

const customerValidation = Joi.object({
  customerAccountNumber: Joi.string(),
  customerFirstName: Joi.string()
    .required()
    .min(2),
  customerLastName: Joi.string()
    .min(2)
    .required(),
  customerPhoneNumber: Joi.string()
    .regex(/^234[0-9]{11}/)
    .required(),
  customerAccountStatus: Joi.string()
    .valid("ACTIVE", "INACTIVE")
    .uppercase()
    .required(),
  password: Joi.string()
    .alphanum()
    .min(5)
    .required.strict()
});

module.exports = customerValidation;
