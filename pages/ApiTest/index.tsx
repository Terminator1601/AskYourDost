// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:3000/api/healthchecker')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.toString());
      });
  }, []);

  return (
    <div>
      <h1>Health Checker</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <div>
          <p>Status: {data.status}</p>
          <p>Message: {data.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
