import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { SendMessageToUser } from "./SendMessageToUser";

export default {
  title: "Components/SendMessageToUser",
  component: SendMessageToUser,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof SendMessageToUser>;

const Template: ComponentStory<typeof SendMessageToUser> = (args) => {
  return <SendMessageToUser {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  member: getMember(),
};
