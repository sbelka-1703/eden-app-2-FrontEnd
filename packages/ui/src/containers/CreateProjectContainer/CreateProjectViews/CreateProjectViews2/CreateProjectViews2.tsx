import { Project } from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Card,
  TextArea,
  TextHeading3,
} from "@eden/package-ui";
import { Dispatch, SetStateAction, useReducer } from "react";
import { toast } from "react-toastify";

const initialState = {
  description: "",
  descriptionOneLine: "",
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

export interface CreateProjectViews2Props {
  projects?: any[];
  battery: number;
  setBattery: Dispatch<SetStateAction<number>>;
  onBack: Dispatch<SetStateAction<Project>>;
  onNext: Dispatch<SetStateAction<any>>;
  setProject: Dispatch<SetStateAction<any>>;
  project?: Project;
}

export const CreateProjectViews2 = ({
  onBack,
  battery,
  setBattery,
  onNext,
  setProject,
  project,
}: CreateProjectViews2Props) => {
  const [state, dispath] = useReducer(reducer, project || initialState);

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
    if (field == "descriptionOneLine") {
      setProject({
        ...project,
        descriptionOneLine: value,
      });
    }
  };

  const handleSetProject = (value: any) => {
    if (!value.descriptionOneLine) {
      toast.error("Please enter a short description");
      return;
    }
    setProject({
      ...project,
      description: value.description,
      descriptionOneLine: value.descriptionOneLine,
    });
    onNext(value);
  };

  return (
    <Card className={`pb-6 scrollbar-hide overflow-y-scroll h-85`}>
      <div className="">
        <div className="mb-4 flex items-center justify-between bg-green-100 p-7">
          <TextHeading3>Complete your Project:</TextHeading3>
          <BatteryStepper size="sm" batteryPercentage={battery} />
        </div>
        <div className="px-7">
          <div className="my-4">
            <TextArea
              label={`Write short one-liner to introduce your project:`}
              value={state.descriptionOneLine || ""}
              onChange={(e) => {
                handleUpdateState(e.target.value, "descriptionOneLine");
                setBattery(battery < 30 ? battery + 10 : battery);
              }}
              placeholder="Start typing here..."
              rows={2}
            />
          </div>
          <div className="my-4">
            <TextArea
              label={`Write a full description of your project: (Optional)`}
              value={state.description || ""}
              onChange={(e) => {
                handleUpdateState(e.target.value, "description");
                setBattery(battery < 40 ? battery + 10 : battery);
              }}
              placeholder="Start typing here..."
              rows={7}
            />
          </div>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={() => onBack(state)}>
              Back
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                handleSetProject(state);
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
