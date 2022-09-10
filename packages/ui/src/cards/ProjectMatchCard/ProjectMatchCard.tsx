import { Members, Project } from "@graphql/eden/generated";
import { Avatar, Button, Card, ProjectChampion, TextHeading3 } from "ui";

export interface IProjectMatchCardProps {
  project: Project;
}

export const ProjectMatchCard = ({ project }: IProjectMatchCardProps) => {
  return (
    <Card border>
      <div className={`flex justify-between`}>
        <div></div>
        <div>
          <Avatar isProject />
          <TextHeading3>{project?.title}</TextHeading3>
        </div>
        <div>
          <Button>More</Button>
        </div>
      </div>
      <div className={`text-darkGreen font-Inter my-2 text-sm`}>
        {project?.description}
      </div>
      <ProjectChampion member={project?.champion as Members} />
    </Card>
  );
};
