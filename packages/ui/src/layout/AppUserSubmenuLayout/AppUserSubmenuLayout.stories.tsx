import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SessionProvider } from "next-auth/react";

import { AppUserSubmenuLayout } from "./AppUserSubmenuLayout";

export default {
  title: "Layout/AppUserSubmenuLayout",
  component: AppUserSubmenuLayout,
  argTypes: {},
} as ComponentMeta<typeof AppUserSubmenuLayout>;

const Template: ComponentStory<typeof AppUserSubmenuLayout> = (args) => (
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
    <AppUserSubmenuLayout {...args} />
  </SessionProvider>
);

export const Default = Template.bind({});
Default.args = {};
