// src/lib/firebase.js
//
// ════════════════════════════════════════════════════════
//  設定步驟（只需做一次）：
//
//  1. 前往 https://console.firebase.google.com/
//  2. 建立新專案（免費 Spark 方案即可）
//  3. 左側選單 → Build → Realtime Database → 建立資料庫
//     地區選 asia-southeast1（新加坡，台灣最近）
//     規則先選「測試模式」（之後再鎖定）
//  4. 左側齒輪 → 專案設定 → 你的應用程式 → 選 Web (</>)
//  5. 複製 firebaseConfig 貼到下方，取代 YOUR_XXX 的部分
//  6. 完成！重新 npm run dev 即可
// ════════════════════════════════════════════════════════

import { initializeApp } from 'firebase/app'
import { getDatabase }   from 'firebase/database'

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL:       "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
