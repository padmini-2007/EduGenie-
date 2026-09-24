const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  _id: {
    type: String,
    ref: "Student",
  },
  documents_uploaded: {
    type: [
      { name: String, date: { type: Date, default: Date.now }, _id: false },
    ],
  },
  dayStreak: { type: Number, default: 1 },
});

module.exports = mongoose.model("Data", DataSchema);
