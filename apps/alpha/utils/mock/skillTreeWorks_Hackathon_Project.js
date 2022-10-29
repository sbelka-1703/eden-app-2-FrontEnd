const SkillTreeShowFlag = {
  "ChooseCategory": true,
  "ChooseSubcategory": true,
  "ChooseFocusArea": true,
  "ChoosePriorities": true,
  "ChooseSalary": true,
}

const priorities = {
  "title": "Let me get your priorities straight!",
  "description": "Distribute the 100 points based on what you value most.",
  "priorities": {
    "Experience": {
      "description": "Are you a novice or more of a champ?",
      "initialValue": "20"
    },
    "Accountability": {
      "description": "Do you have a proven track-record of reliability?",
      "initialValue": "20"
    },
    "Skill Match": {
      "description": "How confident are you in the skill you gave up?",
      "initialValue": "20"
    },
    "Availability": {
      "description": "Are you flexible on time?",
      "initialValue": "20"
    }
  }
}

const desiredSalary = {
  "title": "Salary range",
  "description": "What's your desired salary range?",
  "minSalary": "1/hour",
  "maxSarary": "500/hour",
}

const SkillTree = {
  "category": {
    "title": "Let's get you sorted! What type of projects are you looking for?",
    "subTitle": "You can only choose one area of interest for now!",
    "content": [
      "Zk Technology",
      "DeFi",
      "Public Goods",
      "DAOs",
      "Gaming",
      "DeSci",
      "NFTs",
      "Other",
    ],
  },
  "Zk Technology": {
    "subCategories": {
      "title": "It’s time to teach our AI what you’re looking for 👉🏽",
      "subTitle": "Now, let’s get a bit more specific about those ZK interests!",
      "content": [
        "Finance",
        "Sybil resistance",
        "Privacy",
        "Data & ML",
        "Authentication",
        "Identity",
        "Zk Blockchains",
        "Other"
      ],
    },
    "Focus On Page": {
      "title": "Cool! What matters to you for this hackathon?",
      "subTitle": "Let us know one or more reasons why you're here.",
      "content": [
        "Winning Bounties",
        "Solving Meaningful Problems",
        "Learning new Skills",
        "Meeting new Friends",
        "Finding Investors",
        "Other"
      ],
    },
    "Win bounties": {
      "title": "What bounties are you interested in pursuing?",
      "subTitle": "Choose at least one bounty.",
      "content": [
        "ZkSync Bounty #1($3, 000) - Account Abstraction 📦",
        "Other"
      ],
      "Solving Meaningful Problems": {
        "title": "What causes do you care about?",
        "subTitle": "Choose maximum 3.",
        "content": [
          "Sustainable cities & communities",
          "Reduced inequalities",
          "Responsible consumptions and production",
          "Hunger",
          "Climate Action",
          "Education",
          "Life below water",
          "Clean water & sanitation",
          "Life on land",
          "Health & Wellbeing",
          "Industry, innovation & infrastructure",
          "Peace, justice & strong institutions",
          "Gender Equality",
          "Decent work & economic growth",
          "Poverty",
          "Partnership & Collaboration",
          "Affordable & clean energy",
          "Other"
        ],
        "Learn new skills": {
          "title": "What specific ZK skills are you interested in learning?",
          "subTitle": "Choose at least one.",
          "content": [
            "zkSync",
            "loopring",
            "starkware",
            "ZKswap",
            "Aztec",
            "Hermez",
            "Other",
          ],
        },
        "Meet people with complementary skills": {
          "title": "What types of people are you looking for?",
          "subTitle": "Choose at least one.",
          "content": [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "Blockchain Developer",
            "Design Person",
            "Product Person",
            "Other",
          ],
        },
        "Engage Investors": {
          "title": "What type of investors are you looking for?",
          "subTitle": "Choose at least one.",
          "content": [
            "Angel Investors",
            "VCs",
            "Communities",
            "DAOs",
            "Advisors",
            "Grants",
            "Other",
          ],
        },
        "Find a co-founder": {
          "title": "How would you describe your ideal co-founder?",
          "subTitle": "Choose max 3.",
          "content": [
            "Technical wizz",
            "Product wizz",
            "Design wizz",
            "Bizz wizz",
            "Other",
          ]
        },
      },
    },
    "DeFi": {
      "subCategories": {
        "title": "It’s time to teach our AI what you’re looking for 👉🏽",
        "subTitle": "Now, let’s get a bit more specific about those DeFi interests!",
        "content": [
          "Decentralized Exchanges",
          "Lending",
          "Stablecoins",
          "Yield",
          "Vaults",
          "Synthetic Assets",
          "Indexes",
          "Derivatives",
          "Options",
          "Launchpads",
          "Other",
        ],
      },
      "Focus On Page": {
        "title": "Cool! What matters to you for this hackathon?",
        "subTitle": "Let us know one or more reasons why you're here.",
        "content": [
          "Winning Bounties",
          "Solving Meaningful Problems",
          "Learning new Skills",
          "Meeting new Friends",
          "Finding Investors",
          "Other"
        ],
      },
      "Win bounties": {
        "title": "What bounties are you interested in pursuing?",
        "subTitle": "Choose at least one bounty.",
        "content": [
          "Fuel Labs - Bounty #1($6, 000) - Open Bounty 🥥",
          "Cronos - Bounty #1($10, 000) - Open Bounty ⏱️",
          "IPFS / Filecoin - Bounty #1($11, 000) - Storage Wizzard 🧙🏻‍♂️",
          "IPFS / Filecoin - Bounty #2($9, 000) - Computing over Data 📊",
          "Euler Labs- Bounty #1($10, 000) - Money Lego 🧱",
          "Sommelier Finance - Bounty #1($20, 000) - Grand Prize for Sommelier 💻",
          "Sommelier Finance - Bounty #2($5, 000) - Anything Goes 🤘",
          "Wallet Connect - Bounty #1($7, 000) - Best Public Good 📢",
          "Wallet Connect- Bounty #2($7, 000) - Best Mobile UX 🌕",
          "Other"
        ],
        "Solving Meaningful Problems": {
          "title": "What causes do you care about?",
          "subTitle": "Choose maximum 3.",
          "content": [
            "Sustainable cities & communities",
            "Reduced inequalities",
            "Responsible consumptions and production",
            "Hunger",
            "Climate Action",
            "Education",
            "Life below water",
            "Clean water & sanitation",
            "Life on land",
            "Health & Wellbeing",
            "Industry, innovation & infrastructure",
            "Peace, justice & strong institutions",
            "Gender Equality",
            "Decent work & economic growth",
            "Poverty",
            "Partnership & Collaboration",
            "Affordable & clean energy",
            "Other"
          ],
          "Learn new skills": {
            "title": "What layer of the DeFi applications are you interested in deepening your skills?",
            "subTitle": "Choose at least one.",
            "content": [
              "Blockchain Layer",
              "Node Infrastructure & Consensus Layer",
              "Application Layer",
              "Wallets",
              "Front Ends",
              "Oracles",
              "Block Explorers",
              "Analytics",
              "Bizz Dev Side",
              "Community Side",
              "Other",
            ],
          },
          "Meet people with complementary skills": {
            "title": "What types of people are you looking for?",
            "subTitle": "Choose at least one.",
            "content": [
              "Frontend Developer",
              "Backend Developer",
              "Full Stack Developer",
              "Blockchain Developer",
              "Design Person",
              "Product Person",
              "Other",
            ],
          },
          "Engage Investors": {
            "title": "What type of investors are you looking for?",
            "subTitle": "Choose at least one.",
            "content": [
              "Angel Investors",
              "VCs",
              "Communities",
              "DAOs",
              "Advisors",
              "Grants",
              "Other",
            ],
          },
          "Find a co-founder": {
            "title": "How would you describe your ideal co-founder?",
            "subTitle": "Choose max 3.",
            "content": [
              "Technical wizz",
              "Product wizz",
              "Design wizz",
              "Bizz wizz",
              "Other",
            ]
          },
        },
      },
      "Public Goods": {
        "subCategories": {
          "title": "It’s time to teach our AI what you’re looking for 👉🏽",
          "subTitle": "Now, let’s get a bit more specific about those Public Good interests!",
          "content": [
            "Quadratic Funding",
            "Hypercerts",
            "Direct Funding",
            "DAO Governance",
            "Conviction Voting",
            "Curation Markets",
            "Token Design",
            "Community Building",
            "Other",
          ],
        },
        "Focus On Page": {
          "title": "Cool! What matters to you for this hackathon?",
          "subTitle": "Let us know one or more reasons why you're here.",
          "content": [
            "Winning Bounties",
            "Solving Meaningful Problems",
            "Learning new Skills",
            "Meeting new Friends",
            "Finding Investors",
            "Other"
          ],
        },
        "Win bounties": {
          "title": "What bounties are you interested in pursuing?",
          "subTitle": "Choose at least one bounty.",
          "content": [
            "Altlayer 🟣 - Bounty #1($1, 500) - Social Dapp 👥",
            "Altlayer 🟣 - Bounty #2($1, 500) - GameFi 🎮",
            "Safe Ecosystem Foundation - Bounty #1($5, 000) - Open Bounty 👐",
            "Safe Ecosystem Foundation - Bounty #2($2, 000) - Roles Modder 🥘",
            "Metamask - Bounty #1($5, 000) - Keyrings 🔑",
            "Metamask - Bounty #2($5, 000) - Anything Goes 🤘",
            "Arweave - Bounty #1($4, 000) - Social App / DataFi / Warp Contracts 💻",
            "Arweave - Bounty #2($2, 000) - VouchDAO APP 🤝",
            "Arweave - Bonus Bounties($100 in AR per successful implementation) ‼️",
            "Wallet Connect - Bounty #1($7, 000) - Best Public Good 📢",
            "Wallet Connect - Bounty #2($7, 000) - Best Mobile UX 🌕",
            "IPFS / Filecoin - Bounty #1($11, 000) - Storage Wizzard 🧙🏻‍♂️",
            "IPFS / FilecoinBounty - Bounty #2($9, 000) - Computing over Data 📊",
            "IExec - Bounty #1($4, 500) - Oracle Factory 🔮",
            "Other",
          ],
          "Solving Meaningful Problems": {
            "title": "What causes do you care about?",
            "subTitle": "Choose maximum 3.",
            "content": [
              "Sustainable cities & communities",
              "Reduced inequalities",
              "Responsible consumptions and production",
              "Hunger",
              "Climate Action",
              "Education",
              "Life below water",
              "Clean water & sanitation",
              "Life on land",
              "Health & Wellbeing",
              "Industry, innovation & infrastructure",
              "Peace, justice & strong institutions",
              "Gender Equality",
              "Decent work & economic growth",
              "Poverty",
              "Partnership & Collaboration",
              "Affordable & clean energy",
              "Other"
            ],
            "Learn new skills": {
              "title": "What public good skills/tools are you interested in deepening?",
              "subTitle": "Choose at least one.",
              "content": [
                "Deeply Technical Skills",
                "Community Engagement Skills",
                "Product Skills",
                "DAO Skills",
                "Funding Skills",
                "Other",
              ],
            },
            "Meet people with complementary skills": {
              "title": "What types of people are you looking for?",
              "subTitle": "Choose at least one.",
              "content": [
                "Frontend Developer",
                "Backend Developer",
                "Full Stack Developer",
                "Blockchain Developer",
                "Design Person",
                "Product Person",
                "Other",
              ],
            },
            "Engage Investors": {
              "title": "What type of investors are you looking for?",
              "subTitle": "Choose at least one.",
              "content": [
                "Angel Investors",
                "VCs",
                "Communities",
                "DAOs",
                "Advisors",
                "Grants",
                "Other",
              ],
            },
            "Find a co-founder": {
              "title": "How would you describe your ideal co-founder?",
              "subTitle": "Choose max 3.",
              "content": [
                "Technical wizz",
                "Product wizz",
                "Design wizz",
                "Bizz wizz",
                "Other",
              ]
            },
          },
        },
        "NFTs": {
          "subCategories": {
            "title": "It’s time to teach our AI what you’re looking for 👉🏽",
            "subTitle": "Now, let’s get a bit more specific about those NFT interests!",
            "content": [
              "PFP and Avatars",
              "Artwork",
              "Generative Art",
              "Collectibles",
              "Photography NFTs",
              "Music NFTs",
              "Gamified NFT",
              "NFT event tickets",
              "Membership passes",
              "Domain Names",
              "Proof of Ownership",
              "Other",
            ],
          },
          "Focus On Page": {
            "title": "Cool! What matters to you for this hackathon?",
            "subTitle": "Let us know one or more reasons why you're here.",
            "content": [
              "Winning Bounties",
              "Solving Meaningful Problems",
              "Learning new Skills",
              "Meeting new Friends",
              "Finding Investors",
              "Other"
            ],
          },
          "Win bounties": {
            "title": "What bounties are you interested in pursuing?",
            "subTitle": "Choose at least one bounty.",
            "content": [
              "Altlayer 🟣 - Bounty #1($1, 500) - Social Dapp 👥",
              "Altlayer 🟣 - Bounty #2($1, 500) - GameFi 🎮",
              "Safe Ecosystem Foundation - Bounty #1($5, 000) - Open Bounty 👐",
              "Safe Ecosystem Foundation - Bounty #2($2, 000) - Roles Modder 🥘",
              "Metamask - Bounty #1($5, 000) - Keyrings 🔑",
              "Metamask - Bounty #2($5, 000) - Anything Goes 🤘",
              "Arweave - Bounty #1($4, 000) - Social App / DataFi / Warp Contracts 💻",
              "Arweave - Bounty #2($2, 000) - VouchDAO APP 🤝",
              "Arweave - Bonus Bounties($100 in AR per successful implementation) ‼️",
              "Wallet Connect - Bounty #1($7, 000) - Best Public Good 📢",
              "Wallet Connect - Bounty #2($7, 000) - Best Mobile UX 🌕",
              "IPFS / Filecoin - Bounty #1($11, 000) - Storage Wizzard 🧙🏻‍♂️",
              "IPFS / FilecoinBounty - Bounty #2($9, 000) - Computing over Data 📊",
              "IExec - Bounty #1($4, 500) - Oracle Factory 🔮",
              "Other",
            ],
            "Solving Meaningful Problems": {
              "title": "What causes do you care about?",
              "subTitle": "Choose maximum 3.",
              "content": [
                "Sustainable cities & communities",
                "Reduced inequalities",
                "Responsible consumptions and production",
                "Hunger",
                "Climate Action",
                "Education",
                "Life below water",
                "Clean water & sanitation",
                "Life on land",
                "Health & Wellbeing",
                "Industry, innovation & infrastructure",
                "Peace, justice & strong institutions",
                "Gender Equality",
                "Decent work & economic growth",
                "Poverty",
                "Partnership & Collaboration",
                "Affordable & clean energy",
                "Other"
              ],
              "Learn new skills": {
                "title": "What NFT skills are you interested in deepening?",
                "subTitle": "Choose at least one.",
                "content": [
                  "Community",
                  "Marketing",
                  "Technical Side",
                  "Art Side",
                  "Exploring Usecases",
                  "Other",
                ],
              },
              "Meet people with complementary skills": {
                "title": "What types of people are you looking for?",
                "subTitle": "Choose at least one.",
                "content": [
                  "Frontend Developer",
                  "Backend Developer",
                  "Full Stack Developer",
                  "Blockchain Developer",
                  "Design Person",
                  "Product Person",
                  "Other",
                ],
              },
              "Engage Investors": {
                "title": "What type of investors are you looking for?",
                "subTitle": "Choose at least one.",
                "content": [
                  "Angel Investors",
                  "VCs",
                  "Communities",
                  "DAOs",
                  "Advisors",
                  "Grants",
                  "Other",
                ],
              },
              "Find a co-founder": {
                "title": "How would you describe your ideal co-founder?",
                "subTitle": "Choose max 3.",
                "content": [
                  "Technical wizz",
                  "Product wizz",
                  "Design wizz",
                  "Bizz wizz",
                  "Other",
                ]
              },
            },
          },
          "DeSci": {
            "subCategories": {
              "title": "It’s time to teach our AI what you’re looking for 👉🏽",
              "subTitle": "Now, let’s get a bit more specific about those DeSci interests!",
              "content": [
                "Funding",
                "Peer Review",
                "Access",
                "Incentives",
                "Pace",
                "Biotech DAOs",
                "Environemntal DAOs",
                "Science DAOs",
                "Research Tokens",
                "Combat Censorships",
                "Verifiable Reputation",
                "IP",
                "Other",
              ],
            },
            "Focus On Page": {
              "title": "Cool! What matters to you for this hackathon?",
              "subTitle": "Let us know one or more reasons why you're here.",
              "content": [
                "Winning Bounties",
                "Solving Meaningful Problems",
                "Learning new Skills",
                "Meeting new Friends",
                "Finding Investors",
                "Other"
              ],
            },
            "Win bounties": {
              "title": "What bounties are you interested in pursuing?",
              "subTitle": "Choose at least one bounty.",
              "content": [
                "Altlayer 🟣 - Bounty #1($1, 500) - Social Dapp 👥",
                "Altlayer 🟣 - Bounty #2($1, 500) - GameFi 🎮",
                "Safe Ecosystem Foundation - Bounty #1($5, 000) - Open Bounty 👐",
                "Safe Ecosystem Foundation - Bounty #2($2, 000) - Roles Modder 🥘",
                "Metamask - Bounty #1($5, 000) - Keyrings 🔑",
                "Metamask - Bounty #2($5, 000) - Anything Goes 🤘",
                "Arweave - Bounty #1($4, 000) - Social App / DataFi / Warp Contracts 💻",
                "Arweave - Bounty #2($2, 000) - VouchDAO APP 🤝",
                "Arweave - Bonus Bounties($100 in AR per successful implementation) ‼️",
                "Wallet Connect - Bounty #1($7, 000) - Best Public Good 📢",
                "Wallet Connect - Bounty #2($7, 000) - Best Mobile UX 🌕",
                "IPFS / Filecoin - Bounty #1($11, 000) - Storage Wizzard 🧙🏻‍♂️",
                "IPFS / FilecoinBounty - Bounty #2($9, 000) - Computing over Data 📊",
                "IExec - Bounty #1($4, 500) - Oracle Factory 🔮",
                "Other",
              ],
              "Solving Meaningful Problems": {
                "title": "What causes do you care about?",
                "subTitle": "Choose maximum 3.",
                "content": [
                  "Sustainable cities & communities",
                  "Reduced inequalities",
                  "Responsible consumptions and production",
                  "Hunger",
                  "Climate Action",
                  "Education",
                  "Life below water",
                  "Clean water & sanitation",
                  "Life on land",
                  "Health & Wellbeing",
                  "Industry, innovation & infrastructure",
                  "Peace, justice & strong institutions",
                  "Gender Equality",
                  "Decent work & economic growth",
                  "Poverty",
                  "Partnership & Collaboration",
                  "Affordable & clean energy",
                  "Other"
                ],
                "Learn new skills": {
                  "title": "What NFT skills are you interested in deepening?",
                  "subTitle": "Choose at least one.",
                  "content": [
                    "Building Communities",
                    "The Science Stuff",
                    "Exploring Usecases",
                    "Other",
                  ],
                },
                "Meet people with complementary skills": {
                  "title": "What types of people are you looking for?",
                  "subTitle": "Choose at least one.",
                  "content": [
                    "Frontend Developer",
                    "Backend Developer",
                    "Full Stack Developer",
                    "Blockchain Developer",
                    "Design Person",
                    "Product Person",
                    "Other",
                  ],
                },
                "Engage Investors": {
                  "title": "What type of investors are you looking for?",
                  "subTitle": "Choose at least one.",
                  "content": [
                    "Angel Investors",
                    "VCs",
                    "Communities",
                    "DAOs",
                    "Advisors",
                    "Grants",
                    "Other",
                  ],
                },
                "Find a co-founder": {
                  "title": "How would you describe your ideal co-founder?",
                  "subTitle": "Choose max 3.",
                  "content": [
                    "Technical wizz",
                    "Product wizz",
                    "Design wizz",
                    "Bizz wizz",
                    "Other",
                  ]
                },
              },
            },
            "Gaming": {
              "title": "It’s time to teach our AI what you’re looking for 👉🏽",
              "subTitle": "Now, let’s get a bit more specific about those Gaming interests!",
              "content": [
                "Play-to-Earn",
                "Transferrable Ingame Assets",
                "Game Design",
                "Character Design",
                "Creator Economy",
                "Guilds",
                "Metaverse",
                "Other",
              ],
            },
            "Focus On Page": {
              "title": "Cool! What matters to you for this hackathon?",
              "subTitle": "Let us know one or more reasons why you're here.",
              "content": [
                "Winning Bounties",
                "Solving Meaningful Problems",
                "Learning new Skills",
                "Meeting new Friends",
                "Finding Investors",
                "Other"
              ],
            },
            "Win bounties": {
              "title": "What bounties are you interested in pursuing?",
              "subTitle": "Choose at least one bounty.",
              "content": [
                "Altlayer 🟣 - Bounty #1($1, 500) - Social Dapp 👥",
                "Altlayer 🟣 - Bounty #2($1, 500) - GameFi 🎮",
                "Safe Ecosystem Foundation - Bounty #1($5, 000) - Open Bounty 👐",
                "Safe Ecosystem Foundation - Bounty #2($2, 000) - Roles Modder 🥘",
                "Metamask - Bounty #1($5, 000) - Keyrings 🔑",
                "Metamask - Bounty #2($5, 000) - Anything Goes 🤘",
                "Arweave - Bounty #1($4, 000) - Social App / DataFi / Warp Contracts 💻",
                "Arweave - Bounty #2($2, 000) - VouchDAO APP 🤝",
                "Arweave - Bonus Bounties($100 in AR per successful implementation) ‼️",
                "Wallet Connect - Bounty #1($7, 000) - Best Public Good 📢",
                "Wallet Connect - Bounty #2($7, 000) - Best Mobile UX 🌕",
                "IPFS / Filecoin - Bounty #1($11, 000) - Storage Wizzard 🧙🏻‍♂️",
                "IPFS / FilecoinBounty - Bounty #2($9, 000) - Computing over Data 📊",
                "IExec - Bounty #1($4, 500) - Oracle Factory 🔮",
                "Fuel Labs - Bounty #1($6, 000) - Open Bounty 🥥",
                "Other",
              ],
              "Solving Meaningful Problems": {
                "title": "What causes do you care about?",
                "subTitle": "Choose maximum 3.",
                "content": [
                  "Sustainable cities & communities",
                  "Reduced inequalities",
                  "Responsible consumptions and production",
                  "Hunger",
                  "Climate Action",
                  "Education",
                  "Life below water",
                  "Clean water & sanitation",
                  "Life on land",
                  "Health & Wellbeing",
                  "Industry, innovation & infrastructure",
                  "Peace, justice & strong institutions",
                  "Gender Equality",
                  "Decent work & economic growth",
                  "Poverty",
                  "Partnership & Collaboration",
                  "Affordable & clean energy",
                  "Other"
                ],
                "Learn new skills": {
                  "title": "What NFT skills are you interested in deepening?",
                  "subTitle": "Choose at least one.",
                  "content": [
                    "Building Communities",
                    "The Science Stuff",
                    "Exploring Usecases",
                    "Other",
                  ],
                },
                "Meet people with complementary skills": {
                  "title": "What types of people are you looking for?",
                  "subTitle": "Choose at least one.",
                  "content": [
                    "Frontend Developer",
                    "Backend Developer",
                    "Full Stack Developer",
                    "Blockchain Developer",
                    "Design Person",
                    "Product Person",
                    "Other",
                  ],
                },
                "Engage Investors": {
                  "title": "What type of investors are you looking for?",
                  "subTitle": "Choose at least one.",
                  "content": [
                    "Angel Investors",
                    "VCs",
                    "Communities",
                    "DAOs",
                    "Advisors",
                    "Grants",
                    "Other",
                  ],
                },
                "Find a co-founder": {
                  "title": "How would you describe your ideal co-founder?",
                  "subTitle": "Choose max 3.",
                  "content": [
                    "Technical wizz",
                    "Product wizz",
                    "Design wizz",
                    "Bizz wizz",
                    "Other",
                  ]
                },
              },
            },
            "DAOs": {
              "title": "It’s time to teach our AI what you’re looking for 👉🏽",
              "subTitle": "Now, let’s get a bit more specific about those DAO interests!",
              "content": [
                "Treasury Management",
                "General Framework",
                "Contribution & Reputation",
                "Content / Product",
                "Compensation",
                "Knowledge Management",
                "Governance & Voting",
                "Access",
                "Discussion",
                "Identity",
                "Frontend & Analytics",
                "Other",
              ],
            },
            "Focus On Page": {
              "title": "Cool! What matters to you for this hackathon?",
              "subTitle": "Let us know one or more reasons why you're here.",
              "content": [
                "Winning Bounties",
                "Solving Meaningful Problems",
                "Learning new Skills",
                "Meeting new Friends",
                "Finding Investors",
                "Other"
              ],
            },
            "Win bounties": {
              "title": "What bounties are you interested in pursuing?",
              "subTitle": "Choose at least one bounty.",
              "content": [
                "Altlayer 🟣 - Bounty #1($1, 500) - Social Dapp 👥",
                "Altlayer 🟣 - Bounty #2($1, 500) - GameFi 🎮",
                "Safe Ecosystem Foundation - Bounty #1($5, 000) - Open Bounty 👐",
                "Safe Ecosystem Foundation - Bounty #2($2, 000) - Roles Modder 🥘",
                "Metamask - Bounty #1($5, 000) - Keyrings 🔑",
                "Metamask - Bounty #2($5, 000) - Anything Goes 🤘",
                "Arweave - Bounty #1($4, 000) - Social App / DataFi / Warp Contracts 💻",
                "Arweave - Bounty #2($2, 000) - VouchDAO APP 🤝",
                "Arweave - Bonus Bounties($100 in AR per successful implementation) ‼️",
                "Wallet Connect - Bounty #1($7, 000) - Best Public Good 📢",
                "Wallet Connect - Bounty #2($7, 000) - Best Mobile UX 🌕",
                "IPFS / Filecoin - Bounty #1($11, 000) - Storage Wizzard 🧙🏻‍♂️",
                "IPFS / FilecoinBounty - Bounty #2($9, 000) - Computing over Data 📊",
                "IExec - Bounty #1($4, 500) - Oracle Factory 🔮",
                "Fuel Labs - Bounty #1($6, 000) - Open Bounty 🥥",
                "Other",
              ],
              "Solving Meaningful Problems": {
                "title": "What causes do you care about?",
                "subTitle": "Choose maximum 3.",
                "content": [
                  "Sustainable cities & communities",
                  "Reduced inequalities",
                  "Responsible consumptions and production",
                  "Hunger",
                  "Climate Action",
                  "Education",
                  "Life below water",
                  "Clean water & sanitation",
                  "Life on land",
                  "Health & Wellbeing",
                  "Industry, innovation & infrastructure",
                  "Peace, justice & strong institutions",
                  "Gender Equality",
                  "Decent work & economic growth",
                  "Poverty",
                  "Partnership & Collaboration",
                  "Affordable & clean energy",
                  "Other"
                ],
                "Learn new skills": {
                  "title": "What NFT skills are you interested in deepening?",
                  "subTitle": "Choose at least one.",
                  "content": [
                    "Community Building",
                    "Technical side of DAO tooling",
                    "Other",
                  ],
                },
                "Meet people with complementary skills": {
                  "title": "What types of people are you looking for?",
                  "subTitle": "Choose at least one.",
                  "content": [
                    "Frontend Developer",
                    "Backend Developer",
                    "Full Stack Developer",
                    "Blockchain Developer",
                    "Design Person",
                    "Product Person",
                    "Other",
                  ],
                },
                "Engage Investors": {
                  "title": "What type of investors are you looking for?",
                  "subTitle": "Choose at least one.",
                  "content": [
                    "Angel Investors",
                    "VCs",
                    "Communities",
                    "DAOs",
                    "Advisors",
                    "Grants",
                    "Other",
                  ],
                },
                "Find a co-founder": {
                  "title": "How would you describe your ideal co-founder?",
                  "subTitle": "Choose max 3.",
                  "content": [
                    "Technical wizz",
                    "Product wizz",
                    "Design wizz",
                    "Bizz wizz",
                    "Other",
                  ]
                },
              },
            },
            "Other": {
              "subCategories": {
                "tell us what we're not getting!": {
                  "title": "Tell us what we're not getting!",
                  "subTitle": "We're constantly learning at Eden and we want to serve you better!",
                  "content": "",

                }
              },
            },
          },
        },
      }


const ResultCardShowFlag = {
        "type": "Project", // Project,Bounty,DAO,User,discordChannel 
        "picture": true,
        "description": true,
        "skills": true,
        "generalTags": true,
        "champion": true,
        "persentage": true,
        "persentageButton": true,
      }

const ResultPopUpShowFlag = {
        "type": "Project", // Project,Bounty,DAO,User,discordChannel 
        "picture": true,
        "description": true,
        "skills": true,
        "generalTags": true,
        "champion": true,
        "persentage": true,
        "persentagewhButton": true,
      }

const Result = {
        "Design 1": {
          "description": "At Catapult labs we're excited to unlock the future of DAOs. For this project in particular we're looking for a couple of key people who can help us shape our next gen of DAO tooling.",
          "picture": "https://i.imgur.com/1Q9Z1Zm.png",
          "name": "Catapult Labs | Next gen DAO tooling.",
          "edenMembersDAO": "45",
          "coreTeamPicture": [
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
          ],
          "championPicture": "https://i.imgur.com/1Q9Z1Zm.png",
          "roles": [{
            "name": "Designer",
            "time:": "10 weeks",
            "description": "Work with the team to quickly iterate & design new products",
            "Open Seats": "2",
          }, {
            "name": "Product",
            "time:": "10 weeks",
            "description": "Support our CEO to coordinate the engineering & designer efforts",
            "Open Seats": "1",
          }]
        },
        "Product 1": {
          "description": "At Catapult labs we're excited to unlock the future of DAOs. For this project in particular we're looking for a couple of key people who can help us shape our next gen of DAO tooling.",
          "picture": "https://i.imgur.com/1Q9Z1Zm.png",
          "name": "Catapult Labs | Next gen DAO tooling.",
          "edenMembersDAO": "45",
          "coreTeamPicture": [
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
          ],
          "championPicture": "https://i.imgur.com/1Q9Z1Zm.png",
          "roles": [
            {
              "name": "Designer",
              "time:": "10 weeks",
              "description": "Work with the team to quickly iterate & design new products",
              "Open Seats": "2",
            },
            {
              "name": "Product",
              "time:": "10 weeks",
              "description": "Support our CEO to coordinate the engineering & designer efforts",
              "Open Seats": "1",
            }
          ]
        },
        "Backend 1": {
          "description": "Building a discord activity tracker to see what communities are gnmi next.",
          "picture": "https://i.imgur.com/1Q9Z1Zm.png",
          "name": "NFT popTrack",
          "edenMembersDAO": "45",
          "coreTeamPicture": [
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
          ],
          "championPicture": "https://i.imgur.com/1Q9Z1Zm.png",
          "roles": [
            {
              "name": "Backend",
              "time:": "12 weeks",
              "description": "Build the bot that scrapes all the discords",
              "Open Seats": "1",
            },
            {
              "name": "Backend",
              "time:": "12 weeks",
              "description": "Build the AI that analyzes all the data from the scraper",
              "Open Seats": "1",
            },
            {
              "name": "Design",
              "time:": "12 weeks",
              "description": "Design the frontend for NFT popTrack",
              "Open Seats": "1",
            },
            {
              "name": "Frontend",
              "time:": "12 weeks",
              "description": "Implement the frontend for NFT popTrack",
              "Open Seats": "1",
            }
          ]
        },
        "Frontend 1": {
          "description": "A tool to build, validate & track trust across a DAO.",
          "picture": "https://i.imgur.com/1Q9Z1Zm.png",
          "name": "Trust Tree",
          "edenMembersDAO": "45",
          "coreTeamPicture": [
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
            "https://i.imgur.com/1Q9Z1Zm.png",
          ],
          "championPicture": "https://i.imgur.com/1Q9Z1Zm.png",
          "roles": [
            {
              "name": "Blockchain",
              "time:": "12 weeks",
              "description": "Build the trust dispersion mechanism for trustTree",
              "Open Seats": "1",
            },
            {
              "name": "Frontend",
              "time:": "12 weeks",
              "description": "Implement the frontend for trustTree",
              "Open Seats": "1",
            }
          ]
        },
      }
    }
  }
}


const resultsOnChoice = {

        "Design":
          [{
            "result": "Design 1",
            "percentage": "88",
            "rolesPercentages": ["50", "20"],
          },
          {
            "result": "Backend 1",
            "percentage": "50",
            "rolesPercentages": ["50", "30", "20", "10"],
          },
          ],
        "Frontend Developer":
          [{
            "result": "Backend 1",
            "percentage": "80",
            "rolesPercentages": ["50", "30", "20", "10"],
          },
          {
            "result": "Frontend 1",
            "percentage": "88",
            "rolesPercentages": ["50", "30"],
          },],
        "Backend Developer": {
          "result": "Backend 1",
          "percentage": "88",
          "rolesPercentages": ["50", "30", "20", "10"],
        },
        "Blockchain Developer": {
          "result": "Frontend 1",
          "percentage": "80",
          "rolesPercentages": ["50", "30"],
        },
        "Product": {
          "result": "Product 1",
          "percentage": "82",
          "rolesPercentages": ["50", "30", "20", "10"],
        },
      }

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