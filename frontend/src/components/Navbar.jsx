import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/login";
    };

    return (

        <>

            {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}

            <div className="navbar">

                <div className="logo">StayEase</div>

                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? "✖" : "☰"}
                </div>

                <div className={`nav-links ${menuOpen ? "active" : ""}`}>

                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>

                    <Link to="/mybookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>

                    {localStorage.getItem("token") ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                        </>
                    )}

                </div>

            </div>

        </>

    );
}

export default Navbar;