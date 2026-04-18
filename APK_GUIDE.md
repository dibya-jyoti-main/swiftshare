# Making SwiftShare an Android APK

Since SwiftShare is built using modern web standard technologies like React and Tailwind, to package it effectively as an Android `.apk` file without rewriting the logic, you can use **Capacitor** by Ionic. Capacitor acts as a native bridge allowing your web app to run flawlessly inside a native mobile container.

Here is a step-by-step guide to do this on your local machine:

### Prerequisites
1. Export this project to your local machine (Export as ZIP).
2. Install [Node.js](https://nodejs.org/) & [Android Studio](https://developer.android.com/studio).

### 1. Initialize Capacitor in your project

Open a terminal in the root of your downloaded project and install Capacitor:
```bash
npm install
npm install @capacitor/core
npm install -D @capacitor/cli
```

Initialize Capacitor with your App Name and App ID:
```bash
npx cap init SwiftShare com.swiftshare.app
```
*(Select the default web directory, usually `dist` for Vite.)*

### 2. Add Android Support

Install the Android package and add the Android platform to your workspace:
```bash
npm install @capacitor/android
npx cap add android
```

### 3. Build & Sync

Whenever you make changes to your React web code, you must build the web part and sync it to the native project:
```bash
npm run build 
npx cap sync android
```

### 4. Open in Android Studio and Build the APK

To view the mobile source code and compile the APK, run:
```bash
npx cap open android
```
This command opens Android Studio. Once the Gradle sync is complete:
1. Go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
2. Wait a few moments for the build to finish.
3. Click on the "locate" prompt at the bottom right to find your fresh `app-debug.apk`.

### Important Note on P2P functionality
The web `BroadcastChannel` works across different instances of the same browser engine (e.g., tabs). If you deploy this across entirely separate physical mobile devices via APK, `BroadcastChannel` won't natively pass the network boundary. 

To achieve true peer-to-peer data passing locally on mobile without the internet, you would install a native Capacitor plugin (like Bluetooth Low Energy or Local Wi-Fi Direct plugins) and map them to the corresponding SwiftShare Context functions.
