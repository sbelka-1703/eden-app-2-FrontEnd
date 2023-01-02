/* eslint-disable camelcase */
import { useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { UPDATE_MEMBER } from "@eden/package-graphql";
import {
  MatchSkillsToProjectsOutput,
  Maybe,
  Mutation,
  SkillRoleType,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import { Avatar, Card, UserProfileCard } from "@eden/package-ui";
import { useContext, useState } from "react";

import { round } from "../../../../utils";
import { ProjectSkillFilterCard } from "../../cards/project/ProjectSkillFilterCard/ProjectSkillFilterCard";

export interface ISignUpContainerSideProps {
  matchedProjects?: Maybe<Array<Maybe<MatchSkillsToProjectsOutput>>>;
  // eslint-disable-next-line no-unused-vars
  onSelectedProject: (projectID: string) => void;
  viewProject?: boolean;
}

export const SignUpContainerSide = ({
  matchedProjects,
  onSelectedProject,
  viewProject,
}: ISignUpContainerSideProps) => {
  const { currentUser } = useContext(UserContext);

  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("updateMember is null");
      // console.log("updateMember", updateMember);
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const handleDeleteSkill = (val: Maybe<SkillType_Member> | undefined) => {
    if (!currentUser) return;

    updateMember({
      variables: {
        fields: {
          _id: currentUser?._id,
          serverID: currentUser?.serverID,
          skills: currentUser.skills
            ?.filter(
              (skill: Maybe<SkillType_Member>) =>
                skill?.skillInfo?._id !== val?.skillInfo?._id
            )
            .map((skill: Maybe<SkillType_Member>) => {
              return {
                id: skill?.skillInfo?._id,
                level: skill?.level,
              };
            }),
        },
      },
    });
  };

  return (
    <Card className={`h-85 flex flex-col gap-2`}>
      <UserProfileCard />
      {viewProject ? (
        <Card
          className={`scrollbar-hide flex w-full flex-grow overflow-y-scroll`}
        >
          <div className={`my-1 flex w-full flex-col gap-3`}>
            {matchedProjects?.map((matchProject, index: number) => (
              <button
                key={index}
                className={`flex w-full px-1`}
                onClick={() => {
                  onSelectedProject(matchProject?.project?._id || "");
                  setSelectedProject(matchProject?.project?._id || "");
                }}
              >
                <Card
                  shadow
                  focused={matchProject?.project?._id === selectedProject}
                  className={`flex w-full bg-white p-4`}
                >
                  <div className={`relative`}>
                    <Avatar
                      isProject
                      size={`sm`}
                      emoji={matchProject?.project?.emoji as string}
                      backColorEmoji={
                        matchProject?.project?.backColorEmoji as string
                      }
                    />
                    {matchProject?.matchPercentage && (
                      <p className="font-poppins absolute -mt-4 ml-7 rounded-full bg-white px-1 text-xs font-semibold text-[#9B67FF]">
                        {round(Number(matchProject?.matchPercentage), 0)}%
                      </p>
                    )}
                  </div>
                  <div className={`pl-6 text-left`}>
                    <div className={`font-medium`}>
                      {matchProject?.project?.title}
                    </div>
                    <div className={`text-xs text-zinc-600`}>
                      {matchProject?.project?.descriptionOneLine}
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </Card>
      ) : (
        <>
          {currentUser?.memberRole?.title ? (
            <Card
              shadow
              className={`scrollbar-hide flex flex-grow overflow-y-scroll bg-white`}
            >
              <ProjectSkillFilterCard
                cardTypeProject={false}
                roles={[]}
                skills={
                  currentUser?.skills?.map((skill) => ({
                    skillData: {
                      _id: skill?.skillInfo?._id,
                      name: skill?.skillInfo?.name,
                    },
                    level: skill?.level,
                  })) || []
                }
                handleSetSkills={(val: any) => {
                  updateMember({
                    variables: {
                      fields: {
                        _id: currentUser?._id,
                        serverID: currentUser?.serverID,
                        skills: val.map((skill: Maybe<SkillRoleType>) => {
                          return {
                            id: skill?.skillData?._id,
                            level: skill?.level,
                          };
                        }),
                      },
                    },
                  });
                }}
                handleSetHoursPerWeek={(val) => {
                  updateMember({
                    variables: {
                      fields: {
                        _id: currentUser?._id,
                        serverID: currentUser?.serverID,
                        hoursPerWeek: Number(val.target.value),
                      },
                    },
                  });
                }}
                handleDeleteSkill={handleDeleteSkill}
              />
            </Card>
          ) : null}
        </>
      )}
    </Card>
  );
};
