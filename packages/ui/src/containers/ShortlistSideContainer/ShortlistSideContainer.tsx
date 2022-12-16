import {
  LaunchProjectContext,
  LaunchProjectModal,
  ProjectActionKind,
} from "@eden/package-context";
import {
  SkillRoleType,
  // eslint-disable-next-line camelcase
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  CandidateProfileCard,
  Loading,
  ProjectLayoutCard,
  ProjectSkillFilterCard,
} from "@eden/package-ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useContext } from "react";

export interface IShortlistSideContainerProps {
  matchingMembers: any[];
}

export const ShortlistSideContainer = ({
  matchingMembers,
}: IShortlistSideContainerProps) => {
  const {
    project,
    dispatchProject,
    setOpenModal,
    selectedRole,
    setSelectedRole,
    selectedMemberId,
    setSelectedMemberId,
    setSelectedMemberPercentage,
    matchMembersPage,
    setMatchMembersPage,
  } = useContext(LaunchProjectContext);

  const handleSetSkills = (skills: SkillRoleType[]) => {
    dispatchProject!({
      type: ProjectActionKind.SET_ROLE_SKILLS,
      payload: {
        ...selectedRole,
        skills: skills,
      },
    });
    setSelectedRole({ ...selectedRole, skills: skills });
  };

  // eslint-disable-next-line camelcase
  const handleDeleteSkill = (_skill: SkillType_Member) => {
    const filteredSkills = selectedRole?.skills?.filter(
      (skill) => skill?.skillData?._id !== _skill.skillInfo?._id
    );

    dispatchProject!({
      type: ProjectActionKind.SET_ROLE_SKILLS,
      payload: {
        ...selectedRole,
        skills: filteredSkills,
      },
    });
    setSelectedRole({ ...selectedRole, skills: filteredSkills });
  };

  const handleSetHoursPerWeek = (e: any) => {
    const newRoles = project?.role?.map((role) => {
      if (role?._id !== selectedRole?._id) return role;
      if (role?._id === selectedRole?._id)
        return {
          ...selectedRole,
          hoursPerWeek: Number(e.target.value),
        };
    });

    dispatchProject!({
      payload: newRoles,
      type: ProjectActionKind.SET_ROLES,
    });
  };

  const handleSetBudget = (val: any) => {
    const newRoles = project?.role?.map((role) => {
      if (role?._id !== selectedRole?._id) return role;
      if (role?._id === selectedRole?._id) {
        return {
          ...role,
          budget: {
            ...role?.budget,
            ...val,
          },
        };
      }
    });

    dispatchProject!({
      payload: newRoles,
      type: ProjectActionKind.SET_ROLES,
    });
  };

  return (
    <>
      <ProjectLayoutCard
        project={project}
        emoji={project?.emoji || undefined}
        bgColor={project?.backColorEmoji || undefined}
        handleAddRole={() => {
          setOpenModal(LaunchProjectModal.ROLE);
          setSelectedMemberId(null);
          setSelectedMemberPercentage(null);
        }}
        handleEditRole={(id: string) => {
          setSelectedRole(project?.role?.find((role) => role?._id === id));
          setOpenModal(LaunchProjectModal.SKILLS);
        }}
        handleSelectRole={(role) => {
          setSelectedRole(role);
          setSelectedMemberId(null);
          setSelectedMemberPercentage(null);
        }}
        selectedRole={selectedRole}
        showRoles
      />
      {selectedMemberId &&
        (!!matchingMembers.length ? (
          <>
            {matchingMembers.map((member: any, index) => (
              <div
                key={index}
                className="mb-2 cursor-pointer"
                onClick={() => {
                  setSelectedMemberId(member?.member?._id);
                  setSelectedMemberPercentage(
                    member?.matchPercentage.totalPercentage
                  );
                }}
              >
                <CandidateProfileCard
                  member={member.member}
                  percentage={member.matchPercentage.totalPercentage}
                  selected={selectedMemberId === member.member?._id}
                />
              </div>
            ))}{" "}
            <section className="flex justify-evenly">
              {!!matchMembersPage && matchMembersPage > 0 && (
                <span
                  className="text-soilGray group cursor-pointer hover:text-slate-400"
                  onClick={() => setMatchMembersPage(matchMembersPage - 1)}
                >
                  <ChevronLeftIcon width={16} className="mr-1 -mt-1 inline" />
                  Previous
                </span>
              )}
              {!!matchingMembers.length && (
                <span
                  className="text-soilGray group cursor-pointer hover:text-slate-400"
                  onClick={() => setMatchMembersPage(matchMembersPage + 1)}
                >
                  Next
                  <ChevronRightIcon width={16} className="ml-1 -mt-1 inline" />
                </span>
              )}
            </section>
          </>
        ) : (
          <Loading />
        ))}

      {!selectedMemberId && selectedRole && (
        <ProjectSkillFilterCard
          key={selectedRole?._id}
          selectedRole={selectedRole}
          roles={project?.role || []}
          skills={selectedRole?.skills || []}
          handleSetSkills={handleSetSkills}
          handleSetHoursPerWeek={handleSetHoursPerWeek}
          handleSetBudget={handleSetBudget}
          handleDeleteSkill={handleDeleteSkill}
        />
      )}
    </>
  );
};
