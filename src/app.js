require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn")
const path = require("path");
const port = process.env.PORT || 4000;
const hbs = require("hbs"); 
const bcrypt = require("bcrypt");
const Register = require("./models/registers");
// this is use for express ko batane keliye ki mene static page banaya he dekh lo ik bar 
const Static_path = path.join(__dirname,"../public");
// ye by default static page dikha raha he 

const template_path = path.join(__dirname,"../template/views"); //this fixing views folder path 

// path for partilas folder
const partials_path = path.join(__dirname,"../template/partials")

// if this below line excute then dynamic hbs page not work 
// app.use(express.static(Static_path));// ---------- so to check dynamic hbs we commet this line

app.use(express.json())  //to batane keliye ki data json me he and useful for postman.
app.use(express.urlencoded({extended:false}))

// now we have to use dynamic page so we use hbs page
// set kiya view engine
app.set("view engine","hbs");
app.set("views",template_path); //instead of views folder run this template_path

hbs.registerPartials(partials_path) //this is for registering the partials



// console.log(process.env.SECRET_KEY)


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/register",(req,res)=>{
    res.render("register")
})

// create new student data
app.post("/register", async (req,res)=>{
    try{
        const pass = req.body.password;
        const cpass = req.body.cpassword;
        
        if(pass === cpass){
        
            const studentregister= new Register({
                Name:req.body.name,
                Email:req.body.email,
                Password:pass,
                CPassword:cpass
           });
          
        //  calling the token gernarator fron register page  
         const result123 = await studentregister.gernerateAuthToken();

        console.log("token gernerated from app.js"+result123);

         const result = await studentregister.save();

         res.status(201).render("index");

        }else{
            res.send("password and confirm password not match");
        }
    }catch(e){
        res.status(400).send(`bad requeest my boy ${e}`)
    }
})

app.get("/login",async (req,res)=>{
    res.render("login");
})

app.post("/login",async (req,res)=>{
    try{
        const pass = req.body.Password;
        const email = req.body.Email;
        const result = await Register.findOne({
            Email:email
        })
       
       const result1 = await bcrypt.compare(pass,result.Password) ;
    //    console.log(result1)

    // gernerating tokens while sign in
    const result123 = await result.gernerateAuthToken();

    // console.log("token gernerated from app.js"+result123);

        if(result1){
            res.status(201).render("index");
        }else{
            res.send("Invalid credentials");
        }
    }catch(e){
        res.send(`invalid email ${e}`)
    }
})
// backup 
app.get("/",(req,res)=>{
    res.send("Aditya sabde");
})

app.listen(port,()=>{
    console.log(`connected..... ${port}`);
})