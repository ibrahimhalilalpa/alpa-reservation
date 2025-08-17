import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function AdminPanel() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const snapshot = await getDocs(collection(db, "users"));
            setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Admin Panel</h2>
            {users.map(u => (<div key={u.id}>{u.name} - {u.email} - {u.role}</div>))}
        </div>
    );
}
