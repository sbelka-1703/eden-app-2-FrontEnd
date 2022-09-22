/* eslint-disable camelcase */
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ConfettiContainer } from "./ConfettiContainer";

export default {
  title: "Containers/ConfettiContainer",
  component: ConfettiContainer,
  argTypes: {},
} as ComponentMeta<typeof ConfettiContainer>;

const Template: ComponentStory<typeof ConfettiContainer> = (args) => (
  <ConfettiContainer {...args}>
    <div
      className={`text-darkGreen z-50 m-auto justify-center text-center text-4xl font-bold`}
    >
      YOU DID IT!
    </div>
  </ConfettiContainer>
);

export const Default = Template.bind({});
Default.args = {};
