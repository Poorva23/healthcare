const express = require("express");
const router = express.Router();
const { registerDoctor, getAllDoctors } = require("../controllers/doctorDetailsController");
const { validateJwtToken } = require("../middlewares/jwtmiddleware");

// Route to register a new doctor
router.post("/create", validateJwtToken, registerDoctor);

// Route to get all registered doctors (requires token validation)
router.get("/", validateJwtToken, getAllDoctors);

module.exports = router;
