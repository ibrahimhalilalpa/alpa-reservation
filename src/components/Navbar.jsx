import React from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css';

export default function Navbar({ user, userRole, onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">
                    Alpa Randevu
                </Link>
            </div>

            <div className="navbar-center"></div>

            <div className="navbar-right">
                <Link to="/about" className="nav-link">Hakkımızda</Link>

                {user ? (
                    <>
                        {userRole === "user" && <Link to="/profile" className="nav-link">Profil</Link>}
                        {userRole === "business" && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
                        {userRole === "admin" && <Link to="/admin" className="nav-link">Admin Panel</Link>}

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
