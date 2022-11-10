import { ComponentMeta, ComponentStory } from "@storybook/react";

import { HomeHeroSection } from "./HomeHeroSection";

export default {
  title: "Sections/HomeHeroSection",
  component: HomeHeroSection,
  argTypes: {},
} as ComponentMeta<typeof HomeHeroSection>;

const Template: ComponentStory<typeof HomeHeroSection> = (args) => (
  <HomeHeroSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};
