import react, { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from "react-router-dom";
function Adminlogin() {
    const [email, setEmail] = useState()
    const { adminlogin } = useAuthStore()
    const adminSubmit = async (e) => {

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
