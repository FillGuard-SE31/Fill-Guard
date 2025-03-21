// // frontend/homepage/src/components/MapView.jsx
// import React, { useEffect, useRef, useState } from "react";

// const loadGoogleMaps = (callback) => {
//   if (typeof window.google === "object" && typeof window.google.maps === "object") {
//     callback();
//   } else {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
//     script.async = true;
//     script.defer = true;
//     script.onload = callback;
//     document.head.appendChild(script);
//   }
// };

// const MapView = ({ latitude, longitude }) => {
//   const mapRef = useRef(null);
//   const googleMapRef = useRef(null);
//   const markerRef = useRef(null);
//   // Store last valid coordinates to fallback when new data is invalid (zero)
//   const [lastValidCoords, setLastValidCoords] = useState(null);

//   // Load the map only once
//   useEffect(() => {
//     loadGoogleMaps(() => {
//       // Determine initial coordinates
//       const initialCoords =
//         latitude && longitude && latitude !== 0 && longitude !== 0
//           ? { lat: latitude, lng: longitude }
//           : { lat: 0, lng: 0 };

//       googleMapRef.current = new window.google.maps.Map(mapRef.current, {
//         center: initialCoords,
//         zoom: 16,
//       });
//       markerRef.current = new window.google.maps.Marker({
//         position: initialCoords,
//         map: googleMapRef.current,
//         title: "Bin Location",
//       });
//       // Save initial valid coordinates if available
//       if (initialCoords.lat !== 0 || initialCoords.lng !== 0) {
//         setLastValidCoords(initialCoords);
//       }
//     });
//   }, []); // empty dependency – runs once

//   // Update marker only if new coordinates are valid
//   useEffect(() => {
//     if (latitude && longitude && latitude !== 0 && longitude !== 0) {
//       const newPosition = { lat: latitude, lng: longitude };
//       if (markerRef.current && googleMapRef.current) {
//         markerRef.current.setPosition(newPosition);
//         googleMapRef.current.setCenter(newPosition);
//       }
//       setLastValidCoords(newPosition);
//     } else if (lastValidCoords && googleMapRef.current && markerRef.current) {
//       // If new coordinates are invalid (zero), fallback to last valid coordinates
//       markerRef.current.setPosition(lastValidCoords);
//       googleMapRef.current.setCenter(lastValidCoords);
//     }
//   }, [latitude, longitude, lastValidCoords]);

//   return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
// };

// export default MapView;

// frontend/homepage/src/components/MapView.jsx
import React, { useEffect, useRef, useState } from "react";

const loadGoogleMaps = (callback) => {
  if (typeof window.google === "object" && typeof window.google.maps === "object") {
    callback();
  } else {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
  }
};

const MapView = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);
  // Store last valid coordinates to fallback when new data is invalid
  const [lastValidCoords, setLastValidCoords] = useState(null);

  // Helper: check if coordinates are valid (non-zero)
  const isValid = (lat, lng) => {
    return lat !== undefined && lng !== undefined && !(lat === 0 && lng === 0);
  };

  // Load the map only once on mount
  useEffect(() => {
    loadGoogleMaps(() => {
      // Use valid coordinates if provided; otherwise, use a default location.
      const initialCoords = isValid(latitude, longitude)
        ? { lat: latitude, lng: longitude }
        : { lat: 0, lng: 0 }; 

      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: initialCoords,
        zoom: 16,
      });
      markerRef.current = new window.google.maps.Marker({
        position: initialCoords,
        map: googleMapRef.current,
        title: "Bin Location",
      });
      // Save initial valid coordinates if available
      if (isValid(initialCoords.lat, initialCoords.lng)) {
        setLastValidCoords(initialCoords);
      }
    });
  }, []); // Run only once

  // Update marker when new coordinates arrive
  useEffect(() => {
    if (isValid(latitude, longitude)) {
      const newPosition = { lat: latitude, lng: longitude };
      if (markerRef.current && googleMapRef.current) {
        markerRef.current.setPosition(newPosition);
        googleMapRef.current.setCenter(newPosition);
      }
      setLastValidCoords(newPosition);
    } else if (lastValidCoords && googleMapRef.current && markerRef.current) {
      // Fallback: if new coordinates are invalid, use the last valid coordinates
      markerRef.current.setPosition(lastValidCoords);
      googleMapRef.current.setCenter(lastValidCoords);
    }
  }, [latitude, longitude, lastValidCoords]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
};

export default MapView;