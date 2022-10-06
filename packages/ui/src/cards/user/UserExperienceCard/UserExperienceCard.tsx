import { PreviusProjectsInput } from "@eden/package-graphql/generated";
import { Button, Calendar, Card, TextArea, TextField } from "@eden/package-ui";
import { useReducer } from "react";

export interface UserExperienceCardlProps {
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (val: any) => void;
}

const initialState = {
  description: "",
  endDate: "",
  gitHub: "",
  linkedInOrUpwork: "",
  picture: "",
  positionName: "",
  startDate: "",
  title: "",
};

function reducer(
  state: PreviusProjectsInput,
  action: any
): PreviusProjectsInput {
  switch (action.type) {
    case "HANDLE INPUT TEXT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "editEndDate":
      return { endDate: action.payload };
    case "editStartDate":
      return { startDate: action.payload };
    default:
      return state;
  }
}

export const UserExperienceCard = ({}: // handleSubmit,
UserExperienceCardlProps) => {
  const [state, dispath] = useReducer(reducer, initialState);
  // const [description, setDescription] = useState<string | null>(null);

  const handleTextChange = (e: any) => {
    dispath({
      type: "HANDLE INPUT TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
    console.log("state ==>>", state);
  };

  return (
    <Card shadow className="p-0">
      <div className=" flex flex-col items-center">
        <div className=" py-10">
          <p className="text-3xl">Share relevant experiences!</p>
        </div>
        <div className="flex w-full justify-between">
          <div className="w-full">
            <TextField
              onChange={(e) => handleTextChange(e)}
              placeholder="Position"
              name="positionName"
            />
            <TextField
              onChange={(e) => handleTextChange(e)}
              placeholder="Company/project"
              name="title"
            />
            <TextField
              onChange={(e) => handleTextChange(e)}
              placeholder="GitHub, .com"
              name="gitHub"
            />
            <TextField
              onChange={(e) => handleTextChange(e)}
              placeholder="LinkedIn, Upwork"
              name="linkedInOrUpwork"
            />
          </div>
          <div className="w-full">
            <TextArea
              name="description"
              rows={6}
              placeholder="Type Role Desciption"
              onChange={(e) => handleTextChange(e)}
            />
          </div>
          <div className="flex w-full flex-col items-center space-y-1">
            <Button radius="rounded">DONE</Button>
            <Calendar
              label="Start Date"
              onChange={(e) => handleTextChange(e)}
            />
            <Calendar label="End Date" onChange={(e) => handleTextChange(e)} />
          </div>
        </div>
      </div>
    </Card>
  );
};
