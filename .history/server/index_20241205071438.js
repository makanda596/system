import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User Schema
const User = mongoose.model('User', new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    phone: String,
    roomNumber: String,
    password: String,
    moveIn: String,
}, { timestamps: true }));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'welcome'; // Replace with your secret key in .env

// Routes
//admin login 
app.post('/adminlogin', async (req, res) => {
    const { email, password, name } = req.body

    try {
        const existingemail = await User.FindOne({ email })
        if (existingemail) {
            return res.status(400).json({ message: "email already exist" })
        }
        const existingname = await User.FindOne({ name })
        if (existingname) {
            return res.status(400).json({ message: "name already exist" })
        }
        const newAdmin = new User({ name, password: hashedPassword, email });
        newAdmin.save()
        res.json({ message: "signup successfully" })
    } catch (err) {
        res.status(404).json({ message: (err) })
    }
})
// Login endpoint
app.post('/login', async (req, res) => {
    const { roomNumber, password } = req.body;

    try {
        // Find user by room number
        const user = await User.findOne({ roomNumber });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Compare the passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1m' });

        res.status(200).json({
            message: 'Login successful',
            token,
            email: user.email,
            name: user.name,
            roomNumber: user.roomNumber,
            moveIn: user.moveIn,
            phone: user.phone,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Sign-up endpoint
app.post('/signup', async (req, res) => {
    const { name, email, phone, roomNumber, password, moveIn } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ name });
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists. Try another one.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user in the database
        const newUser = new User({ name, email, phone, roomNumber, moveIn, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Admin Dashboard Endpoints

// Fetch all tenants (for admin dashboard)
app.get('/signup', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude the password field
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching tenants:', error);
        res.status(500).json({ message: 'Error fetching tenants' });
    }
});

// Update a tenant's information
app.put('/api/admin/tenants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Find and update the user by ID
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        res.status(200).json({ message: 'Tenant updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating tenant:', error);
        res.status(500).json({ message: 'Error updating tenant' });
    }
});

// Delete a tenant
app.delete('/api/admin/tenants/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the user by ID
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        res.status(200).json({ message: 'Tenant deleted successfully' });
    } catch (error) {
        console.error('Error deleting tenant:', error);
        res.status(500).json({ message: 'Error deleting tenant' });
    }
});

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
