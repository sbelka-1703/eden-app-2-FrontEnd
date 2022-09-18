import { Project } from "@graphql/eden/generated";
import { Card, EmojiSelector, RoleList, TextBody, TextHeading3 } from "ui";

export interface ProjectLayoutCardProps {
  project?: Project;
  onClick?: () => void;
  handleAddRole?: () => void;
}

export const ProjectLayoutCard = ({
  project,
  handleAddRole,
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
      <RoleList
        handleAddRole={handleAddRole}
        roles={project?.role ? project.role : []}
      />
    </Card>
  );
};
