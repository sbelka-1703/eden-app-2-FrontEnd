// import { LaunchContext } from "@context/eden";
// import { useContext } from "react";
import { RoleTemplate } from "@graphql/eden/generated";
import { Dropdown, SkillSelector } from "ui";

export interface LaunchViewRolesProps {
  roles: RoleTemplate[];
}

export const LaunchViewRoles = ({ roles }: LaunchViewRolesProps) => {
  // const { projectRoles, setProjectRoles } = useContext(LaunchContext);

  // if (roles) console.log("roles", roles);

  return (
    <div className={`p-6`}>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        WHO ARE YOU LOOKING FOR?
      </div>
      <Dropdown items={roles} placeholder={`Select Your Role`} />
      <SkillSelector showSelected value={roles} />
    </div>
  );
};
