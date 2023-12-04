const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"]
    },
    email: {
        type: String,
        required: [true, "Please add user email address"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add username"]
    },
    roles: {
        type: [{
            type: String,
            enum: ['guest', 'supervisor', 'admin']
        }],
        default: ['guest']
    }
})

module.exports = mongoose.model("User", userSchema)