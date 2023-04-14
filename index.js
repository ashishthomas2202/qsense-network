const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston");
const app = express();
require("dotenv").config();

const authRoute = require("./routes/auth");
const devicesRoute = require("./routes/devices");

const Port = process.env.PORT || 3000;

//create a logger
global.logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});

//connect mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    logger.info("DB Connected");
  })
  .catch((err) => {
    logger.error(`DB Connection error: ${err}`);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoute);
app.use("/api/device", devicesRoute);

//Start Server
app.listen(Port, () => {
  logger.info(`Server started at Port: ${Port}`);
});
