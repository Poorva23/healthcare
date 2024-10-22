const mongoose=require("mongoose");

const connectDb=async ()=>{
    try{
        const connect = await mongoose.
        connectconnect(process.env. CONNECTION_STRING);
        console.log("MongoDB connected")
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}