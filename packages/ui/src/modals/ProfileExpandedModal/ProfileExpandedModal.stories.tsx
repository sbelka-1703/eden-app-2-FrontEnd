import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockData } from "./mockData";
import { ProfileExpandedModal } from "./ProfileExpandedModal";

export default {
  title: "Modals/ProfileExpandedModal",
  component: ProfileExpandedModal,
  argTypes: {},
} as ComponentMeta<typeof ProfileExpandedModal>;

const Template: ComponentStory<typeof ProfileExpandedModal> = (args) => (
  <ProfileExpandedModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  item: mockData[1],
  onClose: () => null,
};
