import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleCandidateSelector } from "./RoleCandidateSelector";

export default {
  title: "Selector/RoleCandidateSelector",
  component: RoleCandidateSelector,
  argTypes: {},
} as ComponentMeta<typeof RoleCandidateSelector>;

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

const Template: ComponentStory<typeof RoleCandidateSelector> = (args) => (
  <RoleCandidateSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roles,
};
