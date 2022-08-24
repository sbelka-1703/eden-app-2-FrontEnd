import { Project } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { useState } from "react";
import { Avatar, Card, Favorite } from "ui";
export interface ProjectCardSmallProps {
  project?: Project;
  avatar?: string;
  onUpdateFavorite?: () => void;
}

export const ProjectCardSmall = ({
  project,
  avatar,
  onUpdateFavorite,
}: ProjectCardSmallProps) => {
  const router = useRouter();

  const [fav, updateFav] = useState(false);
  const onClickFav = () => {
    updateFav(!fav);
    if (onUpdateFavorite) {
      onUpdateFavorite();
    }
  };

  if (!project) return null;

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
              <div className={`text-2xl`}>{project.title}</div>
              <div className={`text-lg text-zinc-400`}>
                {project.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="align-center mt-4 flex w-full justify-center rounded-b-lg bg-slate-200 py-3 px-2 text-lg">
        <button onClick={() => router.push(`/apply/${project?._id}`)}>
          <div className="align-center flex w-full cursor-pointer justify-center text-lg">
            <div>More Info</div>
            <div className="px-2">{">"}</div>
          </div>
        </button>
      </div>
    </Card>
  );
};
