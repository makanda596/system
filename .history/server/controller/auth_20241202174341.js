import bcrypt from 'bcrypt';


export const login = async (req, res) => {
    const { roomNumber, password } = req.body

    try {
        const user = await User.findOne({ roomNumber })
        if (!user) {
            return res.status(400).json({ message: "room Number not registred" })
        } else {
            return res.status(200).json({ message: "login succesfully" })
            // res.render('/home')
        }

        //checking if the password is correct
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(400).json({ message: 'Invalid password' })
        }
        res.status(200).json({ message: 'Login successful' });


    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

