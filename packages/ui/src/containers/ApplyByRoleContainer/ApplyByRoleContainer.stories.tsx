// import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getProject } from "storybook/mocks";

import { ApplyByRoleContainer } from "./ApplyByRoleContainer";

export default {
  title: "Containers/ApplyByRoleContainer",
  component: ApplyByRoleContainer,
  argTypes: {},
} as ComponentMeta<typeof ApplyByRoleContainer>;

const Template: ComponentStory<typeof ApplyByRoleContainer> = (args) => (
  <ApplyByRoleContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  project: getProject(),
  //   project: {
  //     title: faker.company.name(),
  //     description: faker.company.catchPhrase(),
  //   },
};
