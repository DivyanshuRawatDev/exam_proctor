const express = require("express");
const { userSignup, userLogin,verifyUser } = require("../controllers/auth.controller");

const route = express.Router();

route.post("/signup", userSignup);
route.post("/login",userLogin)
route.get("/verify", verifyUser);

module.exports = route;