import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ReportBugButton } from "./ReportBugButton";

export default {
  title: "Components/ReportBugButton",
  component: ReportBugButton,
  argTypes: {},
} as ComponentMeta<typeof ReportBugButton>;

const Template: ComponentStory<typeof ReportBugButton> = () => {
  return <ReportBugButton />;
};

export const Default = Template.bind({});
