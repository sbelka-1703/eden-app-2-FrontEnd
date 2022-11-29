import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserDiscoverModal } from "./UserDiscoverModal";

export default {
  title: "Modals/UserDiscoverModal",
  component: UserDiscoverModal,
  argTypes: {},
} as ComponentMeta<typeof UserDiscoverModal>;

const Template: ComponentStory<typeof UserDiscoverModal> = (args) => (
  <UserDiscoverModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  member: getMember(),
  onClose: () => null,
};
