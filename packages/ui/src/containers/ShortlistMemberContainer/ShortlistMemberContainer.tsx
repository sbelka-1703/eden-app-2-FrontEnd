import { useQuery } from "@apollo/client";
import { LaunchProjectContext } from "@context/eden";
import { FIND_MEMBER } from "@graphql/eden";
import { useContext } from "react";
import { MemberProfileCard } from "ui";

export interface IShortlistMemberContainerProps {}

export const ShortlistMemberContainer =
  ({}: IShortlistMemberContainerProps) => {
    const {
      selectedRole,
      selectedMemberId,
      selectedMemberPercentage,
      setSelectedMemberId,
      setSelectedMemberPercentage,
    } = useContext(LaunchProjectContext);

    function handleShortlistMember() {
      //
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
        {selectedRole && selectedMember && (
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
            }}
          />
        )}
      </>
    );
  };
