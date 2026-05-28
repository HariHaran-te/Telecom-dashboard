# Telecom Network Dashboard

A comprehensive Single Page Application (SPA) designed to monitor, analyze, and optimize telecom network performance across major operators in India.

## Overview

The Telecom Network Dashboard provides a centralized, city-centric monitoring interface for tracking the status and performance of multiple telecom providers (Airtel, Jio, Vodafone, BSNL). It offers a detailed view of network availability, data speeds, call quality, and active alerts, enabling network engineers and administrators to proactively manage network health and troubleshoot issues effectively.

## Key Features

- **Multi-Operator Support**: Unified monitoring for Airtel, Jio, Vodafone, and BSNL in a single interface.
- **City-Centric Network Map**: An interactive map powered by Leaflet.js, offering a comprehensive view of network status across major Indian cities and districts.
- **Secure Authentication**: Firebase-backed login with role-based access control (Administrator, Manager, Operator, Viewer).
- **Real-time Analytics & KPIs**: Dynamic dashboard with Chart.js visualizations tracking availability trends, traffic volumes, and performance metrics.
- **Alert Management**: A robust alert system for tracking incidents (High Packet Loss, Site Down, etc.) with acknowledge/resolve workflows restricted by user roles.
- **Detailed Operator Views**: Drill-down capabilities to view specific metrics, top regions, and active sites for each network provider.
- **Customizable Settings**: Options to manage refresh intervals, notifications, and performance thresholds.

## Technology Stack

- **Frontend Core**: HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Architecture**: Single Page Application (SPA) with custom routing.
- **Backend & Auth**: Firebase (Authentication and Firestore/Database).
- **Mapping**: Leaflet.js for interactive geographical maps.
- **Data Visualization**: Chart.js for rendering performance graphs and trends.
- **Icons & Fonts**: FontAwesome (Icons) and Google Fonts (Inter).

## Project Structure

```
d:\TELECOM\
├── index.html       # Main application shell and layout
├── css/             
│   └── styles.css   # Global styles, layout, and component designs
├── js/
│   ├── charts.js    # Chart.js initialization and update logic
│   ├── data.js      # Centralized mock data and simulation logic
│   ├── firebase.js  # Firebase configuration and authentication methods
│   └── router.js    # SPA routing engine for dynamic content loading
└── pages/           # Individual page modules
    ├── alerts.js
    ├── dashboard.js
    ├── login.js
    ├── network-map.js
    ├── operator-detail.js
    ├── operators.js
    ├── reports.js
    └── settings.js
```

## Setup and Installation

1. **Clone the repository** (if applicable) or download the project files.
2. **Firebase Configuration**: 
   - Create a Firebase project.
   - Enable Authentication (Email/Password).
   - Set up Firestore or Realtime Database.
   - Update `js/firebase.js` with your Firebase project credentials.
3. **Run the Application**: 
   - The project is a static frontend application. You can run it using any local web server (e.g., VS Code Live Server, `http-server`, Python's `http.server`).
   - Navigate to the project root directory and start the server:
     ```bash
     npx http-server .
     # or
     python -m http.server 8000
     ```
   - Open your browser and go to `http://localhost:8000`.

## Usage

- **Login**: Use valid Firebase credentials to access the dashboard.
- **Navigation**: Use the sidebar to switch between the Dashboard, Operators, Network Map, Alerts, and Settings.
- **Map Interaction**: Click on city nodes on the Network Map to view detailed, multi-operator status for that specific location.
- **Alert Handling**: Depending on your role, you can acknowledge or resolve active network alerts from the Alerts panel.
