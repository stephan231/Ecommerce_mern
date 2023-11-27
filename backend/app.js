const express = require("express");
const app = express();
const errorMidlleware = require("./middlewares/error");
const products = require("./routes/product");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser"); //to get the data from the cookies
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use(errorMidlleware);
module.exports = app;
