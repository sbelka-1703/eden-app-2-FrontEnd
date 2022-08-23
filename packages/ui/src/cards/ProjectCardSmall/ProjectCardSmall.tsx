import { Avatar, Card, Favorite, Button } from "../../elements";
import { useState } from "react";
export interface ProjectCardSmallProps {
  avatar?: string;
  title?: string;
  description?: string;
  onUpdateFavorite?: () => void;
  onMoreInfoClick?: () => void;
}

export const ProjectCardSmall = ({
  avatar,
  title,
  description,
  onUpdateFavorite,
  onMoreInfoClick,
}: ProjectCardSmallProps) => {
  const [fav, updateFav] = useState(false);
  const onClickFav = () => {
    updateFav(!fav);
    if (onUpdateFavorite) {
      onUpdateFavorite();
    }
  };
  return (
    <Card shadow className="p-0">
      <div className="flex flex-col justify-between p-4">
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
      <div className="align-center mt-4 flex w-full justify-center rounded-b-lg bg-slate-200 py-3 px-2 text-lg">
        <Button onClick={onMoreInfoClick}>
          <div className="align-center flex w-full cursor-pointer justify-center text-lg">
            <div>More Info</div>
            <div className="px-2">{">"}</div>
          </div>
        </Button>
      </div>
    </Card>
  );
};
