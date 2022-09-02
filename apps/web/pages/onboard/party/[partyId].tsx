import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { UserContext } from "@context/eden";
import {
  ENTER_ROOM,
  FIND_MEMBERS,
  FIND_ROOM,
  FIND_SKILLS,
  MEMBER_UPDATED,
  ROOM_UPDATED,
  UPDATE_MEMBER,
} from "@graphql/eden";
import { Members, Skills } from "@graphql/eden/generated";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Card,
  EditProfileOnboardPartyCard,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SkillSelector,
  TextHeading3,
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

  const membersIds: Array<string> = dataRoomSubscription
    ? dataRoomSubscription.roomUpdated.members.map(
        (member: Members) => member._id
      )
    : dataRoom?.findRoom.members.map((member: Members) => member._id);

  const [enterRoom] = useMutation(ENTER_ROOM, {});

  useEffect(() => {
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
          roomId: partyId,
          memberId: currentUser?._id,
        },
      },
    });
  }, [currentUser, membersIds, partyId]);

  const { data: dataMembers } = useQuery(FIND_MEMBERS, {
    variables: {
      fields: {
        _id: dataRoom
          ? dataRoom.findRoom?.members.map((member: Members) => member._id)
          : [],
      },
    },
    skip: !dataRoom,
    context: { serviceName: "soilservice" },
    onCompleted: (data) => {
      if (data) {
        setMembers(data.findMembers);
      }
    },
  });

  useSubscription(MEMBER_UPDATED, {
    variables: {
      fields: { _id: membersIds },
    },
    skip: !membersIds,
    context: { serviceName: "soilservice" },
    onSubscriptionData: (data) => {
      const newMemberData = data.subscriptionData.data.memberUpdated;

      setMembers(
        members.map((member: Members) => {
          if (member._id !== newMemberData._id) return member;
          return newMemberData;
        })
      );
    },
  });

  const { data: dataSkills } = useQuery(FIND_SKILLS, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  const [updateMember] = useMutation(UPDATE_MEMBER, {});

  const handleSetSkills = (skills: Skills[]) => {
    updateMember({
      variables: {
        fields: {
          _id: currentUser?._id,
          skills: skills.map((skill: Skills) => {
            return {
              id: skill._id,
            };
          }),
        },
      },
    });
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
            skills={dataSkills?.findSkills || []}
            handleSetSkills={handleSetSkills}
          />
        )}
      </GridItemThree>
      <GridItemNine>
        <Card
          shadow
          className="h-8/10 scrollbar-hide overflow-y-scroll bg-white p-3"
        >
          <TextHeading3 className="mb-2">See Other Profiles</TextHeading3>
          <section className="grid grid-cols-2 gap-3">
            {dataMembers &&
              [...dataMembers.findMembers]
                .sort(
                  (a: Members, b: Members) =>
                    (b.skills?.length || 0) - (a.skills?.length || 0)
                )
                .map((member: Members, index: number) => (
                  <Card key={index} border className="col-span-1 bg-white p-3">
                    <span
                      className={`absolute right-2 rounded-full py-1 px-2 text-xs font-medium`}
                      style={{ background: `rgba(255, 103, 103, 0.15)` }}
                    >
                      TOTAL SKILLS: {`${member.skills?.length || 0}`}
                    </span>

                    <div className="mb-4 flex flex-col">
                      {member.discordAvatar && (
                        <Avatar src={member.discordAvatar} size="sm" />
                      )}
                      <span className="mt-2">{member.discordName}</span>
                    </div>
                    {member.skills?.map((skill, index) => (
                      <Badge
                        key={index}
                        colorRGB="209,247,196"
                        text={skill?.skillInfo?.name || "no_name"}
                        cutText={13}
                      />
                    ))}
                  </Card>
                ))}
          </section>
        </Card>
      </GridItemNine>
    </GridLayout>
  );
};

export default OnboardPartyPage;
