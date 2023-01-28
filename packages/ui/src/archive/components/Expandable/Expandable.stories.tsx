import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Expandable } from "./Expandable";

export default {
  title: "Archive/Components/Expandable",
  component: Expandable,
  argTypes: {},
} as ComponentMeta<typeof Expandable>;

const Template: ComponentStory<typeof Expandable> = (args) => {
  return <Expandable {...args} />;
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
