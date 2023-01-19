import { gql, useMutation } from "@apollo/client";
import { Button, TextArea } from "@eden/package-ui";
import { useState } from "react";

const MESSAGE_TO_GTP = gql`
  mutation ($fields: messageToGPTInput!) {
    messageToGPT(fields: $fields) {
      message
    }
  }
`;

enum Category {
  Skill = "skill",
  Project = "project",
  Role = "role",
}

export interface IDescriptionGPTProps {}

export const DescriptionGPT = ({}: IDescriptionGPTProps) => {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const [messageToGPT] = useMutation(MESSAGE_TO_GTP, {
    onCompleted({ messageToGPT }) {
      if (messageToGPT) console.log("messageToGPT", messageToGPT.message);
      setMessage(messageToGPT.message);
      setLoadingButton(false);
    },
  });

  const onClickGPT = (prompt?: any, category?: Category) => {
    setLoadingButton(true);
    messageToGPT({
      variables: {
        fields: {
          message: title,
          category: category,
          prompt: prompt,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  const handleChange = (e: any) => {
    if (!message) {
      setTitle(e.target.value);
    } else {
      setTitle("");
      setMessage(e.target.value);
    }
    setMessage("");
  };

  return (
    <>
      <div className=" items-end space-y-2">
        <TextArea
          placeholder="Start writing the name of the project and let the Eden AI autocomplete it or type the full description "
          label="Project Description  "
          onChange={handleChange}
          value={message ? message : title}
          rows={8}
        />
        {!loadingButton ? (
          <Button
            variant="primary"
            //For category: onClick={() => onClickGPT(undefined, Category.Skill)}
            onClick={() => onClickGPT(prompt)}
          >
            Eden AI Autocomplete
          </Button>
        ) : (
          <Button variant="tertiary" loading={true}>
            Autocomplete in progress
          </Button>
        )}
      </div>
    </>
  );
};
