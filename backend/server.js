const express = require("express")
const dotenv = require("dotenv")
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const userRouter = require("./routes/userRoutes")
const mwrRouter = require("./routes/mwrRoutes")
const cors = require('cors');


dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())

app.use("/api/users", userRouter) 
app.use("/api/mwr", mwrRouter) 
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})