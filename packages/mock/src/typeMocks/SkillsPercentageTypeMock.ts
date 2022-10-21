import {
  Maybe,
  Skills,
  SkillsPercentage,
} from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { skills } from "../data";
import { randomPercentage } from "../graphqlMocks";

export const SkillsPercentageTypeMock = () =>
  ({
    info: faker.helpers.uniqueArray(skills, 1)[0] as Maybe<Skills>,
    percentage100: randomPercentage(),
    percentageReal: randomPercentage(),
  } as SkillsPercentage);
