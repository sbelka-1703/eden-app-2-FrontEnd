import { Maybe, Project, RoleType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Card,
  RoleSmallCard,
  ServerFilter,
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
          className="text-soilGray cursor-pointer hover:text-zinc-600 flex"
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
        <div className={`text-xl my-auto pl-4`}>{project.title}</div>
      </div>
      <div className="grid grid-cols-2 overflow-hidden mt-4">
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
      <hr className="my-2 text-slate-300" />
      <ServerFilter />
      <hr className="my-2 text-slate-300" />
    </Card>
  );
};
