import { User } from '../config.js';

export const signup = async (req, res) => {
    const { email, name, password, phone, roomNumber, moveIn, lastLogin } = req.body

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
        const newUser = new User({ email, name, password: hashPaswword, phone, roomNumber, moveIn, lastLogin })
        await newUser.save()
    } catch (error) {
        res.status(400).json({ message: (error) })
    }
}