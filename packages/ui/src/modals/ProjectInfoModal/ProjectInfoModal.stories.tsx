import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectInfoModal } from "./ProjectInfoModal";

export default {
  title: "Modals/ProjectInfoModal",
  component: ProjectInfoModal,
  argTypes: {},
} as ComponentMeta<typeof ProjectInfoModal>;

const Template: ComponentStory<typeof ProjectInfoModal> = (args) => (
  <ProjectInfoModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  onSubmit: (role) => {
    console.log(role);
  },
};
