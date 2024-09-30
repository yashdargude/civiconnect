const mongoose = require("mongoose");

const uri = process.env.URL;

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection error:", err));
