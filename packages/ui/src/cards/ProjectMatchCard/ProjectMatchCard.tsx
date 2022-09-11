import { Maybe, Members, ProjectMatchType } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { Avatar, Badge, Button, Card, ProjectChampion, TextHeading3 } from "ui";

export interface IProjectMatchCardProps {
  project: Maybe<ProjectMatchType>;
}

function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);

  return Math.round(value * multiplier) / multiplier;
}

export const ProjectMatchCard = ({ project }: IProjectMatchCardProps) => {
  const router = useRouter();

  // console.log(project);
  return (
    <Card border>
      <div className={`flex justify-between`}>
        <div></div>
        <div>
          <div className={`relative`}>
            <Avatar isProject />
            <span
              className={`text-soilPurple absolute mt-9 -ml-6 rounded-full bg-white px-1.5 text-xl font-semibold shadow-sm`}
            >
              {round(Number(project?.matchPercentage), 1)}%
            </span>
          </div>
          <TextHeading3>{project?.projectData?.title}</TextHeading3>
        </div>
        <div>
          <Button
            onClick={() =>
              router.push(`/signup/test/project/${project?.projectData?._id}`)
            }
          >
            More
          </Button>
        </div>
      </div>
      <div className={`text-darkGreen font-Inter my-2 text-sm`}>
        {project?.projectData?.description}
      </div>
      <ProjectChampion member={project?.projectData?.champion as Members} />
      <div>
        <div className={`font-Inter text-sm font-medium text-zinc-500`}>
          🔎open Positions
        </div>
        <div className={`mt-2`}>
          <Badge
            text={project?.role?.title || ""}
            colorRGB={`235,225,255`}
            className={`font-Inter text-sm`}
            cutText={20}
          />
        </div>
      </div>
    </Card>
  );
};
