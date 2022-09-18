/* eslint-disable camelcase */
import { LaunchContext } from "@context/eden";
import {
  Maybe,
  Role,
  RoleTemplate,
  RoleType,
  SkillType_Member,
} from "@graphql/eden/generated";
import { useContext, useState } from "react";
import { Button, Modal, RoleSelector } from "ui";

export interface RoleModalProps {
  roles?: Maybe<Array<Maybe<RoleTemplate>>>;
  openModal?: boolean;
  firstRoleAssigned?: boolean;
  onSelectedRole?: (role: Maybe<RoleTemplate>) => void;
  roleSelected?: () => void;
}

export const RoleModal = ({
  roles,
  openModal,
  firstRoleAssigned,
  onSelectedRole,
  roleSelected,
}: RoleModalProps) => {
  const { projectRoles, setProjectRoles } = useContext(LaunchContext);
  const [projectRole, setProjectRole] = useState<Maybe<Role> | null>(null);
  const [skills, setSkills] = useState<Maybe<SkillType_Member>[]>([]);

  const handleSaveRole = () => {
    if (projectRole) {
      const newProjectRole = {
        _id: projectRole._id,
        title: projectRole.name,
        description: projectRole.description,
        skills: skills.map((skill: Maybe<SkillType_Member>) => {
          return {
            _id: skill?.skillInfo?._id,
            level: skill?.level,
          };
        }),
      } as RoleType;

      setProjectRoles([...(projectRoles as []), newProjectRole]);
      setTimeout(() => {
        setProjectRole(null);
        setSkills([]);
      }, 800);
    }
  };

  return (
    <>
      <Modal open={openModal} closeOnEsc={false}>
        <div className={`h-5/10 relative p-1`}>
          <div className={`font-poppins text-justify text-base font-semibold`}>
            {firstRoleAssigned ? (
              <span>
                Select another role for your project, these roles can help you
                find right people to work with.
              </span>
            ) : (
              <span>
                {`Welcome to Eden, a project/person matching protocol. We're here
                to help you find talent, that is tailored to your needs - please
                tell us more about your project.`}
              </span>
            )}
          </div>
          <div className={`my-2 text-sm text-slate-500`}>
            {`Choose just one role for now, you'll be able to add more later.`}
          </div>
          <div className="flex flex-row justify-center justify-items-center">
            <div>
              <div className="mt-5 mb-4 text-base font-semibold">
                {" "}
                Who are you looking for?
              </div>
              <div className="">
                <RoleSelector
                  roles={roles ? roles : []}
                  onSelect={onSelectedRole}
                  roleSelected={roleSelected}
                />
              </div>
            </div>
          </div>
          <div className={`absolute bottom-2  flex w-full justify-center`}>
            <Button variant={`primary`} onClick={() => handleSaveRole()}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
