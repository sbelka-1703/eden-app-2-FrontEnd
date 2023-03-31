import { useCallback, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

interface IStarRatingProps {
  rating: number;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onRatingChange?: (rating: number) => void;
  isReadOnly?: boolean;
}

export const StarRating = ({
  rating,
  className,
  onRatingChange,
  isReadOnly = false,
}: IStarRatingProps) => {
  const [totalStars, setTotalStars] = useState(rating);
  const stars = [1, 2, 3, 4, 5];

  const handleOnChange = useCallback(
    (rating: number) => {
      setTotalStars(rating);
      onRatingChange && onRatingChange(rating);
    },
    [onRatingChange]
  );

  return (
    <div
      className={`flex w-auto justify-center space-x-1 py-2 lg:space-x-2 ${className}`}
    >
      {stars.map((star) => (
        <button
          className={`${isReadOnly ? "cursor-auto" : ""}`}
          key={star}
          type={`button`}
          onClick={() => {
            if (!isReadOnly) handleOnChange(star + 1);
          }}
        >
          {star < totalStars ? (
            <BsStarFill
              key={star}
              className={`-mr-1 h-5 w-5 text-yellow-400`}
            />
          ) : (
            <BsStar key={star} className={`-mr-1 h-5 w-5 text-yellow-400`} />
          )}
        </button>
      ))}
    </div>
  );
};
