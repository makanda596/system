import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
const app = express();
import { signup } from './controller/auth.js'

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    phone: String,
    roomNumber: String,
    password: String,
}));

// Routes
app.get('/home', (req, res) => {
    res.send('Welcome to the home page'); // Changed for simplicity
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { roonNumber, password } = req.body;

    try {
        // Find user in the database
        const user = await User.findOne({ roonNumber });
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

// Sign-up endpoint
app.post('/signup', signup)

// Database connection
mongoose
    .connect('mongodb+srv://oumab743:makandabrian123@cluster0.qj7my.mongodb.net/social-app?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected successfully to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Start the server
app.listen(5000, () => {
    console.log('Listening on port 5000');
});
