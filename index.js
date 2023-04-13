const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const authRoute = require("./routes/auth");

const Port = process.env.PORT || 3000;

//connect mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection error:", err);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoute);

//Start Server
app.listen(Port, () => {
  console.log("Server started at Port ", Port);
});
