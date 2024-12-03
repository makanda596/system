import express from 'express'
import cors from "cors"
import mongoose from "mongoose"
import { signUp } from './controller/auth.js'
const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.urlencoded({ extended: false }));

app.use('/signup', signUp)





const PORT = process.env.PORT || 6001

//connecting the mongoos data 
mongoose.connect('mongodb+srv://oumab743:makandabrian123@cluster0.qj7my.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log("the database connected succesfully") })
    .catch((err) => { console.log(err) })

app.listen(PORT, (req, res) => {
    console.log('server running on port 5000')
})