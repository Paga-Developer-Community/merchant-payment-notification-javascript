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
      subsidiaryAccountNumber,
      customerFirstName,
      customerLastName,
      channel,
      description,
      customerPhoneNumber,
      services,
      subsidiaryFirstName,
      subsidiaryLastName,
      subsidiaryPhoneNumber,
      amount
    } = transaction;

   
    if (subsidiaryAccountNumber) {
      const subsidiaryAccountDetails = await CustomerSchema.findOne({
        customerAccountNumber:subsidiaryAccountNumber,
      });
      const {role,customerAccountNumber} = subsidiaryAccountDetails;
      if (subsidiaryAccountDetails && role === "AFFILIATE") {
        const newTransaction = await new TransactionSchema({
          transaction: {
            utcTransactionDateTime,
            totalAmount:amount,
            pagaTransactionId,
            merchantTransactionId,
            currency,
            customerReference:customerAccountNumber,
            customerFirstName:subsidiaryFirstName,
            customerLastName:subsidiaryLastName,
            channel,
            customerPhoneNumber:subsidiaryPhoneNumber,
          }
        });
        
        await newTransaction.save();
        return {
          status: "SUCCESS",
          message:"Notification received and processed successfully"
        };
      }

    }
    const validCustomer = await CustomerSchema.findOne({
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
