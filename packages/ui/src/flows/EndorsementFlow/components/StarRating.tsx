import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

interface IStarRatingProps {
  rating: number;
  className?: string;
}

export const StarRating = ({ rating, className }: IStarRatingProps) => {
  const [totalStars, setTotalStars] = useState(rating);
  const stars = [...Array(5).keys()];

  return (
    <div
      className={`flex w-auto justify-center space-x-1 py-2 lg:space-x-2 ${className}`}
    >
      {stars.map((star) => (
        <button
          key={star}
          type={`button`}
          onClick={() => setTotalStars(star + 1)}
        >
          {star < totalStars ? (
            <BsStarFill key={star} className={`h-6 w-6 text-yellow-400`} />
          ) : (
            <BsStar key={star} className={`h-6 w-6 text-yellow-400`} />
          )}
        </button>
      ))}
    </div>
  );
};
