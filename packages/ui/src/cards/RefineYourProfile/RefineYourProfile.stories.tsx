import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { RefineYourProfile } from "./RefineYourProfile";

export default {
  title: "Cards/RefineYourProfile",
  component: RefineYourProfile,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof RefineYourProfile>;

const Template: ComponentStory<typeof RefineYourProfile> = () => (
  <RefineYourProfile />
);

export const Default = Template.bind({});
Default.args = {};
