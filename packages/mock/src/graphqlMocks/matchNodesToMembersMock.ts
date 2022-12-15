import { MatchMembersToSkillOutput } from "@eden/package-graphql/generated";

import { getMatchPercentage } from "./MatchSkillsToMembersMock";
import { getMember, getSkillsPercentageArray } from "./MembersMock";

export const matchNodesToMembersMock = () =>
  ({
    matchPercentage: getMatchPercentage(),
    member: getMember(),
    skillsPercentage: getSkillsPercentageArray(8),
  } as MatchMembersToSkillOutput);

export const matchNodesToMembersMockArray = (total: number) =>
  Array.from({ length: total }, () => matchNodesToMembersMock());
