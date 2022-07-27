
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/signup").then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log(`dekho kya hoagaya he ${e}`)
});