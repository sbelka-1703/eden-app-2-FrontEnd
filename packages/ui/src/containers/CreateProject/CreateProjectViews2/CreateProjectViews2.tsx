import { Project } from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  // SelectBoxNode,
  TextArea,
  TextHeading3,
} from "@eden/package-ui";
// import { isEmpty, map } from "lodash";
import { Dispatch, SetStateAction, useReducer } from "react";
interface ProjectData {
  username: string;
  description: string;
  selectedRole?: string;
}

const initialState = {
  username: "",
  selectedRole: "",
  description: "",
};

function reducer(state: ProjectData, action: any): ProjectData {
  switch (action.type) {
    case "HANDLE INPUT TEXT":
      return {
        ...state,
        [action.field]: action.payload.value,
      };
    default:
      return state;
  }
}

export interface CreateProjectViews2Props {
  projects?: any[];
  battery: number;
  // eslint-disable-next-line no-unused-vars
  setBattery: (level: number) => void;
  onBack: () => void;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: ProjectData) => void;
  setProject: Dispatch<SetStateAction<any>>;
  project?: Project;
}

export const CreateProjectViews2 = ({
  onBack,
  battery,
  setBattery,
  onNext,
  // eslint-disable-next-line no-unused-vars
  projects = [],
  setProject,
  project,
}: CreateProjectViews2Props) => {
  const [state, dispath] = useReducer(reducer, initialState);
  // const [projectOwner, setProjectOwner] = useState(true);

  const handleUpdateState = (value: any, field: string) => {
    dispath({
      type: "HANDLE INPUT TEXT",
      field: field,
      payload: {
        value,
      },
    });
    if (field == "description") {
      setProject({
        ...project,
        description: value,
      });
    }
  };

  const handleSetProject = (value: any) => {
    setProject({
      ...project,
      description: value.description,
    });
  };

  // const handleProjectOwner = (e: any) => {
  //   setProjectOwner(e.target.checked);
  // };

  return (
    <Card shadow className="bg-white pt-3 pb-6">
      <div className="px-5">
        <div className="flex flex-row justify-between">
          <TextHeading3>Complete your profile:</TextHeading3>
          <BatteryStepper size="sm" batteryPercentage={battery} />
        </div>
        <div>
          {/* <div className="mb-4">
            <p className="mb-2 text-sm font-medium">
              Pick what is your project Type
            </p>
            <div className="flex gap-1">
              {!isEmpty(projects) &&
                map(projects, (item: any, key: number) => (
                  <SelectBoxNode
                    multiple
                    key={key}
                    caption={item?.name}
                    items={item?.subNodes}
                    onChange={(val) => {
                      console.log("val", val);
                      setBattery(battery < 60 ? battery + 10 : battery);
                      // setSelectedItems((prevState) => ({
                      //   ...prevState,
                      //   [item?._id]: val,
                      // }));
                    }}
                  />
                ))}
            </div>
          </div> */}
          <div className="mb-3">
            <p className="mb-4 text-sm font-medium">
              Write a full description of your project:
              <span className="text-xs text-gray-500"> (Optional)</span>
            </p>
            <TextArea
              onChange={(e) => {
                handleUpdateState(e.target.value, "description");
                setBattery(battery < 40 ? battery + 10 : battery);
              }}
              placeholder="Start typing here..."
              rows={7}
            />
          </div>

          {/* <div className="mb-3">
            <p className="mb-4 text-sm font-medium">
              Are you a champion of this project?
            </p>
            <SwitchButton
              name="projectOwnerToggle"
              onChange={handleProjectOwner}
              value={projectOwner}
            />
          </div> */}

          {/* <div className="mb-3">
            {projectOwner && (
              <div>
                <div className="mb-3">
                  <div>
                    <p className="text-sm font-medium">
                      Tell us more about the champion!
                    </p>
                    <p className="text-xs font-normal text-slate-500">
                      To become a champion of the project one must have a
                      profile on Eden.
                    </p>
                  </div>
                  <div className="w-2/4">
                    <TextField
                      radius="pill"
                      name="username"
                      placeholder={`Type @username`}
                      onChange={(e) => {
                        handleUpdateState(e.target.value, "username");
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div>
                    <div className="text-sm font-medium">
                      {`What's the main role of the champion?`}
                    </div>
                  </div>
                  <div className="w-2/4">
                    <SelectBox
                      caption={"Select a role"}
                      items={[]}
                      onChange={(selectedItems) => {
                        console.log(selectedItems);
                      }}
                      btnBGcolor="bg-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div> */}

          <div className="flex justify-between">
            <Button variant="secondary" onClick={onBack}>
              Back
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                handleSetProject(state);
                onNext(state);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
