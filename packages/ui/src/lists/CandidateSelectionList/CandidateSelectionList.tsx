// eslint-disable-next-line camelcase
import {
  MatchMembersToSkillOutput,
  Maybe,
  RoleTemplate,
} from "@eden/package-graphql/generated";
import { useEffect, useState } from "react";
import { RoleCandidateSelector, UserCard } from "ui";

export interface ICandidateSelectionListProps {
  roles?: RoleTemplate[];
  members?: Array<Maybe<MatchMembersToSkillOutput>>;
  // eslint-disable-next-line no-unused-vars
  onSelectRole?: (role: string[]) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectMember: (member: string) => void;
  selectMember?: string | null;
}

export const CandidateSelectionList = ({
  roles = [],
  members = [],
  onSelectRole,
  onSelectMember,
  selectMember,
}: ICandidateSelectionListProps) => {
  const [currentRole, setCurrentRole] = useState<RoleTemplate | null>(null);

  useEffect(() => {
    if (currentRole?.skills && onSelectRole) {
      const indexSkills = [];

      for (const skill of currentRole?.skills) {
        indexSkills.push(skill?._id);
      }
      onSelectRole(indexSkills as string[]);
    }
  }, [currentRole]);

  const candidates = members?.map(
    (candidate: Maybe<MatchMembersToSkillOutput>) => {
      return (
        <button
          key={candidate?.member?._id}
          onClick={() => onSelectMember(candidate?.member?._id as string)}
          className={`my-3 w-full px-1`}
        >
          <UserCard
            member={candidate?.member}
            percentage={candidate?.matchPercentage as number}
            // endorsements={endorsements}
            focused={candidate?.member?._id === selectMember}
          />
        </button>
      );
    }
  );

  return (
    <div className={``}>
      <RoleCandidateSelector roles={roles} onSelect={setCurrentRole} />
      <div className={`h-8/10 scrollbar-hide overflow-y-scroll`}>
        {candidates}
      </div>
    </div>
  );
};
