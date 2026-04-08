import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../utils/AppContext";

export default function AccessibilityPanel({ onClose = () => {} }) {
  const { language } = useAppContext();

  // Accessibility states with persistence
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem("accessibility-fontSize")) || 100);
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem("accessibility-highContrast") === "true");
  const [grayscale, setGrayscale] = useState(() => localStorage.getItem("accessibility-grayscale") === "true");
  const [screenReader, setScreenReader] = useState(() => localStorage.getItem("accessibility-screenReader") === "true");
  const [largeCursor, setLargeCursor] = useState(() => localStorage.getItem("accessibility-largeCursor") === "true");
  const [linkHighlight, setLinkHighlight] = useState(() => localStorage.getItem("accessibility-linkHighlight") === "true");

  const panelRef = useRef(null);
  const liveRegionRef = useRef(null);
  const speechSynthRef = useRef(null);

  // Initialize text-to-speech
  useEffect(() => {
    speechSynthRef.current = window.speechSynthesis;
    
    // Create persistent live region
    let liveRegion = document.getElementById("screen-reader-live-region");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "screen-reader-live-region";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
    }
    liveRegionRef.current = liveRegion;

    return () => {
      // Stop any ongoing speech when component unmounts
      if (speechSynthRef.current?.speaking) {
        speechSynthRef.current.cancel();
      }
      liveRegionRef.current = null;
    };
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem("accessibility-fontSize", fontSize.toString());
    localStorage.setItem("accessibility-highContrast", highContrast.toString());
    localStorage.setItem("accessibility-grayscale", grayscale.toString());
    localStorage.setItem("accessibility-screenReader", screenReader.toString());
    localStorage.setItem("accessibility-largeCursor", largeCursor.toString());
    localStorage.setItem("accessibility-linkHighlight", linkHighlight.toString());
  }, [fontSize, highContrast, grayscale, screenReader, largeCursor, linkHighlight]);

  // Apply settings globally
  useEffect(() => {
    const root = document.documentElement;

    root.style.fontSize = `${fontSize}%`;
    root.classList.toggle("high-contrast", highContrast);
    root.classList.toggle("grayscale-mode", grayscale);
    root.classList.toggle("large-cursor", largeCursor);
    root.classList.toggle("highlight-links", linkHighlight);

    if (screenReader) {
      document.body.classList.add("screen-reader-enhanced");
    } else {
      document.body.classList.remove("screen-reader-enhanced");
    }
  }, [fontSize, highContrast, grayscale, screenReader, largeCursor, linkHighlight]);

  // Close panel with outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        const hamburger = document.querySelector(".accessibility-hamburger");
        if (!hamburger?.contains(e.target)) onClose();
      }
    };
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Add global keyboard shortcuts for screen reader
  useEffect(() => {
    const handleGlobalKeyPress = (e) => {
      if (screenReader && e.ctrlKey) {
        if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          readPageContent();
        } else if (e.key === 'e' || e.key === 'E') {
          e.preventDefault();
          readCurrentElement();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyPress);
    return () => document.removeEventListener('keydown', handleGlobalKeyPress);
  }, [screenReader]);

  // --- Enhanced Screen Reader Announcements with Text-to-Speech ---
  const announceToScreenReader = (message) => {
    if (!screenReader) return;

    console.log("Announcing:", message);

    // Method 1: ARIA Live Region (for actual screen readers)
    let liveRegion = document.getElementById("screen-reader-live-region");
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "screen-reader-live-region";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = "";
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 100);

    // Method 2: Text-to-Speech (for browsers without screen readers)
    speakText(message);
  };

  // Text-to-Speech function
  const speakText = (text) => {
    if (!speechSynthRef.current || !screenReader) return;

    // Stop any ongoing speech
    if (speechSynthRef.current.speaking) {
      speechSynthRef.current.cancel();
    }

    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    utterance.rate = 0.9; // Slightly slower than normal
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to get a natural-sounding voice
    const voices = speechSynthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.includes('en') || voice.lang.includes('af')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Speak the text
    speechSynthRef.current.speak(utterance);
  };

  // --- Function to read page content ---
  const readPageContent = () => {
    if (!screenReader) return;

    console.log("Reading page content...");

    // Try multiple content areas
    const contentSelectors = [
      'main',
      '.content',
      '.app-content',
      '#root > div',
      '.container',
      '.page-content',
      '[role="main"]',
      'body'
    ];

    let mainContent = document.body;
    for (const selector of contentSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent && element.textContent.trim().length > 10) {
        mainContent = element;
        console.log("Found content in:", selector);
        break;
      }
    }

    // Get text content and clean it
    const textContent = mainContent.innerText || mainContent.textContent || '';
    const cleanText = textContent
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 500); // Shorter for speech

    console.log("Extracted text:", cleanText);

    if (cleanText && cleanText.length > 10) {
      const announcement = language === "en" 
        ? `Page content: ${cleanText}`
        : `Diteng tša letlaka: ${cleanText}`;
      
      announceToScreenReader(announcement);
    } else {
      const noContentMsg = language === "en" 
        ? "No readable content found on this page"
        : "Ga go na diteng tše di balegago tse di hweditšwego letlakeng le";
      announceToScreenReader(noContentMsg);
    }
  };

  // --- Function to read current element ---
  const readCurrentElement = () => {
    if (!screenReader) return;
    
    const focusedElement = document.activeElement;
    if (focusedElement && focusedElement !== document.body) {
      const elementText = focusedElement.textContent?.trim() || 
                         focusedElement.getAttribute('aria-label') || 
                         focusedElement.getAttribute('placeholder') ||
                         focusedElement.value ||
                         '';
      
      if (elementText) {
        const cleanText = elementText.replace(/\s+/g, ' ').slice(0, 200);
        announceToScreenReader(cleanText);
      } else {
        const elementType = focusedElement.tagName.toLowerCase();
        const noTextMsg = language === "en" 
          ? `${elementType} element with no text`
          : `Sengwalwa sa ${elementType} se se senang mantswe`;
        announceToScreenReader(noTextMsg);
      }
    } else {
      const noFocusMsg = language === "en" 
        ? "No element is currently focused"
        : "Ga go na sengwalwa se se tsepametšwego bjale";
      announceToScreenReader(noFocusMsg);
    }
  };

  // --- Reset ---
  const resetSettings = () => {
    setFontSize(100);
    setHighContrast(false);
    setGrayscale(false);
    setScreenReader(false);
    setLargeCursor(false);
    setLinkHighlight(false);
    
    const accessibilityKeys = [
      "accessibility-fontSize",
      "accessibility-highContrast",
      "accessibility-grayscale", 
      "accessibility-screenReader",
      "accessibility-largeCursor",
      "accessibility-linkHighlight"
    ];
    
    accessibilityKeys.forEach(key => localStorage.removeItem(key));
    
    announceToScreenReader(language === "en"
      ? "All accessibility settings reset to defaults."
      : "Ditaelo tsotlhe di setilwe gape go ya ka ditekanyetso tša motheo.");
  };

  const handleClose = () => {
    // Stop any ongoing speech when closing
    if (speechSynthRef.current?.speaking) {
      speechSynthRef.current.cancel();
    }
    
    announceToScreenReader(
      language === "en"
        ? "Accessibility panel closed. Settings remain active."
        : "Lepanela le tswaletswe, ditaelo di sa šoma."
    );
    onClose();
  };

  // Toggle handlers with better announcements
  const handleToggleChange = (settingName, newValue, enName, tnName) => {
    const action = newValue ? 'enabled' : 'disabled';
    const enMessage = `${enName} ${action}`;
    const tnMessage = `${tnName} ${newValue ? 'e šomile' : 'e emisitswe'}`;
    
    announceToScreenReader(language === "en" ? enMessage : tnMessage);
  };

  // --- UI ---
  return (
    <div className="navbar-accessibility-panel" ref={panelRef}>
      <div className="accessibility-panel-navbar">
        <div className="accessibility-panel-header">
          <h3>{language === "en" ? "Accessibility Settings" : "Dilawulo tša go Fitišega"}</h3>
          <button 
            className="close-panel-btn" 
            onClick={handleClose} 
            aria-label={language === "en" ? "Close panel" : "Tswalela lepanela"}
          >
            ×
          </button>
        </div>

        <div className="accessibility-controls">
          {/* Font size slider */}
          <div className="control-group">
            <label htmlFor="font-size">{language === "en" ? "Text Size" : "Bogolo bša Mantswe"}</label>
            <div className="slider-container">
              <span className="size-label">A-</span>
              <input 
                type="range" 
                id="font-size" 
                min="80" 
                max="200" 
                value={fontSize}
                onChange={(e) => { 
                  const newSize = parseInt(e.target.value);
                  setFontSize(newSize);
                  announceToScreenReader(
                    language === "en" 
                      ? `Text size ${newSize} percent`
                      : `Bogolo bša mantswe ${newSize} lekgolo`
                  );
                }}
              />
              <span className="size-label">A+</span>
              <span className="size-value">{fontSize}%</span>
            </div>
          </div>

          {/* Toggle switches */}
          {[
            { 
              label: "High Contrast", 
              tnLabel: "Khemphetšo e e Phagamego",
              state: highContrast, 
              setter: setHighContrast 
            },
            { 
              label: "Grayscale Mode", 
              tnLabel: "Mokgwa wa Mmutla",
              state: grayscale, 
              setter: setGrayscale 
            },
            { 
              label: "Screen Reader Support", 
              tnLabel: "Tshegetso ya Screen Reader",
              state: screenReader, 
              setter: setScreenReader 
            },
            { 
              label: "Large Cursor", 
              tnLabel: "Khesa e Kgolo",
              state: largeCursor, 
              setter: setLargeCursor 
            },
            { 
              label: "Highlight Links", 
              tnLabel: "Hatisa Dikgokaganyo",
              state: linkHighlight, 
              setter: setLinkHighlight 
            },
          ].map((opt, i) => (
            <div className="control-group" key={i}>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={opt.state}
                  onChange={(e) => {
                    opt.setter(e.target.checked);
                    handleToggleChange(opt.label, e.target.checked, opt.label, opt.tnLabel);
                    
                    if (opt.label === "Screen Reader Support" && e.target.checked) {
                      setTimeout(() => {
                        announceToScreenReader(
                          language === "en"
                            ? "Screen reader support enabled. Use Control plus R to read page content, Control plus E to read current element."
                            : "Tshegetso ya screen reader e šomile. Diriša Control le R go bala diteng, Control le E go bala sengwalwa sa bjale."
                        );
                      }, 500);
                    }
                  }}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-text">
                  {language === "en" ? opt.label : opt.tnLabel}
                </span>
              </label>
            </div>
          ))}

          {/* Screen Reader Controls */}
          {screenReader && (
            <div className="control-group screen-reader-controls">
              <h4>{language === "en" ? "Screen Reader Commands" : "Ditaelo tša Screen Reader"}</h4>
              <div className="screen-reader-buttons">
                <button 
                  className="btn secondary"
                  onClick={readPageContent}
                  aria-label={language === "en" ? "Read page content" : "Bala diteng tša letlaka"}
                >
                  {language === "en" ? "Read Page" : "Bala Letlaka"}
                </button>
                <button 
                  className="btn secondary"
                  onClick={readCurrentElement}
                  aria-label={language === "en" ? "Read current element" : "Bala sengwalwa sa bjale"}
                >
                  {language === "en" ? "Read Element" : "Bala Sengwalwa"}
                </button>
              </div>
              <p className="keyboard-hint">
                {language === "en" 
                  ? "Or use Ctrl+R for page, Ctrl+E for element"
                  : "Goba diriša Ctrl+R go letlaka, Ctrl+E go sengwalwa"
                }
              </p>
              
              {/* Volume control for text-to-speech */}
              <div className="volume-control">
                <label htmlFor="speech-volume">
                  {language === "en" ? "Speech Volume" : "Modumo wa Polelo"}
                </label>
                <input
                  id="speech-volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="1"
                  onChange={(e) => {
                    // Adjust speech volume
                    const volume = parseFloat(e.target.value);
                    // This would need additional implementation
                  }}
                />
              </div>
            </div>
          )}

          <div className="control-actions">
            <button className="btn secondary reset-btn" onClick={resetSettings}>
              {language === "en" ? "Reset All Settings" : "Seta Ditaelo Tsotlhe gape"}
            </button>
            <button className="btn primary close-btn" onClick={handleClose}>
              {language === "en" ? "Apply & Close" : "Dirisa & Tswalela"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}