import {
  Calendar,
  SearchSkill,
  TextArea,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

// interface Experience {
//   [key: number]: {
//     role: string;
//     skills: any[];
//     title: string;
//     startDate: string;
//     endDate: string;
//     bio: string;
//   };
// }

const INITIAL_DATA = {
  title: "",
  skills: [],
  startDate: "",
  endDate: "",
  bio: "",
};

export interface UserExperienceCard2Props {
  fields?: any[];
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (val: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleChange?: (val: any) => void;
}

export const UserExperienceCard2 = ({
  // fields,
  // eslint-disable-next-line no-unused-vars
  handleSubmit,
  handleChange,
}: UserExperienceCard2Props) => {
  const [experiences, setExperiences] = useState([
    { ...INITIAL_DATA },
    { ...INITIAL_DATA },
    { ...INITIAL_DATA },
  ]);
  const [experiencesOpen, setExperiencesOpen] = useState([true, false, false]);

  const handleAddExperience = () => {
    setExperiences([...experiences, { ...INITIAL_DATA }]);
    setExperiencesOpen([...experiencesOpen, false]);
  };
  const handleOpenExperience = (index: number) => {
    const newExperiencesOpen = [...experiencesOpen];

    newExperiencesOpen[index] = !newExperiencesOpen[index];

    setExperiencesOpen(newExperiencesOpen);
  };

  useEffect(() => {
    if (handleChange) handleChange(experiences);
  }, [experiences]);

  return (
    <div className="">
      <TextHeading3 className="mb-2 w-full text-left text-lg">
        Share most Important experience!
      </TextHeading3>
      <p className="mb-4 text-slate-400">
        Format is ROLE + COMPANY/UNIVERSITY/DAO
        <br />A ⭐️ marks your top 2 most relevant experiences
      </p>
      {experiences.map((item, index) => (
        <ExperienceForm
          key={index}
          open={experiencesOpen[index]}
          handleOpen={() => {
            handleOpenExperience(index);
          }}
          handleChange={(val: any) => {
            const newExperiences = [...experiences];

            newExperiences[index].title = val?.title;
            newExperiences[index].bio = val?.bio;

            setExperiences(newExperiences);
          }}
          relevant={index < 2}
        />
      ))}
      <PlusCircleIcon
        width={34}
        height={34}
        className="cursor-pointer text-slate-600"
        onClick={handleAddExperience}
      />
    </div>
  );
};

const ExperienceForm = ({
  open = false,
  handleOpen,
  handleChange,
  relevant = false,
}: {
  open?: boolean;
  handleOpen?: () => void;
  // eslint-disable-next-line no-unused-vars
  handleChange?: (val: any) => void;
  relevant?: boolean;
}) => {
  const [val, setVal] = useState({
    title: "",
    bio: "",
  });

  useEffect(() => {
    if (handleChange) handleChange(val);
  }, [val]);

  return (
    <div className="mb-2">
      <div className="flex items-center">
        <span className="mr-3 cursor-pointer" onClick={handleOpen}>
          {open ? "▼" : "▶"}
        </span>
        <div className="min-w-30 w-1/2">
          <TextField
            placeholder="Start typing here..."
            onChange={(e) => setVal({ ...val, title: e.target.value })}
            className="h-8 !rounded-full border-0 bg-cyan-200 outline-0"
          />
        </div>
        {relevant && <span className="ml-3 text-xl">⭐️</span>}
      </div>
      {open && (
        <div className="mb-4 grid w-full grid-cols-2 gap-8 border-b border-b-gray-300 pb-4 pt-4">
          <div>
            <p className="mb-3 w-full text-left text-sm font-medium">Bio:</p>
            <TextArea
              rows={5}
              name="bio"
              placeholder="Start typing here..."
              onChange={(e) => setVal({ ...val, bio: e.target.value })}
            />
          </div>

          <div>
            <div>
              <p className="mb-3 w-full text-left text-sm font-medium">
                Skills:
              </p>
              <SearchSkill
                // setSkills={(skills: any) =>
                //   handleUpdateRole(
                //     skills,
                //     "skills",
                //     currentCategoryIndex,
                //     +currentIndex
                //   )
                // }
                // skills={state[currentCategoryIndex][currentIndex]?.skills}
                skills={undefined}
                setSkills={undefined}
                levels={[
                  {
                    title: "learning",
                    level: "learning",
                  },
                  {
                    title: "Mid Level",
                    level: "mid",
                  },
                  {
                    title: "Senior",
                    level: "senior",
                  },
                  {
                    title: "Junior",
                    level: "junior",
                  },
                ]}
              />
            </div>
            <div>
              <div className="mt-3">
                <p className="mb-3 w-full text-left text-sm font-medium">
                  Timeline:
                </p>

                <Calendar
                  onlyMonthPicker
                  containerClassName="w-full mb-4"
                  buttonClassName="w-full rounded-xl"
                  label="Start Date"
                  // onChange={(e) =>
                  //   handleUpdateRole(
                  //     e,
                  //     "startDate",
                  //     currentCategoryIndex,
                  //     +currentIndex
                  //   )
                  // }
                />
                <Calendar
                  onlyMonthPicker
                  containerClassName="w-full"
                  buttonClassName="w-full rounded-xl"
                  label="End Date"
                  // onChange={(e) =>
                  //   handleUpdateRole(
                  //     e,
                  //     "endDate",
                  //     currentCategoryIndex,
                  //     +currentIndex
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
