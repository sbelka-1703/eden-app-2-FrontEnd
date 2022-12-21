import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectModal } from "./ProjectModal";

export default {
  title: "Modals/ProjectModal",
  component: ProjectModal,
  argTypes: {},
} as ComponentMeta<typeof ProjectModal>;

const Template: ComponentStory<typeof ProjectModal> = (args) => (
  <ProjectModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  project: getProject(),
  onClose: () => null,
};
