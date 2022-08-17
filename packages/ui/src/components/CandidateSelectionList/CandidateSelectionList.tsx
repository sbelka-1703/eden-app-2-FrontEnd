import { useEffect, useState } from "react";

import { UserCard } from "../../cards";
import { RoleCandidateSelector } from "../../components";

export interface ICandidate {
  _id: number;
  avatar: string;
  name: string;
  percentage: number;
  endorsements: number;
  skills: string[];
}

export interface IRole {
  _id: number;
  name: string;
  candidates: ICandidate[];
}

export interface ICandidateSelectionListProps {
  roles?: IRole[];
  onSelect?: (candidate: ICandidate) => void;
}

export const CandidateSelectionList = ({
  roles = [],
  onSelect
}: ICandidateSelectionListProps) => {
  const [currentRole, setCurrentRole] = useState<IRole | null>(null);
  const [currentCandidate, setCurrentCandidate] = useState<ICandidate | null>(
    null
  );

  useEffect(() => {
    setCurrentCandidate(null);
  }, [currentRole]);

  useEffect(() => {
    if (currentCandidate && onSelect) {
      onSelect(currentCandidate);
    }
  }, [currentCandidate])

  const candidates = currentRole?.candidates.map((candidate) => {
    const { _id, name, percentage, skills, endorsements, avatar } = candidate;
    const isFocused = candidate._id === currentCandidate?._id;

    return (
      <button
        key={_id}
        onClick={() => setCurrentCandidate(candidate)}
        className={`mb-6`}
      >
        <UserCard
          avatar={avatar}
          name={name}
          percentage={percentage}
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
