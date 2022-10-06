// import { PhaseType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";
// import { phase } from "./data";
import { getMember } from "./MembersMock";
// import { getProject, randomTeam } from "./ProjectMock";

export const randomPercentage = (): number => {
  return faker.datatype.number({ min: 0, max: 100, precision: 0.00001 });
};

export const getMatchPercentage = () => ({
  totalPercentage: randomPercentage(),
  skillTotalPercentage: randomPercentage(),
  hoursPercentage: randomPercentage(),
  budgetPercentage: randomPercentage(),
});

export const matchSkillsToMembers = () => ({
  matchPercentage: getMatchPercentage(),
  members: getMember(),
});

// export const matchMembersToProjectRole = () => ({
//     _id: String(faker.random.numeric(5)),
//     name: faker.name.firstName(),
//     desciption: faker.lorem.sentences(5),
//     phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
//     champion: getMember(),
//     serverID: faker.random.numeric(12),
//     project: getProject(),
//     teams: randomTeam(),
//     author: getMember(),
//     channelDiscordlID: faker.random.numeric(18),
//   });
