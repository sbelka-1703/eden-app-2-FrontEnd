import { Maybe, Project, RoleType } from "@graphql/eden/generated";
import { Card, EmojiSelector, RoleList, TextBody, TextHeading3 } from "ui";

export interface ProjectLayoutCardProps {
  project?: Project;
  showRoles?: boolean;
  selectedRole?: Maybe<RoleType> | null;
  onClick?: () => void;
  handleAddRole?: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSelectRole?: (role: Maybe<RoleType>) => void;
}

export const ProjectLayoutCard = ({
  project,
  showRoles = false,
  selectedRole,
  handleAddRole,
  handleSelectRole,
}: ProjectLayoutCardProps) => {
  return (
    <Card className="p-4" border>
      <TextBody className="mb-2">Your Project</TextBody>
      <div className="flex items-center pb-2">
        <div className="mr-4">
          <EmojiSelector isDisabled />
        </div>
        <TextHeading3>{project?.title}</TextHeading3>
      </div>
      {showRoles && (
        <RoleList
          handleAddRole={handleAddRole}
          handleSelectRole={handleSelectRole}
          roles={project?.role ? project.role : []}
          selectedRole={selectedRole}
        />
      )}
    </Card>
  );
};
