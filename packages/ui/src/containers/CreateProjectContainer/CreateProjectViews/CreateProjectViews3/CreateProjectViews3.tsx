import {
  BatteryStepper,
  Button,
  Calendar,
  Card,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { XIcon } from "@heroicons/react/solid";
import { useReducer } from "react";

interface Milestone {
  _id: number;
  title?: string;
  endDate?: string;
  startDate?: string;
}

interface ProfileData {
  past: Milestone[];
  current: Milestone;
  future: Milestone[];
}

const initialState = {
  past: [{ _id: 0, title: "", startDate: "", endDate: "" }],
  current: { _id: 0, title: "", startDate: "", endDate: "" },
  future: [{ _id: 0, title: "", startDate: "", endDate: "" }],
};

function reducer(state: ProfileData, action: any): ProfileData {
  switch (action.type) {
    case "current": {
      state.current = {
        ...state.current,
        [action.field]: action.payload.value,
      };

      return {
        ...state,
      };
    }

    case "past":
    case "future": {
      const newState = state[action.type as "past" | "future"];

      newState[action.payload.index] = {
        ...newState[action.payload.index],
        [action.field]: action.payload.value,
      };

      return {
        ...state,
        [action.type]: newState,
      };
    }

    case "addPast":
    case "addFuture": {
      const type = action.type.replace("add", "").toLowerCase();
      const newState = state[type as "past" | "future"];

      newState.push({
        _id: newState.length,
        title: "",
        startDate: "",
        endDate: "",
      });

      return {
        ...state,
        [type]: newState,
      };
    }

    case "removePast":
    case "removeFuture": {
      const type = action.type.replace("remove", "").toLowerCase();
      const newState = state[type as "past" | "future"];

      newState.splice(action.payload.index, 1);

      return {
        ...state,
        [type]: newState,
      };
    }
    default:
      return state;
  }
}

export interface CreateProjectViews3Props {
  onBack: () => void;
  onSkip: () => void;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: ProfileData) => void;
}

export const CreateProjectViews3 = ({
  onBack,
  onSkip,
  onNext,
}: CreateProjectViews3Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleUpdateState = ({
    index,
    field,
    value,
    type,
  }: {
    value: any;
    field: string;
    index?: number;
    type: "past" | "future" | "current";
  }) => {
    dispatch({
      type,
      field: field,
      payload: {
        value,
        index,
      },
    });
  };

  const handleAddMilestone = (type: "addPast" | "addFuture") => {
    dispatch({
      type: type,
    });
  };

  const handleRemoveMilestone = (
    type: "removePast" | "removeFuture",
    index: number
  ) => {
    dispatch({
      type: type,
      payload: { index },
    });
  };

  return (
    <Card shadow className="bg-white px-7 pt-3 pb-6">
      <div>
        <TextHeading3>Complete your profile:</TextHeading3>
        <div className="mb-4 flex items-center justify-between gap-6">
          <div>
            <TextHeading3>Share your progress!</TextHeading3>
            <p className="text-sm text-gray-400">
              Please talk about your achievements, current and planned
              milestones. Include date and a title!
            </p>
          </div>
          <BatteryStepper size="sm" batteryPercentage={40} />
        </div>
        <div>
          <p className="text-sm font-medium">Past Milestones:</p>
          <p className="text-sm text-gray-400">Please include at least one!</p>
          {state.past.map((item: Milestone, index) => (
            <div className="mb-2" key={item._id}>
              <div className="flex justify-between gap-6">
                <div className="relative">
                  <TextField
                    radius="pill"
                    value={item.title}
                    placeholder="Please type here..."
                    onChange={(e) =>
                      handleUpdateState({
                        index,
                        value: e.target.value,
                        type: "past",
                        field: "title",
                      })
                    }
                  />
                  {state.past.length > 1 && (
                    <XIcon
                      width={16}
                      className="absolute right-2 top-2/4 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => handleRemoveMilestone("removePast", index)}
                    />
                  )}
                </div>
                <div className="flex justify-between gap-3">
                  <Calendar
                    label="Start Date"
                    timePicker={false}
                    onChange={(val) =>
                      handleUpdateState({
                        index,
                        value: val,
                        type: "past",
                        field: "startDate",
                      })
                    }
                  />
                  <Calendar
                    label="End Date"
                    timePicker={false}
                    onChange={(val) =>
                      handleUpdateState({
                        index,
                        value: val,
                        type: "past",
                        field: "endDate",
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            className="mt-4"
            variant={`secondary`}
            onClick={() => handleAddMilestone("addPast")}
          >
            Add new
          </Button>
        </div>
        <div className="mt-10 mb-5">
          <p className="text-sm font-medium">Current Milestone</p>
          <p className="text-sm text-gray-400">
            There could be only one current milestone!
          </p>
          <div className="flex justify-between gap-6">
            <div>
              <TextField
                radius="pill"
                value={state.current.title}
                placeholder="Please type here..."
                onChange={(e) =>
                  handleUpdateState({
                    value: e.target.value,
                    type: "current",
                    field: "title",
                  })
                }
              />
            </div>
            <div className="flex justify-between gap-3">
              <Calendar
                label="Start Date"
                timePicker={false}
                onChange={(val) =>
                  handleUpdateState({
                    value: val,
                    type: "past",
                    field: "startDate",
                  })
                }
              />
              <Calendar
                label="End Date"
                timePicker={false}
                onChange={(val) =>
                  handleUpdateState({
                    value: val,
                    type: "past",
                    field: "endDate",
                  })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">Future Milestones</p>
          <p className="text-sm text-gray-400">Please include at least one!</p>
          {state.future.map((item: Milestone, index) => (
            <div className="mb-2" key={item._id}>
              <div className="flex justify-between gap-6">
                <div className="relative">
                  <TextField
                    radius="pill"
                    value={item.title}
                    placeholder="Please type here..."
                    onChange={(e) =>
                      handleUpdateState({
                        index,
                        value: e.target.value,
                        type: "future",
                        field: "title",
                      })
                    }
                  />
                  {state.future.length > 1 && (
                    <XIcon
                      width={16}
                      className="absolute right-2 top-2/4 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() =>
                        handleRemoveMilestone("removeFuture", index)
                      }
                    />
                  )}
                </div>
                <div className="flex justify-between gap-3">
                  <Calendar
                    label="Start Date"
                    timePicker={false}
                    onChange={(val) =>
                      handleUpdateState({
                        index,
                        value: val,
                        type: "future",
                        field: "startDate",
                      })
                    }
                  />
                  <Calendar
                    label="End Date"
                    timePicker={false}
                    onChange={(val) =>
                      handleUpdateState({
                        index,
                        value: val,
                        type: "future",
                        field: "endDate",
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            className="mt-4"
            variant={`secondary`}
            onClick={() => handleAddMilestone("addFuture")}
          >
            Add new
          </Button>
        </div>

        <div className="mt-10 flex justify-between">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button variant="secondary" onClick={onSkip}>
            Skip
          </Button>
          <Button variant="secondary" onClick={() => onNext(state)}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};
