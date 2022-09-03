import { ComponentMeta, ComponentStory } from "@storybook/react";
import { getProject } from "storybook/mocks";

import { ChampionContainer } from "./ChampionContainer";

export default {
  title: "Containers/ChampionContainer",
  component: ChampionContainer,
  argTypes: {},
} as ComponentMeta<typeof ChampionContainer>;

const Template: ComponentStory<typeof ChampionContainer> = (args) => (
  <ChampionContainer {...args} />
);

export const Default = Template.bind({});
Default.args = { project: getProject() };
