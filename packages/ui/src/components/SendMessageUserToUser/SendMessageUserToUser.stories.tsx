import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SendMessageUserToUser } from "./SendMessageUserToUser";

export default {
  title: "Components/SendMessageUserToUser",
  component: SendMessageUserToUser,
  argTypes: {},
} as ComponentMeta<typeof SendMessageUserToUser>;

const Template: ComponentStory<typeof SendMessageUserToUser> = (args) => {
  return <SendMessageUserToUser {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
};
