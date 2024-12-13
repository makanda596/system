import { User } from '../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../mailtrap/email.js'
import { generateTokenAndSetCookie } from "../utilis/generateTokenAndSetCookie.js";
export const signup = async (req, res) => {
    const { email, name, password, phone, roomNumber, moveIn } = req.body

    try {
        if (!email, !name, !password, !roomNumber, !moveIn)
            return res.status(404).json("please input all fields")

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "user already been used" })
        }
        const exisitingroomNumber = await User.findOne({ roomNumber })
        if (exisitingroomNumber) {
            return res.status(400).json({ message: "room already taken" })
        }

        const hashPaswword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 * Math.random() * 90000).toString()

        const newUser = new User({
            email,
            name,
            password: hashPaswword,
            phone,
            roomNumber,
            moveIn,
            verificationToken,
            verificationTokenExpriesAt: Date.now() + 24 * 60 * 60 * 1000,

        })
        await newUser.save()
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            message: 'User created successfully',
            User: {
                email,
                name,
                phone,
                roomNumber,
                moveIn,
                verificationToken,
                verificationTokenExpriesAt: Date.now() + 24 * 60 * 60 * 1000,
            }
        });

    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const login = async (req, res) => {
    const { roomNumber, password } = req.body

    try {
        const existinguser = await User.findOne({ roomNumber })
        if (!existinguser) {
            return res.status(400).json({ message: "room number not found" })
        }
        const existingpassword = await bcrypt.compare(password, user.password)
        if (!existingpassword) {
            return res.status(400).json({ message: "incorrect password" })
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1hr' });
        res.status(200).json({
            message: "user log in succesfully",
            email: user.email,
            token,
            name: user.name,
            phone: user.phone,
            roomNumber: user.roomNumber,
            moveIn: user.moveIn,
        });

    } catch (error) {
        res.status(500).json(error.message);

    }
}