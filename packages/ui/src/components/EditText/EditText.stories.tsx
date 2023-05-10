import { ComponentMeta, ComponentStory } from "@storybook/react";

import { EditText } from "./EditText";

export default {
  title: "Components/EditText",
  component: EditText,
  argTypes: {},
} as ComponentMeta<typeof EditText>;

const Template: ComponentStory<typeof EditText> = (args) => (
  <EditText {...args} />
);

const placeholderQuestions: string[] = [
  "Why do you want to pursue a career in Eden?",
  "Do you prefer to work on the team or alone?",
];

const onEnter = (question: string, idx: number) => {
  if (question != "") placeholderQuestions.push(question);
  else placeholderQuestions.splice(idx, 1);
};

export const Default = Template.bind({});
Default.args = {
  text: "",
  idx: placeholderQuestions.length,
  questions: placeholderQuestions, // for troubleshoot only
  onEnter: onEnter,
};
