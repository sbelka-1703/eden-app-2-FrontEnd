import { gql, useMutation } from "@apollo/client";
import { Members, Project, TeamType } from "@graphql/eden/generated";
import { useEffect, useState } from "react";
import {
  AvailabilityComp,
  BioComponent,
  Button,
  EndorsementsCarousel,
  // Loading,
  SkillsCard,
  SocialMediaComp,
  TabsSelector,
  // TeamAttributeChart,
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

// const tabs = ["General", "Background", "Endorsements"];
// TODO: disabled Endorsements tab until data on backend is ready
const tabs = ["General", "Background"];

export interface ChampionRecruitContainerProps {
  project?: Project;
  member?: Members;
  refetchMember?: () => void;
  refetchProject?: () => void;
}

export const ChampionRecruitContainer = ({
  project,
  member,
  refetchMember,
  refetchProject,
}: ChampionRecruitContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [teamMember, setTeamMember] = useState<TeamType | null>(null);

  useEffect(() => {
    if (project) {
      const memberInTeam = project?.team?.find(
        (teamMember: any) => teamMember?.memberInfo._id === member?._id
      );

      if (memberInTeam) {
        setTeamMember(memberInTeam);
      } else {
        setTeamMember(null);
      }
    }
  }, [project, member]);

  // eslint-disable-next-line camelcase
  const [changeTeamMember_Phase_Project, {}] = useMutation(
    SET_APPLY_TO_PROJECT,
    {
      onCompleted: () => {
        // console.log("onCompleted");
        setSubmitting(false);
        if (refetchMember) refetchMember();
        if (refetchProject) refetchProject();
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
                  setSubmitting(true);
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
              {teamMember && teamMember?.phase === "shortlisted" ? (
                <Button
                  disabled={submitting}
                  variant={`primary`}
                  onClick={() => {
                    setSubmitting(true);
                    changeTeamMember_Phase_Project({
                      variables: {
                        fields: {
                          projectID: project?._id,
                          memberID: member?._id,
                          phase: "invited",
                        },
                      },
                    });
                  }}
                >
                  Invite
                </Button>
              ) : (
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
              )}
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
              <div className={`col-span-7`}>
                <div
                  className={`mb-4 text-sm font-semibold tracking-widest subpixel-antialiased`}
                >
                  TOP SKILLS
                </div>
                {member.skills && <SkillsCard skills={member.skills} />}
              </div>
              <div className={`col-span-2`}>
                <SocialMediaComp links={member?.links} color="#BCBCBC" />
              </div>
              <div className={`col-span-3`}>
                <AvailabilityComp timePerWeek={member.hoursPerWeek || 0} />
              </div>
            </div>
            {/* <TeamAttributeChart members={member} /> */}
          </div>
        )}
        {activeTab === 1 && (
          <>
            <div className={`mt-4 grid grid-cols-12 space-x-4`}>
              {member.previusProjects?.map((project, index) => (
                <div key={index} className={`col-span-6`}>
                  <UserInformationCard previousProjects={project} />
                </div>
              ))}
            </div>
            <div className={`mt-4 grid grid-cols-12 space-x-4`}>
              <div className={`col-span-6 space-y-4`}>
                <BioComponent
                  title={`What project are you most proud of?`}
                  description={member.content?.mostProud || ""}
                />
              </div>
              <div className={`col-span-6 space-y-4`}>
                <BioComponent
                  title={`What piece of work really showcases your abilities?`}
                  description={member.content?.showCaseAbility || ""}
                />
              </div>
            </div>
          </>
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
