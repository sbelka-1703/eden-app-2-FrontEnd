import { Project } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";
import { Avatar, Button, Card, Favorite } from "ui";

export interface ProjectCardProps {
  project?: Project;
  avatar?: string;
  percentage?: number;
  position?: string;
  favButton?: boolean;
  favorite?: boolean;
  updateFavoriteCallback?: Function;
  focused?: boolean;
}

export const ProjectCard = ({
  project,
  avatar,
  percentage,
  position,
  favButton = false,
  favorite = false,
  updateFavoriteCallback,
  focused,
}: ProjectCardProps) => {
  const router = useRouter();

  if (!project) return null;

  return (
    <Card border focused={focused}>
      <div className="flex justify-between">
        <div>
          <Avatar src={avatar} />
        </div>
        <div className={`w-full pl-6`}>
          <div className="flex h-full">
            <div className={`-mt-2 mr-auto`}>
              <div className={`text-xl`}>{project.title}</div>
              <div className={`text-sm text-zinc-400`}>
                {project.description}
              </div>
              <div className={`mt-2 flex`}>
                <span
                  className={`bg-soilPurple/20 mr-2 rounded-full px-2 py-1 text-xs`}
                >
                  {position}
                </span>
              </div>
            </div>
            {percentage && (
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
            <div
              className={`flex h-full flex-col items-center border-l px-4 last:pr-0`}
            >
              <div className={`my-auto`}>
                <Button
                  variant={`primary`}
                  onClick={() => router.push(`/apply/${project._id}`)}
                >
                  Apply
                  <span className={`my-auto pl-2`}>
                    <BsArrowRight />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
