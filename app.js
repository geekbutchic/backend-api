const express = require("express");
const logger = require("morgan");

const app = express();

const userRouter = require("./routes/user/userRouter")

app.use(logger("dev"));

app.use(express.json());
// PARSING FORM DATA INCOMING DATA
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", userRouter)

module.exports = app;