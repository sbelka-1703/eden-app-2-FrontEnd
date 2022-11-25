import {
  BatteryStepper,
  Button,
  Card,
  SelectBox,
  SwitchButton,
  TextArea,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { useReducer, useState } from "react";

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
    case "HANDLE PROJECT VIEW 2 TEXT":
      return {
        ...state,
        [action.field]: action.payload.value,
      };
    default:
      return state;
  }
}

export interface CreateProjectVeiws2Props {
  onBack: () => void;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: ProjectData) => void;
}

export const CreateProjectVeiws2 = ({
  onBack,
  onNext,
}: CreateProjectVeiws2Props) => {
  const [state, dispath] = useReducer(reducer, initialState);
  const [projectOwner, setProjectOwner] = useState(true);
  const handleUpdateState = (value: any, field: string) => {
    console.log(value, field);
    // dispath({
    //   type: "HANDLE INPUT TEXT",
    //   field: field,
    //   payload: {
    //     value,
    //   },
    // });
  };

  const handleProjectOwner = (e: any) => {
    setProjectOwner(e.target.checked);
  };

  return (
    <Card shadow className="pt-3 pb-6">
      <div className="px-5">
        <div className="flex flex-row justify-between">
          <TextHeading3>Complete your profile:</TextHeading3>
          <BatteryStepper size="sm" batteryPercentage={30} />
        </div>
        <div>
          <div className="mb-3">
            <p className="mb-4 text-sm font-medium">
              Write a full description of your project
            </p>
            <TextArea
              onChange={(e) => {
                handleUpdateState(e.target.value, "description");
              }}
              placeholder="Start typing here..."
              rows={7}
            />
          </div>

          <div className="mb-3">
            <p className="mb-4 text-sm font-medium">
              Are you a champion of this project?
            </p>
            <SwitchButton
              name="projectOwnerToggle"
              onChange={handleProjectOwner}
              value={projectOwner}
            />
          </div>

          <div className="mb-3">
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
                      // value={discordUrl}
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div>
                    <p className="text-sm font-medium">
                      What's the main role of the champion?
                    </p>
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
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={onBack}>
              Back
            </Button>
            <Button variant="secondary" onClick={() => onNext(state)}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
