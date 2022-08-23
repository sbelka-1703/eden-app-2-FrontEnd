import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SessionProvider } from "next-auth/react";

import { LoginButton } from "./LoginButton";

export default {
  title: "Components/LoginButton",
  component: LoginButton,
  argTypes: {},
} as ComponentMeta<typeof LoginButton>;

const Template: ComponentStory<typeof LoginButton> = () => {
  return (
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
      <LoginButton />
    </SessionProvider>
  );
};

const NotLoggedIn: ComponentStory<typeof LoginButton> = () => {
  return (
    <SessionProvider session={null}>
      <LoginButton />
    </SessionProvider>
  );
};

export const Default = Template.bind({});
export const NotLogged = NotLoggedIn.bind({});
