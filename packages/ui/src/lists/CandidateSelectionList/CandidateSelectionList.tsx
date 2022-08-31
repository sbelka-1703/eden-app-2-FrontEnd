import { useEffect, useState } from "react";
import { RoleCandidateSelector } from "ui";

import { ISkills, UserCard } from "../../cards";

export interface ICandidate {
  _id: string;
  avatar: string;
  name: string;
  percentage: number;
  endorsements: number;
  skills: ISkills[];
}

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
  members?: any;
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
  const [currentCandidate, setCurrentCandidate] =
    useState<ICandidate | null>(null);

  useEffect(() => {
    if (currentCandidate && onSelectMember) {
      onSelectMember(currentCandidate._id);
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
      <div className={`h-8/10 overflow-y-scroll`}>{candidates}</div>
    </div>
  );
};
