const Student = require("../Models/Student");
const { isExisting, createUser } = require("./userController");

const createStudent = async (req, res) => {
  try {
    const {
      username,
      password,
      Name,
      DOB,
      Age,
      Address,
      Phone_Number,
      Course,
    } = req.body;

    const exists = await isExisting(username);

    if (exists) return res.status(401).json({ error:401, message: "User already exists" });

    const newStudent = new Student({
      _id: username,
      Name,
      DOB,
      Age,
      Address,
      Phone_Number,
      Course,
    });

    await newStudent.save();

    const userResponse = await createUser(username, password, 1, "Student");

    return res
      .status(200)
      .json({ ...userResponse, message: "Student registered successfully" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = { createStudent };
