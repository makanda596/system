
import react from 'react'
import axios from 'axios'
function Adminlogin() {

    function adminSubmit() {
        const response = axios.post("http://localhost:3000/adminlogin")
        try {
            console.log(response.data);
            alert("sign Successful")
        } catch {

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
