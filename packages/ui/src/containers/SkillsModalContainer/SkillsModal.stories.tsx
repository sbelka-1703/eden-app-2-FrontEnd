import { MockedProvider } from "@apollo/client/testing";
import { FIND_ALL_CATEGORIES } from "@graphql/eden";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillsModal } from "./SkillsModal";

export default {
  title: "Containers/SkillsModal",
  component: SkillsModal,
  argTypes: {},
} as ComponentMeta<typeof SkillsModal>;

const Template: ComponentStory<typeof SkillsModal> = (args) => (
  <SkillsModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  skills: [
    {
      skillInfo: {
        _id: "1",
        name: "skill1",
      },
    },
    {
      skillInfo: {
        _id: "2",
        name: "skill2",
      },
    },
    {
      skillInfo: {
        _id: "3",
        name: "skill3",
      },
    },
    {
      skillInfo: {
        _id: "4",
        name: "skill4",
      },
    },
    {
      skillInfo: {
        _id: "5",
        name: "skill5",
      },
    },
    {
      skillInfo: {
        _id: "6",
        name: "skill6",
      },
    },
    {
      skillInfo: {
        _id: "7",
        name: "skill7",
      },
    },
  ],
  isOpen: true,
  handelAddSkills() {
    console.log("SkillsModal HandelAddSkills");
  },
};

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
