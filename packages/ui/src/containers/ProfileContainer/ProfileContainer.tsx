import { UserContext } from "@context/eden";
import { useContext } from "react";
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
  const { currentUser } = useContext(UserContext);

  // console.log("currentUser", currentUser);
  const tabs = ["Edit Profile"];

  if (!currentUser) return <div>you are not logged in</div>;

  return (
    <div className="rounded-xl">
      <TabsSelector tabs={tabs} onSelect={(val) => console.log(val)} />
      <div className="border-accentColor h-8/10 scrollbar-hide overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
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
            <BioComponent
              title={`Short Bio`}
              description={currentUser?.bio || ""}
              isEditable
            />
            <div className={`my-4 grid grid-cols-12 space-x-4`}>
              <div className={`col-span-9 space-y-4`}>
                {currentUser.previusProjects?.map((project, index) => (
                  <div key={index} className={``}>
                    <UserInformationCard previousProjects={project} />
                  </div>
                ))}
              </div>
              <div className={`col-span-3`}>
                <SocialMediaComp links={currentUser.links} />
              </div>
            </div>
            <div className={`my-4 grid grid-cols-12 space-x-4`}>
              <div className={`col-span-6`}>
                <BioComponent
                  title={`What project are you most proud of?`}
                  description={currentUser.content?.mostProud || ""}
                  isEditable
                />
              </div>
              <div className={`col-span-6`}>
                <BioComponent
                  title={`What piece of work really showcases your abilities?`}
                  description={currentUser.content?.showCaseAbility || ""}
                  isEditable
                />
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
