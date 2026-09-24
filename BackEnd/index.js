const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const ENV = require("./config/env");
const connectDB = require("./config/db");

const UserRoutes = require("./routes/userRoutes");
const DataRoutes = require("./routes/dataRoutes");
const TeacherRoutes = require("./routes/teacherRoutes");
const PSRouter = require("./routes/PythonScripts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/user", UserRoutes);
app.use("/api/data", DataRoutes);
app.use("/api/teacher", TeacherRoutes);
app.use("/api/PythonScripts", PSRouter);
app.options("*", cors());
app.listen(ENV.SERV_PORT, () => {
  console.log(`Server is Running Successfully on PORT ${ENV.SERV_PORT}`);
});
