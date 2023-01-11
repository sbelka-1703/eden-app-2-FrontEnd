import {
  MatchMembersToSkillOutput,
  MatchPercentage,
} from "@eden/package-graphql/generated";

import { getSkillsPercentageTypeMockArray } from "../typeMocks";
import { randomPercentage } from "../utils";
import { getMemberLite } from "./MembersMock";

export const getMatchPercentage = (): MatchPercentage => ({
  totalPercentage: randomPercentage(),
  skillTotalPercentage: randomPercentage(),
  hoursPercentage: randomPercentage(),
  budgetPercentage: randomPercentage(),
  realTotalPercentage: randomPercentage(),
});

export const matchSkillsToMembers = (): MatchMembersToSkillOutput => ({
  matchPercentage: getMatchPercentage(),
  member: getMemberLite(),
  skillsPercentage: getSkillsPercentageTypeMockArray(5),
});
