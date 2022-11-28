import { faker } from "@faker-js/faker";

export const getEndorsementsTypeMockArray = (total: number) =>
  Array.from({ length: total }, () => {
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
  });
