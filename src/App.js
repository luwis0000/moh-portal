import React from "react";
import { HashRouter } from "react-router-dom"; // Use HashRouter for Vercel
import AppRouter from "./AppRouter";
import { AppProvider } from "./utils/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";
import VoiceAssistant from "./components/VoiceAssistant";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className="app-root mobile-container">
          <Navbar />
          <main className="main-content container">
            <AppRouter />
          </main>
          <Footer />
          <ChatbotWidget />
          <VoiceAssistant />
        </div>
      </HashRouter>
    </AppProvider>
  );
}