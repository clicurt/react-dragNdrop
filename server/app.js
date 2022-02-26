require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const app = express();
global.__basedir = __dirname;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./api/config/database");

/**
 * test database connection
 */
db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.error("Unable to connect to the database:", err));

/**
 * allow cross-origin resource sharing
 */
app.use(cors());
/**
 * logging middleware
 */
app.use(morgan("dev"));

/**
 * image request routes
 */
const imageRoutes = require("./api/routes/ImageRoutes");
app.use("/images", imageRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * display custom error logs
 * @param {Object} _req - request
 * @param {Object} _res - response
 * @param {function} next - next executed function
 */
app.use((_req, _res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

/**
 * display error logs
 * @param {Object} error - errors
 * @param {Object} _req - request
 * @param {Object} res - response
 */
app.use((error, _req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
