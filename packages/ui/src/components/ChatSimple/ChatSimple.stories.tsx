import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChatSimple } from "./ChatSimple";

export default {
  title: "Components/ChatSimple",
  component: ChatSimple,
  argTypes: {},
} as ComponentMeta<typeof ChatSimple>;

const Template: ComponentStory<typeof ChatSimple> = (args) => (
  <ChatSimple {...args} />
);

const chatN: any = [
  {
    user: "01",
    message: "Can be verified on any platform using docker",
  },
  {
    user: "01",
    message: "Can be verified on any platform using docker",
  },
  {
    user: "01",
    message: "Can be verified on any platform using docker",
  },
  {
    user: "02",
    message:
      "Your error message says permission denied, npm global installs must be given root privileges.",
  },
  {
    user: "01",
    message: "Command was run with root privileges",
  },
  {
    user: "01",
    message: "update the descrip",
  },
  {
    user: "02",
    message:
      "Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks",
  },
  {
    user: "01",
    message:
      "Thanks for your message David. I thought I'm alone with this issue. Please, ? the issue to support it :)",
  },
  {
    user: "02",
    message: "Are you using sudo?",
  },
  {
    user: "01",
    message:
      "It seems like you are from Mac OS world. There is no /Users/ folder on linux ?",
  },
  {
    user: "01",
    message:
      "It seems like you are from Mac OS world. There is no /Users/ folder on linux ?",
  },
];

export const Default = Template.bind({});
Default.args = {
  chatN: chatN,
  // setChatN: undefined,
};
