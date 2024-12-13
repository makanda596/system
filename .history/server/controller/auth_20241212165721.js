import { User, Message, Admin } from '../config.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import crypto from "crypto";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendRestPasswordEmail } from '../mailtrap/email.js'
import { generateTokenAndSetCookie } from "../utilis/generateTokenAndSetCookie.js";

dotenv.config()
export const signup = async (req, res) => {
    const { email, name, password, phone, roomNumber, moveIn } = req.body//return is verified

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

        const user = new User({
            email,
            name,
            password: hashPaswword,
            phone,
            roomNumber,
            moveIn,
            // isVerified,
            verificationToken,
            verificationTokenExpriesAt: Date.now() + 24 * 60 * 60 * 1000,

        })
        await user.save()
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            message: 'User created successfully',
            user: {
                email,
                name,
                phone,
                roomNumber,
                moveIn,
                // isVerified,
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
            verificationTokenExpriesAt: { $gt: Date.now() }
        })
        if (!user) {
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
        console.log("error in verifyEmail ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export const login = async (req, res) => {
    const { roomNumber, password } = req.body

    try {
        const user = await User.findOne({ roomNumber })
        if (!user) {
            return res.status(400).json({ message: "room number not found" })
        }
        const existingpassword = await bcrypt.compare(password, user.password)
        if (!existingpassword) {
            return res.status(400).json({ message: "incorrect password" })
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastlogin = new Date();
        await user.save()
        res.status(200).json({
            success: true,
            message: "user log in succesfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        });

    } catch (error) {
        console.log("Error in login ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}
export const logout = async (req, res) => {
    res.clearCookie("token")
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
        await sendPasswordResetEmail(user.email, `http://localhost:3000/reset-password/${resetToken}`)
        res.status(200).json({
            success: true,
            message: "code sent successfully to your email",

        })
    } catch (error) {
        console.log("Error in forgotPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const resetPasswordEmail = async (req, res) => {

    const { token } = req.params
    const { password } = req.body

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        })
        if (!user) {
            return res.status(400).json({ message: "token expired or invalid" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword,
            user.resetPasswordToken = undefined,
            user.resetPasswordExpiresAt = undefined,

            await user.save()

        await sendRestPasswordEmail(user.email)
        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.log("Error in resetPassword ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const alertMessage = async (req, res) => {
    const { message } = req.body;

    try {
        const alert = await Message.findOne()
        if (!alert) {
            return res.status(404).json({ message: "Not Found" })
        }
        const newAlert = new Message({ message })
        await newAlert.save()
        res.status(200).json({ success: true, message: 'Alert updated successfully', newAlert });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const tenantMessage = async (req, res) => {

    try {
        const alert = await Message.find()

        if (!alert) {
            return res.status(400).json("no alert message found");
        }
        res.status(200).json(alert);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }
};

export const adminUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 })

        res.status(200).json(users)
    } catch (error) {
        console.error('Error fetching tenants:', error);
        res.status(500).json({ message: 'Error fetching tenants' });
    }
}

export const adminSignup = async (req, res) => {
    const { email, name, password, role } = req.body;
    try {
        const emailexist = await Admin.findOne({ email })
        if (emailexist) return res.status(400).json({ message: 'Email already exists' })

        const nameexist = await Admin.findOne({ name })
        if (nameexist) return res.status(400).json({ message: 'Name already exists' })

        const roleexist = await Admin.findOne({ role })
        if (roleexist) return res.status(400).json({ message: 'Role already exists :enter another role' })

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({ email, name, password: hashedPassword, role })
        await admin.save()
        res.status(200).json({
            success: true,
            message: 'Admin created successfully',
            admin
        })
    } catch (error) {
        console.error('Error signing up admin:', error);
        res.status(500).json({ message: 'Error signing up admin' });
    }
}
// export const settings = async (req,res)>{
//     const {id} = req.params;
//     const
//     try{

//     }
// }