"use strict";

/*
 * Module dependencies.
 */

const mongoose = require("mongoose");
const local = require("./passport/local");

const Customer = mongoose.model("Customer");

/**
 * Expose
 */

module.exports = function(passport) {
  // serialize and deserialize sessions
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => Customer.findOne({ _id: id }, done));

  // use these strategies
  passport.use(local);
};
