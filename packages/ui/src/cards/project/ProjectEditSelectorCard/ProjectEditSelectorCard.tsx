import { Maybe, Project, RoleType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Card,
  CommonServerAvatarList,
  TextLabel1,
} from "@eden/package-ui";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useEffect } from "react";

export interface ProjectEditSelectorCardProps {
  project?: Project;
  selectedRole?: Maybe<RoleType> | null;
  onEdit?: () => void;
  onBack?: () => void;
  handleSelectRole: React.Dispatch<React.SetStateAction<RoleType | null>>;
}

export const ProjectEditSelectorCard = ({
  project,
  onBack,
  onEdit,
  selectedRole,
  handleSelectRole,
}: ProjectEditSelectorCardProps) => {
  useEffect(() => {
    if (project?.role?.length) {
      handleSelectRole(project?.role[0] || null);
    }
  }, [project?.role]);

  if (!project) return null;

  const onSelectRole = (data: any) => {
    if (handleSelectRole) handleSelectRole(data);
  };

  return (
    <Card shadow className={`m-2 w-full bg-white p-3`}>
      <div className="flex flex-row content-center items-center justify-between">
        <div
          className="text-soilGray flex cursor-pointer hover:text-zinc-600"
          onClick={onBack}
        >
          <ChevronLeftIcon className="mr-1 -mt-1 inline" width={20} />
          <span className="group-hover:underline">Championed Projects</span>
        </div>
        <div>
          <Button
            variant="default"
            radius="rounded"
            size="md"
            className="shadow hover:shadow-none"
            onClick={onEdit}
          >
            🛠 Edit Project
          </Button>
        </div>
      </div>
      <div className="mt-2 flex w-full">
        <div>
          <Avatar
            emoji={project.emoji as string}
            backColorEmoji={project.backColorEmoji as string}
            size={`md`}
            isProject
          />
        </div>
        <div className={`my-auto pl-4 text-xl`}>{project.title}</div>
      </div>
      <div className={`my-2`}>
        <CommonServerAvatarList
          label={`on servers`}
          size="xs"
          serverID={project?.serverID as string[]}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 overflow-hidden p-2">
        {project.role?.map((data, index) => (
          <button
            key={index}
            className="h-full w-full"
            onClick={() => onSelectRole(data)}
          >
            <Card
              border
              focused={selectedRole?._id === data?._id}
              className="h-full w-full overflow-hidden bg-white p-0 py-2"
            >
              <TextLabel1 className={`w-full text-darkGreen`}>
                {data?.title}
              </TextLabel1>
            </Card>
          </button>
        ))}
      </div>
    </Card>
  );
};
