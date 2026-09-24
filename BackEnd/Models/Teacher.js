const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  Name: { type: String },
  DOB: { type: String },
  Address: {
    value: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  Phone_Number: { type: Number },
  Designation: { type: String, required: true },
  Department: { type: String, required: true },
  Subjects_Undertaken: [{ type: String, ref: "Subject" }],
  profile_image: { type: Buffer },
  banner_image: { type: Buffer },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
