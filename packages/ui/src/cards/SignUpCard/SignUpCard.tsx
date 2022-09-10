/* eslint-disable camelcase */
import { Maybe, RoleTemplate, SkillType_Member } from "@graphql/eden/generated";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  Button,
  Modal,
  RoleSelector,
  SearchSkill,
  SkillsCard,
  TextHeading2,
  TextHeading3,
} from "ui";

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

export interface ISignUpCardProps {
  roles: Maybe<Array<Maybe<RoleTemplate>>>;
  // eslint-disable-next-line no-unused-vars
  onSelectedRole: (role: Maybe<RoleTemplate>) => void;
}

export const SignUpCard = ({ roles, onSelectedRole }: ISignUpCardProps) => {
  const [currentView, setCurrentView] = useState(1);

  return (
    <div className={`rounded-2xl bg-white px-8 py-6`}>
      {currentView === 1 && (
        <SelectRoleView
          roles={roles}
          onSelectedRole={onSelectedRole}
          roleSelected={() => setCurrentView(2)}
        />
      )}
      {currentView === 2 && <AddSkillsView />}
      {currentView === 3 && <ThankYouView />}
    </div>
  );
};

interface ISelectRoleViewProps {
  roles: Maybe<Array<Maybe<RoleTemplate>>>;
  // eslint-disable-next-line no-unused-vars
  onSelectedRole: (role: Maybe<RoleTemplate>) => void;
  roleSelected?: () => void;
}

const SelectRoleView = ({
  roles,
  onSelectedRole,
  roleSelected,
}: ISelectRoleViewProps) => {
  return (
    <div>
      <TextHeading3>
        Welcome to Eden, a project/person matching protocol. We’re here to help
        you find opportunities, that are tailored for you - please tell us more
        about yourself.
      </TextHeading3>
      <RoleSelector
        roles={roles}
        onSelect={onSelectedRole}
        roleSelected={roleSelected}
      />
    </div>
  );
};

const AddSkillsView = () => {
  const [showModal, setShowModal] = useState(false);

  const [skills, setSkills] = useState<Maybe<SkillType_Member>[]>([]);

  const handleSetSkills = (addSkill: SkillType_Member[]) => {
    setSkills([...addSkill]);
  };

  const filterSkills = (
    skills: Maybe<Maybe<SkillType_Member>[]>,
    level: string
  ) => {
    if (skills) return skills.filter((skill) => skill?.level === level);
  };

  return (
    <div>
      <div className={`flex justify-between`}>
        <div>
          <TextHeading2>
            Add your skills to get personalised matches
          </TextHeading2>
          <div className={`font-Inter text-sm text-zinc-500`}>
            Eden is built to deliver tailored macthes wirh opportunities in the
            DAO. Fill out your profile to uncover Eden power.{" "}
            <span className={`text-soilBlue flex cursor-pointer`}>
              Get started <BsArrowRight className={`my-auto ml-2`} />
            </span>
          </div>
        </div>
        <div>
          <Button onClick={() => setShowModal(!showModal)} variant={`primary`}>
            Add Skills <BsArrowRight className={`my-auto ml-2`} />
          </Button>
        </div>
      </div>

      <Modal open={showModal}>
        <div className={`h-5/10 mt-8`}>
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
        </div>
      </Modal>
    </div>
  );
};

const ThankYouView = () => {
  return (
    <div>
      <TextHeading2>
        Thanks for filling out your skills! Now you can see a percentge match
        with the project - looks interesting? Try to apply!
      </TextHeading2>
      <div className={`font-Inter text-sm text-zinc-500`}>
        Eden is built to deliver tailored macthes wirh opportunities in the DAO.
        Fill out your profile to uncover Eden power.{" "}
        <span className={`text-soilBlue flex cursor-pointer`}>
          Get started <BsArrowRight className={`my-auto ml-2`} />
        </span>
      </div>
    </div>
  );
};
