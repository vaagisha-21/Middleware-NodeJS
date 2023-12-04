const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const registerUser = asyncHandler( async (req, res) => {
    const { username, email, password, roles } = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const userExist= await User.findOne({ email })
    if(userExist){
        res.status(400)
        throw new Error("User already Exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        roles
    })
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({ _id: user._id, email: user.email, roles: user.roles })
    }
    else{
        res.status(400);
        throw new Error("User data is not valid")
    }
})

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const user = await User.findOne({ email })
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
                roles: user.roles
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30m"})
        res.status(200).json(({ accessToken }))
    }
    else{
        res.status(401)
        throw new Error("email or password is not valid")
    }

})

const currentUser = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }