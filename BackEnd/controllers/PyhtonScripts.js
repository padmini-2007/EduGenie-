const Result = require("../Models/Result");
const Student = require("../Models/Student");
const Subject = require("../Models/Subject");
const User = require("../Models/User");
const Data = require("../Models/Data");
const { isLoggedIn } = require("./userController");
const jwt = require("jsonwebtoken");
const ENV = require("../config/env");
const { json } = require("express");
const fs = require("fs");
const path = require("path");

const extractData = async (req, res) => {
  try {
    const file = req.file; // this is populated by multer
    const username = req.params.username;
    const token = req.cookies.user_token;

    // Validation
    if (!file) {
      return res.status(400).json({
        error: 400,
        message: "No file uploaded",
      });
    }

    const status = await isLoggedIn(username, token);
    const registered = await User.findOne({ username });

    if (!registered)
      return res
        .status(400)
        .json({ error: 400, message: "Unauthorized: Unregistered user" });

    if (status == -1)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: No token provided" });

    if (status == 0)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: You don't have access" });

    const pdfPath = path.resolve(file.path); // absolute path

    // Call Python API with file path
    const response = await fetch(
      `http://127.0.0.1:8000/extract_data/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdf_path: pdfPath,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      await Result.insertMany([
        {
          student_id: username,
          ...data,
        },
      ]);

      const fname = file.filename.split("-")[1];

      await Data.findByIdAndUpdate(username, {
        $push: { documents_uploaded: { name: fname } },
      });

      return res.status(200).json({
        message: "Data Received Successfully",
        student_id: username,
        semester: data.semester,
      });
    } else {
      const errorData = await response.json();
      return res.status(response.status).json({
        error: response.status,
        message: errorData.detail || "Unknown error occurred",
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        error: 409,
        message: "Student data is already extracted",
      });
    }

    console.error(err);
    return res.status(500).json({
      error: 500,
      message: "Internal Server Error",
    });
  }
};

const getStudentResultsById = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    const username = req.params.id;
    const status = await isLoggedIn(username, token);

    if (status == 0)
      return res
        .status(403)
        .json({ message: "Unauthorized: You don't have access" });

    const student = await Student.findById(username);
    const result = await Result.find({ student_id: username });

    if (!student)
      return res
        .status(400)
        .json({ message: `Student with id:${id} doesn't exist` });

    const allSubjects = await Subject.find();

    const subjectMapCredits = {};

    allSubjects.forEach(
      (subject) => (subjectMapCredits[subject._id] = subject.Credits)
    );

    const overall_results = result.map(({ semester, results }) => {
      const updatedResults = results.map((result) => ({
        ...result.toObject(),
        credits: subjectMapCredits[result.subject_code],
      }));
      return { semester, results: updatedResults };
    });

    const data = {
      name: student.Name,
      overall_results,
    };

    return res
      .status(200)
      .json({ message: "Data retrived successfully", data });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const initializeStudentChatbot = async (req, res) => {
  try {
    const username = req.params.username;
    const token = req.cookies.user_token;
    const status = await isLoggedIn(username, token);

    if (status == -1)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: No token provided" });

    if (status == 0)
      return res
        .status(403)
        .json({ error: 403, message: "Unauthorized: You don't have access" });

    const response = await fetch(
      `http://127.0.0.1:8000/initialize_chatbot/${username}`
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const queryStudentChatbot = async (req, res) => {
  const query = req.body.query;
  try {
    const response = await fetch("http://127.0.0.1:8000/student_chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = {
  extractData,
  getStudentResultsById,
  initializeStudentChatbot,
  queryStudentChatbot,
};
