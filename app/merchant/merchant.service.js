const MerchantSchema = require("./merchant.model");

exports.createMerchantService = async function(data) {
  try {
    const { name, price, isPublic } = data;
    const newMerchantService = new MerchantSchema({ name, price, isPublic });
    const validMerchantService = await MerchantSchema.exists({
      name
    });
    if (validMerchantService) {
      return {
        error: true,
        msg: `Merchant service ${name} already exists`
      };
    }
    newMerchantService.setShortCode();
    await newMerchantService.save();
    return {
      error: false,
      message: `${name} successfully created`
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.getMerchantService = async function() {
  try {
    // const { isTest } = data;
    const merchantServices = await MerchantSchema.find().select([
      "name",
      "price",
      "shortCode",
      "productCode",
      "isPublic"
    ]);
    if (!merchantServices) {
      return {
        return: true,
        message: `Merchant services does not exist`
      };
    }
    return {
      error: false,
      message: merchantServices
    };
  } catch (error) {
    throw new Error(error);
  }
};
