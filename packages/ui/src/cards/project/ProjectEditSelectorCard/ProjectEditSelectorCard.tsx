import { Maybe, Project, RoleType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Card,
  CommonServerAvatarList,
  RoleSmallCard,
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
      <div className="mt-4 grid grid-cols-2 gap-2 overflow-hidden">
        {project.role?.map((data, index) => (
          <div key={index} className="col-span-1 m-1">
            <RoleSmallCard
              role={data}
              isSelected={selectedRole?._id === data?._id}
              onClick={() => {
                onSelectRole(data);
              }}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
