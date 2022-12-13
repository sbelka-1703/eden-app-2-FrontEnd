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
  description: string;
  expectations: string;
  benefits: string;
  rate: number;
  hrsWeek: number;
  contractTime: number;
  positions: number;
}

const initialState: ProjectData = {
  description: "",
  expectations: "",
  benefits: "",
  rate: 10,
  hrsWeek: 10,
  contractTime: 100,
  positions: 10,
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

export interface CreateProjectViews5Props {
  onBack: () => void;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: ProjectData) => void;
}

export const CreateProjectViews5 = ({
  onBack,
  onNext,
}: CreateProjectViews5Props) => {
  const [state, dispath] = useReducer(reducer, initialState);
  const [hiringToggle, setHiringToggle] = useState(true);

  const handleUpdateState = (value: any, field: string) => {
    dispath({
      type: "HANDLE INPUT TEXT",
      field: field,
      payload: {
        value,
      },
    });
  };

  const handleHiringToggle = (e: any) => {
    setHiringToggle(e.target.checked);
  };

  return (
    <Card shadow className="bg-white pt-3 pb-6">
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
                    value={state.description}
                    onChange={(e) => {
                      handleUpdateState(e.target.value, "description");
                    }}
                    rows={3}
                    placeholder="Start typing here..."
                  />
                </div>
                <div className="mt-3 flex flex-row justify-between">
                  <div>
                    <p className="text-sm font-medium">{`Expectations:`}</p>
                    <TextArea
                      value={state.expectations}
                      onChange={(e) => {
                        handleUpdateState(e.target.value, "expectations");
                      }}
                      placeholder="Start typing here..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{`Benefits:`}</p>
                    <TextArea
                      value={state.benefits}
                      onChange={(e) => {
                        handleUpdateState(e.target.value, "benefits");
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
                            type="number"
                            value={state.hrsWeek}
                            onChange={(e) => {
                              handleUpdateState(+e.target.value, "hrsWeek");
                            }}
                          />
                        </div>
                        <div className="ml-3 text-sm font-normal text-gray-400">{`hours / week`}</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-normal">{`What’s your hourly rate?`}</p>
                      <div className="flex flex-row content-center items-center">
                        <div className="w-20">
                          <TextField
                            name="rate"
                            type="number"
                            value={state.rate}
                            onChange={(e) => {
                              handleUpdateState(+e.target.value, "rate");
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
                              type="number"
                              name="contractTime"
                              value={state.contractTime}
                              onChange={(e) => {
                                handleUpdateState(
                                  +e.target.value,
                                  "contractTime"
                                );
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
                            name="positions"
                            type="number"
                            value={state.positions}
                            onChange={(e) => {
                              handleUpdateState(+e.target.value, "description");
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
