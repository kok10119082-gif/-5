import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";

export default function RecordsTable({ elderId }){
  const [records, setRecords] = useState([]);
  useEffect(()=>{
    const since = dayjs().subtract(30, "day").toDate().toISOString();
    const q = query(collection(db, "users", elderId, "records"));
    return onSnapshot(q, snap=>{
      const arr = snap.docs.map(d=>d.data()).filter(r=>r.takenAt >= since);
      setRecords(arr.sort((a,b)=>b.takenAt.localeCompare(a.takenAt)));
    });
  },[elderId]);

  return (
    <div className="card">
      <h3>直近1か月の記録</h3>
      <table className="records-table">
        <thead><tr><th>日付</th><th>薬</th></tr></thead>
        <tbody>
          {records.map((r,i)=>(
            <tr key={i}>
              <td>{dayjs(r.takenAt).format("YYYY-MM-DD HH:mm")}</td>
              <td>{r.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
