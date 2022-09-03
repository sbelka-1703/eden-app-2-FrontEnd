import { Project } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";
import { Avatar, Badge, Button, Card, Favorite } from "ui";

export interface ProjectCardProps {
  project?: Project;
  avatar?: string;
  percentage?: number;
  position?: string;
  applyButton?: boolean;
  favButton?: boolean;
  favorite?: boolean;
  updateFavoriteCallback?: Function;
  focused?: boolean;
}

export const ProjectCard = ({
  project,
  avatar,
  percentage,
  applyButton = false,
  favButton = false,
  favorite = false,
  updateFavoriteCallback,
  focused,
}: ProjectCardProps) => {
  const router = useRouter();

  if (!project) return null;

  const round = (num: number) => Math.round(num * 10) / 10;

  return (
    <Card border focused={focused} className="px-4 py-4">
      <div className="flex justify-between">
        <div>
          <Avatar src={avatar} size="md" />
        </div>
        <div className={`w-full pl-4`}>
          <div className="flex h-full">
            <div className={`-mt-2 mr-auto`}>
              <div className={`text-xl`}>{project.title}</div>
              <div className={`text-sm text-zinc-400`}>
                {project.description}
              </div>
              <div className={`mt-2 flex`}>
                {project.role?.map((role, index) => (
                  <Badge
                    key={index}
                    className={`bg-soilPurple/20 py-px text-xs`}
                    text={role?.title || ""}
                    cutText={99}
                  ></Badge>
                ))}
              </div>
            </div>
            {percentage && (
              <div
                className={`flex h-full flex-col items-center border-l px-4 last:pr-0`}
              >
                <span>⚡ Match</span>
                <span className={`text-soilPurple text-3xl font-semibold`}>
                  {round(percentage)}%
                </span>
              </div>
            )}
            {favButton && updateFavoriteCallback && (
              <div
                className={`flex h-full items-center border-l px-4 last:pr-0`}
              >
                <Favorite
                  favorite={favorite}
                  onFavorite={() => updateFavoriteCallback(project)}
                />
              </div>
            )}
            {applyButton && (
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
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
