const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");
const { registerDoctor } = require("../controllers/doctorDetailsController");

// Route for user registration
router.post("/", registerUser);

// Route for user login
// Uncomment and implement loginUser as needed
// router.post("/login", loginUser);

module.exports = router;