import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig"; // db export ettiysen
import BusinessDetail from "./BusinessDetail";
import { collection, getDocs } from "firebase/firestore";
import "../styles/businessList.css";

export default function BusinessList() {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            const querySnapshot = await getDocs(collection(db, "businesses"));
            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBusinesses(items);
        };
        fetchBusinesses();
    }, []);

    return (
        <div>
            <h1>İşletmeler</h1>
            <ul>
                {businesses.map(biz => (
                    <li key={biz.id}>
                        <Link to={`/business/${biz.id}`}>{biz.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
