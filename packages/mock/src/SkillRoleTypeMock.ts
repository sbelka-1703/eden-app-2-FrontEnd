import { faker } from "@faker-js/faker";

export const getSkillRoleTypeMock = () => ({
  comment: faker.lorem.sentences(5),
  level: String(faker.datatype.number({ min: 1, max: 99, precision: 1 })),
  numEndorsement: String(
    faker.datatype.number({ min: 0, max: 999, precision: 1 })
  ),
  skillData: getSkillsTypeMock(),
});

export const getSkillsTypeMock = () => ({
  _id: String(faker.random.numeric(5)),
  name: faker.name.firstName(),
});

export const getSkillTypeMemberMock = () => ({
  level: String(faker.datatype.number({ min: 1, max: 99, precision: 1 })),
  skillInfo: getSkillsTypeMock(),
});
