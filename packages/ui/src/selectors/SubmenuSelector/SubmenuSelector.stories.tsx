import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";

import { SubmenuSelector } from "./SubmenuSelector";

export default {
  title: "Selector/SubmenuSelector",
  component: SubmenuSelector,
  argTypes: {},
} as ComponentMeta<typeof SubmenuSelector>;

const Template: ComponentStory<typeof SubmenuSelector> = (args) => (
  <SubmenuSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Good Morning,",
  submenu: [
    {
      Icon: <FaUserAlt size={20} />,
      FunctionName: "My Profile",
      onFunctionCallback: () => console.log("callback - My Profile"),
    },
    {
      Icon: <FaUserEdit size={25} />,
      FunctionName: "Edit Profile",
      onFunctionCallback: () => console.log("callback - Edit Profile"),
    },
  ],
};
