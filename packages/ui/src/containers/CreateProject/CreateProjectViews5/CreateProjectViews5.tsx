import {
  BatteryStepper,
  Button,
  Card,
  SwitchButton,
  TextArea,
  TextHeading3,
} from "@eden/package-ui";
import { useReducer, useState } from "react";

import { TextField } from "../../../elements";

interface ProjectData {
  username: string;
  description: string;
  selectedRole?: string;
  selectedTag?: string;
  selectedEmoji?: string;
  selectedColor?: string;
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

export interface CreateProjectViews5Props {
  onBack: () => void;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: ProjectData) => void;
}

export const CreateProjectViews5 = ({
  onBack,
  onNext,
}: CreateProjectViews5Props) => {
  const [state] = useReducer(reducer, initialState);
  const [hiringToggle, setHiringToggle] = useState(true);
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

  const handleHiringToggle = (e: any) => {
    setHiringToggle(e.target.checked);
  };

  return (
    <Card shadow className="pt-3 pb-6">
      <div className="px-5">
        <div className="flex flex-row justify-between">
          <div>
            <TextHeading3>Complete your profile:</TextHeading3>
            <div>
              <p className="text-base font-medium">{`Now let's add details?`}</p>
            </div>
          </div>
          <div>
            <BatteryStepper size="sm" batteryPercentage={80} />
          </div>
        </div>
        <div>
          <div className="mb-3 mt-3">
            <div>
              <div className="mb-3">
                <div>
                  <p className="text-base font-medium">
                    Write a description of this role:
                  </p>
                  <TextArea
                    onChange={(e) => {
                      handleUpdateState(e.target.value, "description");
                    }}
                    placeholder="Start typing here..."
                    rows={3}
                  />
                </div>
                <div className="mt-3 flex flex-row justify-between">
                  <div>
                    <p className="text-sm font-medium">{`Expectations:`}</p>
                    <TextArea
                      onChange={(e) => {
                        handleUpdateState(e.target.value, "description");
                      }}
                      placeholder="Start typing here..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{`Benefits:`}</p>
                    <TextArea
                      onChange={(e) => {
                        handleUpdateState(e.target.value, "description");
                      }}
                      placeholder="Start typing here..."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div>
                    <p className="text-sm font-medium">{`Details`}</p>
                  </div>
                  <div>
                    <div>
                      <p className="text-sm font-normal">{`How many hours a week can you contribute?`}</p>
                      <div className="flex flex-row content-center items-center">
                        <div className="w-20">
                          <TextField
                            name="hrs/week"
                            type="number"
                            defaultValue={"10"}
                            onChange={() => {
                              console.log("onchange");
                            }}
                          />
                        </div>
                        <div className="ml-3 text-sm font-normal text-gray-400">{`hours / week`}</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-normal">{`How many hours a week can you contribute?`}</p>
                      <div className="flex flex-row content-center items-center">
                        <div className="w-20">
                          <TextField
                            name="hrs/week"
                            type="number"
                            defaultValue={"100"}
                            onChange={() => {
                              console.log("onchange");
                            }}
                          />
                        </div>
                        <div className="ml-3 text-sm font-normal text-gray-400">{`$TRST / hour`}</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-normal">{`How long is the contract?`}</p>
                      <div className="flex flex-row content-center items-center justify-between">
                        <div className="flex flex-row content-center items-center">
                          <div className="w-20">
                            <TextField
                              name="hrs/week"
                              type="number"
                              defaultValue={"100"}
                              onChange={() => {
                                console.log("onchange");
                              }}
                            />
                          </div>
                          <div className="ml-3 text-sm font-normal text-gray-400">{`month`}</div>
                        </div>
                        <div className="flex flex-row content-center items-center">
                          <div className="ml-3 text-sm">{`Rolling contract`}</div>
                          <div>
                            <SwitchButton
                              name="rollingContract"
                              onChange={handleHiringToggle}
                              value={hiringToggle}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-normal">{`How many open position do you have?`}</p>
                      <div className="flex flex-row content-center items-center">
                        <div className="w-20">
                          <TextField
                            name="hrs/week"
                            type="number"
                            defaultValue={"10"}
                            onChange={() => {
                              console.log("onchange");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-between">
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
