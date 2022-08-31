import { Members } from "@graphql/eden/generated";
import { useState } from "react";
import {
  AvailabilityComp,
  BioComponent,
  Button,
  EndorsementsCarousel,
  SkillsCard,
  SocialMediaComp,
  TabsSelector,
  UserInformationCard,
  UserWithDescription,
} from "ui";

const tabs = ["General", "Background", "Endorsements"];

export interface ChampionRecruitContainerProps {
  member?: Members;
}

export const ChampionRecruitContainer = ({
  member,
}: ChampionRecruitContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  if (member) console.log("member", member);
  if (!member)
    return (
      <div className="rounded-xl">
        <TabsSelector tabs={tabs} onSelect={(val) => setActiveTab(val)} />
        <div className="border-accentColor h-8/10 overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
          select member please
        </div>
      </div>
    );

  return (
    <div className="rounded-xl">
      <TabsSelector tabs={tabs} onSelect={(val) => setActiveTab(val)} />
      <div className="border-accentColor h-8/10 overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        <div className={`pt-6`}>
          <div className={`flex justify-between`}>
            <div className={`mt-2`}>
              <Button>NOT RIGHT NOW</Button>
            </div>
            <UserWithDescription
              avatarSrc={member.discordAvatar || ""}
              title={`@${member.discordName}`}
              name={`title here`}
            />
            <div className={`mt-2`}>
              <Button>SHORTLIST</Button>
            </div>
          </div>
        </div>

        {activeTab === 0 && (
          <div className={`pt-6`}>
            <div className={`grid grid-cols-12 space-x-4 pt-4`}>
              <div className={`col-span-8`}>
                <BioComponent
                  title={`SHORT BIO`}
                  description={member.bio || ""}
                />
              </div>
              <div className={`col-span-4`}>
                <div className={`font-Inter text-sm`}>Match</div>
                <div
                  className={`text-soilPurple font-poppins text-5xl font-semibold`}
                >
                  %
                </div>
              </div>
            </div>
            <div className={`my-4 grid grid-cols-12`}>
              <div className={`col-span-4`}>
                {member.skills && <SkillsCard skills={member.skills} />}
              </div>
              <div className={`col-span-4`}>
                <SocialMediaComp />
              </div>
              <div className={`col-span-4`}>
                <AvailabilityComp timePerWeek={member.hoursPerWeek || 0} />
              </div>
            </div>
            <div>graph</div>
          </div>
        )}
        {activeTab === 1 && (
          <div className={`mt-4 grid grid-cols-12 space-x-4`}>
            <div className={`col-span-6 space-y-4`}>
              <UserInformationCard />
              <UserInformationCard />
              <BioComponent
                title={`What project are you most proud of?`}
                description={member.content?.mostProud || ""}
              />
            </div>
            <div className={`col-span-6 space-y-4`}>
              <UserInformationCard />
              <UserInformationCard />
              <BioComponent
                title={`What piece of work really showcases your abilities?`}
                description={member.content?.showCaseAbility || ""}
              />
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <EndorsementsCarousel />
          </div>
        )}
      </div>
    </div>
  );
};
