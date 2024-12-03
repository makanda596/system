import express from 'express'
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
const app = express()

app.use(cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const User = mongoose.model('User', new mongoose.Schema({
    fistName: String,
    LastName: String,
    email: String,
    phoneNumber: String,
    roomNumber: String,
    password: String,
}));

app.post('/signup'), async (req, res) => {
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
app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        // Find user in the database
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Compare the passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});




// app.post('/signup', async (req, res) => {
//     const { name, email, phone, year, password } = req.body;

//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ name });
//         const existingEmail = await User.findOne({ email })
//         if (existingEmail) {
//             return res.status(400).json({ message: "email already exists" })
//         }
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username already exists. Try another one.' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save user in the database
//         const newUser = new User({ name, email, phone, year, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error creating user' });
//     }
// });



//connecting the mongoos data 
mongoose.connect('mongodb+srv://oumab743:makandabrian123@cluster0.qj7my.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log("the database connected succesfully") })
    .catch((err) => { console.log(err) })

app.listen(5000, (req, res) => {
    console.log(`Server running on port 5000`);
})