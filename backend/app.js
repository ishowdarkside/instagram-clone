const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config.env") });
const cors = require("cors");
const errorMiddleware = require(path.join(
  __dirname,
  "controllers",
  "errorController"
));
const app = express();
const authRouter = require(path.join(__dirname, "routes", "authRouter"));
const postRouter = require(path.join(__dirname, "routes", "PostRouter"));

//Parsing incoming json
app.use(express.json());

//enable cors
app.use(cors());

//Routing for signup/login
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.use(errorMiddleware);

module.exports = app;
