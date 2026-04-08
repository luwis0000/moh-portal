import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import MapView from "../components/MapView";
import NearbyFacilities from "../components/NearbyFacilities";
import Button from "../components/Button";
import { hospitals } from "../utils/data";
import { getDistrictCoordinates, getUserLocation } from "../utils/geoUtils";

export default function Services() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [showNearby, setShowNearby] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Show only 3 hospitals by default
  useEffect(() => {
    setResults(hospitals.slice(0, 3));
  }, []);

  // Get user's location on component mount
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.log('Could not get user location:', error);
        setUserLocation({ lat: -24.6282, lng: 25.9231 });
      }
    };

    fetchUserLocation();
  }, []);

  const handleSearch = async () => {
    setIsSearching(true);
    const qq = q.trim().toLowerCase();
    
    if (!qq) {
      // When search is empty, show only 3 hospitals
      setResults(hospitals.slice(0, 3));
      setShowNearby(false);
      setSearchLocation(null);
      setIsSearching(false);
      return;
    }

    const directResults = hospitals.filter(h => 
      h.name.toLowerCase().includes(qq) || 
      h.district.toLowerCase().includes(qq) ||
      (h.type && h.type.toLowerCase().includes(qq))
    );

    if (directResults.length > 0) {
      setResults(directResults);
      setShowNearby(false);
    } else {
      setResults([]);
      setShowNearby(true);
      
      let searchCoords;
      const districtCoords = getDistrictCoordinates(qq);
      if (districtCoords) {
        searchCoords = districtCoords;
      } else {
        searchCoords = userLocation || { lat: -24.6282, lng: 25.9231 };
      }
      
      setSearchLocation(searchCoords);
    }
    
    setIsSearching(false);
  };

  const handleSelectNearbyFacility = (facility) => {
    setResults([facility]);
    setShowNearby(false);
    setQ(facility.name);
  };

  const handleUseMyLocation = async () => {
    try {
      setIsSearching(true);
      const location = await getUserLocation();
      setUserLocation(location);
      setSearchLocation(location);
      setResults([]);
      setShowNearby(true);
      setQ("My Location");
    } catch (error) {
      alert('Unable to get your location. Please ensure location services are enabled.');
      console.error('Location error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleShowAllHospitals = () => {
    setResults(hospitals);
    setQ("");
  };

  return (
    <div className="page">
      <h2>Health Services in Botswana</h2>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <SearchBar 
            placeholder="Search hospitals, clinics, or districts..." 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
            onSearch={handleSearch} 
          />
        </div>
        
        <Button 
          label="Use My Location"
          onClick={handleUseMyLocation}
          variant="success"
          icon="📍"
          disabled={isSearching}
          style={{ whiteSpace: 'nowrap' }}
        />
      </div>

      {isSearching && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Searching...</p>
        </div>
      )}

      {/* Search Results Summary */}
      {!isSearching && (
        <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>
            {showNearby ? 'Nearby Facilities' : 'Health Facilities'} 
            <span style={{ fontSize: '16px', color: '#6c757d', fontWeight: 'normal', marginLeft: '10px' }}>
              {showNearby ? '(5 closest)' : `(${results.length} of ${hospitals.length} facilities)`}
            </span>
          </h3>
          
          {!showNearby && results.length === 3 && hospitals.length > 3 && (
            <Button 
              label="Show All Facilities"
              onClick={handleShowAllHospitals}
              variant="secondary"
              icon="🏥"
            />
          )}
        </div>
      )}

      {/* Direct Search Results */}
      {!showNearby && !isSearching && (
        <>
          <div className="card-container">
            {results.map(h => (
              <Card 
                key={h.id} 
                title={h.name} 
                text={`${h.district} • ${h.phone} • ${h.type || 'Hospital'}`}
                facility={h}
              />
            ))}
          </div>
          
          {results.length === 0 && !isSearching && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
              <p>No facilities found matching your search.</p>
              <p>Try searching for a district name or use the "Use My Location" button.</p>
            </div>
          )}

          {/* Show message when only displaying 3 hospitals */}
          {results.length === 3 && hospitals.length > 3 && !q && (
            <div style={{ 
              textAlign: 'center', 
              padding: '20px', 
              color: '#6c757d',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              marginTop: '20px'
            }}>
              <p>Showing 3 of {hospitals.length} facilities. Use the search bar to find specific hospitals or click "Show All Facilities" to see everything.</p>
            </div>
          )}
        </>
      )}

      {/* Nearby Facilities */}
      {showNearby && searchLocation && !isSearching && (
        <NearbyFacilities 
          facilities={hospitals}
          searchLocation={searchLocation}
          searchQuery={q}
          onSelectFacility={handleSelectNearbyFacility}
        />
      )}

      {/* Map View */}
      <div style={{ marginTop: '30px' }}>
        <h3>Map View</h3>
        <MapView items={showNearby ? hospitals : results} />
      </div>
    </div>
  );
}