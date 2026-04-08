import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

export default function SearchBar({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  onSearch,
  suggestions = [],
  onSuggestionSelect 
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (value && suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5)); // Show top 5 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [value, suggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    } else {
      onChange({ target: { value: suggestion } });
    }
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    onChange(e);
    if (e.target.value) {
      setShowSuggestions(true);
    }
  };

  const handleInputFocus = () => {
    if (value && filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="searchbar-container" ref={searchRef}>
      <div className="searchbar">
        <input 
          className="search-input" 
          value={value} 
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder} 
        />
        <Button label="Search" onClick={onSearch} variant="secondary" />
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="search-suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}