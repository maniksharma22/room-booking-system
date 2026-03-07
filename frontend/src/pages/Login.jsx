import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const res = await API.post("/auth/login", { email, password });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setEmail("");
            setPassword("");

            navigate("/dashboard");

        } catch (error) {

            alert(error.response?.data?.message || "Invalid login");

            setEmail("");
            setPassword("");

        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Login</h2>

                <p className="required-note">
                    <span className="required">*</span> indicates required fields
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email <span className="required">*</span></label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password <span className="required">*</span></label>

                    <div className="password-field">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>

                    <button>Login</button>

                </form>

                <p style={{ marginTop: "10px" }}>
                    New user? <Link to="/register">Register</Link>
                </p>

            </div>

        </div>

    );
}

export default Login;