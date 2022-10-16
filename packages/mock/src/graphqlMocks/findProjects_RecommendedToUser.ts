/* eslint-disable camelcase */
import { Maybe, ProjectMatchType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { getMember } from "./MembersMock";

export const findProjects_RecommendedToUser: Maybe<ProjectMatchType> = {
  projectData: {
    _id: String(faker.random.numeric(5)),
    description: faker.lorem.paragraph(),
    title: faker.commerce.productName(),
    champion: getMember(),
  },
  role: {
    _id: String(faker.random.numeric(5)),
    description: faker.lorem.paragraph(),
    title: faker.name.jobTitle(),
  },
  matchPercentage: 5.555555555555555,
};
