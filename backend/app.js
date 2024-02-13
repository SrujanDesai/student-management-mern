const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/", require("./router/main"));
// app.use(express.static(path.join(__dirname, "frontend")));

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "frontend", "/src/components/RegistrationForm.jsx")
//   );
// });

app.listen(3000, () => {
  console.log("server running at 3000");
});
