import React from 'react';
import { GoogleReview } from '../../types/reviews';
import StarRating from './StarRating';
import { Calendar, CheckCircle } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';
import AnimatedContainer from '../ui/AnimatedContainer';

interface ReviewCardProps {
  review: GoogleReview;
  className?: string;
}

export default function ReviewCard({ review, className = '' }: ReviewCardProps) {
  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <AnimatedContainer animation="fadeIn" className="h-full">
      <div className={`card-elevated h-full flex flex-col p-4 sm:p-6 ${className}`}>
        {/* Header with reviewer info - Mobile Optimized */}
        <div className="flex items-center mb-4">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            <OptimizedImage
              src={review.reviewer.photoUrl}
              alt={`${review.reviewer.name}'s profile`}
              className="w-full h-full rounded-full border-2 border-primary-500"
              fallback={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.reviewer.name)}`}
              width={48}
              height={48}
              objectFit="cover"
            />
          </div>
          
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-neutral-900 text-sm sm:text-base truncate">
                {review.reviewer.name}
              </h3>
              {review.isVerified && (
                <span className="flex items-center text-green-600 text-xs flex-shrink-0">
                  <CheckCircle size={12} className="mr-1" />
                  <span className="hidden sm:inline">Verified</span>
                </span>
              )}
            </div>
            <div className="flex items-center mt-1">
              <StarRating rating={review.rating} />
              <span className="ml-2 text-xs sm:text-sm text-neutral-500">({review.rating})</span>
            </div>
          </div>
        </div>
        
        {/* Review content with mobile-optimized text */}
        <div className="flex-1 flex flex-col">
          <p className="text-neutral-700 text-sm sm:text-base line-clamp-3 sm:line-clamp-4 lg:line-clamp-6 flex-grow leading-relaxed">
            "{review.text}"
          </p>
        </div>
        
        {/* Footer with date - Mobile Optimized */}
        <div className="mt-4 pt-4 flex items-center text-xs sm:text-sm text-neutral-500 border-t border-neutral-100">
          <Calendar size={12} className="mr-1 flex-shrink-0" />
          <span className="truncate">{formatDate(review.date)}</span>
        </div>
      </div>
    </AnimatedContainer>
  );
}