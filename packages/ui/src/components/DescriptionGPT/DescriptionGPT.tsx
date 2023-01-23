import { gql, useMutation } from "@apollo/client";
import { Button, TextArea } from "@eden/package-ui";
import { useState } from "react";

export const MESSAGE_TO_GTP = gql`
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
  const [responseFromGTP, setResponseFromGTP] = useState("");
  const [messageToGTP, setMessageToGTP] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const [messageToGPT] = useMutation(MESSAGE_TO_GTP, {
    onCompleted({ messageToGPT }) {
      if (messageToGPT) console.log("messageToGPT", messageToGPT);
      setResponseFromGTP(messageToGPT.message);
      setLoadingButton(false);
    },
  });

  const autocomplete =
    "I give you a sentence or two and you keep those sentences, deduce meaning and continue writing the next few sentences within that same context.\n\nExample: \nI write: A plumber is a tradesperson who specializes in installing and maintaining systems used for water, sewage and drainage. \nYou continue:  A plumber is a tradesperson who specializes in installing and maintaining systems used for water, sewage and drainage.  They are responsible for installing, repairing and maintaining pipes, fixtures and other plumbing equipment. Plumbers also inspect structures to identify any potential problems, such as clogged drains, leaking pipes and faulty water heaters. In addition, they install appliances such as dishwashers and water heaters, and may be asked to perform basic carpentry work to install kitchen and bathroom cabinets.\n\n Today was a crazy day in the lab, instruments were not working and our computer system went down. \n\nToday was a crazy day in the lab, instruments were not working and our computer system went down. Everyone was scrambling to find a solution, with no luck. After a few hours of troubleshooting, we realized that we needed to call in a professional. We contacted a local plumber, who arrived quickly and was able to diagnose the problem in no time. He was able to repair the faulty wiring and get our instruments and computer system back up and running. We were extremely thankful for his expertise, and all of the researchers were relieved that our experiments could get back on track.\n\nI was a CTO in a web3 company for 3 years and our focus was NFTs. We were able to make a revenue of $10 per year. \n\nI was a CTO in a web3 company for 3 years and our focus was NFTs. We were able to make a revenue of $10 million per year by developing a platform where users could buy and sell digital assets. We built a team of experts in the blockchain space, who worked tirelessly to ensure the success of our project. Our platform was well-received and we gained a lot of traction in the digital asset space. As our platform continued to grow, we began to explore more ways to monetize our product. We implemented a variety of marketing strategies, including running ads on social media, forming partnerships with influencers, and creating new products such as NFTs. We also invested in research and development to create innovative products that would give our customers an edge in the marketplace. In the end, our hard work and dedication paid off, and our company was able to generate $10 million in revenue over the course of three years.";

  const onClickGPT = (prompt?: any, category?: Category) => {
    setLoadingButton(true);
    messageToGPT({
      variables: {
        fields: {
          message: autocomplete + messageToGTP,
          category: category,
          prompt: prompt,
        },
      },
      context: { serviceName: "soilservice" },
    });
    console.log(prompt);
  };

  const handleChange = (e: any) => {
    if (!responseFromGTP) {
      setMessageToGTP(e.target.value);
      console.log("messageToGTP", messageToGTP);
    } else {
      setMessageToGTP("");
      setResponseFromGTP(e.target.value);
      console.log("responseFromGTP", responseFromGTP);
    }
  };

  return (
    <>
      <div className=" items-end space-y-2">
        <TextArea
          placeholder="Start writing the name of the project and let the Eden AI autocomplete it or type the full description "
          label="Project Description  "
          onChange={handleChange}
          value={responseFromGTP ? responseFromGTP : messageToGTP}
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
