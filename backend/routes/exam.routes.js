const express = require("express");
const { uploadIDProof } = require("../controllers/exam.controller");
const { upload } = require("../utils/multer");

const route = express.Router();

route.post("/upload-id", upload.single("proof_id"), uploadIDProof);

module.exports = route;
