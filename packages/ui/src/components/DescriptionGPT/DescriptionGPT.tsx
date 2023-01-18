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
  //   const [loadingButton, setLoadingButton] = useState(false);

  const [messageToGPT, { loading }] = useMutation(MESSAGE_TO_GTP, {
    onCompleted({ messageToGPT }) {
      if (messageToGPT) console.log("messageToGPT", messageToGPT.message);
      setMessage(messageToGPT.message);
      //   setLoadingButton(false);
    },
  });

  const onClickGPT = (category: Category) => {
    messageToGPT({
      variables: {
        fields: {
          message: title,
          category: category,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  const handleChange = (e: any) => {
    if (!message) {
      setTitle(e.target.value);
    } else {
      setMessage(e.target.value);
    }
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
        <Button variant="primary" onClick={() => onClickGPT(Category.Project)}>
          Eden AI Autocomplete
        </Button>
        {/* {!loadingButton ? (
          <Button
            variant="primary"
            onClick={() => onClickGPT(Category.Project)}
          >
            Eden AI Autocomplete
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => onClickGPT(Category.Project)}
          >
            <div className="flex items-center space-x-1">
              <span>Eden AI Autocomplete</span>

              <svg
                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                width="21px"
                height="21px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  opacity="0.2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="#000000"
                />
                <path
                  d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                  fill="#000000"
                />
              </svg>
            </div>
          </Button>
        )} */}
      </div>
    </>
  );
};
