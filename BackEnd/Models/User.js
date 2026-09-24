const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    refPath: "role",
    unique: true,
  },
  password: { type: String, required: true },
  level: { type: Number, enum: [1, 2, 3], required: true },
  role: {
    type: String,
    enum: ["Student", "Teacher", "Admin"],
    required: true,
  },
  last_login: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
