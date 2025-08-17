import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import '../styles/register.css';

export default function Register() {
    const [role, setRole] = useState("user"); // user / business
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Kullanıcı veya işletme adı
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            await setDoc(doc(db, "users", userId), {
                role,
                email,
                name,
            });

            navigate(role === "admin" ? "/admin" : role === "business" ? "/dashboard" : "/profile");
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Kayıt Ol</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option value="user">Kullanıcı</option>
                    <option value="business">İşletme</option>
                </select>

                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={role === "user" ? "Ad Soyad" : "İşletme Adı"}
                    required
                />
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Şifre"
                    type="password"
                    required
                />

                <button type="submit">Kayıt Ol</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
