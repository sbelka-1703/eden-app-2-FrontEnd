import { ComponentMeta, ComponentStory } from "@storybook/react";

// import { SessionProvider } from "next-auth/react";
import { AdminLayout } from "./AdminLayout";

export default {
  title: "Layout/AdminLayout",
  component: AdminLayout,
  argTypes: {},
} as ComponentMeta<typeof AdminLayout>;

const Template: ComponentStory<typeof AdminLayout> = (args) => (
  <AdminLayout {...args} />
);

export const Default = Template.bind({});
Default.args = {};
