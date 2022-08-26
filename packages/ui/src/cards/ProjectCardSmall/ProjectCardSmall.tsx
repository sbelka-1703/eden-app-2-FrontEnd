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
    <Card shadow focused={focused} className={`w-full bg-white p-6`}>
      <div className="flex w-full">
        <div>
          <Avatar src={avatar} />
        </div>
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
    </Card>
  );
};
