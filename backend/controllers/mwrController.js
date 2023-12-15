const asyncHandler = require("express-async-handler")
const MWR = require("../models/mwrModel")

const getMwrDataList = asyncHandler( async (req,res) => {
    const dataList = await MWR.find();
    res.status(200).json(dataList)
})

const getMwrData = asyncHandler( async (req,res) => {
    const data = await MWR.findById(req.params.id)
    if(!data){
        res.status(404)
        throw new Error("product not found")
    }
    res.status(200).json(data)
})

const createMwrData = asyncHandler( async (req,res) => {
    const reqBody = req.body
    const data = await MWR.create({...reqBody})
    res.status(201).json(data)
})

const updateMwrData = asyncHandler( async (req,res) => {
    const data = await MWR.findById(req.params.id)
    if(!data){
        res.status(404)
        throw new Error("product not found")
    }

    const updatedData = await MWR.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedData)
})


const deleteMwrData = asyncHandler( async (req,res) => {
    const data = await MWR.findById(req.params.id)
    if(!data){
        res.status(404)
        throw new Error("MWR data not found")
    }
    await MWR.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
})

module.exports = {
    getMwrDataList,
    getMwrData,
    createMwrData,
    updateMwrData,
    deleteMwrData
}