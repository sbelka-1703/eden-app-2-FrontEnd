import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SocialMediaComp } from "./SocialMediaComp";

export default {
  title: "Components/SocialMediaComp",
  component: SocialMediaComp,
  argTypes: {},
} as ComponentMeta<typeof SocialMediaComp>;

const links = [
  {
    name: "twitter",
    url: "https://twitter.com/",
  },
  {
    name: "github",
    url: "https://github.com/",
  },
  {
    name: "discord",
    url: "https://discord.gg/",
  },
  {
    name: "telegram",
    url: "https://t.me/",
  },
  {
    name: "notion",
    url: "https://notion.so/",
  },
];

const Template: ComponentStory<typeof SocialMediaComp> = (args) => (
  <div className={`w-24`}>
    <SocialMediaComp {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  links,
};
