import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EmojiSelector } from "./EmojiSelector";

export default {
  title: "Selector/EmojiSelector",
  component: EmojiSelector,
  argTypes: {},
} as ComponentMeta<typeof EmojiSelector>;

const skills = [
  {
    _id: "1",
    name: "JavaScript",
    __typename: "Skill",
  },
];

const roles = [
  { _id: "1", title: "Scrum Master", skills, __typename: "Role" },
  { _id: "2", title: "Frontend", skills, __typename: "Role" },
  { _id: "3", title: "Backend", skills, __typename: "Role" },
  { _id: "4", title: "Product Manager", skills, __typename: "Role" },
];

const Template: ComponentStory<typeof EmojiSelector> = (args) => (
  <EmojiSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roles,
};
