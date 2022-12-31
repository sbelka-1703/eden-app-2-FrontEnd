import { getNodesTypeMockArray } from "@eden/package-mock";
import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NodeList } from "./NodeList";

export default {
  title: "Lists/NodeList",
  component: NodeList,
  argTypes: {},
} as ComponentMeta<typeof NodeList>;

const Template: ComponentStory<typeof NodeList> = (args) => (
  <NodeList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  colorRGB: "215,215,255",
  nodes: getNodesTypeMockArray(
    faker.datatype.number({ min: 5, max: 14, precision: 1 })
  ),
  closeButton: true,
  // eslint-disable-next-line no-empty-function
  handleDeleteNode: () => {},
  overflowNumber: 6,
  label: "Nodes Label",
};
