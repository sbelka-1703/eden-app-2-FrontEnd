import { Avatar, Card, Favorite, Button } from "../../elements";
import { useState } from "react";
export interface ProjectCardSmallProps {
  avatar?: string;
  title?: string;
  description?: string;
  updateFavorite?: () => void;
  moreInfoClick?: () => void;
}

export const ProjectCardSmall = ({
  avatar,
  title,
  description,
  updateFavorite,
  moreInfoClick,
}: ProjectCardSmallProps) => {
  const [fav, updateFav] = useState(false);
  const onClickFav = () => {
    updateFav(!fav);
    if (updateFavorite) {
      updateFavorite();
    }
  };
  return (
    <Card shadow>
      <div className="flex flex-col justify-between">
        <div className="flex flex-row justify-between">
          <Avatar src={avatar} />
          <Favorite favorite={fav} onFavorite={() => onClickFav()} />
        </div>
        <div className={`mt-6 w-full`}>
          <div className="flex h-full">
            <div className={`-mt-2 mr-auto`}>
              <div className={`text-2xl`}>{title}</div>
              <div className={`text-lg text-zinc-400`}>{description}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="align-center mt-4 flex w-full cursor-pointer justify-center rounded-b-lg bg-slate-200 py-3 px-2 text-lg"
        onClick={moreInfoClick}
      >
        <div>More Info</div>
        <div className="px-2">{">"}</div>
      </div>
    </Card>
  );
};
