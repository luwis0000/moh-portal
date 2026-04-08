import React from "react";
import Button, { openGoogleMapsDirections } from "./Button";

export default function Card({ title, text, image, footer, onClick, variant = "default", facility }) {
  const hasLocation = facility && facility.latitude && facility.longitude;

  const handleDirectionsClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (hasLocation) {
      openGoogleMapsDirections(facility.latitude, facility.longitude, facility.name);
    }
  };

  return (
    <article 
      className={`card card-glossy ${variant}`} 
      onClick={onClick}
    >
      {/* Glossy Overlay Effect */}
      <div className="glossy-overlay"></div>
      
      {/* Content */}
      {image && (
        <div className="card-image-container">
          <img src={image} alt={title} className="card-img" />
        </div>
      )}
      
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{text}</p>
        
        {/* Google Maps Directions Button */}
        {hasLocation && (
          <div className="card-actions" style={{ 
            marginTop: '12px',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            paddingTop: '12px'
          }}>
            <Button 
              label="Get Directions"
              onClick={handleDirectionsClick}
              variant="directions"
              icon="🗺️"
              style={{ width: '100%', padding: '10px 12px' }}
            />
          </div>
        )}
        
        {!hasLocation && facility && (
          <p style={{ 
            fontSize: '12px', 
            color: '#999', 
            fontStyle: 'italic',
            margin: '12px 0 0 0',
            textAlign: 'center'
          }}>
            Location data not available
          </p>
        )}
      </div>
      
      {footer && <div className="card-footer">{footer}</div>}
    </article>
  );
}