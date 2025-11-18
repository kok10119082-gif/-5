import React, { useState } from "react";
import dayjs from "dayjs";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ReminderEditor({ userId, linkedElderId }){
  const [label, setLabel] = useState("薬");
  const [time, setTime] = useState("09:00");
  const [days, setDays] = useState({
    mon:false,tue:false,wed:false,thu:false,fri:false,sat:false,sun:false
  });

  async function addReminder(){
    // Stores reminders under /users/{elderId}/reminders
    const target = linkedElderId || userId;
    await addDoc(collection(db, "users", target, "reminders"), {
      label, time, days, createdAt: new Date().toISOString()
    });
    alert("リマインダーを追加しました");
  }

  function toggleDay(d){
    setDays(prev => ({...prev, [d]: !prev[d]}));
  }

  return (
    <div className="card">
      <h3>リマインダー追加</h3>
      <label>ラベル</label>
      <input value={label} onChange={e=>setLabel(e.target.value)} />
      <label>時間</label>
      <input type="time" value={time} onChange={e=>setTime(e.target.value)} />
      <label>曜日</label>
      <div className="days-row">
        {["mon","tue","wed","thu","fri","sat","sun"].map(d=>(
          <button key={d} className={days[d]?"day on":"day"} onClick={()=>toggleDay(d)}>
            {d.slice(0,3).toUpperCase()}
          </button>
        ))}
      </div>
      <button onClick={addReminder}>追加</button>
    </div>
  );
}
