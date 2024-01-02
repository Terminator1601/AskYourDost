import Loader from '@/components/Loader/Loader';
import React, { useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";


const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a delay
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader/>
      ) : (
        <div>index</div>
      )}
    </div>
  );
};

export default Index;
