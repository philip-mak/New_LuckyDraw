# 🚀 GitHub Pages 快速部署指南

## 📋 完整步驟清單

### ✅ 已完成 (Already Done)
- [x] Git 倉庫已初始化
- [x] 所有檔案已提交
- [x] Vite 配置已設定 GitHub Pages 路徑
- [x] GitHub Actions 工作流程已準備
- [x] 部署腳本已建立

### 🎯 接下來要做的 (Next Steps)

#### 1. 建立 GitHub 倉庫
1. 前往 [https://github.com](https://github.com)
2. 點擊右上角 "+" → "New repository"
3. 設定倉庫:
   - **名稱**: `New_LuckyDraw` (重要: 必須是這個名稱)
   - **描述**: `🎯 Modern Lucky Draw System - 幸運抽獎系統`
   - **可見性**: Public (免費 GitHub Pages 需要)
   - **不要** 勾選 "Add a README file"
4. 點擊 "Create repository"

#### 2. 推送代碼到 GitHub
複製你的倉庫 URL，然後在終端機執行:

```bash
# 使用你的實際倉庫 URL 替換下面的 URL
./github_deploy.sh https://github.com/你的用戶名/New_LuckyDraw.git
```

或者手動執行:
```bash
git remote add origin https://github.com/你的用戶名/New_LuckyDraw.git
git push -u origin main
```

#### 3. 啟用 GitHub Pages
1. 在 GitHub 倉庫頁面，點擊 **Settings** 選項卡
2. 向下滾動到 **Pages** 部分
3. 在 "Source" 下拉選單中:
   - 選擇 "Deploy from a branch"
   - Branch: 選擇 `gh-pages`
   - 保持 `/ (root)` 
4. 點擊 **Save**

#### 4. 等待部署完成
- GitHub Actions 會自動建置你的應用
- 前往 **Actions** 選項卡檢查進度
- 通常需要 2-5 分鐘完成

## 🌐 最終結果

你的 Lucky Draw 系統將可在以下網址存取:
```
https://你的用戶名.github.io/New_LuckyDraw/
```

## 📱 測試部署

部署完成後，測試以下功能:
- [ ] 首頁載入正常
- [ ] 參與者管理功能
- [ ] 獎項設定 (包含 CSV 匯入)
- [ ] 抽獎功能 (單次和多次)
- [ ] 結果查看和匯出
- [ ] 手機版本響應式設計

## 🔄 更新網站

之後如果要更新網站內容:

```bash
# 修改代碼後
git add .
git commit -m "更新說明"
git push origin main

# GitHub Actions 會自動重新部署
```

## 🆘 故障排除

### 問題: GitHub Actions 失敗
**解決**: 檢查 Actions 選項卡的錯誤訊息

### 問題: 網頁顯示 404
**解決**: 
1. 確認 Pages 設定選擇了 `gh-pages` 分支
2. 等待 5-10 分鐘讓 DNS 生效

### 問題: 靜態資源載入失敗
**解決**: 確認 `vite.config.ts` 中的 base 路徑正確

## 🎉 完成！

一旦設定完成，任何人都可以通過你的 GitHub Pages URL 存取和使用你的幸運抽獎系統！

---

**需要協助？** 檢查 GitHub 倉庫的 Actions 選項卡查看部署狀態。