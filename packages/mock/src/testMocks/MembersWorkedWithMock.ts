import { faker } from "@faker-js/faker";

import { getMemberLite } from "../graphqlMocks/MembersMock";
import { getProject } from "../graphqlMocks/ProjectMock";
import { getNodesTypeMockArray } from "../typeMocks";

export const membersWorkedWithMock = () => ({
  member: getMemberLite(),
  project: getProject(),
  topSkills: getNodesTypeMockArray(
    faker.datatype.number({ min: 2, max: 5, precision: 1 })
  ),
  collaboration: faker.helpers.uniqueArray(collaborationData, 1)[0],
});

export const membersWorkedWithMockArray = (total: number) =>
  Array.from({ length: total }, () => membersWorkedWithMock());

const collaborationData = [
  {
    collaboaratedOn:
      "Working together to build a web3 platform for a new decentralized application. The platform will include a blockchain node, a client-side application, and smart contracts.",
    tasks: [
      "Developed a web3 platform for a new decentralized application.",
      "Built a blockchain node, a client-side application, and smart contracts.",
      "Write the smart contracts that will govern the application's logic and rules.",
    ],
    timeline: "4 weeks",
  },
  {
    collaboaratedOn:
      "Work together to create an intuitive and secure web3 application that will allow users to easily access and interact with the Ethereum network.",
    tasks: [
      "Design the user interface of the web3 application",
      "Create a secure authentication system for users",
      "Integrate the web3 application with the Ethereum blockchain",
    ],
    timeline: "8 weeks",
  },
  {
    collaboaratedOn:
      "A web3 project to build a decentralized application that will allow users to securely store and exchange digital assets.",
    tasks: [
      "Research and analyze the current state of blockchain technology and available platforms to determine the best platform for our project",
      "Develop the application architecture, including user interface and back end functionality",
      "Create a smart contract to ensure secure and trustless asset exchanges",
    ],
    timeline: "6 weeks",
  },
  {
    collaboaratedOn:
      "Creating a secure and user-friendly web3 experience for users to easily access and interact with the Ethereum network.",
    tasks: [
      "Develop a web3 interface that is secure and easy-to-use ",
      "Integrate user authentication, encryption, and security measures ",
      "Implement wallet management features to enable transactions and storage of digital assets",
    ],
    timeline: "4 weeks",
  },
  {
    collaboaratedOn: "Developing a Blockchain-Based Decentralized Application",
    tasks: [
      "Develop a smart contract that meets the business requirements of the application.",
      "Design and implement the user interface of the application.",
      " Test the application for security vulnerabilities and develop bug fixes.",
    ],
    timeline: "6 weeks",
  },
];
