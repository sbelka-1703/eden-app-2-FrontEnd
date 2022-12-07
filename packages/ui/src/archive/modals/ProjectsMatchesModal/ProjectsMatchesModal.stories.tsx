import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectsMatchesModal } from "./ProjectsMatchesModal";

export default {
  title: "Archive/Modals/ProjectsMatchesModal",
  component: ProjectsMatchesModal,
  argTypes: {},
} as ComponentMeta<typeof ProjectsMatchesModal>;

const Template: ComponentStory<typeof ProjectsMatchesModal> = (args) => (
  <ProjectsMatchesModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
};
