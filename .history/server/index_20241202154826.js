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

app.listen(5000, (req, res) => {
    console.log("Server is running on port 5000...")
})