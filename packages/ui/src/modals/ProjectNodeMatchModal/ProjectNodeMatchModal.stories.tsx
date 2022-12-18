import { matchNodesToProjectRolesMock } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectNodeMatchModal } from "./ProjectNodeMatchModal";

export default {
  title: "Modals/ProjectNodeMatchModal",
  component: ProjectNodeMatchModal,
  argTypes: {},
} as ComponentMeta<typeof ProjectNodeMatchModal>;

const Template: ComponentStory<typeof ProjectNodeMatchModal> = (args) => (
  <ProjectNodeMatchModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  matchedProject: matchNodesToProjectRolesMock(),
  onClose: () => null,
};
