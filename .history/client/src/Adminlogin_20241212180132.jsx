import React, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from "react-router-dom";
function Adminlogin() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const { adminlogin } = useAuthStore()
    const adminSubmit = async (e) => {
        await adminlogin(email, password)
        navigate('/admindashboard')
    }
    return (
        <div>
            <form onSubmit={adminSubmit}>
                <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />

                <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="password" />
                <button>submit</button>
            </form>
        </div>
    );
}
export default Adminlogin;
