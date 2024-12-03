// import bcrypt from 'bcrypt';


// export const login = async (req, res) => {
//     const { roomNumber, password } = req.body

//     try {
//         const user = await User.findOne({ roomNumber })
//         if (!user) {
//             return res.status(400).json({ message: "room Number not registred" })
//         } else {
//             return res.status(200).json({ message: "login succesfully" })
//             // res.render('/home')
//         }

//         //checking if the password is correct
//         const isPassword = await bcrypt.compare(password, user.password)
//         if (!isPassword) {
//             return res.status(400).json({ message: 'Invalid password' })
//         }
//         res.status(200).json({ message: 'Login successful' });


//     } catch (err) {
//         console.log(err)
//         res.status(500).send('Server Error')
//     }
// }


export const signup = async (req, res) => {
    const { name, email, phone, roomNumber, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ name });
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "email already exists" })
        }
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists. Try another one.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in the database
        const newUser = new User({ name, email, phone, roomNumber, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});