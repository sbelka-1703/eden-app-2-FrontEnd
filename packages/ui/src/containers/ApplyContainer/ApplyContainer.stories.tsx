import { getProject } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ApplyContainer } from "./ApplyContainer";

export default {
  title: "Containers/ApplyContainer",
  component: ApplyContainer,
  argTypes: {},
} as ComponentMeta<typeof ApplyContainer>;

const Template: ComponentStory<typeof ApplyContainer> = (args) => (
  <ApplyContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
};
