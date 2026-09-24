const Teacher = require("../Models/Teacher");
const Student = require("../Models/Student");
const User = require("../Models/User");
const Results = require("../Models/Result");
const { isExisting, createUser, isLoggedIn } = require("./userController");

const createTeacher = async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      DOB,
      Address,
      Phone_Number,
      Designation,
      Department,
    } = req.body;

    const exists = await isExisting(username);

    if (exists)
      return res
        .status(401)
        .json({ error: 401, message: "User already exists" });

    const newTeacher = new Teacher({
      _id: username,
      name,
      DOB,
      Address,
      Phone_Number,
      Designation,
      Department,
    });

    await newTeacher.save();

    const userResponse = await createUser(username, password, 2, "Teacher");

    return res
      .status(200)
      .json({ ...userResponse, message: "Teacher registered successfully" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const addSubject = async (req, res) => {
  try {
    const username = req.params.username;
    const subject_id = req.body.subject_id;
    const token = req.cookies.user_token;
    const status = await isLoggedIn(username, token);

    if (status == -1)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: No token provided" });

    if (status == 0 || status == 1)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: You don't have access" });

    const existing = await Teacher.find({ Subjects_Undertaken: subject_id });
    console.log(existing);

    if (existing.length !== 0)
      return res
        .status(409)
        .json({ error: 409, message: "Subject is already taken" });

    await Teacher.findByIdAndUpdate(username, {
      $push: { Subjects_Undertaken: subject_id },
    });

    return res
      .status(200)
      .json({ message: `Subject ${subject_id} added successfully` });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const getStudentsList = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    const { subjectId, username } = req.params;
    const status = await isLoggedIn(username, token);

    if (status == -1)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: No token provided" });

    const teacher = await User.findOne({ username });

    if (!teacher)
      return res
        .status(400)
        .json({ error: 400, message: `Teacher with id:${id} doesn't exist` });

    if (status == 0 || status == 1)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: You don't have access" });

    const takesSubject = await Teacher.findOne({
      _id: username,
      Subjects_Undertaken: { $elemMatch: { $in: [subjectId] } },
    });

    if (!takesSubject)
      return res.status(404).json({
        error: 404,
        message: "Unauthorized: You don't have access to this subject",
      });

    const students = await Student.find(
      { "attendance.code": subjectId },
      { _id: 1, Name: 1, "attendance.$": 1 }
    );

    return res.status(200).json({ students });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const getStudentResultsBySubjectId = async (req, res) => {
  try {
    const { username, subject_id } = req.params;
    const token = req.cookies.user_token;
    const status = await isLoggedIn(username, token);

    if (status == -1)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: No token provided" });

    if (status == 0 || status == 1)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: You don't have access" });

    const takesSubject = await Teacher.findOne({
      _id: username,
      Subjects_Undertaken: { $elemMatch: { $in: [subject_id] } },
    });

    if (!takesSubject)
      return res.status(404).json({
        error: 404,
        message: "Unauthorized: You don't have access to this subject",
      });

    const students = await Results.find(
      {},
      { student_id: 1, results: 1, _id: 0 }
    );
    const subjectResults = [];

    for (const student of students) {
      const result = student.results?.find(
        (r) => r.subject_code === subject_id
      );
      if (result) {
        subjectResults.push({
          student_id: student.student_id,
          internal: result.internal,
          external: result.external,
          total: result.total,
        });
      }
    }

    return res.status(200).json({ subjectResults });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const getStudentResultsById = async (req, res) => {
  try {
    const username = req.params.username;
    const token = req.cookies.user_token;
    const status = await isLoggedIn(username, token);

    if (status == -1)
      return res
        .status(403)
        .json({ message: "Unauthorized: No token provided" });

    if (status == 0 || status == 1)
      return res
        .status(403)
        .json({ message: "Unauthorized: You don't have access" });

    const { Subjects_Undertaken } = await Teacher.findById(username, {
      Subjects_Undertaken: 1,
      _id: 0,
    });

    const students = await Results.find(
      {},
      { student_id: 1, results: 1, _id: 0 }
    );
    const subjectResults = {};

    for (const subject of Subjects_Undertaken) {
      subjectResults[subject] = [];

      for (const student of students) {
        const result = student.results?.find((r) => r.subject_code === subject);
        if (result) {
          subjectResults[subject].push({
            student_id: student.student_id,
            internal: result.internal,
            external: result.external,
            total: result.total,
          });
        }
      }
    }

    return res.status(200).json({ subjectResults });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = {
  createTeacher,
  addSubject,
  getStudentsList,
  getStudentResultsById,
  getStudentResultsBySubjectId,
};
