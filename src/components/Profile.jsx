import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile() {
    const [userData, setUserData] = useState({ name: "", email: "" });

    useEffect(() => {
        const fetchUser = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) setUserData(docSnap.data());
        };
        fetchUser();
    }, []);

    const handleUpdate = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, userData);
        alert("Bilgiler güncellendi!");
    };

    return (
        <div>
            <h2>Profil Düzenle</h2>
            <input value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} placeholder="Ad Soyad" />
            <input value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder="Email" />
            <button onClick={handleUpdate}>Güncelle</button>
        </div>
    );
}
