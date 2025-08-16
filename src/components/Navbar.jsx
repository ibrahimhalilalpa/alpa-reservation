import React from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css'; // CSS dosyasını import et

export default function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">Alpa Randevu</Link>
            </div>
            <div className="navbar-center">
                {/* İleride orta kısma başka şey eklenebilir */}
            </div>
            <div className="navbar-right p-3">
                <Link to="/about" className="nav-link">Hakkımızda</Link>
                {user ? (
                    <>
                        <span className="welcome-text">Hoşgeldin, {user.email}</span>
                        <button className="logout-btn" onClick={onLogout}>Çıkış Yap</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Giriş Yap</Link>
                        <Link to="/register" className="nav-link">Kayıt Ol</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
