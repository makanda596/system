
import react, { useState } from 'react'
import axios from 'axios'
function Adminlogin() {
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: ""

    })
    const adminSubmit = async (e) => {
        const response = await axios.post("http://localhost:5000/adminlogin", form)
        e.preventDefault()
        try {
            console.log(response.data)
            setForm({ email: '', password: '', name: '' })
            alert("sign Successful")
            window.location.href = "/"
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={adminSubmit}>
                <input type="text" name="email" placeholder="Email" />
                <input type="text" name="name" placeholder="name" />
                <input type="password" name="password" placeholder="password" />
                <button>submit</button>
            </form>
        </div>
    );
}
export default Adminlogin;
