import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!auth.currentUser) return; // kullanıcı yoksa sorgulama yapma

            try {
                const q = query(
                    collection(db, "reservations"),
                    where("businessId", "==", auth.currentUser.uid)
                );
                const snapshot = await getDocs(q);
                setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error("Randevular alınamadı:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <div>Randevular yükleniyor...</div>;

    return (
        <div>
            <h2>Randevu Yönetimi</h2>
            {appointments.length === 0 ? (
                <p>Henüz randevu yok.</p>
            ) : (
                appointments.map(a => (
                    <div key={a.id}>
                        {a.day} {a.time} - {a.userName}
                    </div>
                ))
            )}
        </div>
    );
}
