import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import ReminderList from "./ReminderList";
import RecordsTable from "./RecordsTable";
import Chat from "./Chat";

export default function FamilyDashboard({ user }){
  const [elderId, setElderId] = useState(null);
  useEffect(()=>{
    (async ()=>{
      const d = await getDoc(doc(db, "users", user.uid));
      if(d.exists()){
        setElderId(d.data().linkedElder || "");
      }
    })();
  },[user]);

  if(!elderId) return <div className="container">紐付けられた高齢者が見つかりません。設定でUIDを入力してください。</div>;
  return (
    <div className="container">
      <h2>家族画面</h2>
      <div className="card">
        <h3>高齢者ID: {elderId}</h3>
      </div>
      <RecordsTable elderId={elderId} />
      <ReminderList elderId={elderId} />
      <Chat elderId={elderId} myId={user.uid} />
      <div className="card">
        <h3>見守り設定（監視時間）</h3>
        <p>（この部分は簡易実装：Firestore内に /users/{elderId}/watchSessions を保存し、Cloud Function で監視→未応答時にメールを送る実装手順を下に記載）</p>
      </div>
    </div>
  );
}
