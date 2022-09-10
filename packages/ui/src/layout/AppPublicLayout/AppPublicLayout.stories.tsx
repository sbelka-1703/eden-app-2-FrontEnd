import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SessionProvider } from "next-auth/react";

import { AppPublicLayout } from "./AppPublicLayout";

export default {
  title: "Layout/AppPublicLayout",
  component: AppPublicLayout,
  argTypes: {},
} as ComponentMeta<typeof AppPublicLayout>;

const Template: ComponentStory<typeof AppPublicLayout> = (args) => (
  <SessionProvider
    session={{
      expires: "1",
      user: {
        id: "1",
        email: "a",
        name: "Miral",
        image:
          "https://pbs.twimg.com/profile_images/1513838045589430277/4Pxad6DL_400x400.jpg",
      },
    }}
  >
    <AppPublicLayout {...args} />
  </SessionProvider>
);

export const Default = Template.bind({});
Default.args = {};
