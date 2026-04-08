import React from "react";
import { useAppContext } from "../utils/AppContext";

export default function LanguageSwitcher({ compact = false }) {
  const { language, toggleLanguage } = useAppContext();
  
  const isEnglish = language === "en";
  
  return (
    <button 
      className={`lang-switch ${language} ${compact ? 'compact' : ''}`}
      onClick={toggleLanguage}
      aria-label={isEnglish 
        ? "Switch to Setswana language" 
        : "Switch to English language"
      }
    >
      <div className="lang-switch-track">
        <div className="lang-switch-thumb">
          <span className="lang-flag en">🇺🇸</span>
          <span className="lang-flag tn">🇿🇦</span>
        </div>
      </div>
      {!compact && (
        <span className="lang-label">
          {isEnglish ? "English" : "Setswana"}
        </span>
      )}
    </button>
  );
}