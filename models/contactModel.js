const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required:[true, "Please add the contact name"]
    },
    email: {
        type: String,
        required:[true, "Please add the email name"]
    },
    phone: {
        type: String,
        required:[true, "Please add the phone number"]
    }
},{
    timestamps: [true]
});

module.exports = mongoose.model("Contact", contactSchema);