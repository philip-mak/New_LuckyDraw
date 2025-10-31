# 🚨 **Important Setup Instructions**

## **Node.js Required**

To run this Lucky Draw application, you need to install **Node.js** first:

### **MacOS Installation Options:**

1. **Download from Official Site:**
   - Go to https://nodejs.org/
   - Download the LTS version
   - Run the installer

2. **Using Homebrew (Recommended):**
   ```bash
   # Install Homebrew if not installed
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

3. **Using Node Version Manager (NVM):**
   ```bash
   # Install NVM
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Restart terminal or source profile
   source ~/.zshrc
   
   # Install latest LTS Node.js
   nvm install --lts
   nvm use --lts
   ```

### **After Node.js Installation:**

1. **Verify Installation:**
   ```bash
   node --version  # Should show v18+ or v20+
   npm --version   # Should show 8+ or 9+
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Open Browser:**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL shown in terminal

### **Production Build:**
```bash
npm run build       # Build for production
npm run preview     # Preview production build
```

---

## **✅ Project Status: READY**

All project files have been created successfully:
- ✅ Vue 3 + TypeScript + Vite setup
- ✅ Tailwind CSS configuration
- ✅ Complete component structure
- ✅ Pinia store management
- ✅ Router configuration
- ✅ All views and components implemented
- ✅ Modern responsive design
- ✅ Full feature set from original Lucky Draw

**Just install Node.js and you're ready to go!**