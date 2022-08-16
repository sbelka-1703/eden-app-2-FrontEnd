import HeartIcon from "@heroicons/react/outline/HeartIcon";
import clsx from "clsx";

export interface FavoriteProps {
  favorite: boolean;
  projectId: string;
  memberId: string;
}

export const Favorite = ({ favorite, projectId, memberId }: FavoriteProps) => {
  async function handleClick() {
    // if (member.loading) return;
    const params = {
      memberID: memberId,
      projectID: projectId,
      favorite: !favorite,
    };

    console.log(params);

    // addFavoriteProject(params);
  }

  const favoriteCls = clsx(
    `h-10 w-10 rounded-full pt-px flex items-center justify-center ${
      favorite ? "bg-red-200" : "bg-red-100"
    }`
  );

  return (
    <button className={favoriteCls} onClick={handleClick}>
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
