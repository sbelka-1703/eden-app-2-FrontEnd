import { AiOutlineCheck } from "react-icons/ai";
import {
  BioComponent,
  Button,
  //   SkillsCard,
  SkillSelector,
  SocialMediaComp,
  TabsSelector,
  UserInformationCard,
} from "ui";

export interface ProfileContainerProps {}

export const ProfileContainer = ({}: ProfileContainerProps) => {
  const tabs = ["Edit Profile"];

  return (
    <div className="rounded-xl">
      <TabsSelector tabs={tabs} onSelect={(val) => console.log(val)} />
      <div className="border-accentColor h-8/10 overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        <div className={`my-4 flex justify-between p-4`}>
          <div className={`w-3/4 text-sm text-zinc-500 md:w-1/2`}>
            please note, you cannont change your pfp and user name as those are
            fetched from your discord profile.
          </div>
          <div className={``}>
            <Button>
              <AiOutlineCheck className={`my-auto mr-2`} />
              Finish Editing
            </Button>
          </div>
        </div>
        <div className={`grid grid-cols-12 space-x-4 p-4`}>
          <div className={`col-span-8`}>
            <BioComponent title={`Short Bio`} isEditable />
            <div className={`my-4 grid grid-cols-12 space-x-4`}>
              <div className={`col-span-9 space-y-4`}>
                <UserInformationCard isEditable />
                <UserInformationCard isEditable />
              </div>
              <div className={`col-span-3`}>
                <SocialMediaComp />
              </div>
            </div>
            <div className={`my-4 grid grid-cols-12 space-x-4`}>
              <div className={`col-span-6`}>
                <BioComponent isEditable />
              </div>
              <div className={`col-span-6`}>
                <BioComponent isEditable />
              </div>
            </div>
          </div>
          <div className={`col-span-4`}>
            <SkillSelector showSelected />
            {/* <SkillsCard shadow /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
