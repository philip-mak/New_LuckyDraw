# 部署指南 - 將幸運抽獎系統部署為網頁應用 (Deployment Guide - Deploy Lucky Draw as Web App)

## 概述 (Overview)

本指南將教您如何將幸運抽獎系統部署為可從任何電腦存取的網頁應用程式。我們提供多種部署選項，從免費到付費，從簡單到進階。

This guide shows you how to deploy the Lucky Draw System as a web application accessible from any computer. We provide multiple deployment options from free to paid, simple to advanced.

## 部署選項比較 (Deployment Options Comparison)

| 平台 | 費用 | 難度 | 部署時間 | 自定義域名 | SSL證書 |
|------|------|------|----------|------------|---------|
| **Netlify** | 免費 | ⭐ | 5分鐘 | ✅ (付費) | ✅ |
| **Vercel** | 免費 | ⭐ | 5分鐘 | ✅ (付費) | ✅ |
| **GitHub Pages** | 免費 | ⭐⭐ | 10分鐘 | ✅ (免費) | ✅ |
| **Firebase Hosting** | 免費 | ⭐⭐ | 15分鐘 | ✅ (免費) | ✅ |
| **AWS S3 + CloudFront** | 付費 | ⭐⭐⭐ | 30分鐘 | ✅ | ✅ |

---

## 🚀 快速部署 (Quick Deploy) - 推薦方法

### 最簡單方法：Netlify 拖拽部署 (Easiest: Netlify Drag & Drop)

1. **建置專案 (Build Project)**
   ```bash
   npm run build
   ```

2. **前往 Netlify** 
   - 訪問 [https://netlify.com](https://netlify.com)
   - 註冊免費帳戶

3. **拖拽部署**
   - 將 `dist` 資料夾直接拖到 Netlify 部署區域
   - 獲得即時網址，例如：`https://lucky-draw-123456.netlify.app`

✅ **完成！** 您的應用現在可以從任何電腦存取！

---

## 方法一：Netlify 部署 (詳細步驟) [Method 1: Netlify (Detailed)]

### 特點 (Features)
- ✅ 完全免費 (Free tier)
- ✅ 自動 HTTPS
- ✅ 全球 CDN
- ✅ 自動部署 (Git integration)

### 步驟 (Steps)

#### 1. 準備專案 (Prepare Project)

```bash
# 建置生產版本
npm run build

# 確認 dist 資料夾已生成
ls -la dist/
```

#### 2. 註冊 Netlify 帳戶 (Sign up for Netlify)

1. 前往 [https://netlify.com](https://netlify.com)
2. 點擊 "Sign up" 註冊帳戶
3. 選擇 GitHub/GitLab 或 Email 註冊

#### 3. 部署方式 A：拖拽部署 (Drag & Drop Deploy)

1. 登入 Netlify Dashboard
2. 找到 "Deploy manually" 區域
3. 將 `dist` 資料夾拖拽到部署區域
4. 等待上傳完成，獲得網址 (例如: `https://amazing-app-123456.netlify.app`)

#### 4. 部署方式 B：Git 自動部署 (Git Auto Deploy)

```bash
# 1. 初始化 Git 倉庫 (如果尚未完成)
git init
git add .
git commit -m "Initial Lucky Draw app"

# 2. 推送到 GitHub (需要先在 GitHub 建立倉庫)
git branch -M main
git remote add origin https://github.com/yourusername/lucky-draw.git
git push -u origin main
```

在 Netlify Dashboard:
1. 點擊 "New site from Git"
2. 選擇 GitHub
3. 選擇你的倉庫
4. 設定建置參數：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 點擊 "Deploy site"

---

## 方法二：Vercel 部署 [Method 2: Vercel]

### 特點 (Features)
- ✅ 免費額度充足
- ✅ 超快部署
- ✅ 自動優化
- ✅ Edge Functions 支援

### 步驟 (Steps)

#### 1. 安裝 Vercel CLI

```bash
npm i -g vercel
```

#### 2. 部署

```bash
# 登入 Vercel
vercel login

# 部署專案
vercel

# 跟隨提示設定：
# - Project name: lucky-draw
# - Framework preset: Vite
# - Build command: npm run build
# - Output directory: dist
```

#### 3. 生產部署

```bash
vercel --prod
```

---

## 方法三：GitHub Pages 部署 [Method 3: GitHub Pages]

### 特點 (Features)
- ✅ 完全免費
- ✅ 與 GitHub 整合
- ✅ 支援自定義域名
- ✅ 自動 SSL

### 步驟 (Steps)

#### 1. 修改 Vite 配置 (Update Vite Config)

在 `vite.config.ts` 中添加 base 路徑：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/lucky-draw/', // 替換為你的 GitHub 倉庫名稱
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
```

#### 2. 建立 GitHub Actions 工作流程

建立 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### 3. 推送到 GitHub 並啟用 Pages

```bash
# 提交更改
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main

# 前往 GitHub 倉庫 → Settings → Pages
# Source 選擇 "Deploy from a branch"
# Branch 選擇 "gh-pages"
```

---

## 方法四：Firebase Hosting [Method 4: Firebase Hosting]

### 步驟 (Steps)

```bash
# 1. 安裝 Firebase CLI
npm install -g firebase-tools

# 2. 登入並初始化
firebase login
firebase init hosting

# 3. 建置並部署
npm run build
firebase deploy
```

---

## 🚀 最快部署方法 (Fastest Deploy Method)

### 選項 1: Netlify (推薦)
1. 執行 `npm run build`
2. 前往 [netlify.com](https://netlify.com)
3. 拖拽 `dist` 資料夾到部署區域
4. 完成！獲得網址如：`https://lucky-draw-xyz.netlify.app`

### 選項 2: Vercel (最快)
```bash
npx vercel
# 跟隨提示，幾分鐘內完成部署
```

---

## 📱 進階功能 (Advanced Features)

### PWA 支援 (讓應用更像手機 App)

```bash
# 安裝 PWA 插件
npm install -D vite-plugin-pwa

# 更新 vite.config.ts
# 添加 PWA 配置（詳見完整指南）
```

### 自定義域名
- **免費選項**: GitHub Pages (支援自定義域名)
- **付費選項**: Netlify/Vercel Pro 方案

---

## 🔧 故障排除 (Troubleshooting)

### 常見問題
1. **404 錯誤**: 添加 `_redirects` 檔案到 `public` 目錄
2. **建置失敗**: 執行 `npm run build` 檢查錯誤
3. **路徑問題**: 檢查 `vite.config.ts` 中的 `base` 設定

---

## 💡 建議 (Recommendations)

**新手用戶**: 使用 Netlify 拖拽部署
**開發者**: 使用 Vercel CLI 或 GitHub Actions
**企業用戶**: 考慮 AWS/GCP 方案

您的幸運抽獎應用現在可以讓任何人透過網路存取使用了！🎉

<function_calls>
<invoke name="read_file">
<parameter name="filePath">/Users/philipmak/Code/LuckyDraw/New_LuckyDraw/vite.config.ts