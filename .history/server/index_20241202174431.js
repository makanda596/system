import express from 'express'
import cors from "cors"
import mongoose from "mongoose"
import { signUp } from './controller/auth.js'
const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.post('/signUp'), async (req, res) => {
    const {
        fistName,
        LastName,
        email,
        phoneNumber,
        roomNumber,
        password: hashedPassword
    } = req.body

    try {
        //chechking if the email exists
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        //chechking if the roomnumber exists
        const existingroom = await User.findOne({ roomNumber })
        if (existingroom) {
            return res.status(400).json({ message: 'Room already exists' })
        }
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ fistName, LastName, email, phoneNumber, roomNumber, password: hashedPassword })
        await newUser.save()
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}




const PORT = process.env.PORT || 6001

//connecting the mongoos data 
mongoose.connect('mongodb+srv://oumab743:makandabrian123@cluster0.qj7my.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log("the database connected succesfully") })
    .catch((err) => { console.log(err) })

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`);
})