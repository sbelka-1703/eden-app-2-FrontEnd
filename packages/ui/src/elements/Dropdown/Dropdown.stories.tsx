import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Dropdown } from "./Dropdown";

export default {
  title: "Elements/Dropdown",
  component: Dropdown,
  argTypes: {},
} as ComponentMeta<typeof Dropdown>;

const skills = [
  { _id: 1, name: "Skill 1" },
  { _id: 2, name: "Skill 2" },
  { _id: 3, name: "Skill 3" },
  { _id: 4, name: "Skill 4" },
];

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: skills,
  label: `skill`,
  placeholder: `select skill`,
  multiple: true,
};
