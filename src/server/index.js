require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const router = require("./routes/cryptoRoutes");
const userRouter = require("./routes/userRouters");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use("/cryptos", router);
app.use("/user", userRouter);
module.exports = app;
