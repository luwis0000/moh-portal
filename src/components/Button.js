import React from "react";

// Google Maps utility functions
export const openGoogleMapsDirections = (destinationLat, destinationLng, destinationName) => {
  const destination = `${destinationLat},${destinationLng}`;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving&destination_place_id=${encodeURIComponent(destinationName)}`;
  window.open(googleMapsUrl, '_blank');
};

export const openGoogleMapsLocation = (lat, lng, name) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
  window.open(googleMapsUrl, '_blank');
};

export default function Button({ 
  label, 
  onClick, 
  variant = "primary", 
  type = "button",
  disabled = false,
  icon = null,
  style = {}
}) {
  const getVariantStyle = () => {
    const baseStyle = {
      padding: '10px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      ...style
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: '#007bff',
          color: 'white',
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: '#6c757d',
          color: 'white',
        };
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: '#28a745',
          color: 'white',
        };
      case 'google-maps':
        return {
          ...baseStyle,
          backgroundColor: '#4285f4',
          color: 'white',
        };
      case 'directions':
        return {
          ...baseStyle,
          backgroundColor: '#34a853',
          color: 'white',
        };
      default:
        return baseStyle;
    }
  };

  const buttonStyle = getVariantStyle();

  const handleMouseEnter = (e) => {
    if (disabled) return;
    e.target.style.transform = 'translateY(-1px)';
    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    
    // Darken background on hover
    if (variant === 'primary') e.target.style.backgroundColor = '#0056b3';
    if (variant === 'success') e.target.style.backgroundColor = '#218838';
    if (variant === 'google-maps') e.target.style.backgroundColor = '#3367d6';
    if (variant === 'directions') e.target.style.backgroundColor = '#2e8b47';
    if (variant === 'secondary') e.target.style.backgroundColor = '#545b62';
  };

  const handleMouseLeave = (e) => {
    if (disabled) return;
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
    
    // Reset background color
    if (variant === 'primary') e.target.style.backgroundColor = '#007bff';
    if (variant === 'success') e.target.style.backgroundColor = '#28a745';
    if (variant === 'google-maps') e.target.style.backgroundColor = '#4285f4';
    if (variant === 'directions') e.target.style.backgroundColor = '#34a853';
    if (variant === 'secondary') e.target.style.backgroundColor = '#6c757d';
  };

  return (
    <button
      className={`btn ${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={buttonStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}