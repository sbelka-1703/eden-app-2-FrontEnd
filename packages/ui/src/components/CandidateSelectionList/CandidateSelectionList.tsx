import { useQuery } from "@apollo/client";
import { MATCH_MEMBERS_TO_SKILLS } from "@graphql/eden";
import { useEffect, useState } from "react";

import { ISkills, UserCard } from "../../cards";
import { RoleCandidateSelector } from "../../components";

export interface ICandidate {
  _id: number;
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
  // candidates: ICandidate[];
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
  const [roleSkills, setRoleSkills] = useState<string[]>([]);

  const { data: dataMemberWithSkills } = useQuery(MATCH_MEMBERS_TO_SKILLS, {
    variables: {
      fields: {
        skillsID: roleSkills,
      },
    },
    skip: !roleSkills,
    context: { serviceName: "soilservice" },
  });

  // console.log(
  //   "dataMemberWithSkills",
  //   dataMemberWithSkills?.matchMembersToSkills
  // );

  useEffect(() => {
    setCurrentCandidate(null);
    // console.log("currentRole", currentRole);
    // console.log("currentRole", currentRole?.skills);

    setRoleSkills([]);
    if (currentRole?.skills) {
      const indexSkills = [];

      for (const skill of currentRole?.skills) {
        indexSkills.push(skill?._id);
      }
      setRoleSkills(indexSkills);
    }
  }, [currentRole]);

  const { matchMembersToSkills } = dataMemberWithSkills || {};

  const candidates = matchMembersToSkills?.map((candidate: any) => {
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
