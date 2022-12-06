import {
  // DiscoverContext,
  // DiscoverModal,
  DiscoverProvider,
} from "@eden/package-context";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// import { useContext, useEffect } from "react";
import { DiscoverModalContainer } from "./DiscoverModalContainer";

export default {
  title: "Containers/DiscoverModalContainer",
  component: DiscoverModalContainer,
  argTypes: {},
} as ComponentMeta<typeof DiscoverModalContainer>;

// const Template: ComponentStory<typeof DiscoverModalContainer> = (args) => (
//   <DiscoverModalContainer {...args} />
// );

const Template: ComponentStory<typeof DiscoverModalContainer> = (args) => {
  // const { setOpenModal } = useContext(DiscoverContext);

  // const { project, setOpenModal } = useContext(LaunchProjectContext);
  // const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  // useEffect(() => {
  //   if (!project?.role?.length) {
  //     setOpenModal(LaunchProjectModal.SKILLS_CATEGORY);
  //   }
  // }, []);
  // useEffect(() => {
  //   setOpenModal(DiscoverModal.START_INFO);
  // }, []);

  return (
    <DiscoverProvider>
      <DiscoverModalContainer {...args} />
    </DiscoverProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
