const mongoose= require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const validate = require("validator")
const employeeSchema = new mongoose.Schema({
    Name:{
        type:String,
        require:true,
        min:3
    },
    Email:{
        type:String,
        require:true,
        unique:true,
        // validate(value) {
        //     if(!isEmail(value)){
        //         console.log("invalid email");
        //     }   
        // }

    },
    Password:{
        type:String,
        required:true
    },
    CPassword:{
         type:String,
         required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
});

// to called instance of schema we written here .methods.
employeeSchema.methods.gernerateAuthToken = async function(){
    try{
           console.log("hello token kaise ho"+ this._id);
        const tokenaditya = jwt.sign({
            _id:this._id}, process.env.SECRET_KEY
        );

        // console.log(tokenaditya)
//   so to add token inside the schema       
        this.tokens = this.tokens.concat({token:tokenaditya})
        await this.save();
        return tokenaditya;
    }catch(e){
        console.log(`this is error from token ${e}`);
    }
}


// middleware created here to hash tha password
employeeSchema.pre("save",async function(next){
    if(this.isModified("Password")){
    //  console.log(`this is my password ${this.Password}`);
     this.Password =await bcrypt.hash(this.Password, 10);
     next();
    } 
})

const register = new  mongoose.model("Student",employeeSchema); //reating collection collection name shoud be capital f name
module.exports = register;