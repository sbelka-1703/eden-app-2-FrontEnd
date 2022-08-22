import { ComponentMeta, ComponentStory } from "@storybook/react";
import {MdPeopleAlt} from "react-icons/md";
import { MenuItem } from "./MenuItem";

export default {
  title: "Elements/MenuItem",
  component: MenuItem,
  argTypes: {},
} as ComponentMeta<typeof MenuItem>;

const Template: ComponentStory<typeof MenuItem> = (args) => <MenuItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  Icon: <MdPeopleAlt size={25}/>,
  FunctionName: "Find Projects",
  counterBadge: 3,
};
