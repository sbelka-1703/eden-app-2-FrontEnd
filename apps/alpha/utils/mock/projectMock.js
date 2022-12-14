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
      description: "Are you a novice or more of a champ?",
      initialValue: "20",
    },
    Accountability: {
      description: "Do you have a proven track-record of reliability?",
      initialValue: "20",
    },
    "Skill Match": {
      description: "How confident are you in the skill you gave up?",
      initialValue: "20",
    },
    Availability: {
      description: "Are you flexible on time?",
      initialValue: "20",
    },
  },
};

const desiredSalary = {
  title: "Salary range",
  description: "What's your desired salary range?",
  minSalary: "1/hour",
  maxSarary: "500/hour",
};

const SkillTree = {
  category: {
    title: "Let's get you sorted! What type of projects are you looking for?",
    subTitle: "You can only choose one area of interest for now!",
  },
  Design: {
    subCategories: {
      title: "It’s time to teach our AI what exacty you’re looking for 👉🏽",
      subTitle:
        "Now, let’s get a bit more specific about those Design interests!",
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
    "Focus On Page": {
      title: "Cool! What should I focus on while looking for a Design Ninja?",
      subTitle:
        "Each highlight will add an extra step in your journey for crazy relevant AI matches!",
      content: [
        "Niche Skills",
        "Knowledge of specific tools",
        "Values & Culture",
      ],
    },
    "Niche Skills": {
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "It’s time to teach our AI what exacty you’re looking for 👉🏽",
      subTitle:
        "Now, let’s get a bit more specific about those Frontend interests!",
      content: [
        "UI Implementation",
        "Frontend Architecture",
        "General Frontend Support",
        "Web Development",
        "App Development",
        "Other",
      ],
    },
    "Focus On Page": {
      title: "Cool! What should I focus on while looking for a Frontend Ninja?",
      subTitle:
        "Each highlight will add an extra step in your journey for crazy relevant AI matches!",
      content: [
        "Niche Skills",
        "Knowledge of specific tools",
        "Values & Culture",
      ],
    },
    "Niche Skills": {
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "It’s time to teach our AI what exacty you’re looking for 👉🏽",
      subTitle:
        "Now, let’s get a bit more specific aboutthose Backend interests!",
      content: [
        "Architecture of your app",
        "Hard CS Stuff like Algo Dev & Data Structures",
        "AI & Data Science",
        "Blockchain & Smart Contract Stuff",
        "Other",
      ],
    },
    "Focus On Page": {
      title: "Cool! What should I focus on while looking for a Backend Ninja?",
      subTitle:
        "Each highlight will add an extra step in your journey for crazy relevant AI matches!",
      content: [
        "Niche Skills",
        "Knowledge of specific tools",
        "Values & Culture",
      ],
    },
    "Niche Skills": {
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "It’s time to teach our AI what exacty you’re looking for 👉🏽",
      subTitle:
        "Now, let’s get a bit more specific about those Blockchain interests!",
      content: [
        "Smart Contract Development",
        "Smart Contract Auditing",
        "Blockchain Architecture & Design",
        "Lead a Technical Team",
        "General Blockchain Support",
        "Other",
      ],
    },
    "Focus On Page": {
      title:
        "Cool! What should I focus on while looking for a Blockchain Ninja?",
      subTitle:
        "Each highlight will add an extra step in your journey for crazy relevant AI matches!",
      content: [
        "Niche Skills",
        "Knowledge of specific tools",
        "Values & Culture",
      ],
    },
    "Niche Skills": {
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "It’s time to teach our AI what exacty you’re looking for 👉🏽",
      subTitle:
        "Now, let’s get a bit more specific about those Product interests!",
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
    "Focus On Page": {
      title: "Cool! What should I focus on while looking for a Product Ninja?",
      subTitle:
        "Each highlight will add an extra step in your journey for crazy relevant AI matches!",
      content: [
        "Niche Skills",
        "Knowledge of specific tools",
        "Values & Culture",
      ],
    },
    "Niche Skills": {
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
      title: "Vibe check - what values should they possess?",
      subTitle:
        "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
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
  type: "Project", // Project,Bounty,DAO,User,discordChannel
  picture: true,
  description: true,
  skills: true,
  generalTags: true,
  champion: true,
  persentage: true,
  persentageButton: true,
};

const ResultPopUpShowFlag = {
  type: "Project", // Project,Bounty,DAO,User,discordChannel
  picture: true,
  description: true,
  skills: true,
  generalTags: true,
  champion: true,
  persentage: true,
  persentagewhButton: true,
};

const Result = {
  "Design 1": {
    description:
      "At Catapult labs we're excited to unlock the future of DAOs. For this project in particular we're looking for a couple of key people who can help us shape our next gen of DAO tooling.",
    picture: "😂",
    name: "Catapult Labs | Next gen DAO tooling.",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/781134177406943272/08e7f48be326d95934393d05519437b5.webp",
      "https://cdn.discordapp.com/avatars/857323639854465046/d2553a2d1960750914906aea6999279c.webp",
      "https://cdn.discordapp.com/avatars/175735303489847296/fe70f8879d7d8979dd4a32690806f7f3.webp",
      "https://cdn.discordapp.com/avatars/950137362481025075/b86b8c5cd2043c18c575195c0553600f.webp",
      "https://cdn.discordapp.com/avatars/369700858742571008/5d2cf4cdbbb5e741a889c4982e7e13d2.webp",
    ],
    championPicture: "https://i.imgur.com/1Q9Z1Zm.png",
    roles: [
      {
        name: "Designer",
        "time:": "10 weeks",
        description:
          "Work with the team to quickly iterate & design new products",
        "Open Seats": "2",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "Product",
        "time:": "10 weeks",
        description:
          "Support our CEO to coordinate the engineering & designer efforts",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
    ],
    endorsements: [
      {
        avatar:
          "https://cdn.discordapp.com/avatars/516697403391213588/4cc3f607d01bc8865b327064c5d380ca.png",
        name: "Waxy",
        endorsement:
          "I had a change to work with BluePanda in D_D Acedemy and he was amazing. True Leader. I learned from him so much. Can’t wait to work with him again.",
        level: {
          name: 2,
          smallName: "L2",
          meaning: "Community Favourite",
          SuccessfulEndorsementsGive: "23",
          SuccessfulEndorsementsReceive: "12",
        },
      },
      {
        avatar:
          "https://cdn.discordapp.com/avatars/516697403391213588/4cc3f607d01bc8865b327064c5d380ca.png",
        name: "Impactbilli",
        endorsement:
          "BluePanda is my greatest friend and a mentor. He’s my North Star. ",
        level: {
          name: 3,
          smallName: "L3",
          meaning: "Community leader",
          SuccessfulEndorsementsGive: "3",
          SuccessfulEndorsementsReceive: "12",
        },
      },
      {
        avatar:
          "https://cdn.discordapp.com/avatars/175735303489847296/fe70f8879d7d8979dd4a32690806f7f3.webp",
        name: "XYZ",
        endorsement:
          "BluePanda is my greatest friend and a mentor. He’s my North Star. ",
        level: {
          name: 1,
          smallName: "L1",
          meaning: "Community starter",
          SuccessfulEndorsementsGive: "13",
          SuccessfulEndorsementsReceive: "2",
        },
      },
      {
        avatar:
          "https://cdn.discordapp.com/avatars/516697403391213588/4cc3f607d01bc8865b327064c5d380ca.png",
        name: "Waxy",
        endorsement:
          "I had a change to work with BluePanda in D_D Acedemy and he was amazing. True Leader. I learned from him so much. Can’t wait to work with him again.",
        level: {
          name: 2,
          smallName: "L2",
          meaning: "Community Favourite",
          SuccessfulEndorsementsGive: "23",
          SuccessfulEndorsementsReceive: "12",
        },
      },
      {
        avatar:
          "https://cdn.discordapp.com/avatars/516697403391213588/4cc3f607d01bc8865b327064c5d380ca.png",
        name: "Impactbilli",
        endorsement:
          "BluePanda is my greatest friend and a mentor. He’s my North Star. ",
        level: {
          name: 3,
          smallName: "L3",
          meaning: "Community leader",
          SuccessfulEndorsementsGive: "3",
          SuccessfulEndorsementsReceive: "12",
        },
      },
      {
        avatar:
          "https://cdn.discordapp.com/avatars/175735303489847296/fe70f8879d7d8979dd4a32690806f7f3.webp",
        name: "XYZ",
        endorsement:
          "BluePanda is my greatest friend and a mentor. He’s my North Star. ",
        level: {
          name: 1,
          smallName: "L1",
          meaning: "Community starter",
          SuccessfulEndorsementsGive: "13",
          SuccessfulEndorsementsReceive: "2",
        },
      },
      {
        avatar:
          "https://cdn.discordapp.com/avatars/175735303489847296/fe70f8879d7d8979dd4a32690806f7f3.webp",
        name: "XYZ",
        endorsement:
          "BluePanda is my greatest friend and a mentor. He’s my North Star. ",
        level: {
          name: 1,
          smallName: "L1",
          meaning: "Community starter",
          SuccessfulEndorsementsGive: "13",
          SuccessfulEndorsementsReceive: "2",
        },
      },
      {
        avatar:
          "https://cdn.discordapp.com/avatars/516697403391213588/4cc3f607d01bc8865b327064c5d380ca.png",
        name: "Impactbilli",
        endorsement:
          "BluePanda is my greatest friend and a mentor. He’s my North Star. ",
        level: {
          name: 3,
          smallName: "L3",
          meaning: "Community leader",
          SuccessfulEndorsementsGive: "3",
          SuccessfulEndorsementsReceive: "12",
        },
      },
      {
        avatar:
          "https://cdn.discordapp.com/avatars/175735303489847296/fe70f8879d7d8979dd4a32690806f7f3.webp",
        name: "XYZ",
        endorsement:
          "BluePanda is my greatest friend and a mentor. He’s my North Star. ",
        level: {
          name: 1,
          smallName: "L1",
          meaning: "Community starter",
          SuccessfulEndorsementsGive: "13",
          SuccessfulEndorsementsReceive: "2",
        },
      },
      {
        avatar:
          "https://cdn.discordapp.com/avatars/175735303489847296/fe70f8879d7d8979dd4a32690806f7f3.webp",
        name: "XYZ",
        endorsement:
          "BluePanda is my greatest friend and a mentor. He’s my North Star. ",
        level: {
          name: 1,
          smallName: "L1",
          meaning: "Community starter",
          SuccessfulEndorsementsGive: "13",
          SuccessfulEndorsementsReceive: "2",
        },
      },
    ],
  },
  "Product 1": {
    description:
      "At Catapult labs we're excited to unlock the future of DAOs. For this project in particular we're looking for a couple of key people who can help us shape our next gen of DAO tooling.",
    picture: "🥰",
    name: "Catapult Labs | Next gen DAO tooling.",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/259752464037707776/abe1ce7ff7046cdeb678f81889d36b57.webp",
      "https://cdn.discordapp.com/avatars/832272761786990632/339f7c33665a40be92df8d69d37ad5c4.webp ",
      "https://cdn.discordapp.com/avatars/841644099471015956/0",
      "https://cdn.discordapp.com/avatars/754747599147368609/31c3aa7727d144b233a2a506e931b972.webp",
      "https://cdn.discordapp.com/avatars/486268049259757580/c9c4370157fffb42ae9446203719a403.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/908392557258604544/a43d17f28b1f058ca1ea5e4a9623c751.png",
    roles: [
      {
        name: "Designer",
        "time:": "10 weeks",
        description:
          "Work with the team to quickly iterate & design new products",
        "Open Seats": "2",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "Product",
        "time:": "10 weeks",
        description:
          "Support our CEO to coordinate the engineering & designer efforts",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
    ],
  },
  "Backend 1": {
    description:
      "Building a discord activity tracker to see what communities are gnmi next.",
    picture: "🤪",
    name: "NFT popTrack",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/552883355667136513/97b696fbca2f7872913c065856588c05.png",
      "https://cdn.discordapp.com/avatars/841644099471015956/08836a37847113f8dc90742f13aa4614.webp",
      "https://cdn.discordapp.com/avatars/385833013692334080/3fcaa397c193dc2f9c6316e79ce75b8d.webp",
      "https://cdn.discordapp.com/avatars/732452018634883083/28a0d01a6849b4f13703a07b3f7b5641.webp",
      "https://cdn.discordapp.com/avatars/731709354461364274/a_2195338a9ff0f9891570bf68a76365dd.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/486268049259757580/c9c4370157fffb42ae9446203719a403.webp",
    roles: [
      {
        name: "Backend",
        "time:": "12 weeks",
        description: "Build the bot that scrapes all the discords",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "Backend",
        "time:": "12 weeks",
        description: "Build the AI that analyzes all the data from the scraper",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "Design",
        "time:": "12 weeks",
        description: "Design the frontend for NFT popTrack",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "Frontend",
        "time:": "12 weeks",
        description: "Implement the frontend for NFT popTrack",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
    ],
  },
  "Frontend 1": {
    description: "A tool to build, validate & track trust across a DAO.",
    picture: "🤬",
    name: "Trust Tree",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/601681916017639436/22fa80bfff349584728eef605745c198.webp",
      "https://cdn.discordapp.com/avatars/387254123923374080/0b47ff086d4ada9c64c7bed98b10e08a.webp",
      "https://cdn.discordapp.com/avatars/552883355667136513/97b696fbca2f7872913c065856588c05.png",
      "https://cdn.discordapp.com/avatars/175735303489847296/fe70f8879d7d8979dd4a32690806f7f3.webp",
      "https://cdn.discordapp.com/avatars/369700858742571008/5d2cf4cdbbb5e741a889c4982e7e13d2.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/754747599147368609/31c3aa7727d144b233a2a506e931b972.webp",
    roles: [
      {
        name: "Blockchain",
        "time:": "12 weeks",
        description: "Build the trust dispersion mechanism for trustTree",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "Frontend",
        "time:": "12 weeks",
        description: "Implement the frontend for trustTree",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
    ],
  },
  "Chain Statements - Blockchain": {
    description:
      "Unlike ordinary crypto dashboard in web3 or traditional bank statement in web2, Chain Statement offers the following features that will improve privacy and smooth-onboarding-experience in web3.",
    picture: "😇",
    name: "Chain Statements",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/385833013692334080/3fcaa397c193dc2f9c6316e79ce75b8d.webp",
      "https://cdn.discordapp.com/avatars/562160161951711243/2ae783853c88a288db9ed8b691076ad2.webp",
      "https://cdn.discordapp.com/avatars/712416046317043762/da64a7ef32b6ec725bfbcc5fae50e2be.webp",
      "https://cdn.discordapp.com/avatars/804403182620901426/14596fa0bf33e00c03d59f3684755bad.webp",
      "https://cdn.discordapp.com/avatars/731709354461364274/a_2195338a9ff0f9891570bf68a76365dd.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/863507427776135218/a91ff56bcae2bd795e5a0ea91a2f6e07.webp",
    roles: [
      {
        name: "Blockchain",
        "time:": "12 weeks",
        description:
          "Polygon smart contract developer who knows zero knowldge proofs",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "Backend",
        "time:": "12 weeks",
        description: "Create a database for all the users of our platform",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/chain-statements-kdurw",
  },

  "Dijza - Game": {
    description:
      "Unlike ordinary crypto dashboard in web3 or traditional bank statement in web2, Chain Statement offers the following features that will improve privacy and smooth-onboarding-experience in web3.",
    picture: "🫥",
    name: "Dijza",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/950137362481025075/b86b8c5cd2043c18c575195c0553600f.webp",
      "https://cdn.discordapp.com/avatars/451587147808636929/a_872037e1cc253eff29f26b918c1d595d.webp",
      "https://cdn.discordapp.com/avatars/516697403391213588/4cc3f607d01bc8865b327064c5d380ca.png",
      "https://cdn.discordapp.com/avatars/453089755924791317/a_febc3c7ca14702c46aec9ccaff7deb36.webp",
      "https://cdn.discordapp.com/avatars/857323639854465046/d2553a2d1960750914906aea6999279c.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/781134177406943272/08e7f48be326d95934393d05519437b5.webp",
    roles: [
      {
        name: "Game Developer",
        "time:": "12 weeks",
        description:
          "Game devlo[er that has experience buidling Blockchain games website",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "FrontEnd",
        "time:": "12 weeks",
        description: "Can create an amazing interface for the game",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/dijza-oj2ht",
  },
  "Porton Wallet - FrontEnd": {
    description:
      "An Account Abstraction-based wallet that allows you to sign signature with Touch ID, pay gas fee with ERC20 token, and have gasless interaction with dApps!",
    picture: "🤮",
    name: "Porton Wallet",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/387254123923374080/0b47ff086d4ada9c64c7bed98b10e08a.webp",
      "https://cdn.discordapp.com/avatars/175735303489847296/fe70f8879d7d8979dd4a32690806f7f3.webp",
      "https://cdn.discordapp.com/avatars/486268049259757580/c9c4370157fffb42ae9446203719a403.webp",
      "https://cdn.discordapp.com/avatars/731709354461364274/a_2195338a9ff0f9891570bf68a76365dd.webp",
      "https://cdn.discordapp.com/avatars/863507427776135218/a91ff56bcae2bd795e5a0ea91a2f6e07.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/601681916017639436/22fa80bfff349584728eef605745c198.webp",
    roles: [
      {
        name: "L2 Smart Contract Devloper",
        "time:": "12 weeks",
        description: "Knows how to build smart contracts on Optimism",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "FrontEnd",
        "time:": "12 weeks",
        description: "Had previous experince building wallets",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/porton-wallet-fo21h",
  },
  "PDEEDOO - Education": {
    description:
      "ADEEDO is a Descentralized Knowledge Ecosystem that works as the first Web3 MOOC (Massive Open Online Courses).",
    picture: "💩",
    name: "DEEDOO",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/385833013692334080/3fcaa397c193dc2f9c6316e79ce75b8d.webp",
      "https://cdn.discordapp.com/avatars/403298435689611264/78fa1d482c932b5c26c505e1cd8c5ab4.webp",
      "https://cdn.discordapp.com/avatars/677988313319211037/ff9cda5e0e8fbe62caea07fb7eb3de23.webp",
      "https://cdn.discordapp.com/avatars/601681916017639436/22fa80bfff349584728eef605745c198.webp",
      "https://cdn.discordapp.com/avatars/863507427776135218/a91ff56bcae2bd795e5a0ea91a2f6e07.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/754747599147368609/31c3aa7727d144b233a2a506e931b972.webp",
    roles: [
      {
        name: "Smart contract developer",
        "time:": "12 weeks",
        description: "Polygon smart contract developer famliar with NFTs",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/deedoo-ze167",
  },
  "SurfDB - Backend": {
    description:
      "Decentralized database made for Dapps, built on top of ceramic and IPFS.",
    picture: "💩",
    name: "DEEDOO",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/832272761786990632/339f7c33665a40be92df8d69d37ad5c4.webp",
      "https://cdn.discordapp.com/avatars/516697403391213588/4cc3f607d01bc8865b327064c5d380ca.png",
      "https://cdn.discordapp.com/avatars/863507427776135218/a91ff56bcae2bd795e5a0ea91a2f6e07.webp",
      "https://cdn.discordapp.com/avatars/922458353609887784/e2e3b4d99c931dc5d5c3779516a4957b.webp",
      "https://cdn.discordapp.com/avatars/403298435689611264/78fa1d482c932b5c26c505e1cd8c5ab4.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/387254123923374080/0b47ff086d4ada9c64c7bed98b10e08a.webp",
    roles: [
      {
        name: "Backend developer ",
        "time:": "12 weeks",
        description: "Backend developer with experince in MongoDB",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "FrontEnd developer ",
        "time:": "12 weeks",
        description: "Can build interfaces in NextJs ",
        "Open Seats": "1",
      },
      {
        name: "Data scientist",
        "time:": "12 weeks",
        description: "Knowledge of gathering valuable data from MabgoDB ",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/surfdb-3cwzk",
  },
  "Atomic NFT Marketplace - FrontEnd": {
    description:
      "Atomic NFT marketplace: An NFT Marketplace that offers trust minimized cross chain NFT interoprobability.",
    picture: "🤫",
    name: "Atomic NFT Marketplace",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/387254123923374080/0b47ff086d4ada9c64c7bed98b10e08a.webp",
      "https://cdn.discordapp.com/avatars/493465532423602176/a56c1e883d732ce7420ecf3439374021.webp",
      "https://cdn.discordapp.com/avatars/562160161951711243/2ae783853c88a288db9ed8b691076ad2.webp",
      "https://cdn.discordapp.com/avatars/781134177406943272/08e7f48be326d95934393d05519437b5.webp",
      "https://cdn.discordapp.com/avatars/451587147808636929/a_872037e1cc253eff29f26b918c1d595d.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/908392557258604544/a43d17f28b1f058ca1ea5e4a9623c751.png",
    roles: [
      {
        name: "Backend developer ",
        "time:": "12 weeks",
        description: "Backend developer with experince in MongoDB",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "FrontEnd developer ",
        "time:": "12 weeks",
        description: "Can build interfaces in NextJs ",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
      {
        name: "Data scientist",
        "time:": "12 weeks",
        description: "Knowledge of gathering valuable data from MabgoDB ",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom:
      "https://ethglobal.com/showcase/atomic-nft-marketplace-ezi2m",
  },
  "WEB3 Board - FrontEnd": {
    description:
      "WEB3 Board provide complete interactive option to explore the web3 protocols with download data option.",
    picture: "🤫",
    name: "WEB3 Board",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/493465532423602176/a56c1e883d732ce7420ecf3439374021.webp",
      "https://cdn.discordapp.com/avatars/552883355667136513/97b696fbca2f7872913c065856588c05.png",
      "https://cdn.discordapp.com/avatars/804403182620901426/14596fa0bf33e00c03d59f3684755bad.webp",
      "https://cdn.discordapp.com/avatars/754747599147368609/31c3aa7727d144b233a2a506e931b972.webp",
      "https://cdn.discordapp.com/avatars/562160161951711243/2ae783853c88a288db9ed8b691076ad2.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/601681916017639436/22fa80bfff349584728eef605745c198.webp",
    roles: [
      {
        name: "FrontEnd developer ",
        "time:": "12 weeks",
        description: "FrontEnd developer with experince in building on AAVE",
        "Open Seats": "1",
        skills: [
          {
            skillData: {
              name: "Design",
            },
          },
          {
            skillData: {
              name: "Web Development",
            },
          },
        ],
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/web3-board-8cp4f",
  },
  "Triton Instant Messenger  - Blockchain": {
    description:
      "Triton is an instant messenger built on the Polygon blockchain. The Dapp is fully on-chain, and allows for MATIC and MATIC tokens transfer.",
    picture: "😪",
    name: "Triton Instant Messenger",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/493465532423602176/a56c1e883d732ce7420ecf3439374021.webp",
      "https://cdn.discordapp.com/avatars/552883355667136513/97b696fbca2f7872913c065856588c05.png",
      "https://cdn.discordapp.com/avatars/804403182620901426/14596fa0bf33e00c03d59f3684755bad.webp",
      "https://cdn.discordapp.com/avatars/754747599147368609/31c3aa7727d144b233a2a506e931b972.webp",
      "https://cdn.discordapp.com/avatars/562160161951711243/2ae783853c88a288db9ed8b691076ad2.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/601681916017639436/22fa80bfff349584728eef605745c198.webp",
    roles: [
      {
        name: "FrontEnd developer ",
        "time:": "12 weeks",
        description: "FrontEnd developer with experince in building on AAVE",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom:
      "https://ethglobal.com/showcase/triton-instant-messenger-0thzc",
  },
  "DinoPixaverse - Game": {
    description:
      "Play with your favourite dino, collect items as NFTs, use existing NFT to skin the dino",
    picture: "🐽",
    name: "DinoPixaverse",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/493465532423602176/a56c1e883d732ce7420ecf3439374021.webp",
      "https://cdn.discordapp.com/avatars/731709354461364274/a_2195338a9ff0f9891570bf68a76365dd.webp",
      "https://cdn.discordapp.com/avatars/676111621910691842/43d9664b1d10bf6272a22fc16e6f540b.webp",
      "https://cdn.discordapp.com/avatars/369700858742571008/5d2cf4cdbbb5e741a889c4982e7e13d2.webp",
      "https://cdn.discordapp.com/avatars/922458353609887784/e2e3b4d99c931dc5d5c3779516a4957b.webp",
    ],
    championPicture:
      " https://cdn.discordapp.com/avatars/732452018634883083/28a0d01a6849b4f13703a07b3f7b5641.webp",
    roles: [
      {
        name: "FrontEnd developer ",
        "time:": "12 weeks",
        description: "FrontEnd developer will create a cool website for us",
        "Open Seats": "1",
      },
      {
        name: "Game Developer ",
        "time:": "12 weeks",
        description: "Game developer who has experience with blockchain",
        "Open Seats": "1",
      },
      {
        name: "Smart contract developer ",
        "time:": "12 weeks",
        description: "Smart contract developer that has experience with NFTs",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/dinopixaverse-j03k0",
  },
  "MeshLink- Data": {
    description:
      "DApp specific user analytics platform. Think Google analytics for smart contract applications.",
    picture: "🌝",
    name: "MeshLink",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/781134177406943272/08e7f48be326d95934393d05519437b5.webp",
      "https://cdn.discordapp.com/avatars/451587147808636929/a_872037e1cc253eff29f26b918c1d595d.webp",
      "https://cdn.discordapp.com/avatars/709105526910484519/59f6cd4dabbf26cd2875635a1aaaca29.webp",
      "https://cdn.discordapp.com/avatars/562160161951711243/2ae783853c88a288db9ed8b691076ad2.webp",
      "https://cdn.discordapp.com/avatars/712416046317043762/da64a7ef32b6ec725bfbcc5fae50e2be.webp",
    ],
    championPicture:
      " https://cdn.discordapp.com/avatars/731709354461364274/a_2195338a9ff0f9891570bf68a76365dd.webp",
    roles: [
      {
        name: "Data Scientist ",
        "time:": "12 weeks",
        description: "Crawler experience is a huge plus!",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/meshlink-iz3fu",
  },
  "Cross Fader - Backend": {
    description:
      "A multi chain privacy mixer. Anonymize transactions on any L2.",
    picture: "🪵",
    name: "Cross Fader",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/781134177406943272/08e7f48be326d95934393d05519437b5.webp",
      "https://cdn.discordapp.com/avatars/451587147808636929/a_872037e1cc253eff29f26b918c1d595d.webp",
      "https://cdn.discordapp.com/avatars/709105526910484519/59f6cd4dabbf26cd2875635a1aaaca29.webp",
      "https://cdn.discordapp.com/avatars/562160161951711243/2ae783853c88a288db9ed8b691076ad2.webp",
      "https://cdn.discordapp.com/avatars/712416046317043762/da64a7ef32b6ec725bfbcc5fae50e2be.webp",
    ],
    championPicture:
      " https://cdn.discordapp.com/avatars/731709354461364274/a_2195338a9ff0f9891570bf68a76365dd.webp",
    roles: [
      {
        name: "Blockchain ",
        "time:": "12 weeks",
        description: "Experience with zkSarks and Sollidity",
        "Open Seats": "1",
      },
      {
        name: "Backend ",
        "time:": "12 weeks",
        description: "Have the aboility to make a context API",
        "Open Seats": "1",
      },
      {
        name: "Designer ",
        "time:": "12 weeks",
        description: "Can design an inteface with interactive charts ",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/cross-fader-k2601",
  },
  "AttributionX - Data": {
    description:
      "Attribution for Advertisers : Facilitate sharing of data in a private way to get attribution calculated.",
    picture: "🪵",
    name: "AttributionX",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/453089755924791317/a_febc3c7ca14702c46aec9ccaff7deb36.webp",
      "https://cdn.discordapp.com/avatars/451587147808636929/a_872037e1cc253eff29f26b918c1d595d.webp",
      "https://cdn.discordapp.com/avatars/879166443512545311/feb30747504d86519aee3a54fac0b932.webp",
      "https://cdn.discordapp.com/avatars/732452018634883083/28a0d01a6849b4f13703a07b3f7b5641.webp",
      "https://cdn.discordapp.com/avatars/516697403391213588/4cc3f607d01bc8865b327064c5d380ca.png",
    ],
    championPicture:
      " https://cdn.discordapp.com/avatars/857323639854465046/d2553a2d1960750914906aea6999279c.webp",
    roles: [
      {
        name: "Data Scientist ",
        "time:": "12 weeks",
        description: "Has experience with big Data",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/attributionx-ynucd",
  },
  "Optimistic Payments - Blockchain": {
    description:
      "Allow your customers to pay with any token, and receive in your token of choice.",
    picture: "🦨",
    name: "Optimistic Payments",
    coreTeamPicture: [
      " https://cdn.discordapp.com/avatars/804403182620901426/14596fa0bf33e00c03d59f3684755bad.webp",
      "https://cdn.discordapp.com/avatars/562160161951711243/2ae783853c88a288db9ed8b691076ad2.webp",
      "https://cdn.discordapp.com/avatars/879166443512545311/feb30747504d86519aee3a54fac0b932.webp",
      "https://cdn.discordapp.com/avatars/369700858742571008/5d2cf4cdbbb5e741a889c4982e7e13d2.webp",
      "https://cdn.discordapp.com/avatars/403298435689611264/78fa1d482c932b5c26c505e1cd8c5ab4.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/453089755924791317/a_febc3c7ca14702c46aec9ccaff7deb36.webp",
    roles: [
      {
        name: "Blockchain ",
        "time:": "12 weeks",
        description: "Experience with DeFi and Solidity",
        "Open Seats": "1",
      },
      {
        name: "FrontEnd Developer ",
        "time:": "12 weeks",
        description: "FrontEnd developer with experience in DeFi interfaces",
        "Open Seats": "1",
      },
      {
        name: "Designer ",
        "time:": "12 weeks",
        description: "Can design a cafe menu",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom:
      "https://ethglobal.com/showcase/optimistic-payments-wn8n2",
  },
  "Mati - FrontEnd": {
    description:
      "Create a collection of NFTs that stores the words of a native language, pronunciation and, meaning, in this way the words will be stored permanently and people will have access to this information as a repository of the different...",
    picture: "🙈",
    name: "Mati",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/493465532423602176/a56c1e883d732ce7420ecf3439374021.webp",
      "https://cdn.discordapp.com/avatars/451587147808636929/a_872037e1cc253eff29f26b918c1d595d.webp",
      "https://cdn.discordapp.com/avatars/709105526910484519/59f6cd4dabbf26cd2875635a1aaaca29.webp",
      "https://cdn.discordapp.com/avatars/387254123923374080/0b47ff086d4ada9c64c7bed98b10e08a.webp",
      "https://cdn.discordapp.com/avatars/369700858742571008/5d2cf4cdbbb5e741a889c4982e7e13d2.webp",
    ],
    championPicture:
      " https://cdn.discordapp.com/avatars/908392557258604544/a43d17f28b1f058ca1ea5e4a9623c751.png",
    roles: [
      {
        name: "FrontEnd Developer ",
        "time:": "12 weeks",
        description: "FrontEnd developer with multilingual abilities",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/mati-twmdv",
  },
  "Mixdown - FrontEnd": {
    description:
      "A dapp for creating collaborative audio on top of Lens Protocol. Fork, remix, add, collect, and collaborate.",
    picture: "🐘",
    name: "Mixdown",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/863507427776135218/a91ff56bcae2bd795e5a0ea91a2f6e07.webp",
      "https://cdn.discordapp.com/avatars/709105526910484519/59f6cd4dabbf26cd2875635a1aaaca29.webp",
      "https://cdn.discordapp.com/avatars/403298435689611264/78fa1d482c932b5c26c505e1cd8c5ab4.webp",
      "https://cdn.discordapp.com/avatars/259752464037707776/abe1ce7ff7046cdeb678f81889d36b57.webp",
      "https://cdn.discordapp.com/avatars/832272761786990632/339f7c33665a40be92df8d69d37ad5c4.webp ",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/676111621910691842/43d9664b1d10bf6272a22fc16e6f540b.webp",
    roles: [
      {
        name: "FrontEnd Developer ",
        "time:": "12 weeks",
        description:
          "FrontEnd developer whith experience buidling in Lens Protocol",
        "Open Seats": "1",
      },
      {
        name: "Smart Contract Developer ",
        "time:": "12 weeks",
        description:
          "Smart Contract Developer with experience building on Lens",
        "Open Seats": "1",
      },
      {
        name: "Sound Engineer ",
        "time:": "12 weeks",
        description: "Experience in blockchain will be a great bonus",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/mixdown-tvdfq",
  },
  "ConvoBridge - FrontEnd": {
    description:
      "ConvoBridge is bridging the gap between on-chain voting and off-chain discussion in DAO governance. By creating an on-chain governance forum, that integrates on-chain proposal data: we are creating a user experience that",
    picture: "🐐",
    name: "ConvoBridge",
    coreTeamPicture: [
      "https://cdn.discordapp.com/avatars/385833013692334080/3fcaa397c193dc2f9c6316e79ce75b8d.webp",
      "https://cdn.discordapp.com/avatars/552883355667136513/97b696fbca2f7872913c065856588c05.png",
      "https://cdn.discordapp.com/avatars/804403182620901426/14596fa0bf33e00c03d59f3684755bad.webp",
      "https://cdn.discordapp.com/avatars/453089755924791317/a_febc3c7ca14702c46aec9ccaff7deb36.webp",
      "https://cdn.discordapp.com/avatars/857323639854465046/d2553a2d1960750914906aea6999279c.webp",
    ],
    championPicture:
      "https://cdn.discordapp.com/avatars/562160161951711243/2ae783853c88a288db9ed8b691076ad2.webp",
    roles: [
      {
        name: "Smart Contract Developer ",
        "time:": "12 weeks",
        description:
          "Smart Contract Developer with experience in DAOs and Governance Tokens",
        "Open Seats": "1",
      },
    ],
    whereDataComesFrom: "https://ethglobal.com/showcase/convobridge-j90ey",
  },
};

const resultsOnChoice = {
  Design: [
    {
      result: "Design 1",
      percentage: "88%",
      rolesPercentages: ["50", "20"],
    },
    {
      result: "Backend 1",
      percentage: "50%",
      rolesPercentages: ["50", "30", "20", "10"],
    },
    {
      result: "DinoPixaverse - Game",
      percentage: "43%",
      rolesPercentages: ["43", "21", "61"],
    },
    {
      result: "PDEEDOO - Education",
      percentage: "09%",
      rolesPercentages: ["50"],
    },
  ],
  "Frontend Developer": [
    {
      result: "Backend 1",
      percentage: "88%",
      rolesPercentages: ["50", "30", "20", "10"],
    },
    {
      result: "Frontend 1",
      percentage: "80%",
      rolesPercentages: ["50", "30"],
    },
    {
      result: "Porton Wallet - FrontEnd",
      percentage: "79%",
      rolesPercentages: ["70", "67"],
    },
    {
      result: "Atomic NFT Marketplace - FrontEnd",
      percentage: "74%",
      rolesPercentages: ["50", "30", "20"],
    },
    {
      result: "Mati - FrontEnd",
      percentage: "65%",
      rolesPercentages: ["59"],
    },
    {
      result: "WEB3 Board - FrontEnd",
      percentage: "62%",
      rolesPercentages: ["59"],
    },
    {
      result: "ConvoBridge - FrontEnd",
      percentage: "43%",
      rolesPercentages: ["43"],
    },
    {
      result: "MeshLink- Data",
      percentage: "09%",
      rolesPercentages: ["50"],
    },
  ],
  "Backend Developer": [
    {
      result: "Backend 1",
      percentage: "88%",
      rolesPercentages: ["50", "30", "20", "10"],
    },
    {
      result: "SurfDB - Backend",
      percentage: "78%",
      rolesPercentages: ["50", "30", "20"],
    },
    {
      result: "Cross Fader - Backend",
      percentage: "58%",
      rolesPercentages: ["34", "21", "99"],
    },
    {
      result: "AttributionX - Data",
      percentage: "32%",
      rolesPercentages: ["75"],
    },
  ],
  "Blockchain Developer": [
    {
      result: "Chain Statements - Blockchain",
      percentage: "87%",
      rolesPercentages: ["50", "30"],
    },
    {
      result: "Optimistic Payments - Blockchain",
      percentage: "68%",
      rolesPercentages: ["50", "30", "45"],
    },
    {
      result: "Triton Instant Messenger  - Blockchain",
      percentage: "32%",
      rolesPercentages: ["56"],
    },
  ],
  Product: [
    {
      result: "Product 1",
      percentage: "83%",
      rolesPercentages: ["50", "30", "20", "10"],
    },
    {
      result: "AttributionX - Data",
      percentage: "82%",
      rolesPercentages: ["10"],
    },
    {
      result: "MeshLink- Data",
      percentage: "59%",
      rolesPercentages: ["52", "34", "45"],
    },
  ],
};

const PROJECT_MOCK = {
  SkillTreeShowFlag: SkillTreeShowFlag,
  priorities: priorities,
  desiredSalary: desiredSalary,
  SkillTree: SkillTree,
  ResultCardShowFlag: ResultCardShowFlag,
  ResultPopUpShowFlag: ResultPopUpShowFlag,
  Result: Result,
  resultsOnChoice: resultsOnChoice,
};

export default PROJECT_MOCK;
