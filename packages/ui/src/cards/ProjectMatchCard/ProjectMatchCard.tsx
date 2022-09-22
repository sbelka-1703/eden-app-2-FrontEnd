import {
  MatchSkillsToProjectsOutput,
  Maybe,
  Members,
} from "@graphql/eden/generated";
import { Avatar, Badge, Button, Card, ProjectChampion, TextHeading3 } from "ui";

export interface IProjectMatchCardProps {
  matchProject?: Maybe<MatchSkillsToProjectsOutput>;
  // eslint-disable-next-line no-unused-vars
  onSelected: (project: Maybe<MatchSkillsToProjectsOutput> | undefined) => void;
}

function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);

  return Math.round(value * multiplier) / multiplier;
}

export const ProjectMatchCard = ({
  matchProject,
  onSelected,
}: IProjectMatchCardProps) => {
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
              {round(Number(matchProject?.matchPercentage), 1)}%
            </span>
          </div>
          <TextHeading3>{matchProject?.project?.title}</TextHeading3>
        </div>
        <div>
          <Button onClick={() => onSelected(matchProject)}>More</Button>
        </div>
      </div>
      <div className={`text-darkGreen font-Inter my-2 text-sm`}>
        {matchProject?.project?.description}
      </div>
      <ProjectChampion member={matchProject?.project?.champion as Members} />
      <div>
        <div className={`font-Inter text-sm font-medium text-zinc-500`}>
          🔎open Positions
        </div>
        <div className={`mt-2`}>
          {matchProject?.projectRoles?.map((role, index: number) => (
            <Badge
              key={index}
              text={role?.projectRole?.title || ""}
              colorRGB={`235,225,255`}
              className={`font-Inter text-sm`}
              cutText={20}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
