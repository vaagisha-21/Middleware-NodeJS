const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required:[true, "Please add the employee name"]
    },
    email: {
        type: String,
        required:[true, "Please add the email address"]
    },
    phone: {
        type: String,
        required:[true, "Please add the phone number"]
    }
},{
    timestamps: [true]
});

module.exports = mongoose.model("employee", employeeSchema);