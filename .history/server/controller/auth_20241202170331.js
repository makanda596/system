
export const signUp = async (req, res) => {
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
        const newUser = new User({ fistName, LastName, email, phoneNumber, roomNumber, password })
        await newUser.save()
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

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

