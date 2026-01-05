'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

export function RealTimeDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // This effect runs only on the client, preventing hydration mismatch
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border">
      <Calendar className="w-5 h-5 text-gray-500" />
      <span className="text-sm font-medium text-gray-700">
        {format(currentDate, 'E, d MMM yyyy')}
      </span>
    </div>
  );
}
