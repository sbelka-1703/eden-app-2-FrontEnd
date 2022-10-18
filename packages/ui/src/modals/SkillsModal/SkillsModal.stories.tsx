import { MockedProvider } from "@apollo/client/testing";
import { FIND_ALL_CATEGORIES } from "@eden/package-graphql";
import { getSkillRoleTypeMockArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillsModal } from "./SkillsModal";

export default {
  title: "Modals/SkillsModal",
  component: SkillsModal,
  argTypes: {},
} as ComponentMeta<typeof SkillsModal>;

const Template: ComponentStory<typeof SkillsModal> = (args) => (
  <SkillsModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  skills: getSkillRoleTypeMockArray(9),
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
