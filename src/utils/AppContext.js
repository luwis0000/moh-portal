import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light"); // 'light' | 'dark'
  const [language, setLanguage] = useState("en"); // 'en' | 'tn' (Setswana)
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "tn" : "en"));

  const value = { theme, toggleTheme, language, toggleLanguage };
  return (
    <AppContext.Provider value={value}>
      <div className={`app-theme-${theme}`}>{children}</div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
