"use client"
// const apiKey = 'pk.dcb0955bca366114ddb76b3f37341753'; // Replace with your actual API key


import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface GeolocationPositionExtended extends GeolocationPosition {
  city?: string;
}

const App: React.FC = () => {
  const [userLocation, setUserLocation] = useState<GeolocationPositionExtended | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const delay = 10000; // 10 seconds delay
    const apiKey = 'pk.dcb0955bca366114ddb76b3f37341753'; // Replace with your actual API key

    const getLocation = async () => {
      if ('geolocation' in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const response = await axios.get(
            `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          );

          const city = response.data.address?.city;
          setUserLocation({ ...position, city });
        } catch (error) {
          console.error('Error getting location:', error);
          if (retryCount < 3) {
            // Retry after 10 seconds if there's an error
            setRetryCount(retryCount + 1);
            setTimeout(getLocation, delay);
          } else {
            console.error('Max retry attempts reached');
          }
        }
      } else {
        console.error('Geolocation is not supported');
      }
    };

    getLocation();

    // Cleanup
    return () => {
      setRetryCount(0); // Reset retry count when the component unmounts
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCount]); // Retry when retryCount changes

  return (
    <div>
      <h1>Your Location:</h1>
      {userLocation ? (
        <div>
          <p>Latitude: {userLocation.coords?.latitude}</p>
          <p>Longitude: {userLocation.coords?.longitude}</p>
          <p>City: {userLocation.city}</p>
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default App;
