const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// <------------Registration ----------->
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill up all required fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10); // Corrected spelling
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    trailActive: false,
  });

  newUser.trailExpires = new Date(
    new Date().getTime() + newUser.trailPeriod * 24 * 60 * 60 * 1000
  );

  await newUser.save();

  res.json({
    status: true,
    message: "Registration was successful ...",
    user: {
      username,
      email,
    },
  });
});

// <-----------Login---------->

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // ! pasword validity
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  /* 
    Generate JWT token and set it into http cookie 
  */

  const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  console.log(token);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    status: "success",
    _id: user?._id,
    message: "Login Sucess",
    username: user?.username,
    email: user?.email,
  });
});

// <-----------Logout---------->

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
});

// <-----------Profile---------->

const userProfile = asyncHandler(async (req, res) => {
  console.log(req.user)
  const id = "65dee5db258b86e5faeba98a";
  const user = await User.findById(id).select("-password")
  if (user) {
    res.status(200).json({
      status: "success",
      user,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// <-----------Check user Auth status---------->



module.exports = {
  register,
  login,
  logout,
  userProfile,
};
