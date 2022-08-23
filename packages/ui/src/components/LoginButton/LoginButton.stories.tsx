import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LoginButton } from "./LoginButton";

export default {
  title: "Components/LoginButton",
  component: LoginButton,
  argTypes: {},
} as ComponentMeta<typeof LoginButton>;

const Template: ComponentStory<typeof LoginButton> = () => {
  return <LoginButton />;
};

export const Default = Template.bind({});
