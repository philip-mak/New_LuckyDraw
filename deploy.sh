#!/bin/bash

# 快速部署腳本 (Quick Deploy Script)
# 使用方法: ./deploy.sh [platform]
# 平台選項: netlify, vercel, firebase

PLATFORM=${1:-"help"}

echo "🚀 幸運抽獎系統部署工具"
echo "=========================="

case $PLATFORM in
  "netlify")
    echo "📦 準備 Netlify 部署..."
    npm run build
    echo "✅ 建置完成！"
    echo "📁 請將 'dist' 資料夾拖拽到 https://netlify.com 進行部署"
    echo "🌐 或使用 Netlify CLI: npx netlify-cli deploy --prod --dir=dist"
    ;;
    
  "vercel")
    echo "📦 使用 Vercel 部署..."
    if ! command -v vercel &> /dev/null; then
      echo "安裝 Vercel CLI..."
      npm install -g vercel
    fi
    npx vercel --prod
    ;;
    
  "firebase")
    echo "📦 使用 Firebase 部署..."
    if ! command -v firebase &> /dev/null; then
      echo "安裝 Firebase CLI..."
      npm install -g firebase-tools
    fi
    npm run build
    firebase deploy
    ;;
    
  "github")
    echo "📦 準備 GitHub Pages 部署..."
    echo "確保已推送到 GitHub 並啟用 GitHub Pages"
    git add .
    git commit -m "Deploy to GitHub Pages"
    git push origin main
    echo "✅ 推送完成！檢查 GitHub Actions 部署狀態"
    ;;
    
  "local")
    echo "🏠 啟動本地伺服器 (區域網路存取)..."
    npm run build
    echo "使用以下命令啟動："
    echo "npx serve -s dist -l 3000"
    echo "或："
    echo "npm run preview -- --host"
    ;;
    
  *)
    echo "使用方法: ./deploy.sh [platform]"
    echo ""
    echo "可用平台:"
    echo "  netlify   - Netlify 部署 (推薦新手)"
    echo "  vercel    - Vercel 部署 (最快)"
    echo "  firebase  - Firebase 部署"
    echo "  github    - GitHub Pages 部署"
    echo "  local     - 本地網路分享"
    echo ""
    echo "範例:"
    echo "  ./deploy.sh netlify"
    echo "  ./deploy.sh vercel"
    ;;
esac