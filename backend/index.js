const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./Models/User.js");
require("./Models/db.js");
const AuthRouter = require("./Routes/AuthRouter.js");
const ProductRouter = require("./Routes/ProductRouter.js");
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
