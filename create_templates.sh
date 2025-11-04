#!/bin/bash

# 🎯 Lucky Draw 範本檔案生成器 (Template File Generator)
# 使用方法: ./create_templates.sh

echo "🎯 Lucky Draw 範本檔案生成器"
echo "==============================="

# 建立範本目錄
TEMPLATE_DIR="templates"
if [ ! -d "$TEMPLATE_DIR" ]; then
    mkdir -p "$TEMPLATE_DIR"
    echo "📁 建立範本目錄: $TEMPLATE_DIR"
fi

echo ""
echo "📋 可用的範本類型:"
echo "1. 參與者範本 (Participants Templates)"
echo "2. 獎品範本 (Prizes Templates)"
echo "3. 全部範本 (All Templates)"
echo ""

read -p "請選擇要生成的範本類型 (1-3): " choice

case $choice in
    1)
        echo "📝 生成參與者範本..."
        cp participants_template_*.csv "$TEMPLATE_DIR/" 2>/dev/null || echo "⚠️  找不到參與者範本檔案"
        echo "✅ 參與者範本已複製到 $TEMPLATE_DIR/"
        ;;
    2)
        echo "🏆 生成獎品範本..."
        cp prizes_template_*.csv "$TEMPLATE_DIR/" 2>/dev/null || echo "⚠️  找不到獎品範本檔案"
        echo "✅ 獎品範本已複製到 $TEMPLATE_DIR/"
        ;;
    3)
        echo "📦 生成所有範本..."
        cp *_template_*.csv "$TEMPLATE_DIR/" 2>/dev/null || echo "⚠️  找不到範本檔案"
        cp sample_*.csv "$TEMPLATE_DIR/" 2>/dev/null || echo "⚠️  找不到樣本檔案"
        echo "✅ 所有範本已複製到 $TEMPLATE_DIR/"
        ;;
    *)
        echo "❌ 無效的選擇"
        exit 1
        ;;
esac

echo ""
echo "📋 範本檔案清單:"
ls -la "$TEMPLATE_DIR/"*.csv 2>/dev/null || echo "📁 $TEMPLATE_DIR/ 目錄為空"

echo ""
echo "💡 使用方式:"
echo "1. 選擇適合的範本檔案"
echo "2. 用 Excel 或文字編輯器開啟"
echo "3. 修改內容符合您的需求"
echo "4. 儲存為 UTF-8 編碼的 CSV 檔案"
echo "5. 在 Lucky Draw 系統中匯入"

echo ""
echo "🎉 範本生成完成！"