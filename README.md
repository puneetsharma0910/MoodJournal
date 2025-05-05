# 📓 MoodJournal

A beautiful, minimalistic journaling app that helps you record your daily mood, jot down quick notes, and view your emotional patterns over time — all while showing real-time weather information based on your location.

---

## 🌟 Features

- 😄 **Mood Tracking** — Select your current mood using expressive emojis.
- 📝 **Daily Notes** — Quickly jot down thoughts, feelings, or activities.
- 📅 **Calendar View** — See how your mood evolves over time.
- 🌦️ **Real-Time Weather** — Weather data fetched using your geolocation.
- 📊 **Mood Stats** — Visual representation of your mood trends.
- 💾 **Local Storage** — Your data is saved locally in your browser.



## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/puneetsharma0910/MoodJournal.git
cd MoodJournal
npm install
npm run dev
```

Visit `http://localhost:5173` to view the app in your browser.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add your OpenWeatherMap API key:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

You can get the API key from [OpenWeatherMap](https://openweathermap.org/api).

---

## 🧩 Project Structure

```
src/
├── assets/            # Images and icons
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── constants/         # Constants like mood options
├── App.jsx            # Root component
├── main.jsx          # Entry point
└── index.css          # Tailwind & global styles
```

---

## 📌 Technologies Used

- React + Vite
- Tailwind CSS
- Geolocation API
- OpenWeatherMap API
- LocalStorage

---

## 📈 Future Enhancements

- 🔒 Export journal as PDF/CSV
- ☁️ Firebase or cloud sync
- 👤 User authentication
- 🌙 Dark mode
- 📊 Mood analytics

---


