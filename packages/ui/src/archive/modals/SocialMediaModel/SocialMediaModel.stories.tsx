// import { findRoleTemplates } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SocialMediaModel } from "./SocialMediaModel";

export default {
  title: "Archive/Modals/SocialMediaModel",
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
