const { cloudinary } = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");
const { UserModel } = require("../models/user.model");

const uploadIDProof = async (req, res) => {
  const filePath = req.file?.path;
  const userId = req.userId;
  try {
    if (!filePath) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadResult = await cloudinary.uploader
      .upload(filePath, {
        public_id: "proof_id",
      })
      .catch((error) => {
        console.log(error);
      });

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete file from disk:", err);
      } else {
        console.log("Temporary file deleted:", filePath);
      }
    });

    if (!uploadResult) {
      return res.status(400).json({ message: "Internal server err" });
    }

    const user = await UserModel.findOne({ _id: userId });

    user.uploadedIdUrl = uploadResult.secure_url;
    user.status = "pending_camera";
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Uploaded Success", data: user });
  } catch (error) {
    console.log("Error while uploadIDProof : " + error.message);
  }
};

module.exports = { uploadIDProof };
