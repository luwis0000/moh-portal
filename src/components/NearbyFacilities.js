import React from 'react';
import { findNearestFacilities, getDistrictCoordinates } from '../utils/geoUtils';

const NearbyFacilities = ({ facilities, searchLocation, searchQuery, onSelectFacility }) => {
  if (!searchLocation || facilities.length === 0) return null;

  const nearestFacilities = findNearestFacilities(facilities, searchLocation, 5);

  if (nearestFacilities.length === 0) return null;

  // Function to open Google Maps with directions
  const openGoogleMapsDirections = (destinationLat, destinationLng, destinationName) => {
    const origin = searchLocation ? `${searchLocation.lat},${searchLocation.lng}` : '';
    const destination = `${destinationLat},${destinationLng}`;
    
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving&destination_place_id=${encodeURIComponent(destinationName)}`;
    
    window.open(googleMapsUrl, '_blank');
  };

  // Function to open Google Maps with just the location
  const openGoogleMapsLocation = (lat, lng, name) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="nearby-facilities" style={{ 
      marginTop: '20px', 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}>
      <h4 style={{ 
        margin: '0 0 15px 0', 
        color: '#495057',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📍 Nearby Health Facilities
        <span style={{ 
          fontSize: '14px', 
          color: '#6c757d',
          fontWeight: 'normal'
        }}>
          (closest to {searchQuery})
        </span>
      </h4>
      
      <div className="nearby-list">
        {nearestFacilities.map((facility, index) => (
          <div 
            key={facility.id}
            className="nearby-item"
            style={{
              padding: '15px',
              marginBottom: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #dee2e6',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '10px'
            }}>
              <div 
                style={{ flex: 1, cursor: 'pointer' }}
                onClick={() => onSelectFacility && onSelectFacility(facility)}
              >
                <h5 style={{ 
                  margin: '0 0 5px 0', 
                  color: '#2c5aa0',
                  fontSize: '15px'
                }}>
                  {facility.name}
                </h5>
                <p style={{ 
                  margin: '2px 0', 
                  fontSize: '13px', 
                  color: '#6c757d' 
                }}>
                  {facility.district} • {facility.type}
                </p>
                <p style={{ 
                  margin: '2px 0', 
                  fontSize: '13px', 
                  color: '#495057' 
                }}>
                  📞 {facility.phone}
                </p>
              </div>
              
              <div style={{ 
                textAlign: 'right',
                minWidth: '80px'
              }}>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: '#e7f3ff',
                  color: '#0066cc',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {facility.distance} km
                </span>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#6c757d',
                  marginTop: '4px'
                }}>
                  #{index + 1} closest
                </div>
              </div>
            </div>
            
            {facility.address && (
              <p style={{ 
                margin: '5px 0 10px 0', 
                fontSize: '12px', 
                color: '#6c757d',
                fontStyle: 'italic'
              }}>
                🏠 {facility.address}
              </p>
            )}
            
            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '8px',
              borderTop: '1px solid #f1f3f4',
              paddingTop: '10px'
            }}>
              <button
                onClick={() => openGoogleMapsDirections(facility.latitude, facility.longitude, facility.name)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  backgroundColor: '#4285f4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3367d6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#4285f4';
                }}
              >
                🗺️ Get Directions
              </button>
              
              <button
                onClick={() => openGoogleMapsLocation(facility.latitude, facility.longitude, facility.name)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#34a853',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2e8b47';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#34a853';
                }}
              >
                📍 View on Map
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <p style={{ 
        margin: '15px 0 0 0', 
        fontSize: '12px', 
        color: '#6c757d',
        textAlign: 'center'
      }}>
        💡 Directions will open in Google Maps app or browser
      </p>
    </div>
  );
};

export default NearbyFacilities;