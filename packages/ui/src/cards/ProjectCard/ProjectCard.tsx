import { Avatar, Card, Favorite } from "../../elements";

export interface ProjectCardProps {
  avatar?: string;
  title?: string;
  description?: string;
  percentage?: number;
  position?: string;
  favButton?: boolean;
  favorite?: boolean;
  updateFavoriteCallback?: Function;
  focused?: boolean;
}

export const ProjectCard = ({
  avatar,
  title,
  description,
  percentage,
  position,
  favButton = false,
  favorite = false,
  updateFavoriteCallback,
  focused,
}: ProjectCardProps) => {
  return (
    <Card shadow focused={focused}>
      <div className="flex justify-between">
        <div>
          <Avatar src={avatar} />
        </div>
        <div className={`w-full pl-6`}>
          <div className="flex h-full">
            <div className={`-mt-2 mr-auto`}>
              <div className={`text-xl`}>{title}</div>
              <div className={`text-sm text-zinc-400`}>{description}</div>
              <div className={`mt-2 flex`}>
                <span
                  className={`bg-soilPurple/20 mr-2 rounded-full px-2 py-1 text-xs`}
                >
                  {position}
                </span>
              </div>
            </div>
            {percentage !== undefined && (
              <div
                className={`flex h-full flex-col items-center border-l px-4 last:pr-0`}
              >
                <span>⚡ Match</span>
                <span className={`text-soilPurple text-3xl font-semibold`}>
                  {percentage}%
                </span>
              </div>
            )}
            {favButton && updateFavoriteCallback && (
              <div
                className={`flex h-full items-center border-l px-4 last:pr-0`}
              >
                <Favorite
                  favorite={favorite}
                  onFavorite={() => updateFavoriteCallback()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
