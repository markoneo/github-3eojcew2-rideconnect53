import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center group ${className}`}>
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition-opacity duration-500" />
        
        <svg width="200" height="42" viewBox="0 0 200 42" className="fill-current relative z-10">
          {/* Enhanced logo with better typography */}
          <text x="0" y="32" className="text-3xl font-bold">
            <tspan className="text-blue-600 font-extrabold tracking-tight">Ri</tspan>
            <tspan className="text-neutral-800 font-extrabold tracking-tight">de</tspan>
            <tspan className="text-blue-600 font-extrabold tracking-tight">Co</tspan>
            <tspan className="text-neutral-800 font-extrabold tracking-tight">nn</tspan>
            <tspan className="text-blue-600 font-extrabold tracking-tight">ect</tspan>
          </text>
          
          {/* Subtle underline accent */}
          <rect x="0" y="36" width="180" height="2" className="fill-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" rx="1" />
        </svg>
      </div>
    </div>
  );
}