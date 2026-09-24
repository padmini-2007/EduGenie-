const User = require("../Models/User");
const connectDB = require("../config/db");
const bcrypt = require("bcrypt");

const userRecords = [
  {
    username: "1BI22CD015",
    password: "hashed_15",
    level: 1,
    role: "Student",
    last_login: null,
  },
  {
    username: "1BI22CD030",
    password: "hashed_30",
    level: 1,
    role: "Student",
    last_login: null,
  },
  {
    username: "1BI22CD026",
    password: "hashed_26",
    level: 1,
    role: "Student",
    last_login: null,
  },
  {
    username: "1BI22CD012",
    password: "hashed_12",
    level: 1,
    role: "Student",
    last_login: null,
  },
  {
    username: "prathik_k",
    password: "hashed_prathik",
    level: 2,
    role: "Teacher",
    last_login: null,
  },
  {
    username: "tejaswini_ps",
    password: "hashed_tejaswini",
    level: 2,
    role: "Teacher",
    last_login: null,
  },
];

(async function () {
  connectDB();

  try {
    await User.deleteMany();
    console.log("User collection flushed!!!");

    const salt = await bcrypt.genSalt(10);
    const hashedUserRecord = await Promise.all(
      userRecords.map(async (doc) => ({
        ...doc,
        password: await bcrypt.hash(doc.password, salt),
      }))
    );

    await User.insertMany(hashedUserRecord);
    console.log("User Collection seeded!!!");
    process.exit();
  } catch (err) {
    console.log("Error flushing or seeding User data", err);
    process.exit(1);
  }
})();
