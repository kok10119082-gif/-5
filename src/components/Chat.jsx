import React, { useEffect, useState, useRef } from "react";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import dayjs from "dayjs";

export default function Chat({ elderId, myId }){
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const boxRef = useRef();

  useEffect(()=>{
    const q = query(collection(db, "users", elderId, "messages"), orderBy("sentAt","asc"));
    return onSnapshot(q, snap=>{
      setMsgs(snap.docs.map(d=>d.data()));
      setTimeout(()=> boxRef.current?.scrollTo({top: 99999}), 200);
    });
  },[elderId]);

  async function send(){
    if(!text.trim()) return;
    await addDoc(collection(db, "users", elderId, "messages"), {
      from: myId, text, sentAt: new Date().toISOString()
    });
    setText("");
  }

  return (
    <div className="chat-card">
      <div className="messages" ref={boxRef}>
        {msgs.map((m,i)=>(
          <div key={i} className={m.from===myId?"msg me":"msg"}>
            <div className="msg-text">{m.text}</div>
            <div className="msg-time">{dayjs(m.sentAt).format("MM-DD HH:mm")}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="メッセージを書く..." />
        <button onClick={send}>送信</button>
      </div>
    </div>
  );
}
