import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectsModalContainer } from "./ProjectsModalContainer";

export default {
  title: "Containers/ProjectsModalContainer",
  component: ProjectsModalContainer,
  argTypes: {},
} as ComponentMeta<typeof ProjectsModalContainer>;

const Template: ComponentStory<typeof ProjectsModalContainer> = (args) => (
  <ProjectsModalContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
