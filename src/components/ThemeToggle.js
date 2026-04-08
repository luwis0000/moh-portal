import React from "react";
import { useAppContext } from "../utils/AppContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, language } = useAppContext();
  
  const isLight = theme === "light";
  
  return (
    <button 
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      aria-label={language === "en" 
        ? `Switch to ${isLight ? 'dark' : 'light'} mode` 
        : `Fetola go mokgwa wa ${isLight ? 'lefifi' : 'lesedi'}`
      }
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          <span className="theme-icon sun">🌞</span>
          <span className="theme-icon moon">🌙</span>
        </div>
      </div>
      <span className="theme-label">
        {language === "en" 
          ? (isLight ? "Light Mode" : "Dark Mode")
          : (isLight ? "Mokgwa wa Lesedi" : "Mokgwa wa Lefifi")
        }
      </span>
    </button>
  );
}