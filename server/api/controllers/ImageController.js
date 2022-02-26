const fs = require("fs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/**
 * database table
 */
const imageModel = require("../models/ImageModel");

/**
 * Upload a Multipart-File then saving it to MySQL database
 * @param {Object} req - request
 * @param {Object} res - response
 * @return {Object}  returns created Image
 */
exports.insert = (req, res) => {
  // console.log("req:", req);
  console.log("file:", req.file);
  imageModel.create({
    name: req.file.originalname,
    image: fs.readFileSync(`./uploads/${req.file.filename}`)
  }).then(result => {
    console.log(result);
    res.status(201).json({
      createdImage: {
        image: result
      }
    });
  }).catch(err => console.log(err));
};

/**
 * Get all images from database
 * @param {Object} _req - request
 * @param {Object} res - response
 * @return {Object} - returns all Images
 */
exports.findAll = (_req, res) => {
  imageModel.findAll()
    .then(results => {
      return res.json({
        data: results
      });
    }).catch(err => console.log(err));
};

/**
 * Get image with id from database
 * @param {Object} _req - request
 * @param {Object} res - response
 * @return {Object} - returns all Images
 */
exports.findOne = (req, res, next) => {
  const id = req.params.id
  imageModel.findAll({
    where: {
      id
    }
  }).then(results => {
    return res.json({
      data: results
    });
  }).catch(err => console.log(err));
};