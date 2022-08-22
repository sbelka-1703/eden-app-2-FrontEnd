import { Avatar, Card, Favorite, Button } from "../../elements";
import {useState} from "react"
export interface ProjectCardSmallProps {
  avatar?: string;
  title?: string;
  description?: string;
  updateFavorite?: ()=> void;
  moreInfoClick?: ()=> void;
}

export const ProjectCardSmall = ({
  avatar,
  title,
  description,
  updateFavorite,
  moreInfoClick
}: ProjectCardSmallProps) => {
  const [fav, updateFav] = useState(false)
  const onClickFav = () => {
    updateFav(!fav);
    if(updateFavorite)
    {
      updateFavorite();
    }
  }
  return (
    <Card shadow>
      <div className="flex justify-between flex-col">
        <div className="flex flex-row justify-between">
          <Avatar src={avatar} />
          <Favorite
            favorite={fav}
            onFavorite={() => onClickFav()}
          />
        </div>
        <div className={`w-full mt-6`}>
          <div className="flex h-full">
            <div className={`-mt-2 mr-auto`}>
              <div className={`text-2xl`}>{title}</div>
              <div className={`text-lg text-zinc-400`}>{description}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center align-center bg-slate-200 w-full py-3 px-2 rounded-b-lg mt-4 text-lg cursor-pointer" onClick={moreInfoClick}>
        <div>
          More Info
        </div>
        <div className="px-2">
          {">"}
        </div>
      </div>
    </Card>
  );
};
