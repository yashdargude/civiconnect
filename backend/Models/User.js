const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  role: {
    type: "string",
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
