# 📝 文字內容修改指南 (Text Content Modification Guide)

## 概述 (Overview)

本指南將教您如何修改Lucky Draw系統中的所有文字內容，包括標題、按鈕、說明文字等。

## 📁 主要檔案位置 (Main File Locations)

### 🏠 首頁 (Home Page) - `src/views/Home.vue`

#### 標題區域 (Header Section)
```vue
<!-- 第7行: 主標題 -->
<h1 class="text-3xl font-bold text-gray-900">🎉 我的抽獎系統</h1>

<!-- 第8行: 版本標籤 -->
<span class="ml-2 px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">專業版</span>

<!-- 第11-14行: 導航選單 -->
<router-link to="/">首頁</router-link>
<router-link to="/draw">抽獎</router-link>
<router-link to="/results">結果</router-link>
<router-link to="/settings">設定</router-link>
```

#### 歡迎區域 (Welcome Section)
```vue
<!-- 第22-23行: 主要標題 -->
<h2 class="text-4xl font-bold text-gray-900 mb-4">
  歡迎使用專業抽獎平台
</h2>

<!-- 第25-28行: 描述文字 -->
<p class="text-xl text-gray-600 max-w-3xl mx-auto">
  功能強大的抽獎管理系統，支援多種抽獎模式、
  批量匯入參與者，以及完整的結果追蹤。讓您的活動更加精彩！
</p>
```

#### 統計卡片 (Statistics Cards)
```vue
<!-- 第33-45行 -->
<div class="text-gray-600">參與人數</div>
<div class="text-gray-600">已選中獲獎者</div>
<div class="text-gray-600">可用獎品</div>
```

#### 功能卡片 (Action Cards)
```vue
<!-- 第59行: 新增參與者卡片 -->
<h3 class="text-lg font-semibold text-gray-900 ml-3">新增參與者</h3>
<p class="text-gray-600 mb-4">手動新增參與者或從 CSV 檔案匯入</p>

<!-- 第78行: 設定獎品卡片 -->
<h3 class="text-lg font-semibold text-gray-900 ml-3">設定獎品</h3>
<p class="text-gray-600 mb-4">為獲獎者配置獎品和獎勵</p>

<!-- 第97行: 開始抽獎卡片 -->
<h3 class="text-lg font-semibold text-gray-900 ml-3">開始抽獎</h3>
<p class="text-gray-600 mb-4">開始動畫抽選的幸運抽獎</p>
```

### 🎯 抽獎頁面 (Draw Page) - `src/views/Draw.vue`

主要文字內容：
- 頁面標題: "幸運抽獎"
- 獎項選擇: "選擇獎項"
- 得獎人數: "得獎人數"
- 抽獎按鈕: "開始抽獎"
- 獲獎者顯示區域

### 🏆 結果頁面 (Results Page) - `src/views/Results.vue`

主要文字內容：
- 頁面標題: "抽獎結果"
- 統計資訊標籤
- 匯出按鈕: "匯出 CSV"
- 結果表格標題

### ⚙️ 設定頁面 (Settings Page) - `src/views/Settings.vue`

主要文字內容：
- 頁面標題: "系統設定"
- 各種設定選項說明

### 📋 彈出視窗元件 (Modal Components)

#### 參與者管理 - `src/components/ParticipantModal.vue`
- 標題: "參與者管理"
- 表單標籤和按鈕文字

#### 獎項管理 - `src/components/PrizeModal.vue`
- 標題: "獎項管理"
- 表單標籤和按鈕文字

### 🌐 網站基本資訊 - `index.html`

```html
<!-- 第8行: 網站標題 (瀏覽器標籤顯示) -->
<title>我的抽獎系統 - 專業版</title>

<!-- 第9行: 網站描述 (SEO用) -->
<meta name="description" content="功能強大的抽獎管理系統，支援多種抽獎模式和完整的結果追蹤。" />
```

## ✏️ 修改步驟 (Modification Steps)

### 1. 編輯文字內容

使用任何文字編輯器打開相應的檔案，修改您想要的文字內容。

**範例：修改首頁標題**
```vue
<!-- 原來的 -->
<h1 class="text-3xl font-bold text-gray-900">🎯 幸運抽獎</h1>

<!-- 修改為 -->
<h1 class="text-3xl font-bold text-gray-900">🎊 我的公司抽獎</h1>
```

### 2. 重新建置專案

```bash
npm run build
```

### 3. 部署到 GitHub Pages

```bash
npx gh-pages -d dist
```

### 4. 等待更新

通常需要 2-3 分鐘，更新就會反映在您的網站上：
`https://philip-mak.github.io/New_LuckyDraw/`

## 🎨 常用修改範例 (Common Modification Examples)

### 修改公司/活動名稱

```vue
<!-- 首頁標題 -->
<h1 class="text-3xl font-bold text-gray-900">🏢 ABC公司年會抽獎</h1>

<!-- 歡迎訊息 -->
<h2 class="text-4xl font-bold text-gray-900 mb-4">
  歡迎參加ABC公司年會抽獎
</h2>
```

### 修改按鈕文字

```vue
<!-- 抽獎按鈕 -->
<button class="btn-primary">立即抽獎</button>

<!-- 新增參與者按鈕 -->
<button class="btn-primary">新增員工</button>
```

### 修改統計標籤

```vue
<div class="text-gray-600">員工人數</div>
<div class="text-gray-600">得獎員工</div>
<div class="text-gray-600">獎品總數</div>
```

### 修改導航選單

```vue
<router-link to="/">主頁</router-link>
<router-link to="/draw">開始抽獎</router-link>
<router-link to="/results">得獎名單</router-link>
<router-link to="/settings">系統管理</router-link>
```

## 💡 進階技巧 (Advanced Tips)

### 1. 使用表情符號和圖示

```vue
<h1>🎉 新年抽獎活動</h1>
<h3>🏆 設定獎品</h3>
<h3>👥 新增參與者</h3>
```

### 2. 多語言支援準備

將文字集中到變數中：
```vue
<script>
const texts = {
  title: '我的抽獎系統',
  welcome: '歡迎使用專業抽獎平台',
  // ... 其他文字
}
</script>

<template>
  <h1>{{ texts.title }}</h1>
</template>
```

### 3. 品牌色彩配合

修改對應的 CSS 類別以配合您的品牌色彩。

## 🚀 快速部署腳本 (Quick Deploy Script)

建立一個 `update_text.sh` 腳本：

```bash
#!/bin/bash
echo "🔄 更新文字內容並部署..."
npm run build
npx gh-pages -d dist
echo "✅ 部署完成！請等待 2-3 分鐘查看更新"
echo "🌐 網址: https://philip-mak.github.io/New_LuckyDraw/"
```

使用方法：
```bash
chmod +x update_text.sh
./update_text.sh
```

## 📞 需要協助？

如果您需要修改特定的文字內容但找不到位置，請告訴我您想修改什麼，我會幫您找到確切的檔案和行號！

---

**記住：每次修改後都需要重新建置和部署才能看到更新！** 🎯