// import { useQuery } from "@apollo/client";
// import { FIND_MEMBERS, FIND_SKILLS } from "@graphql/eden";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { UserContext } from "@context/eden";
import {
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
import { useContext, useState } from "react";
import {
  Avatar,
  Badge,
  Card,
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
    context: { serviceName: "soilservice" },
  });

  const { data: dataRoomSubscription } = useSubscription(ROOM_UPDATED, {
    variables: {
      fields: { _id: partyId },
    },
  });

  const membersIds: Array<string> = dataRoomSubscription
    ? dataRoomSubscription.roomUpdated.members.map(
        (member: Members) => member._id
      )
    : dataRoom?.findRoom.members.map((member: Members) => member._id);

  const { data: dataMembers } = useQuery(FIND_MEMBERS, {
    variables: {
      fields: {
        _id: dataRoom
          ? dataRoom.findRoom?.members.map((member: Members) => member._id)
          : [],
      },
    },
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
        {currentUser && (
          <Card shadow className="bg-white p-3">
            <TextHeading3 className="mb-2">Edit Your Profile Card</TextHeading3>
            <div className="mb-4 flex items-center">
              {currentUser.discordAvatar && (
                <Avatar src={currentUser.discordAvatar} size="sm" />
              )}
              {currentUser.discordName && (
                <span className="ml-2">{currentUser?.discordName}</span>
              )}
            </div>
            <SkillSelector
              showSelected
              options={
                // filter from options the skills user already has
                dataSkills?.findSkills.filter(
                  (skill: Skills) =>
                    !currentUser.skills?.some(
                      (currUserSkill) =>
                        currUserSkill?.skillInfo?._id === skill._id
                    )
                ) || []
              }
              value={
                currentUser.skills
                  ?.filter((skill) => skill !== undefined)
                  .map((skill) => skill?.skillInfo) || []
              }
              onSetSkills={handleSetSkills}
            />
          </Card>
        )}
      </GridItemThree>
      <GridItemNine>
        <Card shadow className="bg-white p-3">
          <TextHeading3 className="mb-2">See Other Profiles</TextHeading3>
          <section className="grid grid-cols-2 gap-3">
            {dataMembers &&
              dataMembers.findMembers
                .filter((member: Members) => member._id !== currentUser?._id)
                .map((member: Members, index: number) => (
                  <Card key={index} border className="col-span-1 bg-white p-3">
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
