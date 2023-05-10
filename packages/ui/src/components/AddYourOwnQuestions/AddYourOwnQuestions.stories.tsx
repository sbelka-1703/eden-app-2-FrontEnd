import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AddYourOwnQuestions } from "./AddYourOwnQuestions";

export default {
  title: "Components/AddYourOwnQuestions",
  component: AddYourOwnQuestions,
  argTypes: {},
} as ComponentMeta<typeof AddYourOwnQuestions>;

const Template: ComponentStory<typeof AddYourOwnQuestions> = (args) => (
  <AddYourOwnQuestions {...args} />
);

const placeholderQuestions: string[] = [
  "Why do you want to pursue a career in Eden?",
  "Do you prefer to work on the team or alone?",
];

const onEnter = (question: string, idx: number, setNewQuestionActive: any) => {
  console.log(`firing onEnter with question = ${question} and idx = ${idx}`);
  if (idx == placeholderQuestions.length) setNewQuestionActive(false);
  if (question != "" && idx == placeholderQuestions.length) {
    console.log("pushing question...");
    placeholderQuestions.push(question);
  } else if (question != "" && idx < placeholderQuestions.length)
    placeholderQuestions.splice(idx, idx, question);
  else {
    placeholderQuestions.splice(idx, 1);
    console.log(placeholderQuestions);
  }
};

export const Default = Template.bind({});
Default.args = {
  questions: placeholderQuestions,
  onEnter: onEnter,
};
