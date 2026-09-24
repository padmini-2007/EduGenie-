const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  Name: { type: String },
  DOB: { type: String },
  Age: { type: Number },
  Address: {
    value: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  Phone_Number: { type: Number },
  Course: { type: "String", required: true },
  profile_image: { type: Buffer },
  banner_image: { type: Buffer },
  attendance: [
    {
      code: { type: String, ref: "Subject" },
      attedance: { type: String, default: "N/A" },
      _id: false,
    },
  ],
});

module.exports = mongoose.model("Student", StudentSchema);
