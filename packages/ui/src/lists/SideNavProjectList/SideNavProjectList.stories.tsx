import { Maybe, ProjectMemberType } from "@eden/package-graphql/generated";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getProject } from "@eden/package-mock";

import { SideNavProjectList } from "./SideNavProjectList";

export default {
  title: "Lists/SideNavProjectList",
  component: SideNavProjectList,
  argTypes: {},
} as ComponentMeta<typeof SideNavProjectList>;

const getProjects = () =>
  Array.from({ length: 6 }, () => {
    return {
      info: getProject(),
      avatar: faker.internet.avatar(),
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
