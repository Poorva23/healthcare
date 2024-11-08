const express = require("express");
const router = express.Router();
const { registerDoctor } = require("../controllers/doctorDetailsController");
const { validateJwtToken } = require("../middlewares/jwtmiddleware"); 

// Route to register a new doctor (requires token validation)
router.post("/create", validateJwtToken, registerDoctor);

// Doctor registration route (no JWT validation required)
router.post("/register", registerDoctor);

// // Route to get all registered doctors
// router.get("/", jwtmiddleware, getAllDoctors);

module.exports = router;
