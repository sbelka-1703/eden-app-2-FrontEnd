import { ComponentMeta, ComponentStory } from "@storybook/react";
import { faker } from "@faker-js/faker";

import { EndorsementsCarousel } from "./EndorsementsCarousel";

export default {
  title: "Components/EndorsmentsCarousel",
  component: EndorsementsCarousel,
  argTypes: {},
} as ComponentMeta<typeof EndorsementsCarousel>;

const Template: ComponentStory<typeof EndorsementsCarousel> = (args) => (
  <EndorsementsCarousel {...args} />
);

const getEndorsements = () =>
  Array.from({ length: 10 }, (_, i) => {
    return {
      name: faker.name.firstName(),
      avatarSrc: faker.internet.avatar(),
    };
  });

export const Default = Template.bind({});
Default.args = {
  endorsementList: getEndorsements(),
};
