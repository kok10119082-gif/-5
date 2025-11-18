import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export default function ReminderList({ elderId }){
  const [reminders, setReminders] = useState([]);
  useEffect(()=>{
    const q = query(collection(db, "users", elderId, "reminders"));
    return onSnapshot(q, snap=>{
      setReminders(snap.docs.map(d=>({id:d.id, ...d.data()})));
    });
  },[elderId]);

  async function markTaken(rem){
    const recCol = collection(db, "users", elderId, "records");
    await addDoc(recCol, {
      reminderId: rem.id,
      label: rem.label,
      takenAt: new Date().toISOString(),
      recordId: uuidv4()
    });
    alert("記録しました：飲みました");
  }

  if(!reminders.length) return <div>リマインダーはありません</div>;
  return (
    <div>
      {reminders.map(r=>(
        <div className="rem-row" key={r.id}>
          <div>
            <strong>{r.label}</strong>
            <div className="small">時間: {r.time} / 曜日設定あり</div>
          </div>
          <div>
            <button onClick={()=>markTaken(r)}>飲んだ</button>
          </div>
        </div>
      ))}
    </div>
  );
}
