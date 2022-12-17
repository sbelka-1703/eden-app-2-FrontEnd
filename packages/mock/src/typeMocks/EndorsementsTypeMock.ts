import { Endorsements } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

export const getEndorsementsTypeMock = (): Endorsements => {
  return {
    arweaveTransactionID: String(faker.random.numeric(5)),
    endorsementMessage: faker.lorem.paragraph(),
    endorser: {
      _id: String(faker.random.numeric(5)),
      discordAvatar: faker.internet.avatar(),
      discordName: faker.internet.userName(),
      discriminator: faker.random.numeric(4),
    },
  };
};

export const getEndorsementsTypeMockArray = (total: number): Endorsements[] =>
  Array.from({ length: total }, () => getEndorsementsTypeMock());
