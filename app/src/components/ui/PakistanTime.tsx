'use client';

import { useState, useEffect } from 'react';

export default function PakistanTime() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pakistanTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }));
      const hours = pakistanTime.getHours().toString().padStart(2, '0');
      const minutes = pakistanTime.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="text-xs text-gray-600 text-center">{time}</span>;
}

