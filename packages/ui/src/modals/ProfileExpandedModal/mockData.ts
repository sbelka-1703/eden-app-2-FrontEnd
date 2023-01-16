import { getEndorsementsTypeMockArray } from "@eden/package-mock";

export const mockData = {
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
    endorsements: getEndorsementsTypeMockArray(5),
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
    ],
  },
};
