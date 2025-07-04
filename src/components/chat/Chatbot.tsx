import React, { useEffect } from 'react';

export default function Chatbot() {
  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="elfsight-app-c3d69601-e426-425c-b162-2dd776de44d1" 
      data-elfsight-app-lazy
    />
  );
}