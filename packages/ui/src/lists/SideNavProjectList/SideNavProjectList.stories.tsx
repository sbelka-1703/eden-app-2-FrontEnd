import { faker } from "@faker-js/faker";
import { Maybe, ProjectMemberType } from "@graphql/eden/generated";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SideNavProjectList } from "./SideNavProjectList";

// import { getProject } from "storybook/mocks";

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
      champion: true,
    };
  });

const Template: ComponentStory<typeof SideNavProjectList> = (args) => (
  <SideNavProjectList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  projects: getProjects() as Maybe<Array<Maybe<ProjectMemberType>>>,
};
