const asyncHandler = require("express-async-handler")
const Employee = require("../models/employeeModel")

const getEmployees = asyncHandler( async (req,res) => {
    const employees = await Employee.find();
    res.status(200).json(employees)
})

const getEmployee = asyncHandler( async (req,res) => {
    const employee = await Employee.findById(req.params.id)
    if(!employee){
        res.status(404)
        throw new Error("employee not found")
    }
    res.status(200).json(employee)
})

const createEmployee = asyncHandler( async (req,res) => {
    const {name, email, phone} = req.body
    console.log("Request body : ", req.body)
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const employee = await Employee.create({
        name, 
        email, 
        phone,
        user_id: req.user.id
    })
    res.status(201).json(employee)
})

const updateEmployee = asyncHandler( async (req,res) => {
    const employee = await Employee.findById(req.params.id)
    if(!employee){
        res.status(404)
        throw new Error("employee not found")
    }

    // if(employee.user_id.toString() !== req.user.id){
    //     res.status(403);
    //     throw new Error("User don't have permission to update another user's employees")
    // }

    const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedEmployee)
})

const deleteEmployee = asyncHandler( async (req,res) => {
    const employee = await Employee.findById(req.params.id)
    if(!employee){
        res.status(404)
        throw new Error("employee not found")
    }

    if(employee.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete another user's employees")
    }

    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json(employee);
})

module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}