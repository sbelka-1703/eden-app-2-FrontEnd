import { faker } from "@faker-js/faker";
import { PhaseType } from "@graphql/eden/generated";

import { phase, skills } from "./data";

const links = [
  {
    name: "twitter",
    url: "https://twitter.com/edenprotocolxyz",
  },
  {
    name: "github",
    url: "https://github.com/Soil-labs",
  },
  {
    name: "discord",
    url: "",
  },
  {
    name: "telegram",
    url: "",
  },
];

export const getSkills = (total: number) =>
  Array.from({ length: total }, () => {
    return {
      skillInfo: faker.helpers.uniqueArray(skills, 1)[0],
    };
  });

// TODO: question about keys for this object, should there be a company key?  and what is the difference between title and positionName?
export const getPreviusProjects = () => ({
  title: "Sabre Corporation · Fulltime",
  positionName: faker.name.jobTitle(),
  description: faker.lorem.paragraph(),
  link: "https://www.google.com",
  startDate: "Oct 2019",
  endDate: "present",
  picture: faker.image.image(),
});

export const getPreviusProjectsArray = (total: number) =>
  Array.from({ length: total }, () => getPreviusProjects());

export const getMemberProject = () => ({
  champion: faker.datatype.boolean(),
  favorite: faker.datatype.boolean(),
  phase: faker.helpers.arrayElements(phase, 1)[0] as PhaseType,
  info: [
    {
      _id: String(faker.random.numeric(5)),
      description: faker.lorem.sentences(5),
      title: faker.name.firstName(),
    },
  ],
});

export const getMemberProjectArray = (total: number) =>
  Array.from({ length: total }, () => getMemberProject());

export const getMember = () =>
  ({
    _id: String(faker.random.numeric(5)),
    attributes: {
      Coordinator: Number(faker.random.numeric(1)),
      Director: Number(faker.random.numeric(1)),
      Helper: Number(faker.random.numeric(1)),
      Inspirer: Number(faker.random.numeric(1)),
      Motivator: Number(faker.random.numeric(1)),
      Observer: Number(faker.random.numeric(1)),
      Reformer: Number(faker.random.numeric(1)),
      Supporter: Number(faker.random.numeric(1)),
    },
    bio: faker.lorem.sentences(5),
    content: {
      interest: faker.lorem.lines(),
      mostProud: faker.lorem.sentences(5),
      showCaseAbility: faker.lorem.sentences(4),
    },
    discordAvatar: faker.internet.avatar(),
    discordName: faker.internet.userName(),
    discriminator: faker.random.numeric(4),
    hoursPerWeek: faker.datatype.number({ min: 2, max: 36, precision: 1 }),
    interest: faker.lorem.paragraph(),
    links,
    previusProjects: getPreviusProjectsArray(3),
    projects: getMemberProjectArray(8),
    serverID: faker.random.numeric(12),
    skills: getSkills(faker.datatype.number({ min: 2, max: 36, precision: 1 })),
    timeZone: faker.address.timeZone(),
  } as any);
