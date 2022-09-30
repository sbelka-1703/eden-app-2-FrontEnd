/* eslint-disable camelcase */
import { faker } from "@faker-js/faker";
import { Maybe, ProjectMatchType } from "@eden/package-graphql/generated";

export const findProjects_RecommendedToUser: Maybe<ProjectMatchType> = {
  projectData: {
    _id: String(faker.random.numeric(5)),
    description: faker.lorem.paragraph(),
    title: faker.commerce.productName(),
    champion: {
      _id: String(faker.random.numeric(5)),
      discordName: faker.internet.userName(),
      discordAvatar: faker.image.image(),
    },
  },
  role: {
    _id: String(faker.random.numeric(5)),
    description: faker.lorem.paragraph(),
    title: faker.name.jobTitle(),
  },
  matchPercentage: 5.555555555555555,
};
