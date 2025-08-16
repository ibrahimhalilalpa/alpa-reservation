import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import AppointmentScheduler from "./AppointmentScheduler"; // Az önceki randevu componenti
import "../styles/businessDetail.css";

export default function BusinessDetail() {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);
    const [bookedSlots, setBookedSlots] = useState({}); // Randevuları çekip bu objeye koyacağız

    useEffect(() => {
        const fetchBusiness = async () => {
            const docRef = doc(db, "businesses", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setBusiness(docSnap.data());
            }
        };

        const fetchReservations = async () => {
            const q = query(
                collection(db, "reservations"),
                where("businessId", "==", id)
            );
            const querySnapshot = await getDocs(q);

            // bookedSlots = { Mon: ["09:00", "13:00"], Tue: [...] }
            const slots = {};
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // createdAt yerine 'day' veya 'date' alanın varsa ona göre filtreleme gerekebilir
                // Sen rezervasyon kayıtlarında gün bilgisini nasıl tutuyorsun?
                // Şimdilik varsayılan olarak data.day olduğunu düşünelim (ör: "Mon")
                const day = data.day || "Mon"; // Varsa day yoksa Mon yap (düzenlemen lazım)
                if (!slots[day]) slots[day] = [];
                slots[day].push(data.time);
            });

            setBookedSlots(slots);
        };

        fetchBusiness();
        fetchReservations();
    }, [id]);

    if (!business) return <div>Yükleniyor...</div>;

    return (
        <div className="business-detail-container">
            <h1>{business.name}</h1>
            <p>{business.description}</p>
            <p><b>İletişim:</b> {business.contact}</p>
            <p><b>Çalışma Günleri:</b> {business.workingDays.join(", ")}</p>
            <p><b>Çalışma Saatleri:</b> {business.workingHours.start} - {business.workingHours.end}</p>
            <p><b>Randevu Süresi:</b> {business.slotDuration} dakika</p>

            <div className="appointment-scheduler-wrapper">
                <AppointmentScheduler
                    workingDays={business.workingDays}
                    workingHours={business.workingHours}
                    slotDuration={business.slotDuration}
                    bookedSlots={bookedSlots}
                    businessId={id}  // Burada id’yi de geçiyoruz ki randevu kaydederken işimize yarasın
                />
            </div>
        </div>
    );
}
