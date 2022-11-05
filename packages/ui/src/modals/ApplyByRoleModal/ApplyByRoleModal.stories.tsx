import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { ApplyByRoleModal } from "./ApplyByRoleModal";

export default {
  title: "Modals/ApplyByRoleModal",
  component: ApplyByRoleModal,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof ApplyByRoleModal>;

const Template: ComponentStory<typeof ApplyByRoleModal> = (args) => (
  <ApplyByRoleModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isModalOpen: true,
};
