import { Maybe, RoleTemplate } from "@eden/package-graphql/generated";
import {
  BadgeSelector,
  Button,
  Calendar,
  RoleSelector,
  SearchSkill,
  TextArea,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { ArrowSmLeftIcon, ArrowSmRightIcon } from "@heroicons/react/solid";
import { useEffect, useReducer, useState } from "react";

interface Experience {
  [key: number]: {
    role: string;
    skills: any[];
    title: string;
    startDate: string;
    endDate: string;
    bio: string;
  };
}

const INITIAL_DATA = {
  role: "",
  skills: [],
  title: "",
  startDate: "",
  endDate: "",
  bio: "",
};

const initialState: Experience = {
  0: INITIAL_DATA,
};

function reducer(state: Experience, action: any): Experience {
  switch (action.type) {
    case "HANDLE INPUT TEXT":
      return {
        ...state,
        [action.payload.index]: {
          ...state[action.payload.index],
          [action.field]: action.payload.value,
        },
      };
    case "editEndDate":
      return {
        ...state,
        [action.payload.index]: {
          ...state[action.payload.index],
          endDate: action.payload.value,
        },
      };
    case "editStartDate":
      return {
        ...state,
        [action.payload.index]: {
          ...state[action.payload.index],
          startDate: action.payload.value,
        },
      };
    case "addExperience":
      return { ...state, [Object.keys(state).length]: INITIAL_DATA };
    default:
      return state;
  }
}

export interface UserExperienceCardlProps {
  roles: Maybe<Array<Maybe<RoleTemplate>>>;
  fields?: any[];
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (val: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleChange?: (val: any) => void;
}

export const UserExperienceCard = ({
  roles,
  fields,
  // eslint-disable-next-line no-unused-vars
  handleSubmit,
  handleChange,
}: UserExperienceCardlProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTextChange = (e: any, index: number) => {
    dispatch({
      type: "HANDLE INPUT TEXT",
      field: e.target.name,
      payload: {
        index,
        value: e.target.value,
      },
    });
    console.log("state ==>>", state);
  };

  const handleUpdateRole = (value: any, field: string, index: number) => {
    dispatch({
      type: "HANDLE INPUT TEXT",
      field: field,
      payload: {
        index,
        value: value,
      },
    });
    console.log("state ==>>", state);
  };

  const handleAddExperience = () => {
    setCurrentIndex(Object.keys(state).length);
    dispatch({
      type: "addExperience",
    });
  };

  useEffect(() => {
    if (handleChange) handleChange(state);
  }, [state]);

  return (
    <div className=" flex flex-col items-center">
      <TextHeading3 className="mb-4 w-full text-left text-lg">
        Now, let’s fill them out!
      </TextHeading3>
      <div className="mb-4 flex w-full">
        <BadgeSelector
          items={fields!}
          multiple={false}
          onChange={(items) => console.info({ items })}
          selectFirst={true}
        />
      </div>
      <div
        key={currentIndex}
        className="mb-4 grid w-full grid-cols-2 gap-8 border-b border-b-gray-300 pb-4"
      >
        <div>
          <div>
            <p className="mb-3 w-full text-left text-sm font-medium">Role:</p>
            <RoleSelector
              roles={roles}
              value={state[currentIndex]?.role || undefined}
              onSelect={(val: Maybe<RoleTemplate>) => {
                handleUpdateRole(val!.title, "role", +currentIndex);
              }}
            />
          </div>
          <div>
            <p className="mb-3 w-full text-left text-sm font-medium">
              Company/project name:
            </p>
            <TextField
              name="title"
              defaultValue={state[currentIndex]?.title}
              style={{ padding: "10px" }}
              placeholder="Start typing here..."
              onChange={(e) => handleTextChange(e, +currentIndex)}
            />
          </div>
          <div className="mt-3">
            <p className="mb-3 w-full text-left text-sm font-medium">
              Timeline:
            </p>

            <Calendar
              onlyMonthPicker
              containerClassName="w-full mb-4"
              buttonClassName="w-full rounded-xl"
              label="Start Date"
              onChange={(e) => handleUpdateRole(e, "startDate", +currentIndex)}
            />
            <Calendar
              onlyMonthPicker
              containerClassName="w-full"
              buttonClassName="w-full rounded-xl"
              label="End Date"
              onChange={(e) => handleUpdateRole(e, "endDate", +currentIndex)}
            />
          </div>
        </div>
        <div>
          <div>
            <p className="mb-3 w-full text-left text-sm font-medium">Skills:</p>
            <SearchSkill
              setSkills={(skills: any) =>
                handleUpdateRole(skills, "skills", +currentIndex)
              }
              skills={state[currentIndex]?.skills}
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
            <p className="mb-3 w-full text-left text-sm font-medium">Bio:</p>
            <TextArea
              value={state[currentIndex]?.bio}
              rows={5}
              name="bio"
              placeholder="Start typing here..."
              onChange={(e) => handleTextChange(e, +currentIndex)}
            />
          </div>
          <div className="mt-9 flex justify-between">
            <Button
              variant={`secondary`}
              className="flex items-center"
              onClick={() => {
                setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
              }}
            >
              <ArrowSmLeftIcon className="h-4 w-4 text-black" />
            </Button>
            <Button variant={`secondary`} onClick={handleAddExperience}>
              Add new experience
            </Button>
            <Button
              variant={`secondary`}
              className="flex items-center"
              onClick={() => {
                setCurrentIndex(
                  state[currentIndex + 1] ? currentIndex + 1 : currentIndex
                );
              }}
            >
              <ArrowSmRightIcon className="h-4 w-4 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
