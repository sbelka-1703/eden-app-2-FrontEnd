import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Loading } from "./Loading";

export default {
  title: "Elements/Loading",
  component: Loading,
  argTypes: {},
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <div className={"h-screen"}>
    <Loading {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Loading...",
};
