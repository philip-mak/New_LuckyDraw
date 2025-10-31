# 幸運抽獎系統使用手冊 (Lucky Draw System User Manual)

## 系統概述 (System Overview)

幸運抽獎系統是一個現代化的網頁應用程式，支援多種抽獎模式和參與者管理功能。系統採用 Vue 3 + TypeScript 開發，提供直觀的中文介面。

The Lucky Draw System is a modern web application that supports multiple drawing modes and participant management features. Built with Vue 3 + TypeScript, it provides an intuitive Chinese interface.

## 主要功能 (Key Features)

- 🎯 **參與者管理** - 新增、編輯、刪除參與者
- 🏆 **獎項設定** - 靈活的獎項配置和數量管理
- 🎲 **多重抽獎** - 支援一次抽取多個得獎者
- 📁 **CSV 匯入** - 批量匯入參與者和獎項資料
- 📊 **結果匯出** - 匯出抽獎結果為 CSV 檔案
- 🎨 **響應式設計** - 支援桌面和行動裝置
- ⚡ **即時動畫** - 流暢的抽獎動畫效果

## 系統要求 (System Requirements)

- 現代網頁瀏覽器 (Chrome, Firefox, Safari, Edge)
- JavaScript 已啟用
- 網路連線（開發環境需要）

## 快速開始 (Quick Start)

### 啟動開發伺服器 (Start Development Server)

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

系統將在 `http://localhost:3000` 啟動。

### 建置生產版本 (Build for Production)

```bash
# 建置生產版本
npm run build

# 預覽建置結果
npm run preview
```

## 詳細使用說明 (Detailed Usage Guide)

### 1. 首頁 (Home Page)

首頁提供系統概覽和快速導航：

- **統計資訊**: 顯示當前參與者數量、獎項數量和抽獎次數
- **快速操作**: 提供常用功能的快速入口
- **最近得獎者**: 顯示最新的抽獎結果

#### 主要操作按鈕:
- 🎲 **開始抽獎**: 跳轉到抽獎頁面
- 👥 **管理參與者**: 管理參與者資料
- 🏆 **設定獎項**: 配置獎項內容
- ⚙️ **系統設定**: 調整抽獎設定

### 2. 參與者管理 (Participant Management)

#### 新增參與者 (Add Participants)

**單個新增:**
1. 點擊「新增參與者」按鈕
2. 輸入參與者姓名
3. 點擊「確認」儲存

**批量新增:**
1. 點擊「批量新增」
2. 在文字框中輸入參與者姓名（每行一個）
3. 點擊「新增全部」

**CSV 匯入:**
1. 準備 CSV 檔案，格式：
   ```csv
   name
   張三
   李四
   王五
   ```
2. 點擊「匯入 CSV」
3. 選擇檔案上傳
4. 系統自動處理並新增參與者

#### 管理參與者 (Manage Participants)

- **編輯**: 點擊參與者卡片的編輯圖示
- **刪除**: 點擊刪除圖示並確認
- **搜尋**: 使用搜尋框快速尋找特定參與者
- **重設狀態**: 清除所有參與者的得獎記錄

### 3. 獎項設定 (Prize Configuration)

#### 新增獎項 (Add Prizes)

**單個新增:**
1. 點擊「新增獎項」
2. 填寫獎項資訊：
   - 獎項名稱（必填）
   - 獎項描述（選填）
   - 數量（預設 1）
3. 點擊「新增獎項」儲存

**批量新增:**
1. 點擊「批量新增」
2. 輸入格式：`獎項名稱,數量,描述`
3. 範例：
   ```
   頭獎,1,iPhone 15 Pro Max
   二獎,3,iPad Air
   三獎,5,AirPods Pro
   ```

**CSV 匯入:**
1. 準備 CSV 檔案，格式：
   ```csv
   name,quantity,description
   頭獎,1,iPhone 15 Pro Max
   二獎,3,iPad Air
   三獎,5,AirPods Pro
   ```
2. 點擊「匯入 CSV」上傳檔案

#### 管理獎項 (Manage Prizes)

- **編輯**: 修改獎項名稱、描述或數量
- **刪除**: 移除不需要的獎項
- **數量管理**: 系統自動追蹤剩餘數量

### 4. 抽獎操作 (Drawing Operations)

#### 設定抽獎參數 (Setup Drawing Parameters)

1. **選擇獎項**: 從下拉選單選擇要抽取的獎項
2. **設定得獎人數**: 選擇本次要抽取的得獎者數量
   - 系統會自動限制最大數量（基於可用參與者和獎項數量）
3. **確認設定**: 檢查抽獎資訊無誤

#### 執行抽獎 (Execute Drawing)

1. 點擊「開始抽獎」按鈕
2. 系統播放抽獎動畫
3. 顯示得獎結果：
   - 得獎者姓名
   - 獎項資訊
   - 抽獎時間

#### 抽獎規則 (Drawing Rules)

- 每位參與者只能得獎一次
- 已得獎的參與者不會再次被抽中
- 獎項數量用完後無法繼續抽取該獎項
- 支援同時抽取多位得獎者

### 5. 結果查看 (View Results)

#### 結果統計 (Result Statistics)

- **總抽獎次數**: 顯示累計進行的抽獎次數
- **總得獎人數**: 統計所有得獎者數量
- **獎項分布**: 各獎項的得獎情況

#### 得獎者清單 (Winner List)

- **按時間排序**: 最新得獎者優先顯示
- **詳細資訊**: 包含得獎者姓名、獎項、時間
- **搜尋功能**: 快速尋找特定得獎者

#### 匯出結果 (Export Results)

1. 點擊「匯出 CSV」按鈕
2. 系統生成包含以下欄位的 CSV 檔案：
   - 得獎者姓名
   - 獎項名稱
   - 獎項描述
   - 得獎時間
3. 檔案自動下載到本地

### 6. 系統設定 (System Settings)

#### 抽獎設定 (Drawing Settings)

- **動畫速度**: 調整抽獎動畫播放速度
- **顯示時間**: 設定結果顯示時長
- **音效設定**: 開啟/關閉抽獎音效

#### 資料管理 (Data Management)

- **匯出全部資料**: 備份所有參與者和獎項資料
- **匯入資料**: 從備份檔案恢復資料
- **清除資料**: 重設所有資料（謹慎使用）

## CSV 檔案格式 (CSV File Formats)

### 參與者 CSV 格式 (Participants CSV Format)

```csv
name
張三
李四
王五
趙六
```

### 獎項 CSV 格式 (Prizes CSV Format)

```csv
name,quantity,description
頭獎,1,iPhone 15 Pro Max
二獎,3,iPad Air
三獎,5,AirPods Pro
參與獎,20,精美禮品
```

### 匯出結果 CSV 格式 (Export Results CSV Format)

```csv
得獎者,獎項,描述,得獎時間
張三,頭獎,iPhone 15 Pro Max,2024-10-31 14:30:25
李四,二獎,iPad Air,2024-10-31 14:35:10
```

## 常見問題 (FAQ)

### Q: 如何重複使用參與者進行多次抽獎？
A: 在參與者管理頁面點擊「重設狀態」，清除所有得獎記錄，參與者就可以重新參與抽獎。

### Q: 獎項數量用完了怎麼辦？
A: 可以編輯獎項增加數量，或新增相同名稱的獎項。

### Q: 如何備份抽獎資料？
A: 在設定頁面使用「匯出全部資料」功能，或在結果頁面匯出得獎結果。

### Q: 支援哪些瀏覽器？
A: 支援所有現代瀏覽器，包括 Chrome、Firefox、Safari、Edge 等。

### Q: 可以離線使用嗎？
A: 開發版本需要網路連線，生產版本建置後可支援離線使用。

### Q: 如何自定義抽獎動畫？
A: 可以在系統設定中調整動畫速度，進階自定義需要修改程式碼。

## 技術支援 (Technical Support)

### 開發環境問題 (Development Issues)

如果遇到開發環境問題：

1. 確保 Node.js 版本 >= 16
2. 清除快取：`npm cache clean --force`
3. 重新安裝：`rm -rf node_modules package-lock.json && npm install`
4. 檢查連接埠衝突：`netstat -an | grep 3000`

### 建置問題 (Build Issues)

建置失敗時的解決步驟：

1. 檢查 TypeScript 錯誤：`npm run type-check`
2. 檢查語法錯誤：`npm run lint`
3. 更新依賴：`npm update`

### 效能優化 (Performance Optimization)

對於大量資料的處理建議：

- 參與者數量建議不超過 10,000 人
- 單次抽獎得獎者建議不超過 100 人
- 定期清理不需要的抽獎記錄

## 更新日誌 (Changelog)

### v1.0.0 (2024-10-31)

#### 新功能 (New Features)
- ✨ 完整的參與者管理系統
- ✨ 靈活的獎項配置功能
- ✨ 多重得獎者抽獎支援
- ✨ CSV 匯入匯出功能
- ✨ 響應式網頁設計
- ✨ 繁體中文介面

#### 技術特點 (Technical Features)
- ⚡ Vue 3 + TypeScript + Vite
- 🎨 Tailwind CSS 樣式框架
- 🗃️ Pinia 狀態管理
- 📱 PWA 支援準備
- 🔧 現代化開發工具鏈

---

## 授權資訊 (License Information)

本專案採用 MIT 授權條款。

## 貢獻指南 (Contributing)

歡迎提交 Issue 和 Pull Request 來改善這個專案！

---

**感謝使用幸運抽獎系統！** 🎉

如有任何問題或建議，請聯繫開發團隊。