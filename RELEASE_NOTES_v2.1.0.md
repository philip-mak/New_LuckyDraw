# Release Notes v2.1.0 🎯

## 多場次抽獎系統 (Multi-Session Draw System)

**Release Date:** November 4, 2025

### 🎉 主要新功能 (Major New Features)

#### 1. 多場次管理 (Multi-Session Management)
- ✨ **獨立場次系統**: 可以創建和管理多個獨立的抽獎場次
- 🎨 **顏色識別**: 每個場次都有獨特的顏色標識，方便快速識別
- 💾 **自動保存**: 所有場次數據自動保存到瀏覽器 localStorage
- 📊 **進度追蹤**: 每個場次顯示獨立的進度條和統計信息

#### 2. 觸控滑動切換 (Touch Swipe Navigation)
- 👆 **滑動切換**: 在手機上可以左右滑動切換不同場次
- 📱 **移動優化**: 針對移動設備優化的觸控體驗
- 🎯 **視覺指示器**: 底部圓點指示器顯示當前場次位置
- 🔄 **平滑動畫**: 流暢的過渡動畫提升用戶體驗

#### 3. 場次導出/導入 (Session Import/Export)
- 💾 **場次導出**: 將單個場次導出為 JSON 文件保存
- 📤 **場次導入**: 從文件導入場次數據，創建新場次
- 🔒 **數據隔離**: 每個場次的參與者、獎品、獲獎記錄完全獨立
- ⚙️ **批量管理**: 可以同時管理多個抽獎活動

#### 4. 全局場次選擇器 (Global Session Selector)
- 🎯 **頂部固定**: 場次選擇器固定在頁面頂部，隨時可見
- ➕ **快速創建**: 一鍵創建新場次，自定義名稱和顏色
- 📈 **即時統計**: 顯示每個場次的參與者、獎品、獲獎者數量
- 🎨 **12種顏色**: 提供12種預設顏色方案選擇

### 🔧 技術改進 (Technical Improvements)

#### Store 架構重構
```typescript
// Sessions Store (新增)
- 場次 CRUD 操作
- 活動場次追蹤
- 複製和清空場次功能

// Participants Store (重構)
- 場次感知的參與者管理
- 自動同步到活動場次
- Computed 屬性提供響應式數據

// Prizes Store (重構)
- 場次感知的獎品管理
- 自動同步到活動場次
- 獨立的獎品庫存管理
```

#### 組件架構
```
App.vue
  └── SessionSelector (全局)
      └── 觸控滑動支持
      └── 新建場次模態框
      └── 顏色選擇器
```

### 📋 使用場景 (Use Cases)

#### 場景 1: 公司年會多輪抽獎
- 創建「VIP抽獎」場次
- 創建「員工抽獎」場次
- 創建「參加獎」場次
- 每個場次獨立管理參與者和獎品

#### 場景 2: 多日活動管理
- 第一天抽獎: 匯出保存
- 第二天抽獎: 創建新場次
- 第三天抽獎: 創建新場次
- 活動結束: 統一管理所有數據

#### 場景 3: AB測試/演示
- 測試場次A: 測試不同配置
- 測試場次B: 對比結果
- 演示場次: 載入範例數據展示

### 🎨 用戶界面更新 (UI Updates)

#### SessionSelector 組件
```vue
<!-- 場次卡片顯示 -->
📝 場次名稱
🎯 進度: X/Y (已抽/總數)
📊 彩色進度條
🎨 場次顏色標識
```

#### Draw 頁面
```vue
<!-- 頂部顯示 -->
🎯 幸運抽獎
場次: [顏色標識] 場次名稱
```

### 💾 數據存儲結構 (Data Storage)

```json
{
  "sessions": [
    {
      "id": "session-xxx",
      "name": "VIP抽獎",
      "color": "#3b82f6",
      "createdAt": "2025-11-04T...",
      "lastModified": "2025-11-04T...",
      "participants": [...],
      "prizes": [...],
      "winners": [...]
    }
  ],
  "activeSessionId": "session-xxx"
}
```

### 📦 導出文件格式 (Export Format)

```json
{
  "name": "VIP抽獎",
  "exportDate": "2025-11-04T...",
  "participants": [...],
  "prizes": [...],
  "winners": [...]
}
```

### 🔄 升級指南 (Upgrade Guide)

#### 從 v2.0.0 升級到 v2.1.0

1. **自動遷移**: 首次啟動會自動創建「預設抽獎」場次
2. **現有數據**: v2.0.0 的數據會被遷移到新的場次系統
3. **localStorage**: 數據結構會自動更新
4. **向後兼容**: 可以繼續使用現有功能

#### 新用戶
- 首次使用會自動創建第一個場次
- 點擊「+」按鈕創建更多場次
- 使用「載入範例數據」快速開始

### 🐛 已知問題 (Known Issues)

無重大問題 ✅

### 🎯 未來計劃 (Future Plans)

- [ ] 場次搜索和過濾功能
- [ ] 場次數據統計圖表
- [ ] 批量導出所有場次
- [ ] 場次模板功能
- [ ] 場次標籤和分類

### 👥 貢獻者 (Contributors)

- GitHub Copilot AI Assistant
- User: philip-mak

---

## 完整變更日誌 (Full Changelog)

### 新增 (Added)
- 多場次管理系統
- 觸控滑動場次切換
- 場次導出/導入功能
- 全局場次選擇器組件
- 場次複製功能
- 場次清空功能
- 12種預設顏色方案
- 場次進度指示器
- 場次統計信息顯示

### 修改 (Changed)
- Participants Store 重構為場次感知
- Prizes Store 重構為場次感知
- 導出/導入功能改為場次級別
- App.vue 新增全局頂部欄
- Draw.vue 顯示當前場次名稱
- Home.vue 數據管理改為場次級別

### 優化 (Improved)
- 移動端觸控體驗
- 數據隔離和管理
- 用戶界面一致性
- 響應式設計

### 修復 (Fixed)
- N/A (無需修復的問題)

---

**下載**: [GitHub Releases](https://github.com/philip-mak/New_LuckyDraw/releases/tag/v2.1.0)

**文檔**: 查看 README.md 了解詳細使用說明

**問題反饋**: [GitHub Issues](https://github.com/philip-mak/New_LuckyDraw/issues)
