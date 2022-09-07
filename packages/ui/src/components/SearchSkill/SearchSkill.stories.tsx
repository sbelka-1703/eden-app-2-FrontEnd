import { MockedProvider } from "@apollo/client/testing";
import { FIND_ALL_CATEGORIES } from "@graphql/eden";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { SearchSkill } from "./SearchSkill";

export default {
  title: "Components/SearchSkill",
  component: SearchSkill,
  argTypes: {},
} as ComponentMeta<typeof SearchSkill>;

const Template: ComponentStory<typeof SearchSkill> = (args) => {
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
    <SearchSkill
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
    MockedProvider,
    mocks: [
      {
        request: {
          query: FIND_ALL_CATEGORIES,
        },
        result: {
          data: {
            findSkillSubCategories: [
              {
                _id: "63098c32b003e10004f99c8e",
                name: "Web Design and Development",
              },
              {
                _id: "63098cf8b003e10004f9a94e",
                name: "Scripting Languages",
              },
              {
                _id: "63098cfbb003e10004f9a9ed",
                name: "Computer Science",
              },
              {
                _id: "63098d00b003e10004f9aa15",
                name: "C and C++",
              },
            ],
          },
        },
      },
    ],
  },
};
