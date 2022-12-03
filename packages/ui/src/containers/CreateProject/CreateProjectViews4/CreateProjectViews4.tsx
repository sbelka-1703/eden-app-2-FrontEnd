import {
  BatteryStepper,
  Button,
  Card,
  ColorPicker,
  EmojiSelector,
  SelectBox,
  SwitchButton,
  TextArea,
  TextHeading3,
} from "@eden/package-ui";
import { useReducer, useState } from "react";

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

export interface CreateProjectViews4Props {
  onBack: () => void;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: ProjectData) => void;
}

export const CreateProjectViews4 = ({
  onBack,
  onNext,
}: CreateProjectViews4Props) => {
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
    <Card shadow className="bg-white pt-3 pb-6">
      <div className="px-5">
        <div className="flex flex-row justify-between">
          <div>
            <TextHeading3>Complete your profile:</TextHeading3>
            <div>
              <p className="text-base font-medium">Are you actively hiring?</p>
              <p className="text-xs font-normal text-slate-500">
                Please fill out a seprate card for each unique position.
              </p>
              <p className="text-xs font-normal text-slate-500">
                Specify how many seats is open for each position.
              </p>
            </div>
            <div className="mt-2">
              <SwitchButton
                name="hiringToggle"
                onChange={handleHiringToggle}
                value={hiringToggle}
              />
            </div>
          </div>
          <div>
            <BatteryStepper size="sm" batteryPercentage={60} />
          </div>
        </div>
        <div>
          <div className="mb-3 mt-3">
            {hiringToggle && (
              <div>
                <div className="mb-3">
                  <div>
                    <p className="text-base font-medium">
                      You can add as many position as you want.
                    </p>
                    <p className="text-base font-medium">
                      Start with this one!
                    </p>
                  </div>
                  <div className="mt-3 w-4/6">
                    <div>
                      <p className="text-sm font-normal">
                        {`What role are you looking to fill`}
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
                  <div className="mt-3">
                    <div>
                      <p className="text-sm font-normal">
                        {`Write a short one-liner to explain the role:`}
                      </p>
                    </div>
                    <div>
                      <TextArea
                        onChange={(e) => {
                          handleUpdateState(e.target.value, "description");
                        }}
                        placeholder="Start typing here..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-4/6">
                    <div>
                      <p className="text-sm font-normal">
                        {`Select tags that best describe the role:`}
                      </p>
                    </div>
                    <div className="w-2/4">
                      <SelectBox
                        multiple
                        caption={"Select a tag"}
                        items={[]}
                        onChange={(selectedItems) => {
                          console.log(selectedItems);
                        }}
                        btnBGcolor="bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-4/6">
                    <div>
                      <p className="text-sm font-normal">
                        {`Choose an emoji & color for your role`}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <div className="p-3">
                        <EmojiSelector
                          size={80}
                          onSelection={(value) =>
                            handleUpdateState(value, "emoji")
                          }
                        />
                      </div>
                      <div className="p-3">
                        <ColorPicker
                          width={80}
                          onChange={(color) =>
                            handleUpdateState(color, "color")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
