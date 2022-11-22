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
import { map } from "lodash";
import { useReducer } from "react";

const FIELDS = [
  {
    _id: "1",
    title: "DEVELOPER 💻",
  },
  {
    _id: "2",
    title: "VOLUNTEERING 👾",
  },
  {
    _id: "3",
    title: "TRAVELLING ✈️",
  },
];

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
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (val: any) => void;
}

export const UserExperienceCard = ({
  roles,
  // eslint-disable-next-line no-unused-vars
  handleSubmit,
}: UserExperienceCardlProps) => {
  const [state, dispath] = useReducer(reducer, initialState);

  const handleTextChange = (e: any, index: number) => {
    dispath({
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
    dispath({
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
    dispath({
      type: "addExperience",
    });
  };

  return (
    <div className=" flex flex-col items-center">
      <TextHeading3 className="mb-4 w-full text-left text-lg">
        Now, let’s fill them out!
      </TextHeading3>
      <div className="mb-4 flex w-full">
        <BadgeSelector
          items={FIELDS}
          multiple={false}
          onChange={(items) => console.info({ items })}
        />
      </div>
      {/*  */}
      {map(state, (items, key) => (
        <div
          key={key}
          className="mb-4 grid w-full grid-cols-2 gap-8 border-b border-b-gray-300 pb-4"
        >
          <div>
            <div>
              <p className="mb-3 w-full text-left text-sm font-medium">Role:</p>
              <RoleSelector
                roles={roles}
                value={items?.role}
                onSelect={(val: Maybe<RoleTemplate>) => {
                  handleUpdateRole(val, "role", +key);
                }}
              />
            </div>
            <div>
              <p className="mb-3 w-full text-left text-sm font-medium">
                Company/project name:
              </p>
              <TextField
                name="title"
                style={{ padding: "10px" }}
                placeholder="Start typing here..."
                onChange={(e) => handleTextChange(e, +key)}
              />
            </div>
            <div className="mt-3">
              <p className="mb-3 w-full text-left text-sm font-medium">
                Timeline:
              </p>

              <Calendar
                containerClassName="w-full mb-4"
                buttonClassName="w-full rounded-xl"
                label="Start Date"
                onChange={(e) => handleUpdateRole(e, "startDate", +key)}
              />
              <Calendar
                containerClassName="w-full"
                buttonClassName="w-full rounded-xl"
                label="End Date"
                onChange={(e) => handleUpdateRole(e, "endDate", +key)}
              />
            </div>
          </div>
          <div>
            <div>
              <p className="mb-3 w-full text-left text-sm font-medium">
                Skills:
              </p>
              <SearchSkill
                setSkills={(skills: any) =>
                  handleUpdateRole(skills, "skills", +key)
                }
                skills={items?.skills}
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
                rows={5}
                name="bio"
                placeholder="Start typing here..."
                onChange={(e) => handleTextChange(e, +key)}
              />
            </div>
            <div className="mt-9 flex justify-between">
              <Button variant={`secondary`} className="flex items-center">
                <ArrowSmLeftIcon className="h-4 w-4 text-black" />
              </Button>
              <Button variant={`secondary`} onClick={handleAddExperience}>
                Add new experience
              </Button>
              <Button variant={`secondary`} className="flex items-center">
                <ArrowSmRightIcon className="h-4 w-4 text-black" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
