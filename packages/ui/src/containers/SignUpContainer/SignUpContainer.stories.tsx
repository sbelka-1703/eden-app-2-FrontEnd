import { SignUpProvider } from "@context/eden";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CurrentUserDecorator } from "storybook/.storybook/decorator";

import { SignUpContainer } from "./SignUpContainer";

export default {
  title: "Containers/SignUpContainer",
  component: SignUpContainer,
  argTypes: {},
  decorators: [CurrentUserDecorator],
} as ComponentMeta<typeof SignUpContainer>;

const Template: ComponentStory<typeof SignUpContainer> = (args) => (
  <SignUpProvider>
    <SignUpContainer {...args} />
  </SignUpProvider>
);

export const Default = Template.bind({});
Default.args = {};
