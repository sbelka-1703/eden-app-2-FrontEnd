import { faker } from "@faker-js/faker";

export const randomPercentage = (): number => {
  return faker.datatype.number({ min: 12, max: 100, precision: 0.00001 });
};
