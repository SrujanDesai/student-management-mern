const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://srujan:mongodb2512@cluster0.h4itok2.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connection established successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello this is a student management system using mern stack");
});

app.listen(3000, () => {
  console.log("server running at 3000");
});
