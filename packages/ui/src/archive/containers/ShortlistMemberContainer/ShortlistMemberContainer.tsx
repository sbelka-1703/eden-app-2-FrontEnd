import { useQuery } from "@apollo/client";
import { LaunchProjectContext, ProjectActionKind } from "@eden/package-context";
import { FIND_MEMBER } from "@eden/package-graphql";
import { Loading, MemberProfileCard } from "@eden/package-ui";
import { useContext } from "react";

export interface IShortlistMemberContainerProps {
  matchingMembers: any[];
}

export const ShortlistMemberContainer = ({
  matchingMembers,
}: IShortlistMemberContainerProps) => {
  const {
    dispatchProject,
    selectedRole,
    selectedMemberId,
    selectedMemberPercentage,
    setSelectedMemberId,
    setSelectedMemberPercentage,
  } = useContext(LaunchProjectContext);

  function handleShortlistMember() {
    dispatchProject!({
      payload: {
        member: selectedMember,
        roleId: selectedRole?._id,
      },
      type: ProjectActionKind.SHORTLIST_MEMBER,
    });

    const newMatchingMembers = matchingMembers.filter(
      (member) => member?.member?._id !== selectedMember._id
    );

    setSelectedMemberId(newMatchingMembers[0]?.member?._id || null);
    setSelectedMemberPercentage(newMatchingMembers[0]?.percentage || null);
  }

  const { data: _selectedMember } = useQuery(FIND_MEMBER, {
    variables: {
      fields: {
        _id: selectedMemberId,
      },
    },
    skip: !selectedMemberId,
    context: { serviceName: "soilservice" },
  });

  const selectedMember = _selectedMember?.findMember || null;

  return (
    <>
      {selectedRole &&
        (selectedMember ? (
          <MemberProfileCard
            percentage={selectedMemberPercentage}
            key={selectedMember?._id}
            member={selectedMember}
            // onClickNotNow={() => {
            //   setSelectedMemberId(null);
            //   setSelectedMemberPercentage(null);
            // }}
            onClickAddToList={() => {
              handleShortlistMember();
            }}
            onClickBack={() => {
              setSelectedMemberId(null);
              setSelectedMemberPercentage(null);
            }}
          />
        ) : (
          <Loading />
        ))}
    </>
  );
};
