import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SessionProvider } from "next-auth/react";

import { AppUserLayout } from "./AppUserLayout";

export default {
  title: "Layout/AppUserLayout",
  component: AppUserLayout,
  argTypes: {},
} as ComponentMeta<typeof AppUserLayout>;

const Template: ComponentStory<typeof AppUserLayout> = (args) => (
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
    <AppUserLayout {...args} />
  </SessionProvider>
);

export const Default = Template.bind({});
Default.args = {};
