import { getProjectArray } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectList } from "./ProjectList";

export default {
  title: "Lists/ProjectList",
  component: ProjectList,
  argTypes: {},
} as ComponentMeta<typeof ProjectList>;

const Template: ComponentStory<typeof ProjectList> = (args) => (
  <ProjectList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  projects: getProjectArray(9),
  applyButton: false,
  statusButton: false,
  inviteButton: false,
  favButton: false,
};
