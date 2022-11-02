// import { faker } from "@faker-js/faker";
import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EndorsementCard } from "./EndorsementCard";

export default {
  title: "Cards/EndorsementCard",
  component: EndorsementCard,
  argTypes: {},
} as ComponentMeta<typeof EndorsementCard>;

const Template: ComponentStory<typeof EndorsementCard> = (args) => (
  <EndorsementCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  member: getMember(),
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
};
