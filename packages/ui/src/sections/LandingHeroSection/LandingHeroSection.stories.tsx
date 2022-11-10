import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LandingHeroSection } from "./LandingHeroSection";
import landingLogo from "./landingLogo.png";

export default {
  title: "Sections/LandingHeroSection",
  component: LandingHeroSection,
  argTypes: {},
} as ComponentMeta<typeof LandingHeroSection>;

const Template: ComponentStory<typeof LandingHeroSection> = (args) => (
  <LandingHeroSection {...args} />
);

export const Default = Template.bind({});
Default.args = {
  image: landingLogo,
};
