import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SubNodesExpandable } from "./SubNodesExpandable";

export default {
  title: "Components/Expandable",
  component: SubNodesExpandable,
  argTypes: {},
} as ComponentMeta<typeof SubNodesExpandable>;

const Template: ComponentStory<typeof SubNodesExpandable> = (args) => {
  return <SubNodesExpandable {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  query: "Web",
  category: "Web Developement",
  allSkills: [
    {
      _id: "12312413afdasd",
      name: "React.js",
      subCategorySkill: [{ name: "Web Development" }],
    },
  ],
};
