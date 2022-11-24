import {
  BatteryStepper,
  Button,
  Card,
  ColorPicker,
  Dropdown,
  EmojiSelector,
  TextArea,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { useReducer } from "react";

const TAGS = [
  { _id: 1, name: "DApp" },
  { _id: 2, name: "NFT" },
  { _id: 3, name: "Infra" },
  { _id: 4, name: "DeFi/DeSci" },
];

interface ProjectData {
  name: string;
  emoji: string;
  color: string;
  description: string;
  tags?: { _id: string; name: string };
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

export interface CreateProjectVeiws1Props {
  onBack: () => void;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: ProjectData) => void;
}

export const CreateProjectVeiws1 = ({
  onBack,
  onNext,
}: CreateProjectVeiws1Props) => {
  const [state, dispath] = useReducer(reducer, initialState);

  const handleUpdateState = (value: any, field: string) => {
    dispath({
      type: "HANDLE INPUT TEXT",
      field: field,
      payload: {
        value,
      },
    });
  };

  return (
    <Card shadow className="pt-3 pb-6">
      <div>
        <TextHeading3 className="ml-8 mb-4">
          Complete your profile:
        </TextHeading3>
        <div className="mb-4 flex items-center justify-between bg-green-100 p-7">
          <TextHeading3>
            Hello & Welcome! Let’s launch your first project🚀
          </TextHeading3>
          <BatteryStepper size="sm" batteryPercentage={10} />
        </div>
        <div className="px-7">
          <TextHeading3 className="mb-4">
            Start by naming your project and picking a visual 💯
          </TextHeading3>
          <div className="mb-3">
            <p className="text-sm font-medium">Name your project</p>
            <TextField
              value={state.name}
              placeholder="Start typing here..."
              onChange={(e) => handleUpdateState(e.target.value, "name")}
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
              />
              <ColorPicker
                width={100}
                onChange={(color) => handleUpdateState(color, "color")}
              />
            </div>
          </div>
          <div className="mb-3">
            <p className="mb-4 text-sm font-medium">
              Write short one-liner to introduce your project:
            </p>
            <TextArea
              onChange={(e) => {
                handleUpdateState(e.target.value, "description");
              }}
              placeholder="Start typing here..."
            />
          </div>
          <div className="mb-8">
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
