import { ComponentMeta, ComponentStory } from "@storybook/react";

import { GreyTextQuestions } from "./GreyTextQuestions";

export default {
  title: "Components/GreyTextQuestions",
  component: GreyTextQuestions,
  argTypes: {},
} as ComponentMeta<typeof GreyTextQuestions>;

const Template: ComponentStory<typeof GreyTextQuestions> = (args) => (
  <GreyTextQuestions {...args} />
);

const placeholderQuestions: string[] = [
  "What are your strongest skills as a developer?",
  "Do you have experience working as a developer?",
  "What other skills do you have that will help you in the role of a developer?",
  "Do you prefer to work in big corporations or in a startup?",
  "What motivates you to grow as a developer?",
];

export const Default = Template.bind({});
Default.args = {
  questions: placeholderQuestions,
};
