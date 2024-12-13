import React, { useState } from 'react'
import { useAuthStore } from './store/authStore.js'
import { useNavigate } from "react-router-dom";
function Adminlogin() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const { adminlogin } = useAuthStore()
    const adminSubmit = async (e) => {

        try {
            await adminlogin(email, password)
            alert('admin logged in')
            navigate('/adminDashboard')

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={adminSubmit}>
                <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />

                <input type="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="password" />
                <button>submitALL</button>
            </form>
        </div>
    );
}
export default Adminlogin;
