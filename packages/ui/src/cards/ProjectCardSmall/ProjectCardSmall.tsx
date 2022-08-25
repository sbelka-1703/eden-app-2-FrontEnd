import { Project } from "@graphql/eden/generated";
import { Avatar, Card } from "ui";

export interface ProjectCardSmallProps {
  project?: Project;
  avatar?: string;
  focused?: boolean;
}

export const ProjectCardSmall = ({
  project,
  avatar,
  focused = false,
}: ProjectCardSmallProps) => {
  if (!project) return null;

  return (
    <Card focused={focused} className="bg-white p-0">
      <div className="flex flex-col justify-between p-4">
        <div className="flex flex-row">
          <Avatar src={avatar} />
          <div className={`my-auto pl-4`}>
            <div className={`text-2xl`}>{project.title}</div>
            <div className={`text-lg `}>Engaged talent:</div>
          </div>
        </div>
        <div>
          <div className={`pl-16 text-sm text-zinc-400`}>
            15 days left til aplications close
          </div>
        </div>
      </div>
    </Card>
  );
};
