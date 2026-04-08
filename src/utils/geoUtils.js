import { getDistance, getPreciseDistance } from 'geolib';

// Calculate distance between two coordinates in kilometers
export const calculateDistance = (coord1, coord2) => {
  if (!coord1 || !coord2 || !coord1.lat || !coord1.lng || !coord2.lat || !coord2.lng) {
    return null;
  }
  
  try {
    const distanceInMeters = getDistance(
      { latitude: coord1.lat, longitude: coord1.lng },
      { latitude: coord2.lat, longitude: coord2.lng }
    );
    return (distanceInMeters / 1000).toFixed(1); // Convert to kilometers
  } catch (error) {
    console.error('Error calculating distance:', error);
    return null;
  }
};

// Get user's current location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

// Find nearest facilities with distances
export const findNearestFacilities = (facilities, userLocation, limit = 5) => {
  if (!userLocation || !facilities.length) return [];

  const facilitiesWithDistances = facilities
    .map(facility => {
      if (!facility.latitude || !facility.longitude) return null;
      
      const distance = calculateDistance(
        { lat: userLocation.lat, lng: userLocation.lng },
        { lat: facility.latitude, lng: facility.longitude }
      );
      
      return distance !== null ? { ...facility, distance } : null;
    })
    .filter(facility => facility !== null)
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    .slice(0, limit);

  return facilitiesWithDistances;
};

// Botswana major cities coordinates for fallback
export const botswanaCities = {
  gaborone: { lat: -24.6282, lng: 25.9231 },
  francistown: { lat: -21.1702, lng: 27.5078 },
  maun: { lat: -19.9953, lng: 23.4181 },
  serowe: { lat: -22.3875, lng: 26.7108 },
  molepolole: { lat: -24.4063, lng: 25.4950 },
  mahalapye: { lat: -23.1051, lng: 26.8141 },
  palapye: { lat: -22.5461, lng: 27.1253 },
  lobatse: { lat: -25.2247, lng: 25.6777 },
  selibephikwe: { lat: -21.9785, lng: 27.8241 },
  jwaneng: { lat: -24.6017, lng: 24.7281 }
};

// Get coordinates for a district name
export const getDistrictCoordinates = (districtName) => {
  const normalizedDistrict = districtName.toLowerCase().trim();
  
  for (const [city, coords] of Object.entries(botswanaCities)) {
    if (normalizedDistrict.includes(city) || city.includes(normalizedDistrict)) {
      return coords;
    }
  }
  
  // Default to Gaborone if no match found
  return botswanaCities.gaborone;
};