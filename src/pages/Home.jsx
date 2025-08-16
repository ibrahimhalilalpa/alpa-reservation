import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/Home.css";  // Stil dosyamızı ekliyoruz

export default function Home() {
    const [businesses, setBusinesses] = useState([]);
    const [filters, setFilters] = useState({
        city: "",
        district: "",
        sector: "",
    });

    const cities = ["Gaziantep", "İstanbul", "Ankara"];
    const districts = {
        Gaziantep: ["Nizip", "Şahinbey", "Şehitkamil"],
        İstanbul: ["Kadıköy", "Beşiktaş", "Üsküdar"],
        Ankara: ["Çankaya", "Keçiören", "Mamak"],
    };
    const sectors = ["Berber", "Kuaför", "Dişçi"];

    useEffect(() => {
        const fetchBusinesses = async () => {
            let q = collection(db, "businesses");

            if (filters.city) {
                q = query(q, where("city", "==", filters.city));
            }
            if (filters.district) {
                q = query(q, where("district", "==", filters.district));
            }
            if (filters.sector) {
                q = query(q, where("sector", "==", filters.sector));
            }

            const querySnapshot = await getDocs(q);
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            setBusinesses(list);
        };

        fetchBusinesses();
    }, [filters]);

    return (
        <div className="home-container">
            <h1>İşletmeler</h1>

            <div className="filters">
                <select
                    value={filters.city}
                    onChange={(e) =>
                        setFilters({ ...filters, city: e.target.value, district: "" })
                    }
                >
                    <option value="">Şehir Seçin</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>

                <select
                    value={filters.district}
                    onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                    disabled={!filters.city}
                >
                    <option value="">İlçe Seçin</option>
                    {filters.city &&
                        districts[filters.city].map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                </select>

                <select
                    value={filters.sector}
                    onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
                >
                    <option value="">Sektör Seçin</option>
                    {sectors.map((sector) => (
                        <option key={sector} value={sector}>
                            {sector}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="business-list">
                {businesses.map((b) => (
                    <li key={b.id} className="business-card">
                        <Link to={`/business/${b.id}`} style={{ textDecoration: "none" }}>
                            <img
                                src={b.imageUrl || "https://i.imgur.com/5IQsD7v.jpeg"} // varsa işletmenin resmi, yoksa default
                                alt={b.name}
                                style={{ width: "100%", height: "150px", objectFit: "cover" }}
                                onError={(e) => {
                                    e.target.onerror = null; // sonsuz döngüyü önlemek için
                                    e.target.src = "https://i.imgur.com/5IQsD7v.jpeg"; // default görsel
                                }}
                            />
                            <div className="business-card-content">
                                <div className="business-card-title">{b.name}</div>
                                <div className="business-card-location">{b.city} / {b.district}</div>
                                <div className="business-card-sector">{b.sector}</div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
