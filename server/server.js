const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
const dotenv = require("dotenv");

// Environment variable configuration
dotenv.config();

// Database connection
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(express.json()); // for parsing application/json

// Handlebars view engine setup
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Routes
const doctorRoutes = require("./routes/doctorDetailsRoutes");
app.use("/api/doctors", doctorRoutes);
app.use("/api/register", require("./routes/userRoutes")); // Assuming you have userRoutes set up

// Error handling middleware
app.use(errorHandler);

// Basic Routes
app.get("/", (req, res) => {
    res.send("working");
});

app.get("/home", (req, res) => {
    res.render("home", { 
        username: "Poorva",
        age: 20,
    });
});

app.get("/user", (req, res) => {
    const users = [
        { username: "Poorva", age: 20 },
        { username: "Ashish", age: 22 },
        { username: "Divyam", age: 21 }
    ];
    
    res.render("user", { users });
});

// Server Listening
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});