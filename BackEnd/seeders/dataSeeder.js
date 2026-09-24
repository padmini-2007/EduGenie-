const Data = require("../Models/Data");
const connectDB = require("../config/db");
const bcrypt = require("bcrypt");

const dataRecords = [
  {
    _id: "1BI22CD015",
    documents_uploaded: [],
    dayStreak: 1,
  },
  {
    _id: "1BI22CD030",
    documents_uploaded: [],
    dayStreak: 1,
  },
  {
    _id: "1BI22CD026",
    documents_uploaded: [],
    dayStreak: 1,
  },
  {
    _id: "1BI22CD012",
    documents_uploaded: [],
    dayStreak: 1,
  },
];

(async function () {
  connectDB();

  try {
    await Data.deleteMany();
    console.log("Data collection flushed!!!");
    await Data.insertMany(dataRecords);
    console.log("Data Collection seeded!!!");
    process.exit();
  } catch (err) {
    console.log("Error flushing or seeding data", err);
    process.exit(1);
  }
})();
