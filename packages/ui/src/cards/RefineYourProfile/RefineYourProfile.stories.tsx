import { ComponentMeta, ComponentStory } from "@storybook/react";

import { RefineYourProfile } from "./RefineYourProfile";

export default {
  title: "Cards/RefineYourProfile",
  component: RefineYourProfile,
  argTypes: {},
} as ComponentMeta<typeof RefineYourProfile>;

const Template: ComponentStory<typeof RefineYourProfile> = () => (
  <RefineYourProfile />
);

export const Default = Template.bind({});
Default.args = {};
