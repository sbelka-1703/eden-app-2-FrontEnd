// eslint-disable-next-line camelcase
import { Members } from "@graphql/eden/generated";
import { useEffect, useState } from "react";
import { RoleCandidateSelector, UserCard } from "ui";

interface IRoleSkill {
  _id: string;
  name: string;
  __typename: string;
}

export interface IRole {
  _id: string;
  title: string;
  skills: IRoleSkill[];
  __typename: string;
}

export interface ICandidateSelectionListProps {
  roles?: IRole[];
  members?: Members[];
  // eslint-disable-next-line no-unused-vars
  onSelectRole?: (role: string[]) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectMember?: (member: string) => void;
}

export const CandidateSelectionList = ({
  roles = [],
  members = [],
  onSelectRole,
  onSelectMember,
}: ICandidateSelectionListProps) => {
  const [currentRole, setCurrentRole] = useState<IRole | null>(null);
  const [currentCandidate, setCurrentCandidate] = useState<Members | null>(
    null
  );

  useEffect(() => {
    if (currentCandidate && onSelectMember) {
      onSelectMember(currentCandidate._id as string);
    }
  }, [currentCandidate, onSelectMember]);

  useEffect(() => {
    setCurrentCandidate(null);

    if (currentRole?.skills && onSelectRole) {
      const indexSkills = [];

      for (const skill of currentRole?.skills) {
        indexSkills.push(skill?._id);
      }
      onSelectRole(indexSkills);
    }
  }, [currentRole]);

  const candidates = members?.map((candidate: any) => {
    const { matchPercentage } = candidate;
    const { _id, endorsements } = candidate.member;
    const isFocused = _id === currentCandidate?._id;

    return (
      <button
        key={_id}
        onClick={() => setCurrentCandidate(candidate.member)}
        className={`my-3 w-full px-1`}
      >
        <UserCard
          member={candidate.member}
          percentage={matchPercentage}
          endorsements={endorsements}
          focused={isFocused}
        />
      </button>
    );
  });

  return (
    <div className={``}>
      <RoleCandidateSelector roles={roles} onSelect={setCurrentRole} />
      <div className={`h-8/10 scrollbar-hide overflow-y-scroll`}>
        {candidates}
      </div>
    </div>
  );
};