import { getMatchPercentage } from "./MatchSkillsToMembersMock";
import { getMember, getSkillsPercentage } from "./MembersMock";

export const matchNodesToMembersMock = () => ({
  matchPercentage: getMatchPercentage(),
  member: getMember(),
  skillsPercentage: getSkillsPercentage(),
});

export const matchNodesToMembersMockArray = (total: number) =>
  Array.from({ length: total }, () => matchNodesToMembersMock());
