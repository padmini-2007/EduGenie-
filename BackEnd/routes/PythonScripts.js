const express = require("express");
const router = express.Router();
const {
  extractData,
  getStudentResultsById,
  queryStudentChatbot,
  initializeStudentChatbot,
} = require("../controllers/PyhtonScripts");

const upload = require("../middlewares/multer");

router.post("/extractData/:username", upload.single("pdf"), extractData);
router.get("/studentResultsById/:id", getStudentResultsById);
router.get("/initializeStudentChatbot/:username", initializeStudentChatbot);
router.post("/studentChatbot", queryStudentChatbot);

module.exports = router;
