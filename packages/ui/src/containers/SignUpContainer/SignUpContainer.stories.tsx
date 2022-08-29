import { SignUpProvider } from "@context/eden";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SignUpContainer } from "./SignUpContainer";

export default {
  title: "Containers/SignUpContainer",
  component: SignUpContainer,
  argTypes: {},
} as ComponentMeta<typeof SignUpContainer>;

const Template: ComponentStory<typeof SignUpContainer> = (args) => (
  <SignUpProvider>
    <SignUpContainer {...args} />
  </SignUpProvider>
);

export const Default = Template.bind({});
Default.args = {};
