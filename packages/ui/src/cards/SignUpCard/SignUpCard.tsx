// TODO: needs a test file
/* eslint-disable camelcase */
import { useMutation } from "@apollo/client";
import { UserContext } from "@context/eden";
import { UPDATE_MEMBER } from "@graphql/eden";
import {
  Maybe,
  Mutation,
  RoleTemplate,
  SkillType_Member,
} from "@graphql/eden/generated";
import { useContext, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  Button,
  Modal,
  RoleModal,
  SearchSkill,
  SkillList,
  TextHeading2,
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
  roles?: Maybe<Array<Maybe<RoleTemplate>>>;
  refetch?: () => void;
}

export const SignUpCard = ({ roles, refetch }: ISignUpCardProps) => {
  const { currentUser } = useContext(UserContext);
  const [showSkillsView, setShowSkillsView] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser?.memberRole) {
      setShowSkillsView(true);
      setRoleModalOpen(false);
    } else {
      setShowSkillsView(false);
      setRoleModalOpen(true);
    }
  }, [currentUser]);

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("addFavoriteProject is null");
      refetch?.();
    },
  });

  return (
    <div className={`rounded-2xl bg-white px-8 py-6`}>
      <RoleModal
        onSubmit={(role) => {
          if (!role?._id || !currentUser?._id) return;
          updateMember({
            variables: {
              fields: {
                _id: currentUser?._id,
                memberRole: role?._id,
                onbording: {
                  signup: true,
                },
              },
            },
          });
          setRoleModalOpen(false);
          setShowSkillsView(true);
        }}
        openModal={roleModalOpen}
        roles={roles}
      />

      {showSkillsView && (
        <AddSkillsView
          onSelectedSkills={(skills) => {
            console.log(skills);
            if (!currentUser?._id) return;
            updateMember({
              variables: {
                fields: {
                  _id: currentUser?._id,
                  skills: skills.map((skill: Maybe<SkillType_Member>) => {
                    return {
                      id: skill?.skillInfo?._id,
                      level: skill?.level,
                    };
                  }),
                },
              },
            });
          }}
        />
      )}
    </div>
  );
};

const skillLevelArray = ["Learning", "Mid", "Junior", "Senior"];
const rgbArray = [`235,225,255`, "209,247,196", "254,214,150", "254,214,200"];

interface IAddSkillsViewProps {
  // eslint-disable-next-line no-unused-vars
  onSelectedSkills: (skills: Maybe<SkillType_Member>[]) => void;
}

const AddSkillsView = ({ onSelectedSkills }: IAddSkillsViewProps) => {
  const { currentUser } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [userSkills, setUserSkills] = useState<Maybe<SkillType_Member>[]>([]);

  useEffect(() => {
    if (currentUser?.skills?.length) {
      setUserSkills(currentUser.skills);
    }
  }, [currentUser]);

  const filterSkills = (
    skills: Maybe<Maybe<SkillType_Member>[]>,
    level: string
  ) => {
    if (skills) return skills.filter((skill) => skill?.level === level);
  };

  return (
    <div>
      <div className={`grid grid-cols-3`}>
        <div className={`col-span-2`}>
          <TextHeading2>
            Add your skills to get personalised matches
          </TextHeading2>
          <div className={`font-Inter text-sm text-zinc-500`}>
            Eden is built to deliver tailored macthes wirh opportunities in the
            DAO. Fill out your profile to uncover Eden power.
            {/* <span className={`text-soilBlue flex cursor-pointer`}>
              Get started <BsArrowRight className={`my-auto ml-2`} />
            </span> */}
          </div>
        </div>
        <div className={`col-span-1 `}>
          <div className={`flex justify-end`}>
            <Button
              onClick={() => setShowModal(!showModal)}
              variant={`primary`}
            >
              Add Skills <BsArrowRight className={`my-auto ml-2`} />
            </Button>
          </div>
        </div>
      </div>

      <Modal open={showModal} closeOnEsc={false}>
        <div className={`h-7/10 mt-3`}>
          <SearchSkill
            levels={levels}
            skills={userSkills}
            setSkills={onSelectedSkills}
          />
          <div
            className={`h-6/10 scrollbar-hide mt-4 grid grid-flow-col grid-rows-2 gap-4 overflow-y-scroll`}
          >
            {levels.map((level, index: number) => {
              return (
                <div key={index}>
                  <div
                    className={`pb-2 text-center font-medium text-slate-500`}
                  >
                    {skillLevelArray[index]}
                  </div>
                  <SkillList
                    closeButton={true}
                    skills={
                      filterSkills(
                        userSkills as Maybe<SkillType_Member>[],
                        `${level.level}`
                      ) as Maybe<SkillType_Member>[]
                    }
                    colorRGB={rgbArray[index]}
                    handleDeleteSkill={(skill: any) => {
                      console.log(skill);
                      const tempSkills = userSkills.filter((selectedSkill) => {
                        return (
                          selectedSkill?.skillInfo?._id !== skill.skillInfo._id
                        );
                      });

                      onSelectedSkills(tempSkills as Maybe<SkillType_Member>[]);
                      setUserSkills(tempSkills as Maybe<SkillType_Member>[]);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={"flex justify-end"}>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};
