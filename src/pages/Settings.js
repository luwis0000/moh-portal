import React from "react";
import { useAppContext } from "../utils/AppContext";

export default function Settings() {
  const { theme, toggleTheme, language, toggleLanguage } = useAppContext();
  return (
    <div className="page">
      <h2>Settings</h2>
      <div className="settings-grid">
        <div className="setting">
          <label>Theme</label>
          <button className="btn" onClick={toggleTheme}>{theme === "light" ? "Switch to Dark" : "Switch to Light"}</button>
        </div>
        <div className="setting">
          <label>Language</label>
          <button className="btn" onClick={toggleLanguage}>{language === "en" ? "Switch to Setswana" : "Switch to English"}</button>
        </div>
      </div>
    </div>
  );
}
