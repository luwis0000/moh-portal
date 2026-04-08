import React from "react";
import ChatbotWidget from "../components/ChatbotWidget";
import VoiceAssistant from "../components/VoiceAssistant";

export default function Chatbot() {
  return (
    <div className="page">
      <h2>AI Chatbot</h2>
      <p>Use the chat to ask about services, careers, or how to get help.</p>
  
      <VoiceAssistant />
    </div>
  );
}