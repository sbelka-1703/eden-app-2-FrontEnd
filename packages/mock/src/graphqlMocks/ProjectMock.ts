import { PhaseType, Project } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { phase } from "../data";
import { getRoleTypeMockArray, getTeamTypeMockArray } from "../typeMocks";
import { getMember } from "./MembersMock";

export const randomTeamType = () =>
  Array.from({ length: 40 }, () => {
    return {
      _id: String(faker.random.numeric(5)),
      phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
      memberInfo: getMember(),
    };
  });

export const project: Project = {
  _id: String(faker.random.numeric(5)),
  title: faker.name.firstName(),
  description: faker.lorem.sentences(5),
  descriptionOneLine: faker.lorem.sentences(1),
  emoji: faker.helpers.arrayElement(["🚀", "👨‍🚀", "👩‍🚀"]),
  backColorEmoji: faker.helpers.arrayElement(["#ce6969", "#69cebd", "#df2a9d"]),
  budget: {
    perHour: faker.finance.amount(0, 100, 2),
    token: faker.finance.amount(0, 100, 2),
    totalBudget: faker.finance.amount(0, 100, 2),
  },
  champion: getMember(),
  collaborationLinks: [
    {
      link: "https://twitter.com/edenprotocolxyz",
      title: "twitter",
    },
    {
      link: "https://github.com",
      title: "github",
    },
    {
      link: "https://www.notion.so/",
      title: "notion",
    },
  ],
  dates: {
    complition: "1662161995158",
    kickOff: "1662161995158",
  },
  team: randomTeamType(),
  // eslint-disable-next-line camelcase
  garden_teams: getTeamTypeMockArray(Number(faker.random.numeric(1))),
  role: getRoleTypeMockArray(5),
  serverID: [faker.internet.url(), faker.internet.url(), faker.internet.url()],
  __typename: "Project",
};

export const getProject = () => {
  return project;
};

export const getProjectArray = (total: number) =>
  Array.from({ length: total }, () => getProject());
