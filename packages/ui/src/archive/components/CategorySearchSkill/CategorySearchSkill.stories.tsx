import { FIND_ALL_MAIN_CATEGORIES } from "@eden/package-graphql";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { CategorySearchSkill } from "./CategorySearchSkill";

export default {
  title: "Archive/Components/CategorySearchSkill",
  component: CategorySearchSkill,
  argTypes: {},
} as ComponentMeta<typeof CategorySearchSkill>;

const Template: ComponentStory<typeof CategorySearchSkill> = (args) => {
  const [skills, setSkills] = useState([]);
  const levels = [
    {
      title: "learning",
      level: "learning",
    },
    {
      title: "Skilled",
      level: "mid",
    },
  ];

  return (
    <CategorySearchSkill
      {...args}
      skills={skills}
      levels={levels}
      setSkills={setSkills}
    />
  );
};

export const Default = Template.bind({});

Default.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: FIND_ALL_MAIN_CATEGORIES,
        },
        result: {
          data: {
            findSkillCategories: [
              {
                _id: "63098c32b003e10004f99c8a",
                name: "Information Technology",
              },
              {
                _id: "63098d44b003e10004f9afcd",
                name: "Media and Communications",
              },
              {
                _id: "63098d46b003e10004f9afdf",
                name: "Business",
              },
              {
                _id: "63098d4cb003e10004f9b09e",
                name: "Marketing and Public Relations",
              },
              {
                _id: "63098d51b003e10004f9b0c9",
                name: "Finance",
              },
              {
                _id: "63098d55b003e10004f9b16f",
                name: "Physical and Inherent Abilities",
              },
              {
                _id: "63098d61b003e10004f9b25d",
                name: "Design",
              },
            ],
          },
        },
      },
    ],
  },
};
