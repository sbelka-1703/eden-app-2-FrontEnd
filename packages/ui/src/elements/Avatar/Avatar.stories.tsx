import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Avatar } from "./Avatar";

export default {
  title: "Elements/Avatar",
  component: Avatar,
  argTypes: {},
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "https://cdn.discordapp.com/avatars/908392557258604544/3d834ac5b2ed60c37533ffe2c3c3a2a7.jpg",
  size: "md",
  alt: "avatar",
};
