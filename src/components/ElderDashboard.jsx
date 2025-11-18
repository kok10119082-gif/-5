import React from "react";
import ReminderEditor from "./ReminderEditor";
import ReminderList from "./ReminderList";
import RecordsTable from "./RecordsTable";
import Chat from "./Chat";

export default function ElderDashboard({ user }){
  const elderId = user.uid;
  return (
    <div className="container">
      <h2>ようこそ（高齢者画面）</h2>
      <ReminderEditor userId={elderId} />
      <ReminderList elderId={elderId} />
      <RecordsTable elderId={elderId} />
      <Chat elderId={elderId} myId={elderId} />
    </div>
  );
}
