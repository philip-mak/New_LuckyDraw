# 📋 Lucky Draw 匯入格式指南 (Import Format Guide)

## 📁 檔案格式說明 (File Format Overview)

Lucky Draw 系統支援 CSV 格式匯入參與者名單和獎品清單。本指南提供詳細的格式說明和範本檔案。

---

## 👥 參與者名單格式 (Participants Format)

### 🔧 支援的欄位 (Supported Fields)

| 欄位名稱 | 英文名稱 | 必填 | 說明 |
|---------|---------|------|------|
| **姓名** | name/names | ✅ 必填 | 參與者的姓名 |
| **電子郵件** | email/emails | ❌ 選填 | 聯絡用電子郵件 |
| **職位** | position/job/title | ❌ 選填 | 職稱或職位 |
| **群組** | group/department/team | ❌ 選填 | 部門、團隊或群組 |

### 📝 CSV 格式要求

- **檔案編碼**: UTF-8 (支援中文字)
- **分隔符**: 逗號 (,)
- **第一列**: 標題列 (欄位名稱)
- **副檔名**: .csv

### 🎯 標準格式 (完整欄位)
```csv
姓名,電子郵件,職位,群組
陳小明,chen@example.com,軟體工程師,技術部
王美麗,wang@example.com,產品經理,產品部
李志強,li@example.com,UI設計師,設計部
```

### 🎯 簡化格式 (僅姓名)
```csv
姓名
陳小明
王美麗
李志強
林雅婷
張偉民
```

### 🎯 英文欄位格式
```csv
name,email,position,group
John Smith,john@company.com,Developer,IT
Mary Johnson,mary@company.com,Manager,Sales
David Wilson,david@company.com,Designer,Design
```

### 🎯 混合格式 (中英文)
```csv
name,email,job,department
陳小明,chen@company.com,軟體工程師,技術部
John Smith,john@company.com,Manager,Sales
王美麗,wang@company.com,設計師,設計部
```

---

## 🏆 獎品清單格式 (Prizes Format)

### 🔧 支援的欄位 (Supported Fields)

| 欄位名稱 | 英文名稱 | 必填 | 說明 |
|---------|---------|------|------|
| **獎品名稱** | title/name | ✅ 必填 | 獎品的名稱 |
| **描述** | description/desc | ❌ 選填 | 獎品詳細描述 |
| **數量** | quantity/qty | ❌ 選填 | 獎品數量 (預設為1) |
| **順序** | order | ❌ 選填 | 抽獎順序 (預設自動排序) |

### 🎯 標準格式 (完整欄位)
```csv
獎品名稱,描述,數量,順序
第一名獎盃,金色獎盃給第一名,1,1
第二名獎牌,銀色獎牌給第二名,1,2
第三名獎狀,銅色獎狀給第三名,1,3
參加獎,精美禮品給參加者,10,4
```

### 🎯 簡化格式 (僅獎品名稱)
```csv
獎品名稱
第一名獎盃
第二名獎牌
第三名獎狀
參加獎
特別獎
```

### 🎯 英文欄位格式
```csv
title,description,quantity,order
First Prize,Gold Trophy for Winner,1,1
Second Prize,Silver Medal for Runner-up,1,2
Third Prize,Bronze Certificate,1,3
Participation Prize,Gift for All Participants,20,4
```

### 🎯 數量重點格式
```csv
獎品名稱,數量
iPhone 15,1
iPad Air,2
AirPods Pro,5
禮品卡,10
感謝狀,50
```

---

## 📥 匯入步驟 (Import Steps)

### 👥 匯入參與者
1. 準備 CSV 檔案 (使用上方格式)
2. 點擊「新增參與者」按鈕
3. 選擇「從 CSV 匯入」
4. 選擇並上傳您的 CSV 檔案
5. 系統會自動匯入所有參與者

### 🏆 匯入獎品
1. 準備 CSV 檔案 (使用上方格式)
2. 點擊「設定獎品」按鈕
3. 選擇「從 CSV 匯入獎品」
4. 選擇並上傳您的 CSV 檔案
5. 系統會自動匯入所有獎品

---

## 💡 實用技巧 (Useful Tips)

### 📊 Excel 製作 CSV
1. 在 Excel 中建立表格
2. 第一列輸入欄位名稱
3. 從第二列開始輸入資料
4. 另存為 → CSV UTF-8 (逗號分隔)

### 🔧 常見問題解決

**問題**: 中文字顯示亂碼
**解決**: 確保檔案儲存為 UTF-8 編碼

**問題**: 匯入後資料不完整
**解決**: 檢查欄位名稱是否正確 (參考上方支援的欄位)

**問題**: 數字欄位無法識別
**解決**: 確保數字欄位不包含文字或特殊符號

### 🎯 最佳實踐
1. **備份原始檔案**: 匯入前先備份
2. **測試小檔案**: 先用少量資料測試
3. **檢查格式**: 確認欄位名稱正確
4. **避免特殊字元**: 名稱中避免使用逗號

---

## 📋 範本檔案 (Template Files)

系統已包含以下範本檔案：
- `sample_participants.csv` - 參與者範本
- `sample_prizes.csv` - 獎品範本
- `participants_template_*.csv` - 各種參與者範本
- `prizes_template_*.csv` - 各種獎品範本

您可以下載這些範本並根據需要修改使用。