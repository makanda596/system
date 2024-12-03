import express from 'express'
import cors from "cors"
import mongoose from "mongoose"

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.PORT || 6001

//connecting the mongoos data 
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("the database connected succesfully") })
    .catch((err) => { console.log(err) })

app.listen(PORT, (req, res) => {
    console.log()
})