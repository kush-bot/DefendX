"use client";
import React, { useEffect, useState } from 'react';

function Home() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update current date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };
    return (
      <div className="flex justify-between items-center p-5">
     <div className="text-black text-3xl p-5">
      Defend
      <span className="text-blue-800">
        X
      </span>
     </div>
     <div>
      <h2 className='mt-3 pt-4 '>{formatDate(currentDateTime)}</h2>
      <h2>{formatTime(currentDateTime)}</h2>
     </div>
    </div>
    );
  }

export default Home;