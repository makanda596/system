
import react, { useState } from 'react'
import axios from 'axios'
function Adminlogin() {
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: ""

    })
    function adminSubmit(e) {
        const response = axios.post("http://localhost:3000/adminlogin", form)
        e.preventDefault()
        try {
            setForm({ email: '', password: '', name: '' })
            console.log(response.data)
            alert("sign Successful")
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
