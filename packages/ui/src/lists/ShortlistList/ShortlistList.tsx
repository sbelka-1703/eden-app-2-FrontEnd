import { Project } from "@graphql/eden/generated";
import { UserCard } from "ui";

export interface ShortlistListProps {
  project?: Project;
}

export const ShortlistList = ({ project }: ShortlistListProps) => {
  return (
    <div className={``}>
      <div
        className={`font-Inter text-center text-base font-medium text-black/50`}
      >
        Shortlisted for...
      </div>
      <h3
        className={`font-poppins text-center text-xl font-medium lg:text-2xl`}
      >
        {project?.title} Team
      </h3>
      <div className={`h-8/10 scrollbar-hide overflow-y-scroll`}>
        {project?.team?.map((member, index) => (
          <div key={index} className={`my-3 w-full px-1`}>
            <UserCard
              member={member?.memberInfo}
              // percentage={matchPercentage}
              // endorsements={endorsements}
              // focused={isFocused}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
