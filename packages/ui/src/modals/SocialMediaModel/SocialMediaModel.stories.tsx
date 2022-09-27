import { ComponentMeta, ComponentStory } from "@storybook/react";
import { findRoleTemplates } from "storybook/mocks";

import { SocialMediaModel } from "./SocialMediaModel";

export default {
  title: "Modals/SocialMediaModel",
  component: SocialMediaModel,
  argTypes: {},
} as ComponentMeta<typeof SocialMediaModel>;

const Template: ComponentStory<typeof SocialMediaModel> = (args) => (
  <SocialMediaModel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  showModal: true,
};
