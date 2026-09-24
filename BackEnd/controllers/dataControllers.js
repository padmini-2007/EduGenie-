const Data = require("../Models/Data");
const User = require("../Models/User");
const { isLoggedIn } = require("./userController");

const getDataInformationById = async (req, res) => {
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

    const data = await Data.findById(username);

    return res.status(200).json({ message: "Data Fetched Successfully", data });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const updateDayStreak = async (req, res) => {
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

    const user = await User.findOne({ username });
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const lastLogin = user.last_login;

    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const userData = await Data.findById(username);

    if (userData) {
      if (lastLogin) {
        if (isSameDay(lastLogin, today)) {
          // Already logged in today — no change to streak
        } else if (isSameDay(lastLogin, yesterday)) {
          userData.dayStreak += 1;
        } else {
          userData.dayStreak = 1; // Streak reset
        }

        await userData.save();
      } else {
        // First time login
        userData.dayStreak = 1;
        await userData.save();
      }
    }

    // Update last_login
    user.last_login = today;
    await user.save();

    // Set token or session here if needed
    return res.status(200).json({ message: "Day Streak Updated" });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ error: 500, message: "Internal Server Error" });
  }
};

module.exports = { getDataInformationById, updateDayStreak };
