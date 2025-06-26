# 🩸 Project RED - Blood Donor Database

## 🚀 Live Demo
Visit the live application: **[https://numaan7.github.io/PROJECTRED](https://numaan7.github.io/PROJECTRED)**

## 📱 Progressive Web App (PWA)
This is a fully functional PWA that can be installed on your device:
- **Mobile**: Tap "Add to Home Screen" 
- **Desktop**: Click the install button in your browser

## ✨ Features
- 🔐 **Google Authentication** - Secure sign-in
- 🩸 **Blood Group Compatibility** - Smart donor matching
- 🗺️ **Location-based Search** - Find donors nearby
- 🔒 **Privacy First** - GDPR compliant with consent management
- 📱 **PWA Support** - Install as native app
- 🌐 **Offline Capable** - Works without internet
- 📲 **Push Notifications** - For urgent requests
- 🏥 **NBTC/NACO Compliant** - Follows medical guidelines

## 🛠️ Technologies Used
- **Frontend**: React.js, Material-UI (MUI)
- **Backend**: Firebase (Firestore, Authentication)
- **PWA**: Service Workers, Web App Manifest
- **Deployment**: GitHub Pages
- **Maps**: Google Maps API
- **Phone**: International phone number support

## 🚀 Deployment Instructions

### Prerequisites
1. Node.js (v18 or higher)
2. Git
3. GitHub account

### Local Development
\`\`\`bash
# Clone the repository
git clone https://github.com/numaan7/PROJECTRED.git

# Navigate to project directory
cd PROJECTRED/projectred

# Install dependencies
npm install

# Start development server
npm start
\`\`\`

### Deploy to GitHub Pages

#### Option 1: Automatic Deployment (Recommended)
1. **Push to GitHub**: Any push to `main` branch triggers automatic deployment
2. **GitHub Actions**: Workflow file is already configured
3. **Live in 2-3 minutes**: Check the Actions tab for progress

#### Option 2: Manual Deployment
\`\`\`bash
# Build and deploy manually
npm run deploy
\`\`\`

### GitHub Pages Setup
1. Go to your GitHub repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. Your app will be available at: `https://yourusername.github.io/PROJECTRED`

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Google provider)
3. Create Firestore database
4. Update `src/firebase/config.js` with your config

### Environment Variables
Create `.env.local` file:
\`\`\`
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
\`\`\`

## 📁 Project Structure
\`\`\`
projectred/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── index.html             # HTML template
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── pages/             # Main page components
│   │   ├── MainApp.js         # Main navigation
│   │   ├── PWAInstallPrompt.js # PWA installation
│   │   └── OfflineIndicator.js # Network status
│   ├── contexts/
│   │   └── AuthContext.js     # Authentication context
│   ├── firebase/
│   │   └── config.js          # Firebase configuration
│   ├── services/
│   │   └── pincodeService.js  # Pincode to city mapping
│   ├── utils/
│   │   └── pwa.js             # PWA utilities
│   └── App.js                 # Main App component
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions workflow
\`\`\`

## 🔒 Privacy & Security
- **GDPR Compliant**: Clear consent management
- **Data Encryption**: All data encrypted in transit and at rest
- **Privacy by Design**: Personal data never exposed publicly
- **Secure Authentication**: Google OAuth integration
- **Medical Guidelines**: NBTC and NACO compliance

## 📱 PWA Features
- **Offline Support**: Works without internet connection
- **Install Prompt**: Add to home screen capability
- **Push Notifications**: For urgent blood requests
- **App Shortcuts**: Quick access to key features
- **Background Sync**: Data syncs when online
- **Responsive Design**: Works on all devices

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch: \`git checkout -b feature-name\`
3. Commit changes: \`git commit -m 'Add feature'\`
4. Push to branch: \`git push origin feature-name\`
5. Submit a pull request

## 📞 Support
For support, please contact:
- **Developer**: Mohammed Numaan
- **LinkedIn**: [https://in.linkedin.com/in/mohammed-numaan](https://in.linkedin.com/in/mohammed-numaan)
- **Email**: Create an issue on GitHub

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments
- Firebase for backend services
- Material-UI for beautiful components
- GitHub Pages for free hosting
- All the amazing open-source libraries used

---

**Made with ❤️ by [Mohammed Numaan](https://in.linkedin.com/in/mohammed-numaan)**

*Save lives, one donation at a time* 🩸
