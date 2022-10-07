import { MockedProvider } from "@apollo/client/testing";
import { FIND_SUBCATEGORIES_OF_CATEGORIES } from "@eden/package-graphql";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CategoryExpandable } from "./CategoryExpandable";

export default {
  title: "Components/CategoryExpandable",
  component: CategoryExpandable,
  argTypes: {},
} as ComponentMeta<typeof CategoryExpandable>;

const Template: ComponentStory<typeof CategoryExpandable> = (args) => {
  return <CategoryExpandable {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  query: "Web",
  category: "Web Developement",
  levels: [
    { title: "Learning", level: "learning" },
    { title: "mid", level: "mid" },
  ],
  allSkills: [
    {
      _id: "12312413afdasd",
      name: "React.js",
      subCategorySkill: [{ name: "Web Development" }],
    },
  ],
};

Default.parameters = {
  apolloClient: {
    MockedProvider,
    mocks: [
      {
        request: {
          query: FIND_SUBCATEGORIES_OF_CATEGORIES,
        },
        result: {
          data: {
            findSkillCategory: {
              subCategorySkill: [
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
      },
    ],
  },
};
