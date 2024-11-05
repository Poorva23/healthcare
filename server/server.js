const express = require("express");
const multer = require("multer");
const upload = multer({dest: "uploads/"});
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
app.use(express.json());

// Handlebars view engine setup
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Routes
const doctorRoutes = require("./routes/doctorDetailsRoutes");
const userRoutes = require("./routes/userRoutes");
app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes); // Updated to use '/api/users' route

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
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/profile', upload.single('avatar'), function(req, res, next){
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/home');
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const uploads = multer({ storage: storage })

  