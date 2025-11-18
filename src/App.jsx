import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import ElderDashboard from "./components/ElderDashboard";
import FamilyDashboard from "./components/FamilyDashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App(){
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "elder" or "family"

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async u => {
      if(u) {
        setUser(u);
        // role stored in user profile in Firestore (simple approach)
        // We'll fetch role in components; for now let child components determine
      } else {
        setUser(null);
        setRole(null);
      }
    });
    return () => unsub();
  },[]);

  if(!user) return <Auth />;
  return (
    <div className="app-root">
      <header className="topbar">
        <h1>見まもりアプリ</h1>
      </header>
      <main>
        {/* Let components detect role via Firestore; pass user */}
        <RoleSwitcher user={user} />
      </main>
    </div>
  );
}

function RoleSwitcher({ user }){
  // Simple role detection: read /users/{uid}.role
  const [role, setRole] = useState(null);
  const { doc, getDoc } = require("firebase/firestore");
  const { db } = require("./firebase");

  useEffect(()=>{
    let mounted = true;
    (async ()=>{
      const d = await getDoc(doc(db, "users", user.uid));
      if(!mounted) return;
      if(d.exists()){
        setRole(d.data().role || "elder");
      } else {
        // default to elder
        setRole("elder");
      }
    })();
    return ()=> mounted=false;
  },[user]);

  if(!role) return <div>読み込み中…</div>;
  return role === "elder" ? <ElderDashboard user={user} /> : <FamilyDashboard user={user} />;
}
