/**
 * Module dependencies
 */

const { Schema, model } = require("mongoose");
const { customId, serviceCode } = require("./merchant.helper");

/**
 * Merchant Schema
 */

let MerchantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  shortCode: {
    type: String
  },
  productCode: {
    type: String,
    default: customId()
  },
  isPublic: {
    type: Boolean,
    enum: [true, false],
    default: false
  }
});

MerchantSchema.methods.setShortCode = function() {
  return (this.shortCode = serviceCode(this.name));
};
model("Merchant", MerchantSchema);
module.exports = model("Merchant");
