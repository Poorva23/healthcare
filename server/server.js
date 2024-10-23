const express= require("express");
const connectDb= require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors= require ("cors");
const hbs = require("hbs");
const path = require("path");

// env file config
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port= process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//Error handling
app.use(errorHandler);

// using hbs
app.set('view engine','hbs');


//Routes below
app.get("/",(req,res)=>{
    res.send("working")
});

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.get("/home",(req,res)=>{
    // let user =  user.findone({id:})
    res.render("home",{ 
        username:"Poorva",
        age : 20,
    })
});


app.get("/user",(req,res)=>{
    // let user =  user.findone({id:})
    const users = [
        { username: "Poorva", age: 20 },
        { username: "Ashish", age: 22 },
        { username: "Divyam", age: 21 }
    ];
    
    res.render("user",{users})
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});