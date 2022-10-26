import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SessionProvider } from "next-auth/react";

import { AppUserMenuLayout } from "./AppUserMenuLayout";

export default {
  title: "Layout/AppUserMenuLayout",
  component: AppUserMenuLayout,
  argTypes: {},
} as ComponentMeta<typeof AppUserMenuLayout>;

const Template: ComponentStory<typeof AppUserMenuLayout> = (args) => (
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
    <AppUserMenuLayout {...args} />
  </SessionProvider>
);

export const Default = Template.bind({});
Default.args = {
  recommnededSidebar: true,
};
