import express from 'express'
import cors from "cors"
import mongoose from "mongoose"
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.urlencoded({ extended: false }));


const app = express()
const POST = process.env.PORT || 6001

//connecting the mongoos data 
mongoose.connect(process.env.MONGO_URL)
    .then(console.log("database connected succefully"))
    .catch(err){
    console.log("did not connect")
}

app.listen(5000, (req, res) => {
    console.log("Server is running on port 5000...")
})