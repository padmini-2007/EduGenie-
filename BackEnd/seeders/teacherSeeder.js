const Teacher = require("../Models/Teacher");
const connectDB = require("../config/db");

const teacherRecords = [
  {
    _id: "prathik_k",
    Name: "Prathik K",
    DOB: "21-05-1981",
    Address: {
      value: "VV Puram",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
    },
    Phone_Number: 8660472534,
    Designation: "Assistant Professor",
    Department: "CSE(DS)",
    Subjects_Undertaken: ["BCS303", "BDSL456C", "BAD515B", "BCDL504"],
  },
  {
    _id: "tejaswini_ps",
    Name: "Tejaswini P S",
    DOB: "28-01-1975",
    Address: {
      value: "Rajajinagar",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
    },
    Phone_Number: 9902714366,
    Designation: "Assistant Professor",
    Department: "CSE(DS)",
    Subjects_Undertaken: ["BCS306A", "BCS401", "BCSL404"],
  },
];

(async function () {
  connectDB();
  try {
    await Teacher.deleteMany();
    console.log("Teacher collection flushed!!!");

    await Teacher.insertMany(teacherRecords);
    console.log("Teacher data seeded!!!");
    process.exit();
  } catch (err) {
    console.log("Error flushing or seeding Teacher data", err);
    process.exit(1);
  }
})();
