import { gql, useMutation } from "@apollo/client";
import { Maybe, Members } from "@graphql/eden/generated";
import { useState } from "react";
import { Avatar, Badge, Button, Card } from "ui";

const SET_APPLY_TO_PROJECT = gql`
  mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
    changeTeamMember_Phase_Project(fields: $fields) {
      _id
    }
  }
`;

export interface UserCardProps {
  member?: Maybe<Members>;
  projectId?: string;
  percentage?: number;
  endorsements?: number;
  focused?: boolean;
  engagedCard?: boolean;
  refetch?: () => void;
}

export const UserCard = ({
  member,
  projectId,
  percentage,
  // endorsements,
  focused,
  engagedCard = false,
  refetch,
}: UserCardProps) => {
  const [submitting, setSubmitting] = useState(false);

  // eslint-disable-next-line camelcase
  const [changeTeamMember_Phase_Project, {}] = useMutation(
    SET_APPLY_TO_PROJECT,
    {
      onCompleted: () => {
        // console.log("onCompleted");
        if (refetch) refetch();
        setSubmitting(false);
      },
      onError: (error) => {
        console.log("onError", error);
      },
    }
  );

  const displayBadges = member?.skills?.map((skill, index) => (
    <Badge
      key={index}
      text={skill?.skillInfo?.name || ""}
      className={`bg-soilPurple/20 font-Inter text-sm`}
    />
  ));

  return (
    <Card shadow focused={focused} className={`bg-white p-6`}>
      <div className={`flex justify-between`}>
        <div>
          <Avatar src={member?.discordAvatar || ""} size={`sm`} />
        </div>
        <div className={`w-full pl-4`}>
          <div className="flex justify-between">
            <div className={``}>
              <div className={`text-xl`}>@{member?.discordName}</div>
              {/* TODO: endorsements are not implemented in backend yet */}
              {/* <div className={`text-sm text-zinc-400`}>
                {endorsements} endorsements
              </div> */}
            </div>
            <div className={``}>
              {engagedCard && (
                <div className={`text-lg font-semibold text-black/50`}>
                  Match
                </div>
              )}
              <div
                className={`text-soilPurple font-poppins my-auto text-2xl font-semibold`}
              >
                {percentage}%
              </div>
            </div>
          </div>
        </div>
        {engagedCard && (
          <div className={`ml-6 flex flex-col justify-end space-y-2`}>
            <Button
              disabled={submitting}
              onClick={() => {
                setSubmitting(true);
                changeTeamMember_Phase_Project({
                  variables: {
                    fields: {
                      projectID: projectId,
                      memberID: member?._id,
                      phase: "committed",
                    },
                  },
                });
              }}
            >
              Add
            </Button>
            <Button
              disabled={submitting}
              onClick={() => {
                setSubmitting(true);
                changeTeamMember_Phase_Project({
                  variables: {
                    fields: {
                      projectID: projectId,
                      memberID: member?._id,
                      phase: "rejected",
                    },
                  },
                });
              }}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
      <div className={`mt-2 flex flex-wrap`}>{displayBadges}</div>
      <div className={`text-xs text-zinc-400`}>
        skills: {member?.skills?.length}
      </div>
    </Card>
  );
};
