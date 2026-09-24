const Subject = require("../Models/Subject");
const connectDB = require("../config/db");

const subjectRecords = [
  {
    _id: "BMATS101",
    Subject_Name: "MATHEMATICS FOR CSE STREAM-1",
    Semester: 1,
    Credits: 4,
  },
  {
    _id: "BPHYS102",
    Subject_Name: "PHYSICS FOR CSE STREAM",
    Semester: 1,
    Credits: 4,
  },
  {
    _id: "BPOPS103",
    Subject_Name: "PRINCIPLES OF PROGRAMMING USING C",
    Semester: 5,
    Credits: 3,
  },
  {
    _id: "BENGK106",
    Subject_Name: "COMMUNICATIVE ENGLISH",
    Semester: 1,
    Credits: 1,
  },
  {
    _id: "BICOK107",
    Subject_Name: "INDIAN CONSTITUTION",
    Semester: 1,
    Credits: 1,
  },
  {
    _id: "BIDTK158",
    Subject_Name: "INNOVATION AND DESIGN THINKING",
    Semester: 1,
    Credits: 1,
  },
  {
    _id: "BESCK104B",
    Subject_Name: "INTRODUCTION TO ELECTRICAL ENGINEERING",
    Semester: 1,
    Credits: 3,
  },
  {
    _id: "BETCK105H",
    Subject_Name: "INTRODUCTION TO INTERNET OF THINGS(IOT)",
    Semester: 1,
    Credits: 3,
  },

  {
    _id: "BMATS201",
    Subject_Name: "MATHEMATICS-II FOR CSE STREAM",
    Semester: 2,
    Credits: 4,
  },
  {
    _id: "BCHES202",
    Subject_Name: "APPLIED CHEMISTRY FOR CSE STREAM",
    Semester: 2,
    Credits: 4,
  },
  {
    _id: "BCEDK203",
    Subject_Name: "COMPUTER-AIDED ENGINEERING DRAWING",
    Semester: 2,
    Credits: 3,
  },
  {
    _id: "BPWSK206",
    Subject_Name: "PROFESSIONAL WRITING SKILLS IN ENGLISH",
    Semester: 2,
    Credits: 1,
  },
  {
    _id: "BKSKK207",
    Subject_Name: "SAMSKRUTHIKA KANNADA",
    Semester: 2,
    Credits: 1,
  },
  {
    _id: "BSFHK258",
    Subject_Name: "SCIENTIFIC FOUNDATIONS OF HEALTH",
    Semester: 2,
    Credits: 1,
  },
  {
    _id: "BPLCK205B",
    Subject_Name: "INTRODUCTION TO PYTHON PROGRAMMING",
    Semester: 2,
    Credits: 3,
  },
  {
    _id: "BESCK204C",
    Subject_Name: "INTRODUCTION TO ELECTRONICS COMMUNICATION",
    Semester: 2,
    Credits: 3,
  },

  {
    _id: "BCS301",
    Subject_Name: "MATHEMATICS FOR COMPUTER SCIENCE",
    Semester: 3,
    Credits: 4,
  },
  {
    _id: "BCS302",
    Subject_Name: "DEGITAL DESIGN & COMPUTER ORGANIZATION",
    Semester: 3,
    Credits: 4,
  },
  { _id: "BCS303", Subject_Name: "OPERATING SYSTEM", Semester: 3, Credits: 4 },
  {
    _id: "BCS304",
    Subject_Name: "DATA STRUCTURES AND APPLICATIONS",
    Semester: 3,
    Credits: 3,
  },
  {
    _id: "BCSL305",
    Subject_Name: "DATA STRUCTURES LAB",
    Semester: 3,
    Credits: 1,
  },
  {
    _id: "BSCK307",
    Subject_Name: "SOCIAL CONNECT AND RESPONSIBILITY",
    Semester: 3,
    Credits: 1,
  },
  {
    _id: "BPEK359",
    Subject_Name: "PHYSICAL EDUCATION",
    Semester: 3,
    Credits: 0,
  },
  {
    _id: "BCS306A",
    Subject_Name: "OBJECT ORIENTED PROGRAMMING WITH JAVA",
    Semester: 3,
    Credits: 3,
  },
  {
    _id: "BCS358A",
    Subject_Name: "DATA ANALYTICS WITH EXCEL",
    Semester: 3,
    Credits: 1,
  },
  {
    _id: "BCS401",
    Subject_Name: "ANALYSIS & DESIGN OF ALGORITHMS",
    Semester: 4,
    Credits: 3,
  },
  { _id: "BCS402", Subject_Name: "MICROCONTROLLERS", Semester: 4, Credits: 4 },
  {
    _id: "BCS403",
    Subject_Name: "DATABASE MANAGEMENT SYSTEMS",
    Semester: 4,
    Credits: 4,
  },
  {
    _id: "BCSL404",
    Subject_Name: "ANALYSIS & DESIGN OF ALGORITHMS LAB",
    Semester: 4,
    Credits: 1,
  },
  {
    _id: "BBOC407",
    Subject_Name: "BIOLOGY FOR COMPUTER ENGINEERS",
    Semester: 4,
    Credits: 2,
  },
  {
    _id: "BUHK408",
    Subject_Name: "UNIVERSAL HUMAN VALUES",
    Semester: 4,
    Credits: 1,
  },
  {
    _id: "BPEK459",
    Subject_Name: "PHYSICAL EDUCATION",
    Semester: 4,
    Credits: 0,
  },
  {
    _id: "BCS405A",
    Subject_Name: "DISCRETE MATHEMATICAL STRUCTURES",
    Semester: 4,
    Credits: 3,
  },
  { _id: "BDSL456C", Subject_Name: "MERN", Semester: 4, Credits: 1 },
  {
    _id: "BCS501",
    Subject_Name: "SOFTWARE ENGINEERING AND PROJECT MANAGEMENT",
    Semester: 5,
    Credits: 4,
  },
  { _id: "BCS502", Subject_Name: "COMPUTER NETWORKS", Semester: 5, Credits: 4 },
  {
    _id: "BCS503",
    Subject_Name: "THEORY OF COMPUTATION",
    Semester: 5,
    Credits: 4,
  },
  {
    _id: "BCDL504",
    Subject_Name: "DATA VISUALIZATION LAB",
    Semester: 5,
    Credits: 1,
  },
  { _id: "BCD586", Subject_Name: "MINI PROJECT", Semester: 5, Credits: 2 },
  {
    _id: "BRMK557",
    Subject_Name: "RESEARCH METHODOLOGY AND IPR",
    Semester: 5,
    Credits: 3,
  },
  {
    _id: "BCS508",
    Subject_Name: "ENVIRONMENTAL STUDIES AND E-WASTE MANAGEMENT",
    Semester: 5,
    Credits: 1,
  },
  {
    _id: "BPEK559",
    Subject_Name: "PHYSICAL EDUCATION",
    Semester: 5,
    Credits: 0,
  },
  {
    _id: "BAD515B",
    Subject_Name: "DATA WAREHOUSING",
    Semester: 5,
    Credits: 3,
  },
];

(async function () {
  connectDB();
  try {
    await Subject.deleteMany();
    console.log("Subject collection flushed!!!");

    await Subject.insertMany(subjectRecords);
    console.log("Subject data seeded!!!");
    process.exit();
  } catch (err) {
    console.log("Error flushing or seeding Subject data", err);
    process.exit(1);
  }
})();
