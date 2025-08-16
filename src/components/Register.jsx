import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../styles/register.css";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Firestore users koleksiyonuna rol ile kaydet
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: "customer"
            });

            alert("Kayıt başarılı!");
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Kayıt Ol</h2>
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
            <button onClick={handleRegister}>Kayıt Ol</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
