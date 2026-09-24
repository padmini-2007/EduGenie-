const express = require("express");
const {
  getDataInformationById,
  updateDayStreak,
} = require("../controllers/dataControllers");
const router = express.Router();

router.get("/getDataById/:username", getDataInformationById);
router.get("/updateDayStreak/:username", updateDayStreak);

module.exports = router;
