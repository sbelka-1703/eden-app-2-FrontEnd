import { useEffect, useState } from "react";

import { ISkills, UserCard } from "../../cards";
import { RoleCandidateSelector } from "../../components";

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
  // onSelectMember?: (member: ICandidate) => void;
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
  const [currentCandidate, setCurrentCandidate] = useState<ICandidate | null>(
    null
  );

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
    const { _id, discordName, skills, endorsements, discordAvatar } =
      candidate.member;
    const isFocused = _id === currentCandidate?._id;

    return (
      <button
        key={_id}
        onClick={() => setCurrentCandidate(candidate.member)}
        className={`mb-6`}
      >
        <UserCard
          avatar={discordAvatar}
          name={discordName}
          percentage={matchPercentage}
          skills={skills}
          endorsements={endorsements}
          focused={isFocused}
        />
      </button>
    );
  });

  return (
    <div>
      <RoleCandidateSelector roles={roles} onSelect={setCurrentRole} />
      <div className={`mt-4 flex flex-col`}>{candidates}</div>
    </div>
  );
};
