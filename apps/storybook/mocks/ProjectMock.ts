import { faker } from "@faker-js/faker";

import { member } from "./MembersMock";

export const project = {
  _id: String(faker.random.numeric(5)),
  budget: {
    perHour: faker.finance.amount(0, 100, 2),
    token: faker.finance.amount(0, 100, 2),
    totalBudget: faker.finance.amount(0, 100, 2),
  },
  champion: member,
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
    complition: faker.date.future(),
    kickOff: faker.date.future(),
  },
  description: faker.lorem.sentences(5),
  // eslint-disable-next-line camelcase
  garden_teams: [
    {
      _id: String(faker.random.numeric(5)),
      champion: member,
      description: faker.lorem.sentences(5),
      members: [member, member],
      name: faker.name.firstName(),
      projects: [],
      roles: [],
      serverID: [],
    },
    {
      _id: String(faker.random.numeric(5)),
      champion: member,
      description: faker.lorem.sentences(5),
      members: [member, member],
      name: faker.name.firstName(),
      projects: [],
      roles: [],
      serverID: [],
    },
  ],
  role: [
    {
      _id: String(faker.random.numeric(5)),
      archive: false,
      budget: {
        perHour: faker.finance.amount(0, 100, 2),
        token: faker.finance.amount(0, 100, 2),
        totalBudget: faker.finance.amount(0, 100, 2),
      },
      dateRangeEnd: faker.date.future(),
      dateRangeStart: faker.date.future(),
      description: faker.lorem.sentences(5),
      hoursPerWeek: Number(faker.random.numeric(2)),
      skills: [
        {
          _id: String(faker.random.numeric(5)),
          name: faker.name.firstName(),
        },
        {
          _id: String(faker.random.numeric(5)),
          name: faker.name.firstName(),
        },
        {
          _id: String(faker.random.numeric(5)),
          name: faker.name.firstName(),
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
      dateRangeEnd: faker.date.future(),
      dateRangeStart: faker.date.future(),
      description: faker.lorem.sentences(5),
      hoursPerWeek: Number(faker.random.numeric(2)),
      skills: [
        {
          _id: String(faker.random.numeric(5)),
          name: faker.name.firstName(),
        },
        {
          _id: String(faker.random.numeric(5)),
          name: faker.name.firstName(),
        },
        {
          _id: String(faker.random.numeric(5)),
          name: faker.name.firstName(),
        },
      ],
      title: faker.name.firstName(),
    },
  ],
  serverID: [faker.internet.url(), faker.internet.url(), faker.internet.url()],
  title: faker.name.firstName(),
};
