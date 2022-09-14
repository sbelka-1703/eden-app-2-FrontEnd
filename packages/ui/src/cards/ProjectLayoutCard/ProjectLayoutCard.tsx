import { Project } from "@graphql/eden/generated";
import { Card, EmojiSelector, TextBody, TextHeading3 } from "ui";

export interface ProjectLayoutCardProps {
  project: Project;
}

export const ProjectLayoutCard = ({ project }: ProjectLayoutCardProps) => {
  return (
    <Card className="p-4" border>
      <TextBody className="mb-2">Your Project</TextBody>
      <div className="flex items-center">
        <div className="mr-4">
          <EmojiSelector isDisabled />
        </div>
        <TextHeading3>{project.title}</TextHeading3>
      </div>
    </Card>
  );
};
