import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hospital icon
const hospitalIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3094/3094836.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [1, -34],
});

// Default coordinates for Botswana
const defaultCenter = [-24.6282, 25.9231];
const defaultZoom = 7;

export default function MapView({ items = [] }) {
  const validItems = items.filter(item => item.latitude && item.longitude);
  
  // Function to open Google Maps with directions
  const openGoogleMapsDirections = (destinationLat, destinationLng, destinationName) => {
    const destination = `${destinationLat},${destinationLng}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving&destination_place_id=${encodeURIComponent(destinationName)}`;
    window.open(googleMapsUrl, '_blank');
  };

  // Function to open Google Maps with just the location
  const openGoogleMapsLocation = (lat, lng, name) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(googleMapsUrl, '_blank');
  };

  if (validItems.length === 0) {
    return (
      <div className="mapview" style={{ height: '400px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>🗺️ Map View</p>
          <p style={{ fontSize: '14px', color: '#666' }}>No location data available for the selected facilities.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mapview" style={{ height: '500px', width: '100%', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
      {/* Export All Button */}
      {validItems.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000
        }}>
          <button
            onClick={() => {
              // Open first facility in Google Maps
              const firstFacility = validItems[0];
              openGoogleMapsLocation(firstFacility.latitude, firstFacility.longitude, firstFacility.name);
            }}
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
              gap: '5px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2e8b47';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#34a853';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            📍 Open in Google Maps
          </button>
        </div>
      )}
      
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validItems.map((item) => (
          <Marker
            key={item.id}
            position={[item.latitude, item.longitude]}
            icon={hospitalIcon}
          >
            <Popup>
              <div style={{ minWidth: '220px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#2c5aa0' }}>{item.name}</h4>
                <p style={{ margin: '4px 0' }}><strong>District:</strong> {item.district}</p>
                <p style={{ margin: '4px 0' }}><strong>Phone:</strong> {item.phone}</p>
                {item.address && (
                  <p style={{ margin: '4px 0' }}><strong>Address:</strong> {item.address}</p>
                )}
                {item.type && (
                  <p style={{ margin: '4px 0' }}><strong>Type:</strong> {item.type}</p>
                )}
                
                {/* Action Buttons in Popup */}
                <div style={{ 
                  display: 'flex', 
                  gap: '8px',
                  marginTop: '12px',
                  borderTop: '1px solid #eee',
                  paddingTop: '10px'
                }}>
                  <button
                    onClick={() => openGoogleMapsDirections(item.latitude, item.longitude, item.name)}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      backgroundColor: '#4285f4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    🗺️ Directions
                  </button>
                  
                  <button
                    onClick={() => openGoogleMapsLocation(item.latitude, item.longitude, item.name)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#34a853',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    📍 View
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}