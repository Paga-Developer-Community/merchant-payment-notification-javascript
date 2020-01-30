const Joi = require("@hapi/joi");

const merchantValidation = Joi.object({
  name: Joi.string().required(),
  price: Joi.number()
    .positive()
    .precision(0)
    .required(),
  shortCode: Joi.string().required(),
  productCode: Joi.string().required(),
  isPublic: Joi.boolean()
});

module.exports = merchantValidation;
