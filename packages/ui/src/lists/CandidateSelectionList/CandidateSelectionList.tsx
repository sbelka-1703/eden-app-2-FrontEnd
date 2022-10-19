// eslint-disable-next-line camelcase
import {
  MatchMembersToSkillOutput,
  Maybe,
  RoleTemplate,
} from "@eden/package-graphql/generated";
import { RoleCandidateSelector, UserCard } from "@eden/package-ui";
import { useEffect, useState } from "react";

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
  const [currentRole, setCurrentRole] = useState<RoleTemplate | null>(
    roles[0] || null
  );

  // console.log("roles", roles[0]);
  // if (members.length > 0) console.log("members", members);

  useEffect(() => {
    console.log("currentRole", currentRole);
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
            percentage={candidate?.matchPercentage?.totalPercentage as number}
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
