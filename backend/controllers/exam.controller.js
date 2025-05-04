// controllers/uploadController.js
const { cloudinary } = require("../utils/cloudinary");
const streamifier = require("streamifier");
const { UserModel } = require("../models/user.model");

async function uploadToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: publicId },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

const uploadIDProof = async (req, res) => {
  const fileBuffer = req.file?.buffer;
  const userId = req.userId;

  if (!fileBuffer) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // upload the in-memory buffer
    const uploadResult = await uploadToCloudinary(fileBuffer, "proof_id");

    // update user record
    const user = await UserModel.findById(userId);
    user.uploadedIdUrl = uploadResult.secure_url;
    user.status = "pending_camera";
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Upload successful", data: user });
  } catch (error) {
    console.error("Error in uploadIDProof:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { uploadIDProof };
