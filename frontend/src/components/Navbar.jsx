import { Link } from "react-router-dom";

function Navbar() {

    return (

        <div className="navbar">

            <div className="logo">StayEase</div>

            <div className="nav-links">

                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/mybookings">My Bookings</Link>

            </div>

        </div>

    );

}

export default Navbar;