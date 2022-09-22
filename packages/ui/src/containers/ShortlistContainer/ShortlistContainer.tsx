import { useQuery } from "@apollo/client";
import { LaunchProjectContext, LaunchProjectModal } from "@context/eden";
import { MATCH_MEMBERS_TO_SKILLS } from "@graphql/eden";
import { Members } from "@graphql/eden/generated";
import { useContext } from "react";

import { AddSkillsToRoleCard } from "../../components";
import { Loading } from "../../elements";

export interface IShortlistContainerProps {}

export const ShortlistContainer = ({}: IShortlistContainerProps) => {
  const { project, selectedRole, openModal, setOpenModal } =
    useContext(LaunchProjectContext);

  const { data: matchingMembers } = useQuery(MATCH_MEMBERS_TO_SKILLS, {
    variables: {
      fields: {
        skillsID: selectedRole?.skills?.flatMap(
          (skill) => skill?.skillData?._id
        ),
      },
    },
    skip: !selectedRole,
  });

  const filteredMembers =
    matchingMembers?.matchSkillsToMembers?.filter(
      (member: Members) =>
        !project?.team?.some(
          (teamMember) => teamMember?.memberInfo?._id === member?._id
        )
    ) || [];

  return (
    <>
      {openModal}
      {selectedRole && (
        <AddSkillsToRoleCard
          numberOfMembers={filteredMembers.length}
          roleTitle={selectedRole?.title || ""}
          handleOpenSkillsModal={() => setOpenModal(LaunchProjectModal.SKILLS)}
        />
      )}
      {!filteredMembers.length && selectedRole && <Loading />}
    </>
  );
};
