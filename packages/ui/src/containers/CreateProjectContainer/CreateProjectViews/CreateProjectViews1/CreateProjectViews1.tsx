import { Project } from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  EmojiSelector,
  ServerSelectorMulti,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { Dispatch, SetStateAction, useReducer } from "react";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  emoji: "",
  backColorEmoji: "",
  serverID: [],
};

function reducer(state: Project, action: any): Project {
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
  battery?: number;
  setBattery: Dispatch<SetStateAction<number>>;
  // onBack?: Dispatch<SetStateAction<any>>;
  onNext: Dispatch<SetStateAction<any>>;
  setProject: Dispatch<SetStateAction<any>>;
  project?: Project;
}

export const CreateProjectViews1 = ({
  battery = 0,
  setBattery,
  // onBack,
  onNext,
  setProject,
  project,
}: CreateProjectViews1Props) => {
  const [state, dispath] = useReducer(reducer, project || initialState);
  const nextDisabled = !state.title || state.serverID?.length == 0;
  const handleUpdateState = (value: any, field: string) => {
    dispath({
      type: "HANDLE INPUT TEXT",
      field: field,
      payload: {
        value,
      },
    });
    if (field == "title") {
      setProject({
        ...project,
        title: value,
      });
    }
    if (field == "emoji") {
      setProject({
        ...project,
        emoji: value,
      });
    }
    if (field == "backColorEmoji") {
      setProject({
        ...project,
        backColorEmoji: value,
      });
    }
    if (field == "serverID") {
      setProject({
        ...project,
        serverID: value,
      });
    }
  };

  const handleSetProject = (value: any) => {
    setProject({
      ...project,
      title: value.name,
      descriptionOneLine: value.description,
      emoji: value.emoji,
      backColorEmoji: value.backColorEmoji,
      serverID: value.serverID,
    });
  };
  const handleNext = (value: any) => {
    if (!nextDisabled) {
      handleSetProject(value);
      onNext(value);
    } else {
      if (!!!state.title) {
        toast.error("Please Enter Project Name");
      }
      if (state.serverID?.length == 0) {
        toast.error("Please Select at least one Server");
      }
    }
  };

  return (
    <Card className={`pb-6 scrollbar-hide overflow-y-scroll h-85`}>
      <div className="mb-4 flex items-center justify-between bg-green-100 p-7">
        <TextHeading3>
          {` Hello & Welcome! Let’s launch your first project🚀`}
        </TextHeading3>
        <BatteryStepper size="sm" batteryPercentage={battery ? battery : 5} />
      </div>
      <div className="px-7">
        <TextHeading3 className="mb-4">
          Name your project and pick a visual!
        </TextHeading3>
        <div className="mb-3">
          <TextField
            label={`Name your project`}
            value={state.title || ""}
            placeholder="Start typing here..."
            onChange={(e) => {
              handleUpdateState(e.target.value, "title");
              setBattery(battery < 20 ? battery + 10 : battery);
            }}
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-medium">
            {`Please Choose a Discord Server to get Applicants from`}
          </p>
          <ServerSelectorMulti
            // value={state.serverID as string[]}
            onChange={(val) => {
              handleUpdateState(val, "serverID");
              setBattery(battery < 30 ? battery + 10 : battery);
            }}
          />
        </div>
        <div className="my-4">
          <p className="mb-3 text-sm font-medium">
            {`Choose an emoji & color for your project`}
          </p>
          <div className="flex items-center gap-4">
            <EmojiSelector
              size={60}
              emoji={state.emoji || "👋"}
              onSelection={(value) => handleUpdateState(value, "emoji")}
              bgColor={state.backColorEmoji || "#e8e8e8"}
            />
            <div className="flex h-[60px] w-[60px] items-center overflow-hidden rounded-full border-2 border-zinc-400/50">
              <input
                type="color"
                className="-m-2 h-[140px] w-[140px] cursor-pointer"
                value={state.backColorEmoji || "#e8e8e8"}
                onChange={(e) =>
                  handleUpdateState(e.target.value, "backColorEmoji")
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div></div>
          <Button
            variant="secondary"
            onClick={() => {
              handleNext(state);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};
