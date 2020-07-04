/**
 * Module dependencies
 */

const { Schema, model } = require("mongoose");
const uuid4 = require("uuid/v4");

/**
 * Transaction Model
 */

let TransactionSchema = new Schema({
  isTrue: {
    type: Boolean,
    enum: [true, false]
  },
  transaction: {
    utcTransactionDateTime: {
      type: Date,
      default: Date.now
    },
    uniqueTransactionId: {
      type: String,
      default: uuid4()
    },
    transactionType: {
      type: String,
      enum: ["BILL_PAY"]
    },
    totalAmount: {
      type: Number
    },
    isCredit: {
      type: Boolean,
      enum: [true, false]
    },
    pagaTransactionId: {
      type: String
    },
    merchantTransactionId: {
      type: String,
      default: uuid4
    },
    currency: {
      type: String
    },
    customerReference: {
      type: String,
      ref: "Customer",
    },
    channel: {
      type: String,
      enum: ["SMS", "ONLINE", "VOICE", "EMAIL", "USSD", "E-WIDGET"]
    },
    description: {
      type: String,
      maxlength: 100
    },
    services: {
      type: [Schema.Types.Mixed],
      required: true
    },
    confirmationCode: {
      type: String,
      default: uuid4
    }
  }
});

model("Transaction", TransactionSchema);
module.exports = model("Transaction");
