import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GrantsModal } from "./GrantsModal";

export default {
  title: "Modals/GrantsModal",
  component: GrantsModal,
  argTypes: {},
} as ComponentMeta<typeof GrantsModal>;

const Template: ComponentStory<typeof GrantsModal> = (args) => (
  <GrantsModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  member: getMember(),
  onClose: () => null,
};
