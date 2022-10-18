import { SkillCategory } from "@eden/package-graphql/generated";

import { SkillCategoryTypeMock } from "../typeMocks/SkillCategoryTypeMock";

export const findProjectsRecommendedToUserMock = () =>
  ({
    findSkillCategory: SkillCategoryTypeMock(),
  } as SkillCategory);
