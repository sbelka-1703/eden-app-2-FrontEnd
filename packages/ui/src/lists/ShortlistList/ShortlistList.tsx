import { Project } from "@eden/package-graphql/generated";
import { UserCard } from "ui";

export interface ShortlistListProps {
  project?: Project;
  selectMember?: string;
  // eslint-disable-next-line no-unused-vars
  onSelectMember: (member: string) => void;
}

export const ShortlistList = ({
  project,
  selectMember,
  onSelectMember,
}: ShortlistListProps) => {
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
          <button
            key={index}
            className={`my-3 w-full px-1`}
            onClick={() => onSelectMember(member?.memberInfo?._id as string)}
          >
            {member && member.phase === "shortlisted" && (
              <UserCard
                member={member?.memberInfo}
                // percentage={matchPercentage}
                // endorsements={endorsements}
                focused={selectMember === member?.memberInfo?._id}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
