require("./db/mongoose");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/user");

// Add Router here

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
// app.use(YOUR_ROUTER)

module.exports = app;
