const { Schema, model, Types } = require("mongoose");
const validator = require("mongoose-validator");

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate: [
      validator({
        validator: "isEmail",
        message: "Please enter a valid email",
      }),
    ],
    unique: true,
  },
  cell: {
    type: String,
    validate: {
      validator: function (v) {
        return /d{10}/.test(v);
      },
      message:
        "{VALUE} is not a valid 10 digit number! Please enter a valid phone number",
    },
  },
  image: {
    type: String,
    default: null,
  },
});

module.exports = model("Contact", schema);
