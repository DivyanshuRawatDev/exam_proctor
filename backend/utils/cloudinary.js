const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dhwrblkjw",
  api_key: "823562252148198",
  api_secret: "CU5ilC2ux4pZcD3sEiC_lf6JzpY",
});

module.exports = { cloudinary };
