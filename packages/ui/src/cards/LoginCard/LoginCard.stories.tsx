import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LoginCard } from "./LoginCard";

export default {
  title: "Cards/LoginCard",
  component: LoginCard,
  argTypes: {},
} as ComponentMeta<typeof LoginCard>;

const Template: ComponentStory<typeof LoginCard> = (args) => (
  <LoginCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};
