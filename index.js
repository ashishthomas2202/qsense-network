const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const Port = process.env.PORT || 3000;

//connect mongodb
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection error:", err);
  });

//Start Server
app.listen(Port, () => {
  console.log("Server started at Port ", Port);
});
