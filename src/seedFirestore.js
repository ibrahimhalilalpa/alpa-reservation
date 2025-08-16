import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_I9oO4F9d9JPVLk8Hhv-sl6v9bkBFj7I",
    authDomain: "alpa-reservation.firebaseapp.com",
    projectId: "alpa-reservation",
    storageBucket: "alpa-reservation.appspot.com",
    messagingSenderId: "204099467347",
    appId: "1:204099467347:web:af4e27ce572c82322aeea6",
    measurementId: "G-9C05NPDS4Y",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const businesses = [
    {
        name: "ABC Berber",
        city: "Gaziantep",
        district: "Nizip",
        sector: "Berber",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        workingHours: { start: "09:00", end: "19:00" },
        slotDuration: 60,
        imageUrl: "https://i.imgur.com/k7GvZsZ.jpeg",
    },
    {
        name: "XYZ Kuaför",
        city: "İstanbul",
        district: "Kadıköy",
        sector: "Kuaför",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        workingHours: { start: "10:00", end: "18:00" },
        slotDuration: 30,
        imageUrl: "https://i.imgur.com/someimage2.jpg",
    },
    {
        name: "Şirin Diş Kliniği",
        city: "Ankara",
        district: "Çankaya",
        sector: "Dişçi",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        workingHours: { start: "08:30", end: "17:30" },
        slotDuration: 45,
        imageUrl: "https://i.imgur.com/someimage3.jpg",
    },
    {
        name: "Moda Berber",
        city: "İstanbul",
        district: "Beşiktaş",
        sector: "Berber",
        workingDays: ["Tue", "Wed", "Thu", "Fri", "Sat"],
        workingHours: { start: "09:00", end: "20:00" },
        slotDuration: 60,
        imageUrl: "https://i.imgur.com/someimage4.jpg",
    },
    {
        name: "Elegant Kuaför",
        city: "Gaziantep",
        district: "Şahinbey",
        sector: "Kuaför",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        workingHours: { start: "10:00", end: "19:00" },
        slotDuration: 30,
        imageUrl: "https://i.imgur.com/someimage5.jpg",
    },
    {
        name: "Sağlık Diş Merkezi",
        city: "Ankara",
        district: "Keçiören",
        sector: "Dişçi",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        workingHours: { start: "09:00", end: "18:00" },
        slotDuration: 30,
        imageUrl: "https://i.imgur.com/someimage6.jpg",
    },
    {
        name: "Prestige Berber",
        city: "Gaziantep",
        district: "Şehitkamil",
        sector: "Berber",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        workingHours: { start: "08:00", end: "18:00" },
        slotDuration: 45,
        imageUrl: "https://i.imgur.com/someimage7.jpg",
    },
    {
        name: "Kuaför Elite",
        city: "İstanbul",
        district: "Üsküdar",
        sector: "Kuaför",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        workingHours: { start: "09:30", end: "19:30" },
        slotDuration: 60,
        imageUrl: "https://i.imgur.com/someimage8.jpg",
    },
    {
        name: "Diş Hekimi Selim",
        city: "Ankara",
        district: "Mamak",
        sector: "Dişçi",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        workingHours: { start: "09:00", end: "17:00" },
        slotDuration: 30,
        imageUrl: "https://i.imgur.com/someimage9.jpg",
    },
    {
        name: "Salon Berber",
        city: "Gaziantep",
        district: "Nizip",
        sector: "Berber",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        workingHours: { start: "10:00", end: "20:00" },
        slotDuration: 60,
        imageUrl: "https://i.imgur.com/someimage10.jpg",
    },
    {
        name: "Kuaför Star",
        city: "İstanbul",
        district: "Kadıköy",
        sector: "Kuaför",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        workingHours: { start: "09:00", end: "19:00" },
        slotDuration: 30,
        imageUrl: "https://i.imgur.com/someimage11.jpg",
    },
    {
        name: "Dişçi Güven",
        city: "Ankara",
        district: "Çankaya",
        sector: "Dişçi",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        workingHours: { start: "08:00", end: "16:00" },
        slotDuration: 45,
        imageUrl: "https://i.imgur.com/someimage12.jpg",
    },
];


async function seedBusinesses() {
    for (const biz of businesses) {
        try {
            await addDoc(collection(db, "businesses"), biz);
            console.log(`${biz.name} başarıyla eklendi.`);
        } catch (error) {
            console.error(`${biz.name} eklenirken hata:`, error);
        }
    }
    console.log("Tüm işletmeler eklendi.");
}

seedBusinesses().catch(console.error);
