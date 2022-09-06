import HeartIcon from "@heroicons/react/outline/HeartIcon";
import clsx from "clsx";

export interface FavoriteProps {
  favorite: boolean;
  disabled?: boolean;
  onFavorite?: () => void;
}

export const Favorite = ({
  favorite,
  onFavorite,
  disabled = false,
}: FavoriteProps) => {
  const favoriteCls = clsx(
    `h-10 w-10 rounded-full pt-px flex items-center justify-center ${
      favorite ? "bg-red-200" : "bg-red-100"
    }`
  );

  return (
    <button className={favoriteCls} onClick={onFavorite} disabled={disabled}>
      {!favorite ? (
        <HeartIcon className="h-7 w-7" stroke="red" strokeWidth="1" />
      ) : (
        <HeartIcon
          className="h-7 w-7"
          fill="red"
          stroke="red"
          strokeWidth="1"
        />
      )}
    </button>
  );
};
