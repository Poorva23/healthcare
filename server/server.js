const express = require("express")
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

//env file config
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());    
app.use(express.json());

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("working perfectly!")
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})