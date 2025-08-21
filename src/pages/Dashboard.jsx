import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Kullanıcıyı bekle
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                try {
                    const q = query(
                        collection(db, "reservations"),
                        where("businessId", "==", currentUser.uid)
                    );
                    const snapshot = await getDocs(q);

                    setAppointments(
                        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                    );
                } catch (err) {
                    console.error("Randevular alınamadı:", err);
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div>🔄 Randevular yükleniyor...</div>;

    if (!user) return <div>🚫 Giriş yapmalısınız.</div>;

    return (
        <div>
            <h2>📅 Randevu Yönetimi</h2>
            {appointments.length === 0 ? (
                <p>Henüz randevu yok.</p>
            ) : (
                <ul>
                    {appointments.map((a) => (
                        <li key={a.id}>
                            <strong>{a.day}</strong> - {a.time} ⏰ ({a.userName})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
