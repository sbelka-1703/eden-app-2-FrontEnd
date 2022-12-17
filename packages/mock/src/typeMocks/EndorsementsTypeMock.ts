import { Endorsements } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";

import { endorsementMessage } from "../data";

export const getEndorsementsTypeMock = (): Endorsements => {
  return {
    arweaveTransactionID: String(faker.random.numeric(5)),
    endorsementMessage: faker.helpers.uniqueArray(endorsementMessage, 1)[0]
      .endorsementMessage,
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
