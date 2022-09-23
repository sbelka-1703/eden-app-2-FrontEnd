import { LaunchProjectContext, LaunchProjectModal } from "@context/eden";
import { useContext } from "react";

import { AddSkillsToRoleCard, MemberMatchCard } from "../../components";
import { Loading } from "../../elements";

export interface IShortlistContainerProps {
  matchingMembers: any[];
}

export const ShortlistContainer = ({
  matchingMembers,
}: IShortlistContainerProps) => {
  const {
    selectedRole,
    setOpenModal,
    setSelectedMemberId,
    setSelectedMemberPercentage,
  } = useContext(LaunchProjectContext);

  function handleSelectMember(member: any, percentage: number) {
    setSelectedMemberPercentage(percentage);
    setSelectedMemberId(member._id);
  }

  return (
    <>
      {selectedRole && (
        <AddSkillsToRoleCard
          numberOfMembers={matchingMembers.length}
          roleTitle={selectedRole?.title || ""}
          handleOpenSkillsModal={() => setOpenModal(LaunchProjectModal.SKILLS)}
        />
      )}
      {selectedRole &&
        (!matchingMembers.length ? (
          <Loading />
        ) : (
          !!matchingMembers.length && (
            <div className="grid grid-cols-3 gap-x-10 gap-y-10">
              {matchingMembers.map((_member: any, index: number) => (
                <MemberMatchCard
                  key={index}
                  onClick={() => {
                    handleSelectMember(_member.member, _member.matchPercentage);
                  }}
                  member={_member.member}
                  percentage={_member.matchPercentage}
                />
              ))}
            </div>
          )
        ))}
    </>
  );
};
