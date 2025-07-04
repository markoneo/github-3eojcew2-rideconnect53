import React, { useState, useEffect } from 'react';

interface VisitorInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  userAgent?: string;
  referrer?: string;
  page?: string;
  timestamp: string;
}

/**
 * Admin component to view visitor stats (for internal use only)
 * This component is not used in the public-facing site
 */
export default function VisitorStats() {
  const [visitors, setVisitors] = useState<VisitorInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Load visitor data from localStorage
      const storedData = localStorage.getItem('visitorData');
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setVisitors(parsedData);
      }
    } catch (error) {
      console.error('Error loading visitor data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div className="p-4">Loading visitor data...</div>;
  }

  if (!visitors.length) {
    return <div className="p-4">No visitor data available</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recent Visitors ({visitors.length})</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">IP</th>
              <th className="px-4 py-2 border">Page</th>
              <th className="px-4 py-2 border">Referrer</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2 border">
                  {new Date(visitor.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">
                  {visitor.city && visitor.country 
                    ? `${visitor.city}, ${visitor.country}` 
                    : 'Unknown location'}
                </td>
                <td className="px-4 py-2 border">{visitor.ip}</td>
                <td className="px-4 py-2 border truncate max-w-xs">
                  {visitor.page || 'Unknown'}
                </td>
                <td className="px-4 py-2 border truncate max-w-xs">
                  {visitor.referrer || 'Direct'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={() => {
            localStorage.removeItem('visitorData');
            setVisitors([]);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear Data
        </button>
      </div>
    </div>
  );
}