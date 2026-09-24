const Student = require("../Models/Student");
const connectDB = require("../config/db");
const { Binary } = require("mongodb");
const fs = require("fs");

const pavanImage = new Binary(fs.readFileSync("./images/pavan.png"));
const pavanBanner = new Binary(fs.readFileSync("./images/pavan_banner.png"));
const harshaImage = new Binary(fs.readFileSync("./images/harsha.png"));
const amaanImage = new Binary(fs.readFileSync("./images/amaan.png"));
const eshwarImage = new Binary(fs.readFileSync("./images/eshwar.png"));

const studentRecords = [
  {
    _id: "1BI22CD015",
    Name: "Harsha K L",
    DOB: "03-11-2004",
    Age: 20,
    Address: {
      value: "3, 4th D Cross, Avalahalli, New Extension, Mysore Road",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
    },
    Phone_Number: 9353991614,
    Course: "CSE(DS)",
    profile_image: harshaImage,
    banner_image: harshaImage,
    attendance: [
      { code: "BCS303" },
      ,
      { code: "BCS306A" },
      { code: "BCS401" },
      { code: "BDSL456C" },
      { code: "BAD515B" },
    ],
  },
  {
    _id: "1BI22CD030",
    Name: "Pavan D",
    DOB: "27-08-2004",
    Age: 20,
    Address: {
      value: "#712, 4th Cross, Upkar Layout Near RTO Office, Bangalore 560091",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
    },
    Phone_Number: 7204163730,
    Course: "CSE(DS)",
    profile_image: pavanImage,
    banner_image: pavanBanner,
    attendance: [{ code: "BCS401" }, { code: "BDSL456C" }, { code: "BAD515B" }],
  },
  {
    _id: "1BI22CD026",
    Name: "Mohammed Amaan",
    DOB: "24-08-2004",
    Age: 20,
    Address: {
      value: "#123, ABC Cross, DEF area",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
    },
    Phone_Number: 7795023287,
    Course: "CSE(DS)",
    profile_image: amaanImage,
    banner_image: amaanImage,
    attendance: [
      { code: "BCS303" },
      { code: "BCSL404" },
      { code: "BDSL456C" },
      { code: "BCDL504" },
    ],
  },
  {
    _id: "1BI22CD012",
    Name: "Eshwar R",
    DOB: "22-06-2004",
    Age: 20,
    Address: {
      value: "Mahalakshmi Layout",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
    },
    Phone_Number: 8105833763,
    Course: "CSE(DS)",
    profile_image: eshwarImage,
    banner_image: eshwarImage,
    attendance: [{ code: "BCS303" }, { code: "BDSL456C" }, { code: "BAD515B" }],
  },
];

(async function () {
  connectDB();

  try {
    await Student.deleteMany();
    console.log("Student collection flushed!!!");

    await Student.insertMany(studentRecords);
    console.log("Student Collection seeded!!!");
    process.exit();
  } catch (err) {
    console.log("Error flushing or seeding Student data", err);
    process.exit(1);
  }
})();
