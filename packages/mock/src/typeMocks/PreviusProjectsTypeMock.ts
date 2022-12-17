import { PreviusProjectsType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

export const getPreviusProjectsTypeMock = (): PreviusProjectsType => ({
  title: faker.name.firstName(),
  positionName: faker.name.jobTitle(),
  description: faker.lorem.paragraph(),
  link: "https://www.google.com",
  startDate: "1669870800000",
  endDate: "1659326400000",
  picture: faker.image.image(),
});

export const getPreviusProjectsTypeMockArray = (
  total: number
): PreviusProjectsType[] =>
  Array.from({ length: total }, () => getPreviusProjectsTypeMock());
