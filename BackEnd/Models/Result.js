const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  student_id: { type: String, ref: "Student" },
  semester: Number,
  results: [
    {
      subject_code: String,
      subject_name: String,
      internal: Number,
      external: Number,
      total: Number,
      result: { type: String, enum: ["P", "F", "A", "X", "NE"] },
      _id: false,
    },
  ],
});

ResultSchema.index({ student_id: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model("Result", ResultSchema);
