const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require:[true, "Please add a name"],
    },
    lastName: {
      type: String,
      require:[true, "Please add a name"],
    },
    age: {
        type: Number,
        require: [true, "Please add an age"],
    },
    email: {
        type: String,
        require: [true, "Please add an email"],
        unique: [true, "Email already exists"],
    },
    bloodGroup: {
        type: String,
        require: [true, "Please add a bloodgroup"],
    },
    gender: {
        type: String,
        require: [true, "Please add a gender"],
    },
    phoneNumber: {
        type: String,
        require: [true, "Please add a phone number"],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
  },
    
  },
);     

module.exports = mongoose.model("User", userSchema);