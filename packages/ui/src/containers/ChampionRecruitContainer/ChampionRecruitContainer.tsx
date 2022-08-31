import { gql, useMutation } from "@apollo/client";
import { Members, Project } from "@graphql/eden/generated";
import { useState } from "react";
import {
  AvailabilityComp,
  BioComponent,
  Button,
  EndorsementsCarousel,
  // Loading,
  SkillsCard,
  SocialMediaComp,
  TabsSelector,
  UserInformationCard,
  UserWithDescription,
} from "ui";

const SET_APPLY_TO_PROJECT = gql`
  mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
    changeTeamMember_Phase_Project(fields: $fields) {
      _id
    }
  }
`;

const tabs = ["General", "Background", "Endorsements"];

export interface ChampionRecruitContainerProps {
  project?: Project;
  member?: Members;
}

export const ChampionRecruitContainer = ({
  project,
  member,
}: ChampionRecruitContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // if (project) console.log("project", project);

  // eslint-disable-next-line camelcase
  const [changeTeamMember_Phase_Project, {}] = useMutation(
    SET_APPLY_TO_PROJECT,
    {
      onCompleted: () => {
        console.log("onCompleted");
        setSubmitting(false);
      },
      onError: (error) => {
        console.log("onError", error);
      },
    }
  );

  // if (member) console.log("member", member);
  if (!member)
    return (
      <div className="rounded-xl">
        <TabsSelector tabs={tabs} onSelect={(val) => setActiveTab(val)} />
        <div className="border-accentColor h-8/10 scrollbar-hide overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
          select member please
        </div>
      </div>
    );

  return (
    <div className="rounded-xl">
      <TabsSelector tabs={tabs} onSelect={(val) => setActiveTab(val)} />
      <div className="border-accentColor h-8/10 scrollbar-hide overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4">
        <div className={`pt-6`}>
          <div className={`flex justify-between`}>
            <div className={`mt-2`}>
              <Button
                disabled={submitting}
                onClick={() => {
                  changeTeamMember_Phase_Project({
                    variables: {
                      fields: {
                        projectID: project?._id,
                        memberID: member?._id,
                        phase: "rejected",
                      },
                    },
                  });
                }}
              >
                NOT RIGHT NOW
              </Button>
            </div>
            <UserWithDescription
              avatarSrc={member.discordAvatar || ""}
              title={`@${member.discordName}`}
              name={`title here`}
            />
            <div className={`mt-2`}>
              <Button
                disabled={submitting}
                onClick={() => {
                  changeTeamMember_Phase_Project({
                    variables: {
                      fields: {
                        projectID: project?._id,
                        memberID: member?._id,
                        phase: "shortlisted",
                      },
                    },
                  });
                }}
              >
                SHORTLIST
              </Button>
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
