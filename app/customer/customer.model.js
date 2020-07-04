/**
 * Module dependencies
 */

const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const helperFunction = require("../merchant/merchant.helper");
/**
 * Customer Schema
 */
const { uniqueNumber } = helperFunction;
let CustomerSchema = new Schema({
  customerAccountNumber: {
    type: String,
    default: uniqueNumber()
  },
  customerFirstName: {
    type: String,
    required: true
  },
  customerLastName: {
    type: String,
    required: true
  },
  customerPhoneNumber: {
    type: String,
    validate: {
      validator: function(type) {
        return type.match(
          /^((\+234)|0)([8]((0[2-9])|(1[0-9]))|([7,9]0[1-9]))[0-9]{7}$/
        );
      },
      message: `Phone number doesn't match any Nigerian phone number `
    },
    required: true
  },
  customerAccountStatus: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE"
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  token: {
    type: String
  },
  secretKey: {
    type: String
  },
  role: {
    type: String,
    enum: ["Admin", "User","AFFILIATE"]
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email Address is required"
    // match: [/\S+@\S+\.\S+/, "Please fill a valid email address"]
  }
});

/**
 * Add pre-save hooks
 */

CustomerSchema.methods.setRoles = function(secretKey) {
  if (secretKey === process.env.MYPRIVATEKEY) {
    return (this.role = "Admin");
  }else if(secretKey === process.env.SUBSIDIARYKEY) {
    return (this.role = "AFFILIATE");
  }
  return this.role ="User";
};

CustomerSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(Number(12)).toString("hex");
  return (this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"));
};

CustomerSchema.methods.generateAuthToken = function() {
  const myPrivateKey = process.env.MYPRIVATEKEY;
  const userToken = jwt.sign(
    {
      _id: this._id,
      role: this.role
    },
    myPrivateKey
  );
  return (this.token = `Basic ${userToken}`);
};
CustomerSchema.methods.comparePassword = function(
  password,
  salt,
  hashedPassword
) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
  return hashedPassword === hash;
};

CustomerSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return (this.token = jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt((expirationDate.getTime() / 100).toString(), 10)
    },
    "secret"
  ));
};

CustomerSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    salt: this.salt,
    customerPhoneNumber: this.customerPhoneNumber,
    password: this.password,
    token: this.token,
    customerAccountNumber: this.customerAccountNumber
  };
};

model("Customer", CustomerSchema);

module.exports = model("Customer");
