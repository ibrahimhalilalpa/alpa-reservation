import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/login.css";


export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (onLogin) onLogin();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Giriş Yap</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Giriş Yap</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
