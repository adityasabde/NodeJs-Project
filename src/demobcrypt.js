// const bcrypt = require("bcrypt")

// const securePassword = async(password)=>{
//     const passwordHash = await bcrypt.hash(password,10);
//     // $2b$10$ioh.tila9f7E6rsLkAji8uFCxpYpAGzzt469h0R2QAewnogBuI58m

//     const comparison = await bcrypt.compare(password,passwordHash)
// console.log(comparison)
// }

// securePassword("aditya@123")

const jwt = require("jsonwebtoken");

const createtoken = async()=>{
    const token = await jwt.sign({_id:"62df850ef5c11dfaaecdbd09"},"mynameisadityasabdetheyoutuberworldlargesteducator",{
        expiresIn:"2 seconds"
    });

    console.log(token);

    const userver = await jwt.verify(token,"mynameisadityasabdetheyoutuberworldlargesteducator");

    console.log(userver)
}

createtoken();