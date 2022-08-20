import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CollectionOfUsers } from "./CollectionOfUsers";

export default {
  title: "Components/CollectionOfUsers",
  component: CollectionOfUsers,
  argTypes: {},
} as ComponentMeta<typeof CollectionOfUsers>;

const Template: ComponentStory<typeof CollectionOfUsers> = (args) => (
  <CollectionOfUsers {...args} />
);

const getUsers = () =>
  Array.from({ length: 6 }, (_, i) => {
    return {
      title: faker.name.fullName(),
      name: faker.internet.userName(),
      avatar: faker.internet.avatar(),
    };
  });

export const Default = Template.bind({});
Default.args = {
  title: "title here",
  users: getUsers(),
};
