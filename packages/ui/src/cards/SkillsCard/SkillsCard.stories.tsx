import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SkillsCard } from "./SkillsCard";

export default {
  title: "Cards/SkillsCard",
  component: SkillsCard,
  argTypes: { onSelect: { action: "selected" } },
} as ComponentMeta<typeof SkillsCard>;

const Template: ComponentStory<typeof SkillsCard> = (args) => (
  <SkillsCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  skills: [
    { text: "Design", colorRGB: "38, 138, 2", closeButton: true },
    { text: "Figma", colorRGB: "214, 92, 158", closeButton: true },
    { text: "FrontEnd", colorRGB: "101, 125, 248", closeButton: true },
    { text: "Art", colorRGB: "236, 240, 71", closeButton: true },
    { text: "Design", colorRGB: "38, 138, 2", closeButton: true },
    { text: "Figma", colorRGB: "214, 92, 158", closeButton: true },
    { text: "FrontEnd", colorRGB: "101, 125, 248", closeButton: true },
    { text: "Art", colorRGB: "236, 240, 71", closeButton: true },
    { text: "Design", colorRGB: "38, 138, 2", closeButton: true },
    { text: "Figma", colorRGB: "214, 92, 158", closeButton: true },
    { text: "FrontEnd", colorRGB: "101, 125, 248", closeButton: true },
    { text: "Art", colorRGB: "236, 240, 71", closeButton: true },
  ],
  shadow: true,
};
