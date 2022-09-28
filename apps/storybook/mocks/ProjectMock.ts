import { faker } from "@faker-js/faker";
import { PhaseType, Project } from "@graphql/eden/generated";

import { phase, skills } from "./data";
import { getMember } from "./MembersMock";

const level = ["learning", "junior", "mid", "senior"];

export const randomTeamType = () =>
  Array.from({ length: 40 }, () => {
    return {
      _id: String(faker.random.numeric(5)),
      phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
      memberInfo: getMember(),
    };
  });

export const randomTeam = () =>
  Array.from({ length: 40 }, () => {
    return {
      _id: String(faker.random.numeric(5)),
      champion: getMember(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
    };
  });

export const getProjectSkills = (total: number) =>
  Array.from({ length: total }, () => {
    return {
      skillData: faker.helpers.uniqueArray(skills, 1)[0],
      comment: faker.lorem.sentences(1),
      level: faker.helpers.uniqueArray(level, 1)[0],
      numEndorsement: String(faker.random.numeric(2)),
    };
  });

export const project: Project = {
  _id: String(faker.random.numeric(5)),
  budget: {
    perHour: faker.finance.amount(0, 100, 2),
    token: faker.finance.amount(0, 100, 2),
    totalBudget: faker.finance.amount(0, 100, 2),
  },
  champion: getMember(),
  collaborationLinks: [
    {
      link: faker.internet.url(),
      title: faker.lorem.sentence(),
    },
    {
      link: faker.internet.url(),
      title: faker.lorem.sentence(),
    },
    {
      link: faker.internet.url(),
      title: faker.lorem.sentence(),
    },
  ],
  dates: {
    complition: "1662161995158",
    kickOff: "1662161995158",
  },
  description: faker.lorem.sentences(5),
  team: randomTeamType(),
  // eslint-disable-next-line camelcase
  garden_teams: randomTeam(),
  role: [
    {
      _id: String(faker.random.numeric(5)),
      archive: false,
      description: faker.lorem.sentences(5),
      skills: getProjectSkills(
        faker.datatype.number({ min: 2, max: 36, precision: 1 })
      ),
      title: faker.name.firstName(),
    },
    {
      _id: String(faker.random.numeric(5)),
      archive: false,
      description: faker.lorem.sentences(5),
      skills: getProjectSkills(
        faker.datatype.number({ min: 2, max: 36, precision: 1 })
      ),
      title: faker.name.firstName(),
    },
  ],
  serverID: [faker.internet.url(), faker.internet.url(), faker.internet.url()],
  title: faker.name.firstName(),
  __typename: "Project",
};

export const getProject = () => {
  return project;
};

export const getProjectArray = (total: number) =>
  Array.from({ length: total }, () => getProject());
