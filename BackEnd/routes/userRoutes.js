const express = require("express");
const router = express.Router();

const { createStudent } = require("../controllers/studentController");
const { createTeacher } = require("../controllers/teacherController");
const { login, logOut, getUserData } = require("../controllers/userController");
const { secret } = require("../controllers/userController");

router.post("/login", login);
router.post("/logout", logOut);
router.get("/secret", secret);
router.get("/getUserData/:username", getUserData);
router.post("/registerStudent", createStudent);
router.post("/registerTeacher", createTeacher);

module.exports = router;
