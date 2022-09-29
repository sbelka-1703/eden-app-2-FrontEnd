import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RoleDescriptionModal } from "./RoleDescriptionModal";

export default {
  title: "Modals/RoleDescriptionModal",
  component: RoleDescriptionModal,
  argTypes: {},
} as ComponentMeta<typeof RoleDescriptionModal>;

const Template: ComponentStory<typeof RoleDescriptionModal> = (args) => (
  <RoleDescriptionModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
  roles: [
    {
      _id: 1,
      title: "Solidity Engineer",
    },
    {
      _id: 2,
      title: "Designer",
    },
    {
      _id: 3,
      title: "Forntend",
    },
    {
      _id: 4,
      title: "Backend",
    },
  ],
};
