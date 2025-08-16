// src/About.jsx
import React from "react";
import "../styles/about.css";

export default function About() {
    return (
        <div className="about-container">
            <h1>Hakkımızda</h1>
            <p>
                Alpa Randevu, kullanıcıların kolayca işletmelerle iletişime geçerek randevu almasını sağlayan modern ve güvenilir bir platformdur.
            </p>
            <p>
                Bu proje, React ve Firebase teknolojileri kullanılarak geliştirilmiştir. Amacımız, işletmelerin dijitalleşmesini kolaylaştırmak ve kullanıcı deneyimini üst seviyeye çıkarmaktır.
            </p>
            <p>
                İletişim ve destek için bizimle <a href="mailto:destek@alparandevu.com">destek@alparandevu.com</a> adresinden iletişime geçebilirsiniz.
            </p>
        </div>
    );
}
