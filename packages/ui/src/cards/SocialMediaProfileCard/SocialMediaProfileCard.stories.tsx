import { ComponentMeta, ComponentStory } from "@storybook/react";
import { findRoleTemplates } from "storybook/mocks";

import { SocialMediaProfileCard } from "./SocialMediaProfileCard";

export default {
  title: "Cards/SocialMediaProfileCard",
  component: SocialMediaProfileCard,
  argTypes: {},
} as ComponentMeta<typeof SocialMediaProfileCard>;

const Template: ComponentStory<typeof SocialMediaProfileCard> = (args) => (
  <SocialMediaProfileCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  showModal: true,
};
