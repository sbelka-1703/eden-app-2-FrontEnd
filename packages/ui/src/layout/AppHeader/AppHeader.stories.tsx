import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SessionProvider } from "next-auth/react";

import { AppHeader } from "./AppHeader";

export default {
  title: "Layout/AppHeader",
  component: AppHeader,
  argTypes: {},
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <SessionProvider
    session={{
      expires: "1",
      user: {
        email: "a",
        name: "Miral",
        image:
          "https://pbs.twimg.com/profile_images/1513838045589430277/4Pxad6DL_400x400.jpg",
      },
    }}
  >
    <AppHeader {...args} />
  </SessionProvider>
);

export const Default = Template.bind({});
Default.args = {};
