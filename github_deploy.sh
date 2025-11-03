#!/bin/bash

# GitHub Pages Deployment Script
# Run this after creating your GitHub repository

echo "🚀 GitHub Pages 部署腳本"
echo "======================="

# Check if repository URL is provided
if [ -z "$1" ]; then
    echo "❌ 請提供 GitHub 倉庫 URL"
    echo "用法: ./github_deploy.sh https://github.com/username/New_LuckyDraw.git"
    echo ""
    echo "步驟:"
    echo "1. 在 GitHub 上建立名為 'New_LuckyDraw' 的倉庫"
    echo "2. 複製倉庫 URL"
    echo "3. 執行: ./github_deploy.sh [倉庫URL]"
    exit 1
fi

REPO_URL=$1

echo "📡 設定遠端倉庫..."
git remote add origin $REPO_URL

echo "🔄 推送到 GitHub..."
git push -u origin main

echo ""
echo "✅ 代碼已推送到 GitHub！"
echo ""
echo "🌐 接下來的步驟:"
echo "1. 前往你的 GitHub 倉庫"
echo "2. 點擊 Settings 選項卡"
echo "3. 滾動到 Pages 部分"
echo "4. 在 Source 下選擇 'Deploy from a branch'"
echo "5. 選擇 'gh-pages' 分支"
echo "6. 點擊 Save"
echo ""
echo "⏳ GitHub Actions 將自動建置並部署你的網站"
echo "🎯 網站將可在以下網址存取:"
echo "   https://[你的用戶名].github.io/New_LuckyDraw/"
echo ""
echo "📋 檢查部署狀態:"
echo "   前往 Actions 選項卡查看建置進度"