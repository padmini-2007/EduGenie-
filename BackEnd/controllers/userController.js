const User = require("../Models/User");
const Student = require("../Models/Student");
const Teacher = require("../Models/Teacher");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ENV = require("../config/env");

const isExisting = async (username) => {
  const exists = await User.findOne({ username });
  if (exists) return true;
  return false;
};

const createUser = async (username, password, level, role) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      level,
      role,
    });

    await newUser.save();

    return { username, message: "User created successfully", role, level };
  } catch (err) {
    throw new Error(err.message);
  }
};

const secret = async (req, res) => {
  const token = req.cookies.user_token;
  if (!token)
    return res.status(401).json({
      error: 401,
      message: "Unauthorized: You don't have access to this",
    });
  const decode = jwt.verify(token, ENV.JWT_SECRET);
  return res.status(200).json({
    username: decode.username,
    role: decode.role,
    level: decode.level,
  });
};

const getUserData = async (req, res) => {
  try {
    const username = req.params.username;
    const token = req.cookies.user_token;
    const status = await isLoggedIn(username, token);
    if (status == -1)
      return res
        .status(403)
        .json({ message: "Unauthorized: No token provided" });

    if (status == 0)
      return res
        .status(403)
        .json({ message: "Unauthorized: You don't have access" });

    const UserData = await User.findOne({ username });
    if (!UserData)
      return res
        .status(401)
        .json({ error: 401, message: "User doesn't exist" });

    if (status == 1) {
      const StudentData = await Student.findById(username);
      const base64Profile = StudentData.profile_image.toString("base64");
      const base64Banner = StudentData.banner_image.toString("base64");
      return res.status(200).json({
        ...StudentData.toObject(),
        profile_image: base64Profile
          ? `data:image/jpeg;base64,${base64Profile}`
          : null,
        banner_image: base64Banner
          ? `data:image/jpeg;base64,${base64Banner}`
          : null,
        role: UserData.role,
      });
    }

    if (status == 2) {
      const TeacherData = await Teacher.findById(username);
      return res
        .status(200)
        .json({ ...TeacherData.toObject(), role: UserData.role });
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const UserRecord = await User.findOne({ username });

    if (!UserRecord)
      return res.status(401).json({ error: 401, message: "User not found" });

    const match = await bcrypt.compare(password, UserRecord.password);
    if (!match)
      return res
        .status(401)
        .json({ error: 401, message: "Invalid Credentials" });

    const token = jwt.sign(
      {
        username,
        role: UserRecord.role,
        level: UserRecord.level,
      },
      ENV.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.cookie("user_token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res.status(200).json({
      message: "Login Successful",
      token,
      username: UserRecord.username,
      role: UserRecord.role,
      level: UserRecord.level,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const logOut = async (req, res) => {
  res.clearCookie("user_token", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

const isLoggedIn = async (username, token) => {
  if (!token) {
    return -1;
  }
  const decode = jwt.verify(token, ENV.JWT_SECRET);
  const loggedUserId = decode.username;
  if (loggedUserId != username) {
    return 0;
  }
  return decode.level;
};

module.exports = {
  isExisting,
  createUser,
  login,
  isLoggedIn,
  secret,
  logOut,
  getUserData,
};
