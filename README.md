# 💕 Love Quiz - 戀愛心理測驗

> 大廳（真實多人聊天）+ 測驗 + 配對 + 私聊

---

## 🚀 快速開始

```bash
npm install
npm run dev
# 開啟 http://localhost:5173
```

> ⚠️ 需要先設定 Firebase 才能讓聊天室正常運作（見下方步驟）

---

## 🔥 Firebase 設定（5 分鐘完成）

### 步驟一：建立 Firebase 專案

1. 前往 https://console.firebase.google.com/
2. 點「新增專案」，取名後關閉 Google Analytics
3. 左側 → **Build → Realtime Database** → 建立資料庫
   - 地區選 **asia-southeast1**（台灣最近）
   - 規則選「**測試模式**」
4. 左側齒輪 ⚙️ → **專案設定** → 你的應用程式 → 點 **</>**（Web）
5. 複製出現的 `firebaseConfig` 物件

### 步驟二：填入 src/lib/firebase.js

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "your-project.firebaseapp.com",
  databaseURL:       "https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456...",
}
```

### 步驟三：安全規則（正式上線前必做）

Firebase Console → Realtime Database → **規則**：

```json
{
  "rules": {
    "messages": {
      "$room": {
        ".read": true,
        ".write": true,
        "$msgId": {
          ".validate": "newData.hasChildren(['nickname','text','timestamp'])
            && newData.child('text').val().length <= 200
            && newData.child('nickname').val().length <= 20"
        }
      }
    },
    "presence": {
      "$room": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

---

## 🌐 部署到自己的網域

### Vercel（最推薦）

```bash
npm run build
npm i -g vercel
vercel
# 在 Vercel 後台 → Domains 綁定你的網域
```

### Netlify（拖曳最快）

1. `npm run build`
2. 拖曳 `dist/` 到 https://netlify.com
3. Site settings → Domain management 綁定網域

### ⚠️ 必須加 Router 設定，否則重新整理會 404

**Netlify** - 建立 `public/_redirects`：
```
/*  /index.html  200
```

**Vercel** - 建立 `vercel.json`：
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 📁 專案結構

```
src/
├── data/
│   ├── questions.js      # 三套題庫
│   └── candidates.js     # 四位配對人物
├── lib/
│   ├── firebase.js       # ← 填入你的 Firebase config
│   ├── useChat.js        # 聊天 Hook（連線/上線人數/收發訊息）
│   └── match.js          # 餘弦相似度配對演算法
├── pages/
│   ├── Login.jsx         # 暱稱輸入
│   ├── Lobby.jsx         # 大廳（真實多人聊天）
│   ├── QuizPage.jsx      # 測驗
│   ├── MatchPage.jsx     # 配對結果
│   └── ChatPage.jsx      # 私聊
├── styles/theme.css      # CSS 變數與共用樣式
└── App.jsx               # 路由 + Context
```

---

## 💡 Firebase 免費額度（Spark 方案）

| 項目 | 免費上限 |
|------|----------|
| 同時連線 | 100 人 |
| 每月下載 | 10 GB |
| 儲存空間 | 1 GB |

對一般小型活動完全足夠。

---

## 🔮 未來擴充方向

- [ ] 「最新測驗結果」改接 Firebase 真實資料
- [ ] 私聊室接 Firebase（roomId = 雙人暱稱組合）
- [ ] Google 登入（不用手動輸入暱稱）
- [ ] 測驗結果分享卡片（Canvas 截圖）
