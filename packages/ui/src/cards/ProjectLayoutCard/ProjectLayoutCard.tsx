import { Maybe, Project, RoleType } from "@graphql/eden/generated";
import { Card, EmojiSelector, RoleList, TextBody, TextHeading3 } from "ui";

export interface ProjectLayoutCardProps {
  project?: Project;
  emoji?: string;
  showRoles?: boolean;
  selectedRole?: Maybe<RoleType> | null;
  onClick?: () => void;
  handleAddRole?: () => void;
  // eslint-disable-next-line no-unused-vars
  handleSelectRole?: (role: Maybe<RoleType>) => void;
}

export const ProjectLayoutCard = ({
  project,
  emoji,
  showRoles = false,
  selectedRole,
  handleAddRole,
  handleSelectRole,
}: ProjectLayoutCardProps) => {
  return (
    <Card className="mb-3 bg-white p-4" border={!showRoles}>
      <TextBody className="mb-2">Your Project</TextBody>
      <div className="flex items-center pb-2">
        <div className="mr-4">
          <EmojiSelector isDisabled emoji={emoji} />
        </div>
        <TextHeading3>{project?.title}</TextHeading3>
      </div>
      {showRoles && (
        <RoleList
          handleAddRole={handleAddRole}
          handleSelectRole={handleSelectRole}
          roles={project?.role ? project.role : []}
          selectedRole={selectedRole}
          members={project?.team?.filter((member) => !member?.phase)}
        />
      )}
    </Card>
  );
};
