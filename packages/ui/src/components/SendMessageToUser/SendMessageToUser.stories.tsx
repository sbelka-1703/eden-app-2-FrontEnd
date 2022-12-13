import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SendMessageToUser } from "./SendMessageToUser";

export default {
  title: "Components/SendMessageToUser",
  component: SendMessageToUser,
  argTypes: {},
} as ComponentMeta<typeof SendMessageToUser>;

const Template: ComponentStory<typeof SendMessageToUser> = (args) => {
  return <SendMessageToUser {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
};
