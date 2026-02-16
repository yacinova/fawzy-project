# 🚀 Next-Gen TCS Ecosystem

A premium, high-performance **Engineer Technical Capability Score (TCS) Management System** built with **Next.js 16** and **Firebase**. This platform is designed to rank, audit, and manage technical excellence within a global network of engineers.

---

## 🌟 What is this project?
The **TCS Ecosystem** is a centralized hub for tracking and visualizing engineer performance metrics. It moves beyond standard databases to provide a dynamic, real-time leaderboard ("The Podium") and a secure administrative command center. It implements a sophisticated scoring algorithm to calculate a **Technical Capability Score (TCS)** based on various KPIs, assigning engineers to tiers ranging from **Bronze** to **Supreme**.

## 🛠️ What it does
- **Public Capability Audit**: Allows engineers to verify their standing and view their detailed performance profile using unique identification codes.
- **Dynamic Leaderboard**: Visualizes the top three performers on a premium "Podium" and lists all engineers in a high-impact registry.
- **Secure Management Node**: A protected admin dashboard for:
    - **Manual Provisioning**: Adding and editing engineer records with real-time validation.
    - **Bulk Operations**: Bulk uploading engineer data via CSV templates.
    - **Asset Management**: Integrated image uploading to Firebase Storage for profile photos.
    - **Data Archiving**: Hiding and restoring engineer records without losing historical data.
- **Automated Tiering**: Real-time calculation of TCS scores and dynamic tier assignment based on KPIs like Exam Score, RNPS, RRR, and SSR.

## 🏗️ Tech Stack
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Frontend Logic**: [React 19](https://react.dev/)
- **Real-time Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **File Storage**: [Firebase Storage](https://firebase.google.com/docs/storage)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Ant Design 6](https://ant.design/) (Modals, Notifications, Flexible Themes)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure
```text
/src
  /app           # Next.js App Router (Layouts, Pages, Components)
  /services      # Modular Firebase Logic (Firestore, Storage)
  /firebase.js   # Centralized Firebase Configuration
  /constants.js  # TCS Scoring Algorithm & Global Constants
/public          # Static Assets (Logos, CSV Templates)
```

## 🚀 Installation & Setup

### 1. Prerequisites
- Node.js (Latest LTS recommended)
- Firebase Project

### 2. Clone and Install
```bash
git clone <repository-url>
cd next-version
npm install
```

### 3. Firebase Configuration
Update `src/firebase.js` with your project credentials:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```
*Note: For production, it is recommended to use Environment Variables (`.env.local`).*

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the system.

## 📊 Features at a Glance
- ✅ **Real-time Synchronization**: Changes are reflected instantly across the network.
- ✅ **Premium UI/UX**: Dark-mode aesthetic with glassmorphism and smooth animations.
- ✅ **Responsive Design**: Optimized for both mobile auditing and desktop management.
- ✅ **Secure Authentication**: Base64-hashed token-based admin access.
- ✅ **Flexible Data Entry**: Support for both granular manual updates and high-volume CSV imports.

---
*"Precision Defines Rank. Earn Your Tier • Own Your Title."*
