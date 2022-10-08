import { LaunchProjectContext } from "@eden/package-context";
import { Card, Loading, MemberMatchCard, TextHeading3 } from "@eden/package-ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { MatchMembersToSkillOutput } from "@eden/package-graphql/generated";
export interface IShortlistContainerProps {
  matchingMembers: MatchMembersToSkillOutput[] | any;
  overflow?: boolean;
}

export const ShortlistContainer = ({
  matchingMembers,
  overflow = false,
}: IShortlistContainerProps) => {
  const {
    selectedRole,
    setSelectedMemberId,
    setSelectedMemberPercentage,
    matchMembersPage,
    setMatchMembersPage,
  } = useContext(LaunchProjectContext);
  function handleSelectMember(member: any, percentage: number) {
    setSelectedMemberPercentage(percentage);
    setSelectedMemberId(member._id);
  }

  return (
    <>
      {/* {selectedRole && (
        <AddSkillsToRoleCard
          numberOfMembers={matchingMembers.length}
          roleTitle={selectedRole?.title || ""}
          handleOpenSkillsModal={() => setOpenModal(LaunchProjectModal.SKILLS)}
        />
      )} */}

      {selectedRole && !selectedRole?.skills?.length && (
        <TextHeading3 className="mt-12 text-center">
          Add some skills to see matching candidates
        </TextHeading3>
      )}
      {selectedRole && selectedRole?.skills?.length! > 0 && (
        <Card className="bg-white px-10 py-4">
          {!matchingMembers ? (
            <Loading />
          ) : (
            !!matchingMembers && (
              <>
                {!overflow && (
                  <TextHeading3 className="mb-4">
                    {selectedRole.title} matches:
                  </TextHeading3>
                )}
                <div className="mb-4 grid grid-cols-3 gap-x-10 gap-y-10">
                  {matchingMembers.map((_member: any, index: number) => (
                    <MemberMatchCard
                      key={index}
                      onClick={() => {
                        handleSelectMember(
                          _member.member,
                          _member.matchPercentage.totalPercentage
                        );
                      }}
                      member={_member.member}
                      percentage={_member.matchPercentage.totalPercentage}
                      requiredSkills={selectedRole.skills}
                      matchedMember={_member}
                    />
                  ))}
                </div>
                {overflow && (
                  <TextHeading3 className="mb-4">
                    There are no more matching candidates
                  </TextHeading3>
                )}
                <section className="flex justify-evenly">
                  {!!matchMembersPage && matchMembersPage > 0 && (
                    <span
                      className="text-soilGray group cursor-pointer hover:text-slate-400"
                      onClick={() => setMatchMembersPage(matchMembersPage - 1)}
                    >
                      <ChevronLeftIcon
                        width={16}
                        className="mr-1 -mt-1 inline"
                      />
                      Previous
                    </span>
                  )}
                  {!!matchingMembers.length && !overflow && (
                    <span
                      className="text-soilGray group cursor-pointer hover:text-slate-400"
                      onClick={() => setMatchMembersPage(matchMembersPage + 1)}
                    >
                      Next
                      <ChevronRightIcon
                        width={16}
                        className="ml-1 -mt-1 inline"
                      />
                    </span>
                  )}
                </section>
              </>
            )
          )}
        </Card>
      )}
    </>
  );
};
