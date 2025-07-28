const bcrypt = require("bcrypt");
const generateJwtToken = require("../Config/GenerateJwtTokens");
const user = require("../Models/usermodel");

// user registration function
const RegisterUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isEmailExist = await user.findOne({ email: email });
    console.log("User from DB:", isEmailExist);
    if (isEmailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new user({
      username,
      email,
      password: passwordHash,
    });
    const userResponse = await newUser.save();

    const token = generateJwtToken({ id: newUser._id });
    console.log("Token:", token);
    res.status(201).json({
      message: "User registered successfully",
      username: userResponse.username,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// user login function
const LoginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExist = user.findOne({ email: email });
    if (!userExist) {
      return res.status(401).json({ message: "Invalid user not found" });
    }

    const userPassword = bcrypt.compare(password, userExist.password);
    if (!userPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateJwtToken(user._id);
    res.status(200).json({
      message: "User logged in successfully",
      user: user.username,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { RegisterUser, LoginUser };
