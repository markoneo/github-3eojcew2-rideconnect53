import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export default function StarRating({ rating, maxRating = 5, className = '' }: StarRatingProps) {
  // Calculate the number of full and half stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className={`flex items-center ${className}`}>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="fill-yellow-400 text-yellow-400 w-5 h-5" />
      ))}
      
      {/* Render half star if needed */}
      {hasHalfStar && (
        <StarHalf className="fill-yellow-400 text-yellow-400 w-5 h-5" />
      )}
      
      {/* Render empty stars */}
      {[...Array(maxRating - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-${i}`} className="text-yellow-400 w-5 h-5 stroke-[1.5]" />
      ))}
    </div>
  );
}