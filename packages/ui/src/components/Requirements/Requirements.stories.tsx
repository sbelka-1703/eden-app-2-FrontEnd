import { ComponentMeta, ComponentStory } from "@storybook/react";

import { mockCompanyData } from "./mockData";
import { Requirements } from "./Requirements";

export default {
  title: "Components/Requirements",
  component: Requirements,
  argTypes: {},
} as ComponentMeta<typeof Requirements>;

const Template: ComponentStory<typeof Requirements> = (args) => (
  <Requirements {...args} />
);

const rangeNumbers: number[] = [];

for (let i = 0; i < 1000; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 500) + 1);
}

export const Default = Template.bind({});
Default.args = {
  openModal: true,
  matchesNumber: 29,
  companies: mockCompanyData,
  salaryData: rangeNumbers,
  onPrev: () => {},
  onSubmit: (data: any) => {
    console.log(data);
  },
};
