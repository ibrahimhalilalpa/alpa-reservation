import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            const userDoc = await getDoc(doc(db, "users", userId));
            const userData = userDoc.data();

            if (userData.role === "admin") navigate("/admin");
            else if (userData.role === "business") navigate("/dashboard");
            else navigate("/profile");
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Giriş Yap</h2>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
            />
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Şifre"
                type="password"
            />
            <button onClick={handleLogin}>Giriş Yap</button>
            {error && <p>{error}</p>}
        </div>
    );
}
