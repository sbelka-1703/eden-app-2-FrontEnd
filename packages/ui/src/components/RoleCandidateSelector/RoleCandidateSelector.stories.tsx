import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleCandidateSelector } from "./RoleCandidateSelector";

export default {
  title: "Components/RoleCandidateSelector",
  component: RoleCandidateSelector,
  argTypes: {},
} as ComponentMeta<typeof RoleCandidateSelector>;

const roles = [
  { _id: 1, name: "Scrum Master" },
  { _id: 2, name: "Frontend" },
  { _id: 3, name: "Backend" },
  { _id: 4, name: "Product Manager" },
];

const Template: ComponentStory<typeof RoleCandidateSelector> = (args) => (
  <RoleCandidateSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roles: roles,
};
