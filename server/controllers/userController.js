const asyncHandler = require("express-async-handler");
const User = require("../models/userModels"); // Ensure this path is correct
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to generate JWT token
const generateJwtToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Register user
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, age, gender, bloodGroup, phoneNumber } = req.body;

    if (!firstName || !lastName || !email || !password || !age || !gender || !bloodGroup || !phoneNumber) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        age,
        gender,
        bloodGroup,
        phoneNumber
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateJwtToken(user.id) // Return the JWT token
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter both email and password");
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    // Check if password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        res.status(400);
        throw new Error("Invalid email or password");
    }

    // Successful login
    res.status(200).json({
        _id: user.id,
        email: user.email,
        token: generateJwtToken(user.id), 
        message: "Login successful"
    });
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id; // Extract user id from the JWT token (set by the validateJwtToken middleware)
    const data = await User.findById(userId);  // Use `findById` to fetch user by id
    
    if (!data) {
        return res.status(401).json({ message: "User not found" });
    }
    res.json(data);
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id; // Extract user id from the JWT token (set by the validateJwtToken middleware)
    const { firstName, lastName, email, age, gender, bloodGroup, phoneNumber, password } = req.body;

    // Find user by ID
    const data = await User.findById(userId);

    if (!data) {
        return res.status(401).json({ message: "User not found" });
    }

    // Optionally, update password if provided
    if (password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(password, salt);
    }

    // Update other fields
    data.firstName = firstName || data.firstName;
    data.email = email || data.email;
    data.password = password || data.password;

    const updatedUser = await data.save(); // Save the updated user data

    res.json({
        message: "Profile updated successfully",
        user: updatedUser
    });
});

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
