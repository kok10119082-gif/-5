import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Auth(){
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("elder");
  const [linkUid, setLinkUid] = useState("");

  async function handleSignup(){
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    // Save role and link (if family linking elder)
    await setDoc(doc(db, "users", cred.user.uid), {
      role,
      createdAt: new Date().toISOString(),
      linkedElder: role==="family" && linkUid ? linkUid : null
    });
    alert("登録完了");
  }

  async function handleSignin(){
    await signInWithEmailAndPassword(auth, email, pass);
  }

  return (
    <div className="auth-card">
      <h2>{mode === "signin" ? "ログイン" : "新規登録"}</h2>
      <label>メール</label>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} />
      <label>パスワード</label>
      <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} />
      {mode === "signup" && (
        <>
          <label>アカウント種別</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="elder">高齢者（本人）</option>
            <option value="family">家族（見守り）</option>
          </select>
          {role === "family" && (
            <>
              <label>紐付ける高齢者のUID（高齢者に教えてもらって入力）</label>
              <input value={linkUid} onChange={(e)=>setLinkUid(e.target.value)} />
            </>
          )}
        </>
      )}
      <div className="auth-actions">
        {mode === "signin" ? (
          <>
            <button onClick={handleSignin}>ログイン</button>
            <p>初めての方は <button className="linklike" onClick={()=>setMode("signup")}>こちら</button></p>
          </>
        ) : (
          <>
            <button onClick={handleSignup}>登録</button>
            <p>アカウントをお持ちの方は <button className="linklike" onClick={()=>setMode("signin")}>ログイン</button></p>
          </>
        )}
      </div>
    </div>
  );
}
