import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState("");

    const navigate = useNavigate();

    const checkStrength = (value) => {

        let score = 0;

        if (value.length >= 6) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[!@#$%^&*]/.test(value)) score++;

        if (score <= 1) setStrength("Weak");
        else if (score <= 3) setStrength("Medium");
        else setStrength("Strong");

    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            await API.post("/auth/register", { name, email, password });

            alert("Account created successfully");

            setName("");
            setEmail("");
            setPassword("");
            setStrength("");

            navigate("/");

        } catch (error) {

            alert(error.response?.data?.message || "Registration error");

            setName("");
            setEmail("");
            setPassword("");
            setStrength("");

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Create Account</h2>

                <p className="required-note">
                    <span className="required">*</span> indicates required fields
                </p>

                <form onSubmit={handleRegister}>

                    <label>
                        Name <span className="required">*</span>
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>
                        Email <span className="required">*</span>
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>
                        Password <span className="required">*</span>
                    </label>

                    <div className="password-field">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={password}
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkStrength(e.target.value);
                            }}
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>

                    <p className="password-note">
                        Password must include: 6+ characters, 1 uppercase letter, 1 number, 1 special character.
                    </p>

                    {password && (
                        <p className={`password-strength ${strength.toLowerCase()}`}>
                            Strength: {strength}
                        </p>
                    )}

                    <button>Register</button>
                    <p className="auth-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>

                </form>

            </div>

        </div>

    );

}

export default Register;