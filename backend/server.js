const express = require("express")
const dotenv = require("dotenv")
const productRouter = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const userRouter = require("./routes/userRoutes")
const cors = require('cors');


dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())

app.use("/api/products", productRouter) 
app.use("/api/users", userRouter) 
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})