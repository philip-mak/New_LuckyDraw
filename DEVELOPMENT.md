# 🚀 Lucky Draw 開發與部署指南 (Development & Deployment Guide)

## 📍 目前狀態 (Current Status)
- ✅ 應用程式已完整開發並部署
- 🌐 線上網址: https://philip-mak.github.io/New_LuckyDraw/
- 🛠️ 本地開發環境已設置完成

## 🛠️ 開發工作流程 (Development Workflow)

### 1️⃣ 啟動本地開發 (Start Local Development)
```bash
# 啟動開發伺服器
npm run dev

# 開啟瀏覽器到:
# http://localhost:3000/New_LuckyDraw/
```

### 2️⃣ 測試功能清單 (Testing Checklist)
- [ ] **參與者管理**
  - 手動新增參與者
  - CSV 檔案匯入 (使用 templates/participants_template.csv)
  - 編輯/刪除功能
  
- [ ] **獎品設定**
  - 手動新增獎品
  - CSV 檔案匯入 (使用 templates/prizes_template.csv)
  - 獎品數量管理
  
- [ ] **抽獎功能**
  - 單次抽獎
  - 多名獲獎者選擇 (1-10人)
  - 抽獎動畫效果
  
- [ ] **結果管理**
  - 查看歷史結果
  - 匯出 CSV 檔案
  - 清除所有結果
  
- [ ] **響應式設計**
  - 桌面版顯示
  - 平板顯示
  - 手機版顯示

### 3️⃣ 常見修改項目 (Common Modifications)

#### 修改文字內容
```
src/views/Home.vue      # 首頁文字
src/views/Draw.vue      # 抽獎頁面文字
src/views/Settings.vue  # 設定頁面文字
src/views/Results.vue   # 結果頁面文字
```

#### 修改樣式
```
src/style.css          # 全域樣式
tailwind.config.js     # Tailwind 設定
```

#### 修改功能邏輯
```
src/stores/            # 狀態管理
src/components/        # 元件邏輯
```

### 4️⃣ 測試建置 (Test Build)
```bash
# 建置生產版本
npm run build

# 預覽建置結果
npm run preview
```

### 5️⃣ 部署流程 (Deployment Process)
```bash
# 建置並部署到 GitHub Pages
npm run build
npx gh-pages -d dist

# 等待 1-2 分鐘，然後檢查:
# https://philip-mak.github.io/New_LuckyDraw/
```

## 🎯 快速指令參考 (Quick Reference)

| 指令 | 用途 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置生產版本 |
| `npm run preview` | 預覽建置結果 |
| `npx gh-pages -d dist` | 部署到 GitHub Pages |

## 📁 範本檔案 (Template Files)

### 參與者範本 (Participants Template)
位置: `templates/participants_template.csv`
```csv
姓名,電子郵件,電話,部門
張三,zhang.san@example.com,0912-345-678,業務部
李四,li.si@example.com,0987-654-321,技術部
```

### 獎品範本 (Prizes Template)
位置: `templates/prizes_template.csv`
```csv
獎品名稱,數量,描述
iPhone 15,1,最新款智慧型手機
星巴克禮券,5,$500 禮券
```

## 🔧 常見問題 (Troubleshooting)

### 開發伺服器無法啟動
```bash
# 刪除 node_modules 重新安裝
rm -rf node_modules
npm install
npm run dev
```

### 部署後網頁顯示空白
- 確認 `vite.config.ts` 中的 base 設定正確
- 確認 GitHub Pages 設定已啟用

### CSV 匯入失敗
- 確認檔案格式為 UTF-8
- 確認欄位名稱符合範本格式
- 確認沒有空白列

## 📞 支援資訊 (Support)

如有問題，請檢查：
1. 瀏覽器開發者工具的錯誤訊息
2. 終端機的錯誤輸出
3. GitHub Actions 的部署紀錄