const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  verified: { type: Boolean, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
