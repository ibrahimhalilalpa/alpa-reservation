import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../styles/appointmentScheduler.css";


export default function AppointmentScheduler({ workingDays, workingHours, slotDuration, bookedSlots, businessId }) {
    const [selectedDay, setSelectedDay] = useState(workingDays[0]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [note, setNote] = useState("");

    // bookedSlots prop zaten BusinessDetail'den geliyor, o yüzden tekrar firestore sorgusuna gerek yok

    // Saatleri slotDuration'a göre hesapla
    const generateSlots = () => {
        const slots = [];
        const startHour = parseInt(workingHours.start);
        const endHour = parseInt(workingHours.end);
        for (let hour = startHour; hour < endHour; hour += slotDuration / 60) {
            let hourStr = Math.floor(hour).toString().padStart(2, "0");
            let minute = (hour % 1) * 60;
            let minuteStr = minute === 0 ? "00" : minute.toString();
            slots.push(`${hourStr}:${minuteStr}`);
        }
        return slots;
    };

    const slots = generateSlots();

    const handleMakeAppointment = async () => {
        if (!userName || !userEmail || !userPhone) {
            alert("Lütfen tüm bilgileri doldurun.");
            return;
        }
        if (!selectedTime) {
            alert("Lütfen bir saat seçin.");
            return;
        }

        try {
            await addDoc(collection(db, "reservations"), {
                businessId: businessId,
                day: selectedDay,
                time: selectedTime,
                userName,
                userEmail,
                userPhone,
                note,
                createdAt: serverTimestamp(),
            });
            alert(`${selectedDay} günü, ${selectedTime} saati için randevu talebi oluşturuldu!`);
            setSelectedTime(null);
            setUserName("");
            setUserEmail("");
            setUserPhone("");
            setNote("");
        } catch (error) {
            alert("Randevu oluşturulurken hata oluştu: " + error.message);
        }
    };

    return (
        <div className="appointment-scheduler">
            <h2>Randevu Sistemi</h2>

            <div className="days-container">
                <strong>Gün seçin:</strong>
                {workingDays.map((day) => (
                    <button
                        key={day}
                        onClick={() => {
                            setSelectedDay(day);
                            setSelectedTime(null);
                        }}
                        style={{
                            margin: "5px",
                            backgroundColor: selectedDay === day ? "blue" : "lightgray",
                            color: selectedDay === day ? "white" : "black",
                            cursor: "pointer",
                        }}
                    >
                        {day}
                    </button>
                ))}
            </div>

            <div className="slots-container">
                <strong>{selectedDay} günündeki uygun saatler:</strong>
                <div>
                    {slots.map((slot) => {
                        const isBooked = bookedSlots[selectedDay]?.includes(slot);
                        return (
                            <button
                                key={slot}
                                disabled={isBooked}
                                onClick={() => setSelectedTime(slot)}
                                style={{
                                    margin: "3px",
                                    backgroundColor: selectedTime === slot ? "blue" : isBooked ? "gray" : "lightgray",
                                    color: isBooked ? "white" : "black",
                                    cursor: isBooked ? "not-allowed" : "pointer",
                                }}
                            >
                                {slot}
                            </button>
                        );
                    })}
                </div>
            </div>

            {selectedTime && (
                <div className="appointment-form">
                    <h3>Randevu Formu</h3>
                    <input
                        type="text"
                        placeholder="Ad Soyad"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{ display: "block", marginBottom: "10px" }}
                    />
                    <input
                        type="email"
                        placeholder="E-posta"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        style={{ display: "block", marginBottom: "10px" }}
                    />
                    <input
                        type="tel"
                        placeholder="Telefon"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        style={{ display: "block", marginBottom: "10px" }}
                    />
                    <textarea
                        placeholder="Not (isteğe bağlı)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        style={{ display: "block", marginBottom: "10px" }}
                    />
                    <button onClick={handleMakeAppointment}>Randevu Talep Et</button>
                </div>
            )}
        </div>
    );
}
