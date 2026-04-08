import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { healthServices, serviceCategories } from "../utils/data";
import { useAppContext } from "../utils/AppContext";
import languagePack from "../utils/language";

export default function ChatbotWidget() {
  const { language } = useAppContext();
  const t = language === "en" ? languagePack.EN : languagePack.TN;
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Initial welcome message
  useEffect(() => {
    if (open && conversation.length === 0) {
      const welcomeMessage = language === 'en' 
        ? "Hello! I'm HealthBot 🤖 I can help you find health services, emergency info, or answer questions about healthcare in Botswana. What would you like to know?"
        : "Dumela! Ke HealthBot 🤖 Nka go thusa go fumana ditirelo tsa bophelo, tshedimosetso ya tšhogo, kgo araba dipotso ka tshireletso ya bophelo mo Botswana. O batla go itse eng?";
      
      setConversation([{ type: 'bot', text: welcomeMessage, timestamp: new Date() }]);
      generateSuggestions();
    }
  }, [open, language]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Generate smart suggestions based on context
  const generateSuggestions = (userMessage = "") => {
    const commonQuestions = language === 'en' ? [
      "Find hospitals near me",
      "Emergency contacts",
      "HIV testing services", 
      "Vaccination centers",
      "Blood donation",
      "Ambulance services"
    ] : [
      "Fumana dibedele gaufi le nna",
      "Dikgolagano tša tšhogo",
      "Ditirelo tša teko ya HIV",
      "Dibaka tša entšhetswapelo",
      "Go ntsha madi",
      "Ditirelo tša ambalese"
    ];

    // Filter suggestions based on user message
    const filtered = commonQuestions.filter(question => 
      !userMessage || !question.toLowerCase().includes(userMessage.toLowerCase())
    ).slice(0, 3);

    setSuggestions(filtered);
  };

  // Simulate typing delay for better UX
  const simulateTyping = (callback) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000 + Math.random() * 1000);
  };

  // Find relevant health services
  const findRelevantServices = (query) => {
    return healthServices.filter(service => 
      service.title.toLowerCase().includes(query) ||
      service.overview.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query)
    ).slice(0, 3);
  };

  // Generate bot response
  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    let response = "";
    let action = null;

    // Emergency detection
    if (message.includes('emergency') || message.includes('tšhogo') || message.includes('997') || message.includes('911')) {
      response = language === 'en' 
        ? "🚨 **EMERGENCY CONTACTS:**\n• Ambulance: 997\n• Police: 911\n• Fire: 998\n\nFor immediate help, call these numbers. Would you like more emergency information?"
        : "🚨 **DIKGOLAGANO TŠA TŠHOGO:**\n• Ambalese: 997\n• Mapodisi: 911\n• Mello: 998\n\nGo thuso e e potlako, bitsa dinomoro tše. O batla tshedimosetso e e oketsegileng ya tšhogo?";
      action = { type: 'navigate', path: '/emergency', label: language === 'en' ? 'View Emergency Page' : 'Bona Tsebe ya Tšhogo' };
    }
    // Hospital/Clinic search
    else if (message.includes('hospital') || message.includes('clinic') || message.includes('bedele') || message.includes('kliniki')) {
      const services = findRelevantServices('hospital');
      if (services.length > 0) {
        response = language === 'en' 
          ? `🏥 **HEALTH FACILITIES FOUND:**\n${services.map(s => `• ${s.title}`).join('\n')}\n\nI can show you more details about any of these services.`
          : `🏥 **MAFELO A BOPHELO A A FITLHETSENG:**\n${services.map(s => `• ${s.title}`).join('\n')}\n\nNka go bontsha tshedimosetso e e oketsegileng ka ditirelo tše.`;
        action = { type: 'navigate', path: '/services', label: language === 'en' ? 'Browse All Services' : 'Batlisisa Ditirelo Tsotlhe' };
      }
    }
    // HIV/AIDS services
    else if (message.includes('hiv') || message.includes('aids') || message.includes('arv')) {
      const hivServices = healthServices.filter(s => 
        s.title.toLowerCase().includes('hiv') || s.title.toLowerCase().includes('arv')
      );
      response = language === 'en'
        ? `💊 **HIV/AIDS SERVICES:**\n${hivServices.map(s => `• ${s.title}: ${s.overview}`).join('\n')}\n\nAll services are confidential and available nationwide.`
        : `💊 **DITIRELO TŠA HIV/AIDS:**\n${hivServices.map(s => `• ${s.title}: ${s.overview}`).join('\n')}\n\nDitirelo tsotlhe di sa bolelele mme di a gona mo nageng yotlhe.`;
      action = { type: 'navigate', path: '/education', label: language === 'en' ? 'Learn More' : 'Ithute go Feta' };
    }
    // General service search
    else {
      const relevantServices = findRelevantServices(message);
      if (relevantServices.length > 0) {
        response = language === 'en'
          ? `🔍 **I FOUND THESE SERVICES:**\n${relevantServices.map(s => `• ${s.title}`).join('\n')}\n\nWould you like more details about any of these?`
          : `🔍 **KE FUMANE DITIRELO TŠE:**\n${relevantServices.map(s => `• ${s.title}`).join('\n')}\n\nO batla tshedimosetso e e oketsegileng ka tše?`;
        action = { type: 'navigate', path: '/education', label: language === 'en' ? 'View All Services' : 'Bona Ditirelo Tsotlhe' };
      } else {
        response = language === 'en'
          ? "I'm here to help with health services in Botswana! Try asking about:\n• Hospitals and clinics\n• Emergency contacts\n• HIV testing\n• Vaccinations\n• Or type what you're looking for."
          : "Ke mo go thusa ka ditirelo tsa bophelo mo Botswana! Lekgosa go botša ka:\n• Dibedele le dikliniki\n• Dikgolagano tša tšhogo\n• Diteko tša HIV\n• Dientšhetswapelo\n• Kgo tlhaga se o se batlang.";
      }
    }

    return { response, action };
  };

  const handleSend = (e) => {
    e?.preventDefault();
    const userMessage = msg.trim();
    if (!userMessage) return;

    // Add user message to conversation
    const userMsg = { type: 'user', text: userMessage, timestamp: new Date() };
    setConversation(prev => [...prev, userMsg]);
    setMsg("");
    
    // Generate and add bot response
    simulateTyping(() => {
      const { response, action } = generateResponse(userMessage);
      const botMsg = { 
        type: 'bot', 
        text: response, 
        timestamp: new Date(),
        action 
      };
      setConversation(prev => [...prev, botMsg]);
      generateSuggestions(userMessage);
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setMsg(suggestion);
  };

  const handleActionClick = (action) => {
    if (action.type === 'navigate') {
      navigate(action.path);
      setOpen(false);
    }
  };

  const handleUndo = () => {
    if (conversation.length > 1) {
      setConversation(prev => prev.slice(0, -2)); // Remove last user-bot pair
    }
  };

  const handleFeedback = () => {
    navigate('/feedback');
    setOpen(false);
  };

  const handleQuickAction = (action) => {
    let message = "";
    switch (action) {
      case 'emergency':
        message = language === 'en' ? "emergency contacts" : "dikgolagano tša tšhogo";
        break;
      case 'hospitals':
        message = language === 'en' ? "find hospitals" : "fumana dibedele";
        break;
      case 'hiv':
        message = language === 'en' ? "HIV testing" : "diteko tša HIV";
        break;
      default:
        message = action;
    }
    setMsg(message);
  };

  return (
    <div className="chatbot-widget">
      {open ? (
        <div className="chat-window" role="dialog" aria-label="HealthBot chat">
          <header className="chat-header">
            <div className="chat-title">
              <strong>HealthBot 🤖</strong>
              <span className="chat-status">{language === 'en' ? 'Online' : 'Go nna lekgokagano'}</span>
            </div>
            <div className="chat-actions">
              <button 
                onClick={handleUndo} 
                className="btn-undo"
                disabled={conversation.length <= 1}
                title={language === 'en' ? 'Undo last message' : 'Tlosa molaetsa wa bofelo'}
              >
                ↩️
              </button>
              <button onClick={() => setOpen(false)} className="btn-close">✕</button>
            </div>
          </header>

          <div className="chat-body">
            {conversation.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                <div className="message-bubble">
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {msg.action && (
                  <button 
                    className="action-button"
                    onClick={() => handleActionClick(msg.action)}
                  >
                    {msg.action.label}
                  </button>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="chat-message bot">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {suggestions.length > 0 && !isTyping && (
              <div className="suggestions-container">
                <div className="suggestions-label">
                  {language === 'en' ? 'Try asking:' : 'Lekgosa go botša:'}
                </div>
                <div className="suggestions">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-chip"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          <div className="quick-actions">
            <button onClick={() => handleQuickAction('emergency')} className="quick-btn emergency">
              🚨 {language === 'en' ? 'Emergency' : 'Tšhogo'}
            </button>
            <button onClick={() => handleQuickAction('hospitals')} className="quick-btn">
              🏥 {language === 'en' ? 'Hospitals' : 'Dibedele'}
            </button>
            <button onClick={() => handleQuickAction('hiv')} className="quick-btn">
              💊 {language === 'en' ? 'HIV Test' : 'Teko ya HIV'}
            </button>
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <input 
              value={msg} 
              onChange={(e) => setMsg(e.target.value)} 
              placeholder={language === 'en' ? 'Ask about health services...' : 'Botša ka ditirelo tsa bophelo...'}
              aria-label={language === 'en' ? 'Type your message' : 'Tlhaga molaetsa wa gago'}
            />
            <button type="submit" className="btn primary" disabled={!msg.trim()}>
              {language === 'en' ? 'Send' : 'Romela'}
            </button>
          </form>

          <div className="chat-footer">
            <button onClick={handleFeedback} className="feedback-btn">
              {language === 'en' ? 'Not satisfied? Give feedback' : 'Ga o a kgotsofala? Naya kgopolo'}
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="chat-floating" 
          onClick={() => setOpen(true)} 
          aria-label={language === 'en' ? 'Open health assistant chat' : 'Bula puisano ya motsaedi wa bophelo'}
        >
          💬
        </button>
      )}
    </div>
  );
}