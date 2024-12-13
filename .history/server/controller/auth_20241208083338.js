import { User } from '../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import crypto from "crypto";
import { sendVerificationEmail, sendPasswordResetEmail, sendRestPasswordEmail } from '../mailtrap/email.js'
import { generateTokenAndSetCookie } from "../utilis/generateTokenAndSetCookie.js";

dotenv.config()
export const signup = async (req, res) => {
    const { email, name, password, phone, roomNumber, moveIn, isVerified } = req.body

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
            isVerified,
            verificationToken,
            verificationTokenExpriesAt: Date.now() + 24 * 60 * 60 * 1000,

        })
        await newUser.save()
        generateTokenAndSetCookie(res, User._id);

        await sendVerificationEmail(newUser.email, verificationToken)

        res.status(201).json({
            message: 'User created successfully',
            User: {
                email,
                name,
                phone,
                roomNumber,
                moveIn,
                isVerified,
                verificationToken,
                verificationTokenExpriesAt: Date.now() + 24 * 60 * 60 * 1000,
            }
        });

    } catch (error) {
        res.status(400).json(error.message)
    }
}
//email verification
export const emailVerification = async (req, res) => {
    const { code } = req.body
    try {

        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpriesAt: { $st: Date.now() }
        })
        if (user) {
            return res.status(400).json({ message: "the code has already expired" })
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpriesAt = undefined
        await user.save()

        await sendWelcomeEmail(user.email, user.name)
        res.status(200).json({
            success: true,
            message: "email successfully signup",
            user: {
                ...user.doc,
                password: undefined,
            }

        })
    } catch (error) {

    }
}
export const login = async (req, res) => {
    const { roomNumber, password } = req.body

    try {
        const existinguser = await User.findOne({ roomNumber })
        if (!existinguser) {
            return res.status(400).json({ message: "room number not found" })
        }
        const existingpassword = await bcrypt.compare(password, existinguser.password)
        if (!existingpassword) {
            return res.status(400).json({ message: "incorrect password" })
        }
        const token = jwt.sign({ userId: User._id }, "welcom", { expiresIn: '1hr' }); //change the JWT_SECTRET TOKEN

        generateTokenAndSetCookie(res, existinguser._id);
        User.lastlogin = new Date();
        await existinguser.save()
        res.status(200).json({
            success: true,
            message: "user log in succesfully",
            user: {
                ...User._doc,
                password: undefined,
                token,
            },
        });

    } catch (error) {
        res.status(500).json(error.message);

    }
}
export const logout = async (req, res) => {
    clearCookie("token")
    res.status(200).json({
        success: true,
        message: "User logged out"
    })
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "email not found" })
        }
        //generate the reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 //1hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();

        //send emails ;
        await sendPasswordResetEmail(user.email, `http://localhost:5173/reset-password/${resetToken}`)
        res.status(200).json({
            success: true,
            message: "code sent successfully to your email",

        })
    } catch (err) {
        res.status(500).json(err.message);

    }
}

export const resetPasswordEmail = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (user) {
            return res.status(400).json({ message: "token expired or invalid" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword,
            user.resetPasswordToken = undefined,
            user.resetPasswordExpiresAt = undefined,

            await user.save()

        await sendRestPasswordEmail(user.email)
        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (err) {
        res.status(500).json(err.message);

    }
}