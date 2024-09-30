const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

// Signup controller
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please log in.",
        success: false,
      });
    }

    // Hash the password and save the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      success: false,
      error: error.message,
    });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Authentication failed. Email or password is incorrect.",
        success: false,
      });
    }

    // Compare provided password with the hashed password in DB
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Authentication failed. Password is incorrect.",
        success: false,
      });
    }

    // Check if the provided role matches the user's role
    if (role && role !== user.role) {
      return res.status(403).json({
        message: "Authentication failed. Incorrect role.",
        success: false,
      });
    }

    // Generate JWT token
    const tokenPayload = {
      email: user.email,
      _id: user._id,
      role: user.role, // Optional if role is used
    };

    const jwtToken = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Login successful.",
      success: true,
      token: jwtToken,
      user: {
        email: user.email,
        name: user.name,
        role: user.role, // Optionally send role back
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { signup, login };
