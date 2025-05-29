import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
const defaultLocation = { lat: 28.6139, lng: 77.2090 }; // New Delhi

const HospitalLocator = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        console.warn("Using default location: New Delhi");
        setLocation(defaultLocation);
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchHospitals = async () => {
      try {
        const viewbox = `${location.lng - 0.1},${location.lat + 0.1},${location.lng + 0.1},${location.lat - 0.1}`;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=cancer%20hospital&bounded=1&limit=10&viewbox=${viewbox}`;
        const response = await fetch(url);
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, [location]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#13131a]">
      <h1 className="text-2xl font-bold text-center text-white py-4">
        Nearby Cancer Hospitals
      </h1>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Hospital List */}
        <div className="w-full lg:w-1/3 p-4 overflow-y-auto bg-[#13131a] shadow-md">
          {hospitals.length > 0 ? (
            <ul className="space-y-4">
              {hospitals.map((hospital, index) => (
                <li key={index} className="border-green-400 rounded-lg p-3 bg-gray-900">
                  <p className="font-epilogue text-green-300">
                    {hospital.display_name}
                  </p>
                  <p className="text-sm text-gray-100">
                    Lat: {hospital.lat}, Lon: {hospital.lon}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center mt-10">No hospitals found yet.</p>
          )}
        </div>

        {/* Right: Map */}
        <div className="w-full lg:w-2/3 h-full">
          {location && (
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={13}
              className="h-full w-full"
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[location.lat, location.lng]} >
                <Popup>You are here</Popup>
              </Marker>

              {/* Marking the hospitals with red circles */}
              {hospitals.map((hospital, index) => (
                <Marker
                  key={index}
                  position={[hospital.lat, hospital.lon]}
                  icon={new L.DivIcon({
                    className: "leaflet-div-icon",
                    html: `<div style="background-color: red; border-radius: 50%; width: 25px; height: 25px; border: 2px solid white;"></div>`, // Custom red circle
                    iconSize: [25, 25],
                    iconAnchor: [12, 12], // Center the circle on the marker
                  })}
                >
                  <Popup>
                    <h3>{hospital.display_name}</h3>
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${hospital.lat}&mlon=${hospital.lon}&zoom=14`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
      <div className="mt-12 text-center">
      

{/* Buttons for Navigation with Inline Styling */}
<button 
  onClick={() => navigate('/')} 
  className="w-400 p-2 bg-pink-500 text-white rounded hover:bg-pink-700"
>
  Go to Home Page
</button>
    </div>
    </div>
  );
};

export default HospitalLocator;