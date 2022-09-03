import { faker } from "@faker-js/faker";

const skills = [
  "3D",
  "Solidity",
  "Design",
  "Fullstack",
  "React",
  "Node.js",
  "Mentorship",
  "Figma",
  "Adobe",
  "Tailwind",
  "Leadership",
];

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

export const getSkills = () =>
  Array.from({ length: 6 }, () => {
    return {
      skillInfo: {
        _id: Number(faker.random.numeric(5)),
        name: faker.helpers.uniqueArray(skills, 1),
        __typename: "Skills",
      },
      __typename: "skillType_member",
    };
  });

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
    previusProjects: [
      {
        title: "Sabre Corporation · Fulltime",
        positionName: "SCRUM MASTER",
        description: faker.lorem.paragraph(),
        link: "https://www.google.com",
        startDate: "Oct 2019",
        endDate: "present",
        picture: faker.image.image(),
      },
      {
        title: "Sabre Corporation · Fulltime",
        positionName: "PROJECT MANAGER",
        description: faker.lorem.paragraph(),
        link: "https://www.google.com",
        startDate: "March 2015",
        endDate: "Oct 2019",
        picture: faker.image.image(),
      },
    ],
    serverID: faker.random.numeric(12),
    skills: getSkills(),
    timeZone: faker.address.timeZone(),
  } as any);
