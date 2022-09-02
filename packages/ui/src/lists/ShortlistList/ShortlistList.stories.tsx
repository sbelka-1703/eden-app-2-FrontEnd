import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getMember } from "storybook/mocks";

import { ShortlistList } from "./ShortlistList";

export default {
  title: "Lists/ShortlistList",
  component: ShortlistList,
  argTypes: {},
  // decorators: [ApolloDecorator],
} as ComponentMeta<typeof ShortlistList>;

const Template: ComponentStory<typeof ShortlistList> = (args) => (
  <div className={``}>
    <ShortlistList {...args} />
  </div>
);

const getCandidates = () =>
  Array.from({ length: 6 }, () => {
    return {
      matchPercentage: faker.random.numeric(2),
      memberInfo: getMember(),
    };
  });

const randomCandidates = getCandidates();

const members = [...randomCandidates];

export const Default = Template.bind({});
Default.args = {
  project: {
    title: "Fake",
    team: members,
  },
};
