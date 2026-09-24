const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  Subject_Name: { type: String, required: true },
  Semester: { type: Number, required: true },
  Credits: { type: Number, required: true },
});

module.exports = mongoose.model("Subject", SubjectSchema);
