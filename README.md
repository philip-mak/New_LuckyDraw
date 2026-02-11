# 晚宴抽獎系統 (Lucky Draw)

Vue 3 + TypeScript 抽獎應用，適合晚宴、活動使用。部署於 GitHub Pages。

---

## 專案結構

```
New_LuckyDraw/
├── .github/workflows/
│   └── deploy.yml          # 推送 main 時自動建置並部署到 GitHub Pages
├── public/                 # 靜態資源
├── src/
│   ├── components/         # 共用元件
│   ├── views/              # 頁面（首頁、抽獎、結果、設定等）
│   ├── stores/             # Pinia 狀態
│   ├── router/
│   ├── types/
│   ├── App.vue
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── participants_template.csv   # 參與者 CSV 範例
└── prizes_template.csv        # 獎品 CSV 範例
```

---

## 本地開發

**需求：** Node.js 18+

```bash
npm install
npm run dev
```

瀏覽器打開 http://localhost:3000 。  
建置：`npm run build`；預覽建置結果：`npm run preview`。

---

## 修改內容並部署到 GitHub Pages

每次改完程式並希望網站更新，依下列步驟即可。

### 1. 編輯並存檔

在 `src/` 底下修改（例如 `src/views/Home.vue`）。**務必存檔（Cmd+S）**，否則 git 不會看到變更。

### 2. 提交並推送

```bash
git add .
git commit -m "簡短描述你的修改"
git push origin main
```

### 3. 等待部署

- 到 GitHub 倉庫的 **Actions** 分頁，會看到「Deploy to GitHub Pages」工作執行。
- 約 1–2 分鐘內完成後，網站會更新。

### 4. 查看結果

- 網址：**https://\<你的 GitHub 用戶名>.github.io/New_LuckyDraw/**
- 若仍看到舊版：用 **硬重新整理**（Cmd+Shift+R）或無痕視窗開啟，避免快取。

---

## 注意事項

- **部署來源：** 在 GitHub 倉庫 **Settings → Pages** 中，請將 **Source** 設為 **GitHub Actions**。
- **不要提交 `dist/`：** 建置由 GitHub Actions 在雲端執行，本地無需也請勿提交 `dist` 資料夾。
- 修改後記得：**存檔 → commit → push**，網站才會更新。

---

## 授權

MIT License.
