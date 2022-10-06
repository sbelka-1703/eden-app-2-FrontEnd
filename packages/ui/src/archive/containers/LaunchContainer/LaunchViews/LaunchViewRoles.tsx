/* eslint-disable camelcase */
import { LaunchContext } from "@eden/package-context";
import {
  Maybe,
  Role,
  RoleType,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  Button,
  Card,
  Dropdown,
  Modal,
  SearchSkill,
  SkillsCard,
} from "@eden/package-ui";
import { useContext, useState } from "react";

const levels = [
  {
    title: "learning",
    level: "learning",
  },
  {
    title: "mid",
    level: "mid",
  },
  {
    title: "junior",
    level: "junior",
  },
  {
    title: "senior",
    level: "senior",
  },
];

export interface LaunchViewRolesProps {
  roles: Maybe<Array<Maybe<Role>>>;
}

export const LaunchViewRoles = ({ roles }: LaunchViewRolesProps) => {
  const { projectRoles, setProjectRoles } = useContext(LaunchContext);

  const [showModal, setShowModal] = useState(false);
  const [projectRole, setProjectRole] = useState<Maybe<Role> | null>(null);
  const [skills, setSkills] = useState<Maybe<SkillType_Member>[]>([]);

  const handleSetSkills = (addSkill: SkillType_Member[]) => {
    setSkills([...addSkill]);
  };

  const handleCancelRole = () => {
    setShowModal(false);
    setTimeout(() => {
      setProjectRole(null);
      setSkills([]);
    }, 800);
  };

  const handleSaveRole = () => {
    setShowModal(false);
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

  const filterSkills = (
    skills: Maybe<Maybe<SkillType_Member>[]>,
    level: string
  ) => {
    if (skills) return skills.filter((skill) => skill?.level === level);
  };

  return (
    <div className={`p-6`}>
      <div
        className={`font-poppins text-darkGreen py-2 text-center text-2xl font-medium`}
      >
        DOES YOUR PROJECT HAVE ROLES THAT NEED TO BE FILLED?
      </div>
      <div className={`mt-8 flex w-full justify-center`}>
        <Button variant={`default`} onClick={() => setShowModal(true)}>
          + ADD A ROLE NEEDED TO FILL
        </Button>
      </div>
      <div className={`mt-6 grid grid-cols-3 gap-4`}>
        {projectRoles?.map((role, index: number) => (
          <Card shadow key={index} className={`p-4`}>
            <div className={`font-poppins text-darkGreen text-lg font-medium`}>
              {role?.title}
            </div>
            <div className={`font-poppins text-darkGreen text-sm`}>
              {role?.description}
            </div>
          </Card>
        ))}
      </div>

      <Modal open={showModal} closeOnEsc={false}>
        <div className={`h-8/10 relative`}>
          <div
            className={`font-poppins my-4 text-center text-2xl font-semibold`}
          >
            {projectRole ? (
              <span>ADD SKILLS THAT ARE NEEDED FOR THIS ROLE</span>
            ) : (
              <span>ADD A ROLE NEEDED TO FILL</span>
            )}
          </div>
          <Dropdown
            items={roles as Role[]}
            placeholder={`Select Your Role`}
            onSelect={(val) => setProjectRole(val)}
          />
          {projectRole && (
            <>
              <SearchSkill
                levels={levels}
                skills={skills as Maybe<Maybe<SkillType_Member>[]>}
                setSkills={handleSetSkills}
              />
              <div className={`mt-4 grid grid-flow-col grid-rows-2 gap-4`}>
                {levels.map((level, index: number) => {
                  return (
                    <SkillsCard
                      key={index}
                      skills={
                        filterSkills(
                          skills as Maybe<Maybe<SkillType_Member>[]>,
                          `${level.level}`
                        ) as Maybe<Maybe<SkillType_Member>[]>
                      }
                      title={level.title}
                      shadow={true}
                      className={`p-2`}
                    />
                  );
                })}
              </div>
            </>
          )}
          <div className={`absolute bottom-2  flex w-full justify-between`}>
            <Button variant={`default`} onClick={() => handleCancelRole()}>
              Cancel
            </Button>
            <Button variant={`primary`} onClick={() => handleSaveRole()}>
              Save Role
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
