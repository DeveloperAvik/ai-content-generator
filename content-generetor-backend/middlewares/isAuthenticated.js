const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ! isAuthenticated Middileware

const isAuthenticated = asyncHandler(async (req, res, next) => {
  //   console.log("isAuthenticated");
  //   console.log(req.cookies);
  //   next();
  if (req.cookies.token) {
    // !verify the token

    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    res.user = await User.findById(decoded?.id).select("-password");
    // *console.log(decoded);
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = isAuthenticated;
