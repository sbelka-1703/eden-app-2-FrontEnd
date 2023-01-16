import { getEndorsementsTypeMockArray } from "@eden/package-mock";
import { faker } from "@faker-js/faker";

const SkillTreeShowFlag = {
  ChooseCategory: true,
  ChooseSubcategory: true,
  ChooseFocusArea: true,
  ChoosePriorities: true,
  ChooseSalary: true,
};

const priorities = {
  title: "Let me get your priorities straight!",
  description: "Distribute the 100 points based on what you value most.",
  priorities: {
    Experience: {
      description: "Can they be a novice or do they need to be a champ?",
      initialValue: "20",
    },
    Accountability: {
      description: "Do they need to have a proven track-record of reliability?",
      initialValue: "20",
    },
    "Skill Match": {
      description: "How precise does the skill match need to be?",
      initialValue: "20",
    },
    Availability: {
      description: "Are you flexible on time?",
      initialValue: "20",
    },
  },
};

const proposedSalary = {
  title: "Salary range",
  description:
    "Give us an indication of the salary range you were thinking about",
  minSalary: "1/hour",
  maxSarary: "500/hour",
};

const SkillTree = {
  category: {
    title: "Who are you looking for?",
    subTitle: "Select what you want them to help you with.",
  },
  Design: {
    subCategories: {
      title: "Anything you’d like to specify about this person?",
      subTitle: "Pick as many things as are important to you.",
      numMatches: "210",
      content: [
        "UX/UI",
        "Graphic Design",
        "Web Design",
        "Game Design",
        "Animation",
        "General Design support from A-Z",
        "NFT Design",
        "Brand Design",
        "Other",
      ],
    },
    "Niche Skills": {
      title: "",
      subTitle: "",
      content: [
        "Design Thinking",
        "User-Centered Design",
        "Agile",
        "Style Guides",
        "Creative Brief",
        "VR Design",
        "AR Design",
        "Character Design",
        "Other",
      ],
    },
    "Knowledge of specific tools": {
      title: "",
      subTitle: "",
      content: [
        "Figma",
        "Sketch",
        "Figma",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "3D Design Software",
        "Canva",
        "CorelDraw",
        "GIMP",
        "Affinity Designer",
        "Infinite Design",
        "Inkscape",
        "Other",
      ],
    },
    "Values & Culture": {
      title: "",
      subTitle: "",
      content: [
        "Growth Mindset",
        "Self-starter",
        "First Principles Thinker",
        "Teamwork",
        "Integrity",
        "Entrepreneurial",
        "Boldness",
        "Trust",
        "Accountability",
        "Passion",
        "Reliability",
        "Fun",
        "Honesty",
        "Other",
      ],
    },
  },
  "Frontend Developer": {
    subCategories: {
      title: "Anything you’d like to specify about this person?",
      subTitle: "Pick as many things as are important to you.",
      content: [
        "UI Implementation",
        "Frontend Architecture",
        "General Frontend Support",
        "Web Development",
        "App Development",
        "Other",
      ],
    },
    "Niche Skills": {
      title: "",
      subTitle: "",
      content: [
        "Typescript",
        "Javascript",
        "React",
        "Angular",
        "Other specific languages",
        "Other specific skills",
      ],
    },
    "Knowledge of specific tools": {
      title: "",
      subTitle: "",
      content: [
        "Issue Tracking Tools",
        "Specific IDE's",
        "Database Editors",
        "API Management Tools",
        "Specific Libraries",
        "Version Control",
        "Other",
      ],
    },
    "Values & Culture": {
      title: "",
      subTitle: "",
      content: [
        "Growth mindset",
        "Self-starter",
        "First Principles",
        "Teamwork",
        "Integrity",
        "Entrepreneurial",
        "Boldness",
        "Trust",
        "Accountability",
        "Passion",
        "Reliability",
        "Fun",
        "Honesty",
        "Other",
      ],
    },
  },
  "Backend Developer": {
    subCategories: {
      title: "Anything you’d like to specify about this person?",
      subTitle: "Pick as many things as are important to you.",
      content: [
        "Architecture of your app",
        "Hard CS Stuff like Algo Dev & Data Structures",
        "AI & Data Science",
        "Blockchain & Smart Contract Stuff",
        "Other",
      ],
    },
    "Niche Skills": {
      title: "",
      subTitle: "",
      content: [
        "Typescript",
        "Java",
        "MySQL",
        "Node.js",
        "Ruby",
        "Python",
        "Rust/C++",
        "GO",
        "Javascript",
        "Other Languages",
        "Other Tools",
      ],
    },
    "Knowledge of specific tools": {
      title: "",
      subTitle: "",
      content: [
        "Issue Tracking Tools",
        "Specific IDE's",
        "Database Editors",
        "API Management Tools",
        "Specific Libraries",
        "Version Control",
        "Other",
      ],
    },
    "Values & Culture": {
      title: "",
      subTitle: "",
      content: [
        "Growth mindset",
        "Self-starter",
        "First Principles Thinker",
        "Teamwork",
        "Integrity",
        "Entrepreneurial",
        "Boldness",
        "Trust",
        "Accountability",
        "Passion",
        "Reliability",
        "Fun",
        "Honesty",
        "Other",
      ],
    },
  },
  "Blockchain Developer": {
    subCategories: {
      title: "Anything you’d like to specify about this person?",
      subTitle: "Pick as many things as are important to you.",
      content: [
        "Smart Contract Development",
        "Smart Contract Auditing",
        "Blockchain Architecture & Design",
        "Lead a Technical Team",
        "General Blockchain Support",
        "Other",
      ],
    },
    "Niche Skills": {
      title: "",
      subTitle: "",
      content: [
        "Solidity",
        "GO",
        "MOVE",
        "C++",
        "Rust",
        "Other Languages",
        "Other Niche Skills",
      ],
    },
    "Knowledge of specific tools": {
      title: "",
      subTitle: "",
      content: [
        "Polygon",
        "Polkadot",
        "Celo",
        "Avalanche",
        "Ethereum",
        "Solana",
        "Cardano",
        "Binance Smart Chain",
        "Bitcoin",
        "Cosmos",
        "Other",
      ],
    },
    "Values & Culture": {
      title: "",
      subTitle: "",
      content: [
        "Growth mindset",
        "Self-starter",
        "First Principles Thinker",
        "Teamwork",
        "Integrity",
        "Entrepreneurial",
        "Boldness",
        "Trust",
        "Accountability",
        "Passion",
        "Reliability",
        "Fun",
        "Honesty",
        "Other",
      ],
    },
  },
  Product: {
    subCategories: {
      title: "Anything you’d like to specify about this person?",
      subTitle: "Pick as many things as are important to you.",
      content: [
        "User Research",
        "Market Research",
        "Technical Team Coordination",
        "Design Team Coordination",
        "Ideation",
        "Interviews",
        "UX/UI",
        "General PM Support building your product from A-Z",
        "Other",
      ],
    },
    "Niche Skills": {
      title: "",
      subTitle: "",
      content: [
        "Quantitative Analysis",
        "Qualitative Analysis",
        "Report Creation",
        "Statistical Analysis",
        "A/B Testing",
        "Feature Discovery Techniques",
        "Agile",
        "Waterfall",
        "Spec Writing",
        "User Journey Mapping",
        "Persona Development",
        "User Stories",
        "Technical Spec Writing",
        "Product OKR Development",
        "Other",
      ],
    },
    "Knowledge of specific tools": {
      title: "",
      subTitle: "",
      content: [
        "Figma",
        "Loom",
        "Zoom",
        "Illustrator",
        "Photoshop",
        "Canva",
        "Infinite Design",
        "Trello",
        "Jira",
        "Asana",
        "Other",
      ],
    },
    "Values & Culture": {
      title: "",
      subTitle: "",
      content: [
        "Growth mindset",
        "Self-starter",
        "First Principles Thinker",
        "Teamwork",
        "Integrity",
        "Entrepreneurial",
        "Boldness",
        "Trust",
        "Accountability",
        "Passion",
        "Reliability",
        "Fun",
        "Honesty",
        "Other",
      ],
    },
  },
};

const ResultCardShowFlag = {
  type: "User", // Project,Bounty,DAO,User,discordChannel
  picture: true,
  description: true,
  skills: true,
  generalTags: true,
  champion: true,
  persentage: true,
  persentageButton: true,
};

const ResultPopUpShowFlag = {
  type: "User", // Project,Bounty,DAO,User,discordChannel
  picture: true,
  description: true,
  skills: true,
  generalTags: true,
  champion: true,
  persentage: true,
  persentageButton: true,
};

const Result = {
  1: {
    description:
      "Have been programming since I was 12 years old. During the day I work at Google as a Frontend Engineer on Google Maps, at night I want to be working on the next Google. Hit me up for help with cool startup projects. I'm obsessed with Frontend because it literally has the power to shape the way we interact with eachother & the world around us.",
    percentage: "85%",
    picture:
      "https://cdn.discordapp.com/avatars/875582358940684388/69f7bcd77f145dd282e2abeb47717cf8.webp",
    name: "BluePanda",
    nameDescription: "Frontend Developer",
    Descrimator: "1234",
    lifetimeStakeTRST: 1205,
    totalTRST: 320,
    Skills: [
      "Typescript",
      "Javascript",
      "React",
      "Angular",
      "Jira",
      "Self-Starter",
      "Growth Mindset",
      "Accountability",
      "UX/UI",
      "Graphic Design",
      "Web Design",
      "UI Implementation",
      "Frontend Architecture",
      "General Frontend Support",
      "Web Development",
      "App Development",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "10",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 2, max: 8, precision: 1 })
    ),
    background: [
      {
        title: "Data Scientist",
        emoji: "💽",
        color: "#FFD2D2",
        content: [
          {
            title: "Data schiecne in Nova Futur Ltd",
            content:
              "Head of DataHead of Data Overseeing data science and data engineering (ETL pipelines) work across multiple teamsOverseeing data science and data engineering (ETL pipelines) work across multiple teams",
            skills: ["Go", " Cloud Computing", "tailwind"],
            date: {
              start: "2019",
              end: "2020",
            },
          },
          {
            title: "Undergrad Research Lead Full Stack Developer",
            content:
              "Campus job. Maintained 6 virtual machines with Ubuntu and PaaS (Dokku) that power the HiPerCiC platform. Installed services and containerized web applications with Docker.",
            skills: ["Teaching", "Python", "Teaching"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
          {
            title: "Junior ML engineer",
            content:
              "Machine Learning internship. Created a random point generator for map data from around the world that was used to evaluate the quality of internal location services at Sygic.",
            skills: ["Python", "Statistical Data Analysis"],
            date: {
              start: "2017",
              end: "2018",
            },
          },
        ],
      },
      {
        title: "Intern",
        emoji: "🗄",
        color: "#CAE8FF",
        content: [
          {
            title: "LEAF organisation",
            content:
              "Worked as an intern on the LEAF Summer Leadership Camp 2016 to help develop the next generation of central European leaders.",
            skills: ["product managment"],
            date: {
              start: "Jul 2014",
              end: "Nov 2015",
            },
          },
        ],
      },
      {
        title: "Data Scientist",
        emoji: "💽",
        color: "#FFD2D2",
        content: [
          {
            title: "Data schiecne in Nova Futur Ltd",
            content:
              "Head of DataHead of Data Overseeing data science and data engineering (ETL pipelines) work across multiple teamsOverseeing data science and data engineering (ETL pipelines) work across multiple teams",
            skills: ["Go", " Cloud Computing", "tailwind"],
            date: {
              start: "2019",
              end: "2020",
            },
          },
          {
            title: "Undergrad Research Lead Full Stack Developer",
            content:
              "Campus job. Maintained 6 virtual machines with Ubuntu and PaaS (Dokku) that power the HiPerCiC platform. Installed services and containerized web applications with Docker.",
            skills: ["Teaching", "Python", "Teaching"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
          {
            title: "Junior ML engineer",
            content:
              "Machine Learning internship. Created a random point generator for map data from around the world that was used to evaluate the quality of internal location services at Sygic.",
            skills: ["Python", "Statistical Data Analysis"],
            date: {
              start: "2017",
              end: "2018",
            },
          },
        ],
      },
    ],
  },
  2: {
    description:
      "I was employee no1 at Dropbox where I basically helped scope out v1 of the product's backend. I'm looking for a challenging project to spend my nights & weekends on and potentially even join down the line.",
    percentage: "79%",
    picture:
      "https://cdn.discordapp.com/avatars/516697403391213588/4cc3f607d01bc8865b327064c5d380ca.png",
    name: "Waxy",
    nameDescription: "Backend Developer",
    Descrimator: "1234",
    lifetimeStakeTRST: 40,
    totalTRST: 20,
    Skills: [
      "Architecture of your app",
      "Hard CS Stuff like Algo Dev & Data Structures",
      "Blockchain & Smart Contract Stuff",
      "Typescript",
      "Java",
      "MySQL",
      "Node.js",
      "Ruby",
      "Python",
      "Rust/C++",
      "GO",
      "Javascript",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "15",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 2, max: 8, precision: 1 })
    ),
    background: [
      {
        title: "Tech Lead",
        emoji: "🙀",
        color: "#FFE5BD",
        content: [
          {
            title: "Tech Lead in Sentora",
            content:
              "Built an innovative experimentation platform for A/B testing of global scale from scratch to support evidence-driven products development across 30 coun",
            skills: [
              "leadership",
              "managment",
              "communication",
              "data science",
            ],
            date: {
              start: "2022",
              end: "2020",
            },
          },
          {
            title: "IOS teach lead",
            content:
              "Developed greenfield applications for advertisement campaign reporting. Led and coordinated efforts of a multi disciplinary team to build iOS and Android apps and backend services",
            skills: [],
            date: {
              start: "2016",
              end: "2017",
            },
          },
          {
            title: "IOS tech architect",
            content:
              "Had central role in defining the technical design and implementation of a trading platform framework for iOS, always with a very hands-on approach to development.",
            skills: ["IOS", "Android"],
            date: {
              start: "Oct 2015",
              end: "Jen 2016",
            },
          },
        ],
      },
      {
        title: "System Analyst",
        emoji: "🛠",
        color: "#CAE8FF",
        content: [
          {
            title: "System Analyst",
            content:
              "Had central role in defining the technical design and implementation of a trading platform framework for iOS, always with a very hands-on approach to development.",
            skills: [],
            date: {
              start: "Jul 2016",
              end: "Nov 2017",
            },
          },
        ],
      },
    ],
  },
  3: {
    description:
      "I'm currently a PM at Airbnb - absolutely obsessed with learning & want to work on something completely unrelated to hospitality.",
    percentage: "88%",
    picture:
      "https://cdn.discordapp.com/avatars/677988313319211037/ff9cda5e0e8fbe62caea07fb7eb3de23.webp",
    name: "Impactbilli",
    nameDescription: "Product",
    Descrimator: "1234",
    lifetimeStakeTRST: 600,
    totalTRST: 220,
    Skills: [
      "User Research",
      "Market Research",
      "Technical Team Coordination",
      "Design Team Coordination",
      "Ideation",
      "Interviews",
      "UX/UI",
      "Spec Writing",
      "User Journey Mapping",
      "Persona Development",
      "User Stories",
      "Technical Spec Writing",
      "Product OKR Development",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "10",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 2, max: 8, precision: 1 })
    ),
    background: [
      {
        title: "Quant Analyst",
        emoji: "🙀",
        color: "#E3FBFF",
        content: [
          {
            title: "Quant Analyst",
            content:
              "Business developpment. ERP management and website maintenance. Webmarketing and e-learning.",
            skills: [
              "leadership",
              "managment",
              "communication",
              "data science",
            ],
            date: {
              start: "2022",
              end: "2020",
            },
          },
        ],
      },
    ],
  },
  4: {
    description:
      "I've been designing since 3 - my drawings then were already exquisite. Currently designing at Apple. Looking to help projects that want to fight climate change.",
    percentage: "78%",
    picture:
      "https://cdn.discordapp.com/avatars/175735303489847296/fe70f8879d7d8979dd4a32690806f7f3.webp",
    name: "XYZ",
    nameDescription: "Product",
    Descrimator: "1234",
    lifetimeStakeTRST: 30,
    totalTRST: 10,
    Skills: [
      "UX/UI",
      "Graphic Design",
      "Web Design",
      "Game Design",
      "Animation",
      "General Design support from A-Z",
      "NFT Design",
      "Brand Design",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "10",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 2, max: 8, precision: 1 })
    ),
    background: [
      {
        title: "Design",
        emoji: "💻",
        color: "#423123",
        content: [
          {
            title: "Core Member in Developer DAO",
            content:
              "Developer DAO is one of the best Decentralized Autonomous Organizations working on accelerating the education and impact of Web3 for a new wave of builders. ‣ Core @ Product & Design Guild within the DAO, helping in-house projects and initiatives on their UI & UX.",
            skills: ["javascript", "react", "tailwind"],
            date: {
              start: "Jun 2018",
              end: "Oct 2020",
            },
          },
          {
            title: "Product Designer in Ocean Protocol",
            content:
              "[Bounty] Ocean Academy 101 is a community initiative providing a simple and practical introduction to Ocean Protocol. ‣ Redesigned the UI/UX of the landing page and the web-app for Ocean Academy 101",
            skills: ["Figma", "UI", "UX"],
            date: {
              start: "Jun 2016",
              end: "Oct 2017",
            },
          },
        ],
      },
      {
        title: "Product",
        emoji: "🗄",
        color: "#423123",
        content: [
          {
            title: "Founding Member in MetapassMetapass",
            content:
              "olygon Buidl It 2021's Community Choice winning project, Metapass is a ticketing platform built to buy or sell NFT tickets onchain backed by Polygon & Solana Worked on Product, Design & Growth",
            skills: ["product managment", "Product Discovery", "team leader"],
            date: {
              start: "Oct 2018",
              end: "Dec 2019",
            },
          },
          {
            title: "Product Designer in Aera VC · Freelance",
            content:
              "Aera VC invests at the frontier of deep technology and sustainability to accelerate the world to a better future. ‣ Redesigned the landing page of the website optimizing the UX which resulted in an increase in signups",
            skills: ["leadership"],
            date: {
              start: "Oct 2021",
              end: "Dec 2022",
            },
          },
        ],
      },
    ],
  },
  5: {
    description:
      "Product OBSESSED! Pretty new as a PM tho - have a more technical background, but discovered a deep love for solving customer problems.",
    percentage: "70%",
    picture:
      "https://cdn.discordapp.com/avatars/562160161951711243/2ae783853c88a288db9ed8b691076ad2.webp",
    name: "Impactbilli",
    nameDescription: "Product",
    Descrimator: "1234",
    lifetimeStakeTRST: 2000,
    totalTRST: 460,
    Skills: [
      "User Research",
      "Market Research",
      "Technical Team Coordination",
      "Design Team Coordination",
      "Ideation",
      "Interviews",
      "UX/UI",
      "Spec Writing",
      "User Journey Mapping",
      "Persona Development",
      "User Stories",
      "Technical Spec Writing",
      "Product OKR Development",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "10",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 2, max: 8, precision: 1 })
    ),
    background: [
      {
        title: "Data Science",
        emoji: "💻",
        color: "#423123",
        content: [
          {
            title: "Head of Data Science Guild",
            content:
              "Taking ownership, and providing strategic direction of Data Science for this multinational marketing organisation. • Developed a Data Science road map, presented to the CEO, identifying $50million incremental value through the application of machine learning algorithms.• Restructured the Data Science department, enabling a more rapid framework for delivering value at scale.",
            skills: ["javascript", "react", "leadership"],
            date: {
              start: "Jun 2018",
              end: "Oct 2020",
            },
          },
          {
            title: "Head of Data Science & Analytics",
            content:
              "[Hired to spearhead the Data Science function within this award winning start-up, building a self-sufficient team producing cutting edge analytics.",
            skills: ["design", "data", "analysis"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
        ],
      },
    ],
  },
  6: {
    description: "I'm vitalik. ",
    percentage: "100%",
    picture:
      "https://cdn.discordapp.com/avatars/677988313319211037/ff9cda5e0e8fbe62caea07fb7eb3de23.webp",
    name: "notVitalik",
    nameDescription: "Blockchain Developer",
    Descrimator: "1234",
    lifetimeStakeTRST: 55,
    totalTRST: 10,
    Skills: [
      "Smart Contract Development",
      "Smart Contract Auditing",
      "Blockchain Architecture & Design",
      "Lead a Technical Team",
      "General Blockchain Support",
      "Solidity",
      "GO",
      "MOVE",
      "C++",
      "Rust",
      "Ethereum",
    ],
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 2, max: 8, precision: 1 })
    ),
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "10",
  },
  7: {
    description:
      "I am a relationship-focused, organized, and detail-oriented product manager. I am enthusiastic about the work that I do, and I am passionate about technology. Working with teams to design and build products that meet customer needs is what I do best. My communication skills allow me to collaborate well with both technical and non-technical individuals. ",
    percentage: "89%",
    picture:
      "https://cdn.discordapp.com/avatars/857323639854465046/d2553a2d1960750914906aea6999279c.webp",
    name: "daodaoism",
    nameDescription: "Product Manager",
    Descrimator: "9605",
    lifetimeStakeTRST: 80,
    totalTRST: 25,
    Skills: ["Digital Product Management", "Agile Project Management"],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "20",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 0, max: 6, precision: 1 })
    ),
    background: [
      {
        title: "Software Engineer",
        emoji: "💻",
        color: "#FFE5BD",
        content: [
          {
            title: "Software Engineer",
            content:
              "As part of this role I was part of a 4-man team focused on rebuilding a legacy Monolithic application using newer technologies and better coding standards as well as ",
            skills: ["engineer", "developer", "python"],
            date: {
              start: "Jun 2018",
              end: "Oct 2020",
            },
          },
          {
            title: "Support engineer",
            content:
              "Getting full hands-on experience with development and decision-making discussions. ● .NET5",
            skills: ["design", "data", "analysis"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
        ],
      },
      {
        title: "Consultant",
        emoji: "🎙",
        color: "#FFE5BD",
        content: [
          {
            title: "Global Sales Technical Consultant",
            content:
              "My time at Awin was quite exciting and fun. It was my first job after handing my dissertation in, it gave me the confidence to start believing in myself and see that I am good enough to ",
            skills: ["engineer", "developer", "python"],
            date: {
              start: "Jun 2018",
              end: "Oct 2020",
            },
          },
          {
            title: "Summer Intern",
            content:
              "I was part of a big team of interns, each of us had the same responsibilities and working on building MVC systems ( console and web ) using .NET",
            skills: ["design", "data", "analysis"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
        ],
      },
    ],
  },
  8: {
    description:
      "I am a passionate software developer with over 10 years of experience working with robots. Over the past year I've been working to transfer my passion of programming into a becoming full stack software developer. I have experience developing full stack web sites with JavaScript, React, Express, Flask, PostgreSQL and HTML/CSS through projects done at App Academy. I enjoy the entire process of building apps from designing and building a road map of were I want to go to being able to hit those goals and have a product I'm proud of. When I'm not programming I'm either watching a fantasy show with my wife or winning games as a top 500 Overwatch support. ",
    percentage: "92%",
    picture:
      "https://cdn.discordapp.com/avatars/451587147808636929/a_872037e1cc253eff29f26b918c1d595d.webp",
    name: "Flolight",
    nameDescription: "Fullstack Engineer",
    Descrimator: "9605",
    lifetimeStakeTRST: 1345,
    totalTRST: 170,
    Skills: [
      "Python (Programming Language",
      "JavaScript (Programming Language)",
      "Angular (Web Framework)",
      "Cloud Security Applications",
      "Applications Architecture",
      "AWS SDK",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "25",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 0, max: 6, precision: 1 })
    ),
    background: [
      {
        title: "Software Engineer",
        emoji: "💻",
        color: "#FFE5BD",
        content: [
          {
            title: "Software Engineer in Goldman Sachs",
            content: "Technologies: Python, Java, SQL, Pure, AWS.",
            skills: ["Python", "Java", "SQL"],
            date: {
              start: "Jun 2018",
              end: "Oct 2020",
            },
          },
          {
            title: "Support engineer",
            content:
              "Co-created the patent titled 'Automatic Configuration of Screen Settings with Multiple Monitors' filed by IBM with the United States Patent and Trademark Office.",
            skills: ["AWS", "data", "analysis"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
        ],
      },
    ],
  },
  9: {
    description: "Backend engineer passionate about crypto/web3/blockchain ",
    percentage: "97%",
    picture:
      "https://cdn.discordapp.com/avatars/453089755924791317/a_febc3c7ca14702c46aec9ccaff7deb36.webp",
    name: "TheDarkFury",
    nameDescription: "Backend Engineer",
    Descrimator: "2068",
    lifetimeStakeTRST: 1670,
    totalTRST: 340,
    Skills: ["Solidity", "Rust", "JavaScript (Programming Language)"],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "12",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 0, max: 6, precision: 1 })
    ),
    background: [
      {
        title: "Software Engineer",
        emoji: "💻",
        color: "#E2FFEA",
        content: [
          {
            title: "Software Engineer in FaceBook",
            content:
              "Full Stack Software Engineer working on Workplace by Facebook. More than just a collaboration tool, Workplace by Facebook connects everyone to familiar features and their favorite business tools.",
            skills: ["Python", "Java", "SQL"],
            date: {
              start: "Jun 2018",
              end: "Oct 2020",
            },
          },
          {
            title: "Support engineer",
            content: "Improving org comms and culture through Workplace!",
            skills: ["AWS", "data", "analysis"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
        ],
      },
      {
        title: "CTO",
        emoji: "🤖",
        color: "#E9FFCE",
        content: [
          {
            title: "CTO SmarterWear - oreado",
            content:
              "Overseeing technical development and improvement for products like: Making sure that best practices are defined and followed by engineering teams.",
            skills: ["Python", "Java", "SQL"],
            date: {
              start: "Jun 2019",
              end: "Jan 2020",
            },
          },
          {
            title: "CTO Trainer",
            content:
              "Provided training services on HTML, CSS, JS, PHP and mySQL topics.",
            skills: ["AWS", "data", "analysis"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
        ],
      },
    ],
  },
  10: {
    description:
      "Passionate analytical thinker who thrives in high-energy web3 enviroments. ",
    percentage: "79%",
    picture:
      "https://cdn.discordapp.com/avatars/486268049259757580/c9c4370157fffb42ae9446203719a403.webp",
    name: "Sunk8.eth",
    nameDescription: "Community Manager",
    Descrimator: "5319",
    lifetimeStakeTRST: 120,
    totalTRST: 15,
    Skills: ["Community Planning", "Content Marketing"],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "32",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 0, max: 6, precision: 1 })
    ),
    background: [
      {
        title: "CTO",
        emoji: "🤖",
        color: "#E9FFCE",
        content: [
          {
            title: "CTO SmarterWear - oreado",
            content:
              "Overseeing technical development and improvement for products like: Making sure that best practices are defined and followed by engineering teams.",
            skills: ["Python", "Java", "SQL"],
            date: {
              start: "Jun 2019",
              end: "Jan 2020",
            },
          },
          {
            title: "CTO Trainer",
            content:
              "Provided training services on HTML, CSS, JS, PHP and mySQL topics.",
            skills: ["AWS", "data", "analysis"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
        ],
      },
    ],
  },
  11: {
    description: "Blockchain, Smart Contracts, Mathematics, Ethereum. ",
    percentage: "78%",
    picture:
      "https://cdn.discordapp.com/avatars/493465532423602176/a56c1e883d732ce7420ecf3439374021.webp",
    name: "danomite",
    nameDescription: "Blockchain Developer",
    Descrimator: "9894",
    lifetimeStakeTRST: 530,
    totalTRST: 40,
    Skills: [
      "Solidity",
      "Product Strategy",
      "JavaScript (Programming Language)",
      "React.js",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "22",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 0, max: 6, precision: 1 })
    ),
    background: [
      {
        title: "Software Engineer",
        emoji: "💻",
        color: "#FFE5F9",
        content: [
          {
            title: "Software Engineer in YLD",
            content:
              "Consulting JavaScript technologies to clients' software engineering and digital transformation projects. Other duties include: engaging with the tech community in Manchester by speaking ",
            skills: ["Python", "Java", "SQL"],
            date: {
              start: "Jun 2018",
              end: "Oct 2020",
            },
          },
          {
            title: "Junior Software Engineer",
            content:
              "Contributed to Aerocloud's real-time airport operations and analytics application; working with technologies such as React, Node, WebSockets, MongoDB, AWS, Python and Tensorflow. ",
            skills: ["AWS", "data", "analysis"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
        ],
      },
    ],
  },
  12: {
    description:
      "Extensive experience in product management, strategy, and marketing functions Deep knowledge of Systems, Solutions, Semiconductors for the Edge Cross-Functional leadership and track record of successful product planning and execution ",
    percentage: "88%",
    picture:
      "https://cdn.discordapp.com/avatars/403298435689611264/78fa1d482c932b5c26c505e1cd8c5ab4.webp",
    name: "Samoshi",
    nameDescription: "Product Strategist",
    Descrimator: "1288",
    lifetimeStakeTRST: 70,
    totalTRST: 15,
    Skills: [
      "Product Roadmaps",
      "Product Lifecycle",
      "Product Management",
      "Commercial Development",
      "Commercialization",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "25",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 0, max: 6, precision: 1 })
    ),
    background: [
      {
        title: "Software Engineer",
        emoji: "💻",
        color: "#FFE5F9",
        content: [
          {
            title: "Software & Cloud Engineer",
            content:
              "- Developing & Supporting banking (Tier-1 Bank) project. - Client Facing - Migrating legacy infrastructure into the AWS ecosystem.",
            skills: ["Python", "Java", "SQL"],
            date: {
              start: "Jun 2018",
              end: "Oct 2020",
            },
          },
          {
            title: "Software Engineer - Financial Systems",
            content:
              "Full Stack Website Implementation - System maintenance & Booking Keeper.",
            skills: ["AWS", "data", "analysis"],
            date: {
              start: "2016",
              end: "2017",
            },
          },
        ],
      },
    ],
  },
  13: {
    description:
      "I lead through standardization and a bias for action. Using vulnerable trust I create teams that feel comfortable to weigh-in while pursuing the highest standards. I am a senior engineer with experience developing cloud architecture, but I am also a leader of people and ideas. I value constructive conflict, and I value the resolve and commitment that follows. I want to be around others who are equally as passionate about the pursuit of a great product.",
    percentage: "81%",
    picture:
      "https://cdn.discordapp.com/avatars/369700858742571008/5d2cf4cdbbb5e741a889c4982e7e13d2.webp",
    name: "distorted",
    nameDescription: "Backend Developer",
    Descrimator: "7777",
    lifetimeStakeTRST: 1205,
    totalTRST: 420,
    Skills: [
      "Python (Programming Language)",
      "Solidity",
      "Cloud Computing Security",
      "AWS Lambda",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "35",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 0, max: 6, precision: 1 })
    ),
  },
  14: {
    description:
      "I'm a software developer with a passion for building from the ground up. I aspire to keep up with developing computer technologies and new coding languages. I'm a graduate of the Software Engineering program at Thinkful. I'm a strong media and communication professional with a Bachelor's Degree focused in Design Studies from Arizona State University. ",
    percentage: "86%",
    picture:
      "https://cdn.discordapp.com/avatars/879166443512545311/feb30747504d86519aee3a54fac0b932.webp",
    name: "Sriram Kasyap | sriramkasyap.eth",
    nameDescription: "FrontEnd Developer",
    Descrimator: "8136",
    lifetimeStakeTRST: 30,
    totalTRST: 10,
    Skills: [
      "Responsive Web Design",
      "Node.js",
      "React.js",
      "Cascading Style Sheets (CSS)",
      "Solidity",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "15",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 0, max: 6, precision: 1 })
    ),
  },
  15: {
    description:
      " love interdisciplinary learning. Taking the best concepts from different fields and applying it to the software I write.",
    percentage: "68%",
    picture:
      "https://cdn.discordapp.com/avatars/385833013692334080/3fcaa397c193dc2f9c6316e79ce75b8d.webp",
    name: "Flolight",
    nameDescription: "Cloud Developer",
    Descrimator: "5146",
    lifetimeStakeTRST: 50,
    totalTRST: 5,
    Skills: [
      "AWS CloudFormation",
      "Cloud Security Applications",
      "Machine Learning",
      "Cascading Style Sheets (CSS)",
      "Aplications Architecture",
    ],
    socials: [
      {
        name: "Discord",
        link: "https://discord.gg/2cF6hup",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/BluePandaDAO",
        icon: "https://i.imgur.com/1Q9Z1Zm.png",
      },
    ],
    availability: "50",
    endorsements: getEndorsementsTypeMockArray(
      faker.datatype.number({ min: 0, max: 6, precision: 1 })
    ),
  },
};

const resultsOnChoice = {
  Design: [
    {
      result: "4",
      percentage: "80%",
    },
    {
      result: "5",
      percentage: "60%",
    },
    {
      result: "1",
      percentage: "71%",
    },
    {
      result: "12",
      percentage: "50%",
    },
  ],
  "Frontend Developer": [
    {
      result: "1",
      percentage: "95%",
    },
    {
      result: "4",
      percentage: "85%",
    },
    {
      result: "3",
      percentage: "69%",
    },
    {
      result: "8",
      percentage: "50%",
    },
    {
      result: "14",
      percentage: "45%",
    },
    {
      result: "11",
      percentage: "44%",
    },
    {
      result: "9",
      percentage: "33%",
    },
    {
      result: "13",
      percentage: "23%",
    },
    {
      result: "15",
      percentage: "15%",
    },
  ],
  "Backend Developer": [
    {
      result: "2",
      percentage: "97%",
    },
    {
      result: "1",
      percentage: "90%",
    },
    {
      result: "3",
      percentage: "88%",
    },
    {
      result: "8",
      percentage: "87%",
    },
    {
      result: "9",
      percentage: "77%",
    },
    {
      result: "11",
      percentage: "62%",
    },
    {
      result: "13",
      percentage: "59",
    },
    {
      result: "14",
      percentage: "55%",
    },
    {
      result: "15",
      percentage: "32%",
    },
  ],
  "Blockchain Developer": [
    {
      result: "6",
      percentage: "100%",
    },
    {
      result: "9",
      percentage: "79%",
    },
    {
      result: "1",
      percentage: "78%",
    },
    {
      result: "14",
      percentage: "74%",
    },
    {
      result: "11",
      percentage: "60%",
    },
    {
      result: "13",
      percentage: "59%",
    },
  ],
  Product: [
    {
      result: "3",
      percentage: "98%",
    },
    {
      result: "5",
      percentage: "88%",
    },
    {
      result: "4",
      percentage: "72%",
    },
    {
      result: "7",
      percentage: "71%",
    },
    {
      result: "10",
      percentage: "69%",
    },
    {
      result: "12",
      percentage: "67%",
    },
    {
      result: "15",
      percentage: "55%",
    },
  ],
};

const USER_MOCK = {
  SkillTreeShowFlag: SkillTreeShowFlag,
  priorities: priorities,
  proposedSalary: proposedSalary,
  SkillTree: SkillTree,
  ResultCardShowFlag: ResultCardShowFlag,
  ResultPopUpShowFlag: ResultPopUpShowFlag,
  Result: Result,
  resultsOnChoice: resultsOnChoice,
};

export default USER_MOCK;
