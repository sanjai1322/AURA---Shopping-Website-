
import React from 'react';
import StarIcon from './icons/StarIcon';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        let fillPercentage = 0;
        if (index + 1 <= rating) {
          fillPercentage = 100;
        } else if (index < rating && index + 1 > rating) {
          fillPercentage = (rating - index) * 100;
        }
        return <StarIcon key={index} fillPercentage={fillPercentage} />;
      })}
    </div>
  );
};

export default StarRating;