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

export interface IRoleCandidateSelector {
  roles?: IRole[];
}

export const CandidateSelectionList = ({
  roles = [],
}: IRoleCandidateSelector) => {
  const [currentRole, setCurrentRole] = useState<IRole | null>(null);
  const [currentCandidate, setCurrentCandidate] = useState<ICandidate | null>(
    null
  );

  useEffect(() => {
    setCurrentCandidate(null);
  }, [currentRole]);

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
