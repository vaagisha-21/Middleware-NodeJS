const express = require("express")
const dotenv = require("dotenv")
const contactRouter = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const userRouter = require("./routes/userRoutes")

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 8000

app.use(express.json())
app.use("/api/contacts", contactRouter) 
app.use("/api/users", userRouter) 
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})