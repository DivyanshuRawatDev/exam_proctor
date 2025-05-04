const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true, require: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
    status: {
      type: String,
      enum: [
        "pending_id",
        "pending_camera",
        "waiting_approval",
        "approved",
        "rejected",
      ],
      default: "pending_id",
    },
    uploadedIdUrl: { type: String, default: "" },
    approved: { type: String, default: false },
  },
  { Timestamp: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
