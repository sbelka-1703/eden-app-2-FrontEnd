// import { useQuery } from "@apollo/client";
// import { FIND_MEMBERS, FIND_SKILLS } from "@graphql/eden";
import { useQuery } from "@apollo/client";
import { FIND_SKILLS } from "@graphql/eden";
import type { NextPage } from "next";
import {
  Avatar,
  Badge,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SkillSelector,
  TextHeading3,
} from "ui";

const OnboardPartyPage: NextPage = () => {
  const members = [
    {
      discordName: "BluePanda",
      discordAvatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/598.jpg",
      skills: [
        { name: "Solidity", _id: "asd123" },
        { name: "HTML5", _id: "asd456" },
      ],
    },
    {
      discordName: "eloigil",
      discordAvatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/598.jpg",
      skills: [
        { name: "Solidity", _id: "asd123" },
        { name: "HTML5", _id: "asd456" },
      ],
    },
    {
      discordName: "sbelka",
      discordAvatar:
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/598.jpg",
      skills: [
        { name: "Solidity", _id: "asd123" },
        { name: "HTML5", _id: "asd456" },
      ],
    },
  ];
  // const { currentUser } = useContext(UserContext);
  // const { data: dataMembers } = useQuery(FIND_MEMBERS, {
  //   variables: {
  //     fields: {},
  //   },
  //   context: { serviceName: "soilservice" },
  // });

  const {
    data: { findSkills: dataSkills },
  } = useQuery(FIND_SKILLS, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  // console.log("dataMembers", dataMembers);
  // console.log("dataSkills", dataSkills);
  return (
    <GridLayout>
      <GridItemThree>
        <Card shadow className="bg-white p-3">
          <TextHeading3 className="mb-2">Edit Your Profile Card</TextHeading3>
          <div className="mb-4 flex items-center">
            <Avatar
              src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/598.jpg"
              size="sm"
            />
            <span className="ml-2">exwhyzee.eth</span>
          </div>
          <SkillSelector showSelected options={dataSkills} />
        </Card>
      </GridItemThree>
      <GridItemNine>
        <Card shadow className="bg-white p-3">
          <TextHeading3 className="mb-2">See Other Profiles</TextHeading3>
          <section className="grid grid-cols-2 gap-3">
            {members.map((member, index) => (
              <Card key={index} border className="col-span-1 bg-white p-3">
                <div className="mb-4 flex flex-col">
                  <Avatar src={member.discordAvatar} size="sm" />
                  <span className="mt-2">{member.discordName}</span>
                </div>
                {member.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    colorRGB="236, 240, 71, 40"
                    text={skill.name}
                  />
                ))}
              </Card>
            ))}
          </section>
        </Card>
      </GridItemNine>
    </GridLayout>
  );
};

export default OnboardPartyPage;
