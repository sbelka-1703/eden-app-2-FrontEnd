import { MockedProvider } from "@apollo/client/testing";
import { FIND_ALL_CATEGORIES } from "@eden/package-graphql";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillsSubcategoryModal } from "./SkillsSubcategoryModal";

export default {
  title: "Modals/SkillsSubcategoryModal",
  component: SkillsSubcategoryModal,
  argTypes: {},
} as ComponentMeta<typeof SkillsSubcategoryModal>;

const Template: ComponentStory<typeof SkillsSubcategoryModal> = (args) => (
  <SkillsSubcategoryModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
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
