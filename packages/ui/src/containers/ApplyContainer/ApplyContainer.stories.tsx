import { faker } from "@faker-js/faker";
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
  project: {
    title: faker.company.name(),
    description: faker.company.catchPhrase(),
  },
};
