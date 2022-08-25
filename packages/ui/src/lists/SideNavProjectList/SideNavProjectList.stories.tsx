import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SideNavProjectList } from "./SideNavProjectList";

export default {
  title: "Lists/SideNavProjectList",
  component: SideNavProjectList,
  argTypes: {},
} as ComponentMeta<typeof SideNavProjectList>;

const getProjects = () =>
  Array.from({ length: 6 }, () => {
    return {
      info: {
        title: faker.company.name(),
        description: faker.company.catchPhrase(),
      },
      avatar: faker.internet.avatar(),
      __typename: "Project",
      title: faker.company.name(),
      description: faker.company.catchPhrase(),
    };
  });

const Template: ComponentStory<typeof SideNavProjectList> = (args) => (
  <SideNavProjectList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  // @ts-ignore
  projects: getProjects(),
};
