# Lucky Draw - Modern

A modern, free online lottery application built with Vue 3, TypeScript, and Tailwind CSS. Perfect for marketing giveaways, corporate events, and celebrations.

## 🚀 Features

### Core Functionality
- **Participant Management**: Add participants manually, via CSV import, or bulk text input
- **Prize Configuration**: Set up multiple prizes with quantities and draw order
- **Animated Drawing**: Smooth, customizable draw animations with visual feedback
- **Winner Tracking**: Track all winners with automatic prize assignment
- **Results Export**: Export results to CSV format

### Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Clean Interface**: Modern, intuitive design with Tailwind CSS
- **Real-time Updates**: Live updates during the drawing process
- **Visual Feedback**: Cards highlight and animate during selection
- **Accessibility**: Keyboard navigation and screen reader support

### Customization Options
- **Animation Speed**: Adjust draw animation duration (1-10 seconds)
- **Display Options**: Toggle participant details on cards
- **Sound Effects**: Enable/disable audio feedback
- **Duplicate Winners**: Allow or prevent multiple wins per person
- **Theme Support**: Light and dark themes
- **Card Styles**: Default, compact, or detailed card layouts

### Data Management
- **CSV Import/Export**: Import participant lists and export results
- **Data Backup**: Export all application data as JSON
- **Data Recovery**: Import previous sessions and configurations
- **Local Storage**: Automatic saving of progress

## 🛠 Technology Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Type Safety**: TypeScript for better development experience
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for modern, responsive design
- **State Management**: Pinia for reactive state management
- **Routing**: Vue Router 4 for navigation

## 🏗 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ParticipantCard.vue    # Individual participant display
│   ├── ParticipantModal.vue   # Add participants modal
│   └── PrizeModal.vue         # Add prizes modal
├── stores/              # Pinia store modules
│   ├── participants.ts        # Participant management
│   ├── prizes.ts             # Prize management
│   └── settings.ts           # App settings
├── views/               # Page components
│   ├── Home.vue              # Landing page
│   ├── Draw.vue              # Drawing interface
│   ├── Results.vue           # Results display
│   └── Settings.vue          # Configuration page
├── types/               # TypeScript type definitions
│   └── index.ts
├── router/              # Vue Router configuration
│   └── index.ts
├── App.vue              # Root component
├── main.ts              # Application entry point
└── style.css            # Global styles
```

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🎯 Usage Guide

### 1. Adding Participants
- **Manual Entry**: Use the "Add Participants" button to add individuals
- **CSV Import**: Upload a CSV file with columns: Name, Email, Position, Group
- **Bulk Input**: Paste multiple names, one per line

### 2. Setting Up Prizes
- Click "Add Prizes" to configure rewards
- Set quantities and draw order
- Add descriptions for clarity

### 3. Conducting the Draw
- Navigate to the Draw page
- Click "Start Draw" to begin animation
- Watch as participants are randomly selected
- Confirm winners or redraw if needed

### 4. Managing Results
- View all winners on the Results page
- Export results as CSV
- Clear results to start fresh

### 5. Customizing Settings
- Adjust animation speed and visual preferences
- Configure drawing rules (duplicates, etc.)
- Export/import data for backup

## 🎨 Customization

### Themes
The application supports light and dark themes. Switch between them in Settings.

### Card Styles
Choose from three card display options:
- **Default**: Standard participant cards with avatar and basic info
- **Compact**: Minimal cards for large participant lists
- **Detailed**: Extended cards showing all participant information

### Animation Settings
Customize the drawing experience:
- Animation duration (1-10 seconds)
- Visual effects and transitions
- Sound effects (when available)

## 📊 Data Format

### Participant CSV Format
```csv
Name,Email,Position,Group
John Doe,john@example.com,Developer,Engineering
Jane Smith,jane@example.com,Designer,Marketing
```

### Export Data Structure
The application exports comprehensive data including:
- Participant information
- Prize configurations
- Draw results with timestamps
- Application settings

## 🔒 Privacy & Security

- **Local Storage**: All data is stored locally in your browser
- **No Server**: No data is sent to external servers
- **Privacy First**: Your participant information stays on your device
- **Export Control**: You control when and how to export data

## 🤝 Contributing

This is a modern rewrite of the original Lucky Draw application. Contributions are welcome!

### Development Guidelines
- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Maintain responsive design principles
- Add tests for new features
- Update documentation

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Based on the original Lucky Draw application, modernized with:
- Vue 3 and TypeScript
- Modern build tools and development practices
- Enhanced user experience and accessibility
- Improved performance and maintainability

## 🆚 Comparison with Original

### Improvements
- **Modern Stack**: Vue 3, TypeScript, Vite vs Vue 2, JavaScript, Webpack
- **Better Performance**: Faster builds and runtime performance
- **Type Safety**: Full TypeScript support prevents common errors
- **Mobile First**: Responsive design works on all devices
- **Accessibility**: Better keyboard navigation and screen reader support
- **Developer Experience**: Modern tooling and hot reload

### Maintained Features
- All core drawing functionality
- CSV import/export capabilities
- Customizable animations and settings
- Winner tracking and results management
- Fair and random selection algorithm