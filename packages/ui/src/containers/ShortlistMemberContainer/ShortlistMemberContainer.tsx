import { useQuery } from "@apollo/client";
import { LaunchProjectContext, ProjectActionKind } from "@context/eden";
import { FIND_MEMBER } from "@graphql/eden";
import { useContext } from "react";
import { Loading, MemberProfileCard } from "ui";

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
            onClickNotNow={() => {
              setSelectedMemberId(null);
              setSelectedMemberPercentage(null);
            }}
            onClickAddToList={() => {
              handleShortlistMember();
              setSelectedMemberId(matchingMembers[0].member._id);
              setSelectedMemberPercentage(matchingMembers[0].percentage);
            }}
          />
        ) : (
          <Loading />
        ))}
    </>
  );
};
