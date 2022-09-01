import { faker } from "@faker-js/faker";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProjectInfo } from "./ProjectInfo";

export default {
  title: "Components/ProjectInfo",
  component: ProjectInfo,
  argTypes: {},
} as ComponentMeta<typeof ProjectInfo>;

const Template: ComponentStory<typeof ProjectInfo> = (args) => (
  <ProjectInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  avatarSrc: faker.internet.avatar(),
  projectTitle: "Eden 🌱 Talent Coordination App",
  projectSubTitle: "Find and be found for opportunities across the DAO",
  projectDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit nisi viverra, suscipit leo eu, dictum erat. Nulla scelerisque sagittis risus id rhoncus. Etiam eros nulla, tempus et augue sit amet, tempus imperdiet orci. Pellentesque volutpat tristique pulvinar. Nam ac dignissim felis. Aliquam vehicula sit amet tortor sed lacinia. Aliquam erat volutpat. Suspendisse dictum ami vel ultrices. Duis ac rutrum dolor. Etiam ut rutrum eros, sed varius enim. Proin iaculis posuere porttitor. Nullam at purus eleifend, ultricies nulla ac, tincidunt metus."
};
