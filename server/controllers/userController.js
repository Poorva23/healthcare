const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require('dotenv').config;

//check if all fields are provided
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, phoneNumber, bloodGroup, gender, email, password } = req.body;

    if (!firstName || !lastName || !age || !bloodGroup || !gender || !email || !password || !phoneNumber) {
        res.status(400);
        throw new Error("Please add all fields");
    }    

    //check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);    

    //create user
    const user = await User.create({
        firstName,  
        lastName,
        age,
        bloodGroup,
        gender,
        phoneNumber,
        email,
        password: hashedPassword
    });  
    
    res.status(201).json({message: "User Registered Successfully", user});

    if (user) {        
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            bloodGroup: user.bloodGroup,
            gender: user.gender,
            phoneNumber: user.phoneNumber,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

module.exports = {
    registerUser
};