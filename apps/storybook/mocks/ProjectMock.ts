import { faker } from "@faker-js/faker";
import { PhaseType } from "@graphql/eden/generated";

import { getMember } from "./MembersMock";

const phase = ["committed", "engaged", "rejected", "shortlisted", "invited"];

const randomTeamType = () =>
  Array.from({ length: 40 }, () => {
    return {
      _id: String(faker.random.numeric(5)),
      phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
      memberInfo: getMember(),
    };
  });

const randomTeam = () =>
  Array.from({ length: 40 }, () => {
    return {
      _id: String(faker.random.numeric(5)),
      champion: getMember(),
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
    };
  });

export const project = {
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
      budget: {
        perHour: faker.finance.amount(0, 100, 2),
        token: faker.finance.amount(0, 100, 2),
        totalBudget: faker.finance.amount(0, 100, 2),
      },
      dateRangeEnd: "1662161995158",
      dateRangeStart: "1662161995158",
      description: faker.lorem.sentences(5),
      hoursPerWeek: Number(faker.random.numeric(2)),
      // skills: getSkills(Number(faker.random.numeric(1))),
      skills: [
        {
          comment: faker.lorem.sentences(1),
          level: faker.lorem.sentences(1),
          numEndorsement: String(faker.random.numeric(2)),
        },
        {
          comment: faker.lorem.sentences(1),
          level: faker.lorem.sentences(1),
          numEndorsement: String(faker.random.numeric(2)),
        },
      ],
      title: faker.name.firstName(),
    },
    {
      _id: String(faker.random.numeric(5)),
      archive: false,
      budget: {
        perHour: faker.finance.amount(0, 100, 2),
        token: faker.finance.amount(0, 100, 2),
        totalBudget: faker.finance.amount(0, 100, 2),
      },
      dateRangeEnd: "1662161995158",
      dateRangeStart: "1662161995158",
      description: faker.lorem.sentences(5),
      hoursPerWeek: Number(faker.random.numeric(2)),
      skills: [
        {
          comment: faker.lorem.sentences(1),
          level: faker.lorem.sentences(1),
          numEndorsement: String(faker.random.numeric(2)),
        },
        {
          comment: faker.lorem.sentences(1),
          level: faker.lorem.sentences(1),
          numEndorsement: String(faker.random.numeric(2)),
        },
      ],
      title: faker.name.firstName(),
    },
  ],
  serverID: [faker.internet.url(), faker.internet.url(), faker.internet.url()],
  title: faker.name.firstName(),
};

export const getProject = () => {
  return project;
};
