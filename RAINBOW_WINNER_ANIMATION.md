# 🌈 Rainbow Winner Animation Guide

## How to See the Rainbow Animation on Winners

The rainbow cycling animation is now working on winner participant cards! Here's how to see it in action:

### ✅ Where to See the Rainbow Animation

1. **Check Lists View (檢查名單)** - `/check` 
   - **NEW!** Dedicated "Winners Showcase" section at the top
   - Displays all winner cards with continuous rainbow animation
   - Best place to see the animation effect clearly
   - Navigate: Click "檢查名單" in the main navigation

2. **During Drawing** - `/draw`
   - Rainbow animation shows on the currently selected card during drawing
   - After confirming winners, check the "Check Lists" view to see final animation

### 🎨 Animation Details

**Winner Card Animation:**
- **Colors**: Red → Yellow → Blue → Green → Purple → Pink (repeats)
- **Duration**: 2 seconds per cycle
- **Effects**: 
  - Continuous color cycling on background and border
  - Pulsing scale effect (1.08x to 1.12x)
  - Golden glow shadow
  - White text with shadow for visibility
  - Winner badge with white background

**Text Visibility:**
- All text on winner cards is white with black shadow
- Winner badge (🏆 獲獎者) has white background for contrast
- Ensures readability during color changes

### 📋 Steps to Test

1. **Load Sample Data**
   - Go to Home page
   - Click "🎄 載入聖誕派對範例數據 🎁"

2. **Do a Drawing**
   - Click "抽獎" in navigation
   - Select a prize
   - Click "開始抽獎"
   - Watch the rainbow animation during selection
   - Click "確認所有獲獎者"

3. **View Winners with Rainbow Animation**
   - Click "檢查名單" in navigation
   - Scroll to "🏆 獲獎者展示 (Rainbow Animation)" section
   - See all winner cards displaying continuous rainbow cycling!

### 🔧 Technical Implementation

**CSS Class:** `.participant-card.winner`
```css
animation: colorCycle 2s linear infinite, winnerPulse 1.5s ease-in-out infinite !important;
transform: scale(1.08) !important;
z-index: 100 !important;
border-width: 4px !important;
box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 10px 40px rgba(0, 0, 0, 0.2) !important;
filter: brightness(1.2) !important;
```

**Animations:**
- `colorCycle`: 6-color rainbow cycling at 2s intervals
- `winnerPulse`: Scale pulsing effect at 1.5s intervals

### 🎯 Why Check Lists View?

The "Check Lists" view is specifically designed to showcase winners with the rainbow animation because:
- Winners are displayed as actual `ParticipantCard` components
- No drawing mode interference
- Clean, focused display
- Easy to verify data and see animation simultaneously

### 🎉 Enjoy the Show!

The rainbow animation makes winners stand out beautifully and adds excitement to your Christmas Party 2025! 🎄✨
