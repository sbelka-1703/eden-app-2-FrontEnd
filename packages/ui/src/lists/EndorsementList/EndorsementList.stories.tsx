import { getMember } from "@eden/package-mock";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EndorsementList } from "./EndorsementList";

export default {
  title: "Lists/EndorsementList",
  component: EndorsementList,
  argTypes: {},
} as ComponentMeta<typeof EndorsementList>;

const Template: ComponentStory<typeof EndorsementList> = (args) => (
  <EndorsementList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  endorsements: [
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 1,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 3,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
    {
      member: getMember(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima totam nihil consequuntur eius accusamus error similique molestias! Facilis, aspernatur cumque? Totam saepe dolorum harum commodi exercitationem natus in atque iusto!",
      level: 2,
    },
  ],
};
