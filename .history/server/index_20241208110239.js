import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authRoutes from './routers/auth.route.js'

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

app.use(cookieParser());
//SIGNING UP FORM
app.use("/auth", authRoutes)
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

const PORT = process.env.PORT || 6000
// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected successfully to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Start the server
app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
});
