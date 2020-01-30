const TransactionSchema = require("./transaction.model");
const CustomerSchema = require("../customer/customer.model");

exports.submitTransaction = async function(data) {
  try {
    const { transaction } = data;
    const {
      utcTransactionDateTime,
      transactionType,
      totalAmount,
      merchantAmount,
      isCredit,
      pagaTransactionId,
      merchantTransactionId,
      currency,
      customerReference,
      customerFirstName,
      customerLastName,
      channel,
      description,
      customerPhoneNumber,
      services
    } = transaction;

    console.log(customerFirstName);
    const validCustomer = CustomerSchema.findOne({
      customerReference,
      customerFirstName,
      customerLastName,
      customerPhoneNumber
    });
    if (!validCustomer) {
      return {
        error: true,
        message: `Invalid customer details`
      };
    }

    const newTransaction = await new TransactionSchema({
      transaction: {
        utcTransactionDateTime,
        transactionType,
        totalAmount,
        merchantAmount,
        isCredit,
        pagaTransactionId,
        merchantTransactionId,
        currency,
        customerReference,
        customerFirstName,
        customerLastName,
        channel,
        description,
        customerPhoneNumber,
        services
      }
    });
    await newTransaction.save();
    const {
      transaction: { uniqueTransactionId, confirmationCode }
    } = newTransaction;

    return {
      status: "SUCCESS",
      uniqueTransactionId,
      customerReference,
      merchantStatus: "200",
      message: "Successfully executed payment",
      confirmationCode
    };
  } catch (error) {
    throw new Error(error);
  }
};
