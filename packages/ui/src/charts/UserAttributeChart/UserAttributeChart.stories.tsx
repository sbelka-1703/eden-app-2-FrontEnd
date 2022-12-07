import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockCompanyData } from "./mockData";
import { UserAttributeChart } from "./UserAttributeChart";

export default {
  title: "Charts/UserAttributeChart",
  component: UserAttributeChart,
  argTypes: {},
} as ComponentMeta<typeof UserAttributeChart>;

const Template: ComponentStory<typeof UserAttributeChart> = (args) => (
  <div className="m-auto max-w-2xl p-8">
    <UserAttributeChart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  companies: mockCompanyData,
};
