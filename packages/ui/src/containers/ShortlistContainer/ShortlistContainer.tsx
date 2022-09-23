import { LaunchProjectContext, LaunchProjectModal } from "@context/eden";
import { useContext } from "react";

import { TextHeading3 } from "../../atoms";
import { AddSkillsToRoleCard, MemberMatchCard } from "../../components";
import { Card, Loading } from "../../elements";

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
      {selectedRole && (
        <Card className="bg-white px-10 py-4">
          {!matchingMembers.length ? (
            <Loading />
          ) : (
            !!matchingMembers.length && (
              <>
                <TextHeading3 className="mb-4">
                  {selectedRole.title} matches:
                </TextHeading3>
                <div className="grid grid-cols-3 gap-x-10 gap-y-10">
                  {matchingMembers.map((_member: any, index: number) => (
                    <MemberMatchCard
                      key={index}
                      onClick={() => {
                        handleSelectMember(
                          _member.member,
                          _member.matchPercentage
                        );
                      }}
                      member={_member.member}
                      percentage={_member.matchPercentage}
                      requiredSkills={selectedRole.skills}
                    />
                  ))}
                </div>
              </>
            )
          )}
        </Card>
      )}
    </>
  );
};
