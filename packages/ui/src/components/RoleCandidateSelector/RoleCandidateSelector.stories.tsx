import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleCandidateSelector } from "./RoleCandidateSelector";

export default {
  title: "Components/RoleCandidateSelector",
  component: RoleCandidateSelector,
  argTypes: {},
} as ComponentMeta<typeof RoleCandidateSelector>;

const roles = [
  { _id: 1, title: "Scrum Master", candidates: [] },
  { _id: 2, title: "Frontend", candidates: [] },
  { _id: 3, title: "Backend", candidates: [] },
  { _id: 4, title: "Product Manager", candidates: [] },
];

const Template: ComponentStory<typeof RoleCandidateSelector> = (args) => (
  <RoleCandidateSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  roles,
};
