// src/firebase.js
// Firebase 初期化ファイル（あなたが渡してくれた設定を使用）
// 注意：Firebase のクライアント設定はウェブアプリから見える形になりますが
//       サーバー側の秘密情報（Admin SDKのキーやSendGrid等のAPIキー）は
//       公開しないでください。

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCaove_BC5st3XY3QmhyArDOnmYQJEoBTs",
  authDomain: "koureisya-support-app-test-5.firebaseapp.com",
  projectId: "koureisya-support-app-test-5",
  storageBucket: "koureisya-support-app-test-5.firebasestorage.app",
  messagingSenderId: "656162082322",
  appId: "1:656162082322:web:13584e43d548060cd8d2cb",
  measurementId: "G-J2PNMSX8L9"
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);

// analytics はブラウザ環境でのみ初期化（Server Side Rendering の場合の安全策）
let analytics = null;
try {
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
} catch (e) {
  // analytics がサポートされない環境では無視
  console.warn("Firebase Analytics の初期化に失敗しました。", e);
}

// エクスポート：他のモジュールから使えるように auth, db を公開
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
