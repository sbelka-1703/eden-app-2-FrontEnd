// import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SocialMediaInput } from "./SocialMediaInput";

export default {
  title: "Components/SocialMediaInput",
  component: SocialMediaInput,
  argTypes: {},
} as ComponentMeta<typeof SocialMediaInput>;

const Template: ComponentStory<typeof SocialMediaInput> = (args) => (
  <SocialMediaInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  platform: "twitter",
  placeholder: "twitter handle",
};
