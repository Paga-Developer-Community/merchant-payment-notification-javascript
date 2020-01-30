/**
 * Module dependencies
 */

const { Schema, model } = require("mongoose");

/**
 * Integration Model
 */

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
};
let IntegrationServiceSchema = new Schema(
  {
    service: {
      type: String,
      validate: {
        validator: function(type) {
          return type.match(/^[A-Z]+(?:_[A-Z]+)$/);
        },
        message: `Type must match words like "SUBMIT_PAYMENT"`
      },
      required: true
    },
    isTest: {
      type: Boolean,
      enum: [true, false],
      required: true
    }
  },
  schemaOptions
);

model("IntegrationService", IntegrationServiceSchema);
module.exports = model("IntegrationService");
