/* eslint-disable camelcase */
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { UserContext } from "@context/eden";
import {
  ADD_SKILL_TO_MEMBER_IN_ROOM,
  ENTER_ROOM,
  FIND_ROOM,
  NEW_SKILL_IN_ROOM,
  ROOM_UPDATED,
} from "@graphql/eden";
import { Members, SkillType_Member } from "@graphql/eden/generated";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  EditProfileOnboardPartyCard,
  GridItemNine,
  GridItemThree,
  GridLayout,
  OnboardPartyContainer,
} from "ui";

const OnboardPartyPage: NextPage = () => {
  const router = useRouter();
  const { partyId } = router.query;

  const [members, setMembers] = useState<Members[]>([]);

  const { currentUser } = useContext(UserContext);

  const { data: dataRoom } = useQuery(FIND_ROOM, {
    variables: {
      fields: {
        _id: partyId,
      },
    },
    skip: !partyId,
    context: { serviceName: "soilservice" },
  });

  const { data: dataRoomSubscription } = useSubscription(ROOM_UPDATED, {
    variables: {
      fields: { _id: partyId },
    },
    skip: !partyId,
    context: { serviceName: "soilservice" },
  });

  useSubscription(NEW_SKILL_IN_ROOM, {
    variables: {
      fields: { _id: partyId },
    },
    skip: !partyId,
    context: { serviceName: "soilservice" },
    onSubscriptionData: (data) => {
      const newMemberData = data.subscriptionData.data.newSkillInRoom;

      setMembers(
        members.map((member: Members) => {
          if (member._id !== newMemberData._id) return member;
          return newMemberData;
        })
      );
    },
  });

  const membersIds: Array<string> = dataRoomSubscription
    ? dataRoomSubscription.roomUpdated.members.map(
        (member: Members) => member._id
      )
    : dataRoom?.findRoom.members.map((member: Members) => member._id);

  const [enterRoom] = useMutation(ENTER_ROOM, {});

  useEffect(() => {
    // if user logged in and not in party, add currentUser to party
    if (!currentUser || !partyId) return;
    if (
      partyId &&
      !!membersIds?.length &&
      currentUser &&
      membersIds.some((id) => id === currentUser?._id)
    ) {
      return;
    }
    enterRoom({
      variables: {
        fields: {
          roomID: partyId,
          memberID: currentUser?._id,
        },
      },
    });
  }, [currentUser, membersIds, partyId]);

  // Custom query with only members basic data and skills
  useQuery(
    gql`
      query ($fields: findMembersInput) {
        findMembers(fields: $fields) {
          _id
          discordAvatar
          discordName
          bio
          skills {
            skillInfo {
              _id
              name
            }
          }
        }
      }
    `,
    {
      variables: {
        fields: {
          _id: membersIds,
        },
      },
      skip: !membersIds,
      context: { serviceName: "soilservice" },
      onCompleted: (data) => {
        if (data) {
          setMembers(data.findMembers);
        }
      },
    }
  );

  const [updateMember] = useMutation(ADD_SKILL_TO_MEMBER_IN_ROOM, {});

  const handleSetSkills = (skills: SkillType_Member[]) => {
    if (!partyId || !currentUser) return;

    updateMember({
      variables: {
        fields: {
          roomID: partyId,
          memberID: currentUser?._id,
          skills: skills.map((skill: SkillType_Member) => {
            return {
              id: skill.skillInfo?._id,
              level: skill.level,
            };
          }),
        },
      },
    });
  };
  const handleUpdateUser = (e) => {
    if (!partyId || !currentUser) return;

    console.log(e.target.value);

    // updateMember({
    //   variables: {
    //     fields: {
    //       roomID: partyId,
    //       memberID: currentUser?._id,
    //       skills: skills.map((skill: SkillType_Member) => {
    //         return {
    //           id: skill.skillInfo?._id,
    //           level: skill.level,
    //         };
    //       }),
    //     },
    //   },
    // });
  };

  return (
    <GridLayout>
      <GridItemThree>
        {!currentUser ? (
          <p>
            You must be logged in to edit your profile.
            <br />
            If you can&rsquo;t log in ask the onboarder for help
          </p>
        ) : (
          <EditProfileOnboardPartyCard
            currentUser={currentUser}
            handleSetSkills={handleSetSkills}
            handleUpdateUser={handleUpdateUser}
          />
        )}
      </GridItemThree>
      <GridItemNine>
        <OnboardPartyContainer members={members} />
      </GridItemNine>
    </GridLayout>
  );
};

export default OnboardPartyPage;
