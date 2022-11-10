import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LoginSection } from "./LoginSection";
import wave from "./wave.gif";

export default {
  title: "Sections/LoginSection",
  component: LoginSection,
  argTypes: {},
} as ComponentMeta<typeof LoginSection>;

const Template: ComponentStory<typeof LoginSection> = (args) => (
  <LoginSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  image: wave,
};
