# RideBuddy

RideBuddy is a carpooling application built with React Native and Expo. The app allows users to easily switch between finding a ride and offering a ride. It includes multi-language support (English and Hindi), form validation, and responsive layouts.

## Features

- **Find & Offer Rides**: A single interface to either search for a ride or post an offer.
- **Multi-language Support**: Toggle between English and Hindi from the top header.
- **State Persistence**: Form inputs (like locations and dates) are preserved independently when switching between "Find Ride" and "Offer Ride" modes.
- **Responsive Layout**: UI components scale appropriately across different device screen sizes.
- **Animations**: Includes smooth transitions when interacting with the form and viewing search results.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Expo Go app installed on your physical device, or an iOS Simulator / Android Emulator running on your computer.

### Installation & Setup

1. **Install dependencies**
   Navigate to the project folder and run:
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run start
   ```

3. **Run the app**
   Once the server starts, you will see a QR code in your terminal.
   - **Physical Device**: Scan the QR code using the Expo Go app (Android) or your Camera app (iOS).
   - **Emulator/Simulator**: Press `a` in the terminal to open on Android, or `i` to open on iOS.

## Project Structure

The project uses Expo Router for file-based navigation. All main source code is located inside the `app` and `src` directories.

```text
riderbuddy/
├── app/                      # Expo Router files (Screens & Layouts)
│   ├── _layout.tsx           # Root layout and context providers
│   ├── index.tsx             # Entry point redirect
│   └── (tabs)/               # Main bottom tab navigation
│       ├── _layout.tsx       # Tab bar configuration
│       └── home/             # Home tab screens
│           └── index.tsx     # Home Screen route
│
├── src/                      
│   ├── components/           # Reusable UI components
│   │   ├── home/             # Specific to the Home Screen
│   │   └── ui/               # Generic components (Buttons, Inputs, Modals)
│   │
│   ├── constants/            # Static configuration data
│   │
│   ├── context/              # React Context (e.g., LanguageContext)
│   │
│   ├── data/                 # Mock data for recent searches and rides
│   │
│   ├── screens/              # Primary screen views
│   │   ├── HomeScreen.tsx    
│   │   └── AvailableRidesScreen.tsx 
│   │
│   ├── tokens/               # Design system tokens (colors, typography, spacing helpers)
│   │
│   └── translations/         # JSON files for localization (en.json, hi.json)
│
├── assets/                   # Images and fonts
├── package.json              # Project scripts and dependencies
└── tsconfig.json             # TypeScript config
```

## Technologies Used

- **React Native & Expo**: Core framework.
- **Expo Router**: Navigation.
- **React Native Reanimated**: UI animations and transitions.
- **React Context API**: Global state for language localization.
