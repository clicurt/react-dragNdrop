const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const imageController = require("../controllers/ImageController");

/**
 * get images
 */
router.get("/", imageController.findAll);

/**
 * get image
 */
router.get("/:id", imageController.findOne);

/**
 * add image
 */
router.post("/add", upload.single("image"), imageController.insert);

module.exports = router;
