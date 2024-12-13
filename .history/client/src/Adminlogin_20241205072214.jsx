
import react from 'react'
function Adminlogin() {

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
