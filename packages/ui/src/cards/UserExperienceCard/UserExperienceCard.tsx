import React from "react";
import { Card, Dropdown, TextField } from "../../elements";
import { useState, useReducer } from "react";
import { TextArea } from "../../elements/TextAreaComponent";
import { Calendar } from "../../components/CalendarComp";
import { PreviusProjectsInput, Role } from "@graphql/eden/generated";
export interface UserExperienceCardlProps {
  // avatar?: string;
  // title?: string;
  // description?: string;
  // onUpdateFavorite?: () => void;
  // onMoreInfoClick?: () => void;
  handleSubmit: (val: any) => void;
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
    // case "editDescription":
    //   return { description: state.description = action.payload };
    case "editEndDate":
      return { endDate: action.payload };
    // case "editLink":
    //   return { link: e.target.value };
    // case "editPositionName":
    //   return { positionName: e.target.value };
    case "editStartDate":
      return { startDate: action.payload };
    // case "editTitle":
    //   return { title: e.target.value };
    default:
      return state;
  }
}

export const UserExperienceCard = ({
  handleSubmit,
}: UserExperienceCardlProps) => {
  const [title, setTitle] = useState("");
  const [state, dispath] = useReducer(reducer, initialState);
  // const [description, setDescription] = useState<string | null>(null);

  const handleTextChange = (e) => {
    
    dispath({
      type: "HANDLE INPUT TEXT",
      field: e.target.name,
      payload: e.target.value,
    });
    console.log("state ==>>", state);
  };
  return (
    <Card shadow className="p-0">
      <div className="mx-auto px-[170px] py-10">
        <p className="text-3xl">Share relevant experiences!</p>
      </div>
      <div className="flex space-x-6">
        <div>
          <TextField onChange={(val) => setTitle("")} placeholder="Position" />
          <TextField
            onChange={(e) => handleTextChange(e)}
            placeholder="Company/project"
            name="positionName"
          />
          <TextField
            onChange={(e) => handleTextChange(e)}
            placeholder="GitHub, .com"
            name="gitHub"
          />
          <TextField
            onChange={(val) => setTitle("")}
            placeholder="LinkedIn, Upwork"
            name="linkedInOrUpwork"
          />
          <Dropdown />
        </div>
        <div>
          <TextArea
            name="description"
            rows={9}
            placeholder="Type Role Desciption"
            onChange={(e) => handleTextChange(e)}
          />
        </div>
        <div className="space-y-1">
          {/* <Calendar  label="Start Date" onChange={(e) => dispath({type: 'editStartDate', payload: e.target.value})} /> */}
          <Calendar  label="Start Date" onChange={(e) => handleTextChange(e)} />
          <Calendar label="End Date" onChange={(e) => handleTextChange(e)} />
        </div>
      </div>
    </Card>
  );
};
