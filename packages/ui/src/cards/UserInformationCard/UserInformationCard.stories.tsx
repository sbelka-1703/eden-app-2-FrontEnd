import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { UserInformationCard } from "./UserInformationCard";

export default {
  title: "Cards/UserInformationCard",
  component: UserInformationCard,
  argTypes: {},
} as ComponentMeta<typeof UserInformationCard>;

const Template: ComponentStory<typeof UserInformationCard> = (args) => (
  <UserInformationCard {...args} />
);

const previousProjects = {
  title: "Sabre Corporation · Fulltime",
  positionName: "SCRUM MASTER",
  description: faker.lorem.paragraph(),
  link: "https://www.google.com",
  startDate: "Oct 2019",
  endDate: "present",
  picture: faker.image.image(),
};

export const Default = Template.bind({});
Default.args = {
  previousProjects,
  isEditable: true,
};
