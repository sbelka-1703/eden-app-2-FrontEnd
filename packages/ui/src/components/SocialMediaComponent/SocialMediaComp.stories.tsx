import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SocialMediaComp } from "./SocialMediaComp";

export default {
  title: "Components/SocialMediaComp",
  component: SocialMediaComp,
  argTypes: {},
} as ComponentMeta<typeof SocialMediaComp>;

const Template: ComponentStory<typeof SocialMediaComp> = (args) => (
  <SocialMediaComp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  twitterHandle: "edenprotocolxyz",
  linkedInHandle: "",
  discordHandle: "",
  gitHubHandle: "",
};
