import {
  MatchMembersToSkillOutput,
  MatchPercentage,
} from "@eden/package-graphql/generated";

import { getSkillsPercentageTypeMockArray } from "../typeMocks";
import { randomPercentage } from "../utils";
import { getMember } from "./MembersMock";

export const getMatchPercentage = (): MatchPercentage => ({
  totalPercentage: randomPercentage(),
  skillTotalPercentage: randomPercentage(),
  hoursPercentage: randomPercentage(),
  budgetPercentage: randomPercentage(),
  realTotalPercentage: randomPercentage(),
});

export const matchSkillsToMembers = (): MatchMembersToSkillOutput => ({
  matchPercentage: getMatchPercentage(),
  member: getMember(),
  skillsPercentage: getSkillsPercentageTypeMockArray(5),
});
