const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSignup = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User is already present! Please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created", data: newUser });
  } catch (error) {
    console.log("Error while user signup : " + error.message);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const decodedPassword = await bcrypt.compare(password, user?.password);

    if (!decodedPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    const { password: _, ...withoutPassword } = user._doc;

    return res
      .status(200)
      .json({ message: "user loggedIn", data: withoutPassword });
  } catch (error) {
    console.log("Error while user login : " + error.message);
  }
};

const verifyUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "Invaild request" });
    }

    const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenVerify) {
      return res.status(400).json({ message: "Invaild request" });
    }

    return res.status(200).json({ message: "User verified" });
  } catch (error) {
    console.log("Error while verify : " + error.message);
  }
};



module.exports = { userSignup, userLogin, verifyUser };
