import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getProject } from "storybook/mocks";

import { ReadMore } from "./ReadMore";

export default {
  title: "Components/ReadMore",
  component: ReadMore,
  argTypes: {},
} as ComponentMeta<typeof ReadMore>;

const Template: ComponentStory<typeof ReadMore> = (args) => (
  <ReadMore {...args} />
);

export const Default = Template.bind({});
Default.args = {
  description: "Find and be found for opportunities across the DAO",
};
