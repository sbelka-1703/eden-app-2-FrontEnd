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
  link: "",
  picture: "",
  positionName: "",
  startDate: "",
  title: "",
};

function reducer(state: PreviusProjectsInput, action: any): PreviusProjectsInput {
  switch (action.type) {
    case "HANDLE INPUT TEXT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    // case "editDescription":
    //   return { description: e.target.value };
    // case "editEndDate":
    //   return { endDate: e.target.value };
    // case "editLink":
    //   return { link: e.target.value };
    // case "editPositionName":
    //   return { positionName: e.target.value };
    // case "editStartDate":
    //   return { startDate: e.target.value };
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
  const [description, setDescription] = useState<string | null>(null);




  const handleTextChange = (e) => {
    dispath({
      type: '"HANDLE INPUT TEXT',
      field: e.target.name,
      payload: e.taget.value,
    });
    console.log(state);
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
            onChange={(val) => setTitle("")}
            placeholder="Company/project"
          />
          <TextField
            onChange={(val) => setTitle("")}
            placeholder="GitHub, .com"
          />
          <TextField
            onChange={(val) => setTitle("")}
            placeholder="LinkedIn, Upwork"
          />
          <Dropdown />
        </div>
        <div>
          <TextArea
            rows={9}
            placeholder="Type Role Desciption"
            onChange={(e) => handleTextChange(e)}
          />
        </div>
        <div className="space-y-1">
          <Calendar label="Start Date" />
          <Calendar label="End Date" />
        </div>
      </div>
    </Card>
  );
};
