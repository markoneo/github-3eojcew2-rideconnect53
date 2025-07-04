import React, { useState } from 'react';
import { Users, Briefcase, UserCheck, Star, Droplets, ChevronDown, ChevronUp } from 'lucide-react';

interface VehicleStatsProps {
  passengers: number;
  luggage: number;
  type?: string;
}

export default function VehicleStats({ passengers, luggage, type }: VehicleStatsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* Vehicle name and toggle button */}
      <div 
        className="flex items-center justify-between cursor-pointer mb-2"
        onClick={toggleExpand}
      >
        <div className="font-medium text-gray-700">Vehicle Details</div>
        <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          {isExpanded ? 
            <ChevronUp size={18} className="text-gray-500" /> : 
            <ChevronDown size={18} className="text-gray-500" />
          }
        </button>
      </div>

      {/* Collapsible content */}
      <div className={`space-y-3 text-sm text-gray-500 overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex items-center gap-2 group/stat transition-all duration-300 hover:translate-x-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center transform transition-all duration-300 group-hover/stat:bg-blue-200 group-hover/stat:scale-110">
            <Users size={16} className="text-blue-600" />
          </div>
          <span className="transition-colors duration-300 group-hover/stat:text-blue-600">{passengers} Passengers</span>
        </div>
        
        <div className="flex items-center gap-2 group/stat transition-all duration-300 hover:translate-x-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center transform transition-all duration-300 group-hover/stat:bg-blue-200 group-hover/stat:scale-110">
            <Briefcase size={16} className="text-blue-600" />
          </div>
          <span className="transition-colors duration-300 group-hover/stat:text-blue-600">{luggage} Luggage</span>
        </div>

        <div className="flex items-center gap-2 group/stat transition-all duration-300 hover:translate-x-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center transform transition-all duration-300 group-hover/stat:bg-blue-200 group-hover/stat:scale-110">
            <UserCheck size={16} className="text-blue-600" />
          </div>
          <span className="transition-colors duration-300 group-hover/stat:text-blue-600">Meet & Greet Service</span>
        </div>

        <div className="flex items-center gap-2 group/stat transition-all duration-300 hover:translate-x-1">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center transform transition-all duration-300 group-hover/stat:bg-yellow-200 group-hover/stat:scale-110">
            <Star size={16} className="text-yellow-500" />
          </div>
          <span className="transition-colors duration-300 group-hover/stat:text-yellow-600">Minimum 4.8★ Rated Drivers</span>
        </div>

        {type === 'executive' && (
          <div className="flex items-center gap-2 group/stat transition-all duration-300 hover:translate-x-1">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center transform transition-all duration-300 group-hover/stat:bg-blue-200 group-hover/stat:scale-110">
              <Droplets size={16} className="text-blue-600" />
            </div>
            <span className="transition-colors duration-300 group-hover/stat:text-blue-600">Complimentary Water</span>
          </div>
        )}
      </div>
      
      {/* Always visible summary (when collapsed) */}
      {!isExpanded && (
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users size={14} className="text-blue-600" />
            <span>{passengers}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase size={14} className="text-blue-600" />
            <span>{luggage}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            <span>4.8+</span>
          </div>
        </div>
      )}
    </div>
  );
}