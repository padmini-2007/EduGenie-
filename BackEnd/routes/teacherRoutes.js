const express = require("express");
const {
  getStudentsList,
  getStudentResultsById,
  getStudentResultsBySubjectId,
  addSubject,
} = require("../controllers/teacherController");
const router = express.Router();

router.get("/getStudentsList/:username/:subjectId", getStudentsList);
router.post("/addSubject/:username", addSubject);
router.get("/getStudentResults/:username", getStudentResultsById);
router.get(
  "/getStudentResults/:username/:subject_id",
  getStudentResultsBySubjectId
);

module.exports = router;
