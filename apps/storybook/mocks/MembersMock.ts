import { faker } from "@faker-js/faker";

import { skills } from "./skills";

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

export const getPreviusProjectsArray = () =>
  Array.from({ length: 4 }, () => getPreviusProjects());

export const getMember = () =>
  ({
    _id: String(faker.random.numeric(5)),
    bio: faker.lorem.sentences(5),
    content: {
      interest: faker.lorem.lines(),
      mostProud: faker.lorem.sentences(5),
      showCaseAbility: faker.lorem.sentences(4),
    },
    discordAvatar: faker.internet.avatar(),
    discordName: faker.internet.userName(),
    discriminator: faker.random.numeric(4),
    hoursPerWeek: Number(faker.random.numeric(2)),
    interest: faker.lorem.paragraph(),
    links,
    previusProjects: getPreviusProjectsArray(),
    // previusProjects: [
    //   {
    //     title: "Sabre Corporation · Fulltime",
    //     positionName: "SCRUM MASTER",
    //     description: faker.lorem.paragraph(),
    //     link: "https://www.google.com",
    //     startDate: "Oct 2019",
    //     endDate: "present",
    //     picture: faker.image.image(),
    //   },
    //   {
    //     title: "Sabre Corporation · Fulltime",
    //     positionName: "PROJECT MANAGER",
    //     description: faker.lorem.paragraph(),
    //     link: "https://www.google.com",
    //     startDate: "March 2015",
    //     endDate: "Oct 2019",
    //     picture: faker.image.image(),
    //   },
    // ],
    serverID: faker.random.numeric(12),
    skills: getSkills(Number(faker.random.numeric(1))),
    timeZone: faker.address.timeZone(),
  } as any);
