
import react from 'react'
import axios from 'axios'
function Adminlogin() {

    function adminSubmit() {
        const response = axios.post("http://localhost:3000/adminlogin")
        try {
            console.log(response.data);
            alert("Login Successful")
        } catch {

        }
    }
    return (
        <div>
            <form handleSubmit={adminSubmit}>
                <input type="text" name="email" placeholder="Email" />
                <input type="text" name="name" placeholder="name" />
                <input type="password" name="password" placeholder="password" />
            </form>
        </div>
    );
}
export default Adminlogin;
