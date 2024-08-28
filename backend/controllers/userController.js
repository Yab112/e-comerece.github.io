import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/userModel.js';
import validator from 'validator';
import {JWT_SECRET} from '../Config/config.js';

// Password regex for validation
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with the given email does not exist",
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create a token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });

    // Send success response with the token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};


const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    // Validate password length
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    // Validate name length
    if (!validator.isLength(name, { min: 3 })) {
      return res.status(400).json({ success: false, message: "Name must be at least 3 characters long" });
    }

    // Validate password using regex
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one uppercase letter, one number, and one special character",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with success message and token
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

export { login, register };
