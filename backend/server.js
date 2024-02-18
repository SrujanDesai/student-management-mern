const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./router/adminRouter");
const studentRouter = require("./router/studentRouter");
const parentRouter = require("./router/parentRouter");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/parent", parentRouter);

app.listen(8080, () => {
  console.log("server running at 8080");
});
