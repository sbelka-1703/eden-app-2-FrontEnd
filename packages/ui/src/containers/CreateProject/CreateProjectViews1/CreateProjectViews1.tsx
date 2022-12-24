import {
  BatteryStepper,
  Button,
  Card,
  // ColorPicker,
  EmojiSelector,
  TextArea,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { useReducer } from "react";

// const TAGS = [
//   { _id: 1, name: "DApp" },
//   { _id: 2, name: "NFT" },
//   { _id: 3, name: "Infra" },
//   { _id: 4, name: "DeFi/DeSci" },
// ];

interface ProjectData {
  name: string;
  emoji: string;
  color: string;
  description: string;
  // tags?: { _id: string; name: string };
}

const initialState = {
  name: "",
  emoji: "",
  color: "",
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

export interface CreateProjectViews1Props {
  data?: ProjectData;
  battery: number;
  // eslint-disable-next-line no-unused-vars
  setBattery: (level: number) => void;
  onBack?: () => void;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: ProjectData) => void;
}

export const CreateProjectViews1 = ({
  data,
  battery,
  setBattery,
  onBack,
  onNext,
}: CreateProjectViews1Props) => {
  const [state, dispath] = useReducer(reducer, data || initialState);

  const handleUpdateState = (value: any, field: string) => {
    dispath({
      type: "HANDLE INPUT TEXT",
      field: field,
      payload: {
        value,
      },
    });
  };

  const nextDisabled =
    !state.name || !state.description || !state.emoji || !state.color;

  return (
    <Card shadow className="bg-white pt-3 pb-6">
      <div>
        <TextHeading3 className="ml-8 mb-4">
          Complete your profile:
        </TextHeading3>
        <div className="mb-4 flex items-center justify-between bg-green-100 p-7">
          <TextHeading3>
            Hello & Welcome! Let’s launch your first project🚀
          </TextHeading3>
          <BatteryStepper
            size="sm"
            batteryPercentage={battery ? battery : 10}
            // batteryPercentage={battery}
          />
        </div>
        <div className="px-7">
          <TextHeading3 className="mb-4">
            Name your project and pick a visual!
          </TextHeading3>
          <div className="mb-3">
            <p className="text-sm font-medium">Name your project</p>
            <TextField
              value={state.name}
              placeholder="Start typing here..."
              onChange={(e) => {
                handleUpdateState(e.target.value, "name");
                setBattery(battery < 20 ? battery + 10 : battery);
                // setBattery(battery ? battery : 10 + 10);
              }}
            />
          </div>
          <div className="mb-3">
            <p className="mb-3 text-sm font-medium">
              Choose an emoji & color for your project
            </p>
            <div className="flex items-center gap-4">
              <EmojiSelector
                size={100}
                onSelection={(value) => handleUpdateState(value, "emoji")}
                bgColor={state.color || "#e8e8e8"}
              />
              {/* removed this one cos couldn't make it work */}
              {/* <ColorPicker
                width={100}
                onChange={(color) => {
                  handleUpdateState(color, "color");
                }}
              /> */}
              <div className="flex h-[100px] w-[100px] items-center overflow-hidden rounded-full border-2 border-zinc-400/50">
                <input
                  type="color"
                  className="-m-2 h-[140px] w-[140px] cursor-pointer"
                  value={state.color}
                  onChange={(e) => handleUpdateState(e.target.value, "color")}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <p className="mb-4 text-sm font-medium">
              Write short one-liner to introduce your project:
            </p>
            <TextArea
              value={state.description}
              onChange={(e) => {
                handleUpdateState(e.target.value, "description");
                setBattery(battery < 30 ? battery + 10 : battery);
              }}
              placeholder="Start typing here..."
              rows={2}
            />
          </div>
          {/* <div className="mb-8">
            <p className="mb-4 text-sm font-medium">
              Select tags that best describe your project:
            </p>
            <Dropdown
              multiple
              radius="pill"
              placeholder="Select a tag"
              items={TAGS}
              onSelect={(tags) => {
                handleUpdateState(tags, "tags");
              }}
            />
          </div> */}
          <div className="flex justify-between">
            {JSON.stringify(state)}
            <div>
              {onBack && (
                <Button variant="secondary" onClick={onBack}>
                  Back
                </Button>
              )}
            </div>
            <Button
              variant="secondary"
              disabled={nextDisabled}
              onClick={() => onNext(state)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
