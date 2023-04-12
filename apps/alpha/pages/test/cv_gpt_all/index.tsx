import { gql, useMutation } from "@apollo/client";
import { Button, DynamicSearchGraph } from "@eden/package-ui";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface Jobs {
  job: string;
  description: string;
}

export const CV_TO_SUMMARY = gql`
  mutation ($fields: CVtoSummaryInput!) {
    CVtoSummary(fields: $fields) {
      result
    }
  }
`;

export const CV_TO_JOBS = gql`
  mutation ($fields: CVtoJobsInput!) {
    CVtoJobs(fields: $fields) {
      result
    }
  }
`;

export const CV_TO_NODES = gql`
  mutation ($fields: cvMapKGInput!) {
    cvMapKG(fields: $fields) {
      keywords {
        keyword
        confidence
        nodeID
        node {
          _id
          name
        }
      }
    }
  }
`;
const HolisticCvGPT = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [jobSummary, setJobSummary] = useState<string | null>(null);
  const [nodes, setNodes] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [CVtoSummary] = useMutation(CV_TO_SUMMARY, {
    onCompleted({ CVtoSummary }) {
      console.log("CVtoSummary", CVtoSummary);
      console.log("CVtoSummary.result", CVtoSummary.result);
      setSummary(CVtoSummary.result);
    },
  });

  const [CVtoJobs] = useMutation(CV_TO_JOBS, {
    onCompleted({ CVtoJobs }) {
      console.log("CVtoJobSummary", CVtoJobs);
      console.log("CVtoJobSummary.result", CVtoJobs.result);
      setJobSummary(CVtoJobs.result);
    },
  });

  const [CVtoNodes] = useMutation(CV_TO_NODES, {
    onCompleted({ cvMapKG }) {
      const nodeIDs = cvMapKG.keywords.map((node: any) => node.nodeID);

      setNodes(nodeIDs);
      setIsLoading(false);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64File = ((reader.result as string) || "").split(",")[1];
      const response = await fetch("../api/process-pdf/process-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileBuffer: base64File }),
      });

      if (response.ok) {
        const { text } = await response.json();

        CVtoSummary({ variables: { fields: { cvString: text } } });

        CVtoJobs({ variables: { fields: { cvString: text } } });

        CVtoNodes({ variables: { fields: { message: text } } });

        console.log(text);
      } else {
        const { error } = await response.json();

        console.log("error aaa", error);
      }
    };

    reader.readAsDataURL(file);
  };
  const summaryList = summary
    ? summary
        .split("•")
        .filter((item) => item.trim() !== "")
        .map((item, index) => <li key={index}>{item}</li>)
    : [];

  const jobList = jobSummary
    ? JSON.parse(jobSummary).map((item: Jobs, index: number) => (
        <li key={index}>
          {item.job}
          <ul>
            <li>{"-" + item.description}</li>
          </ul>
        </li>
      ))
    : [];

  return (
    <div className="w-5/12 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-2"
      >
        <label>Resume(CV)</label>
        <label htmlFor="input" className="text-center text-sm">
          Upload Recent Resume And Get Back Skills
        </label>
        <input
          className="ml-60"
          onChange={handleFileChange}
          type="file"
          accept=".pdf"
        ></input>

        <Button loading={isLoading} type="submit" variant="primary">
          {isLoading ? "Uploading Resume..." : "Upload Resume"}
        </Button>
      </form>

      {summary && jobSummary ? (
        <div className="flex flex-col space-y-4">
          <div className="ml-2 mt-2 w-fit rounded-md border-2 border-black pl-6 pr-4 ">
            <label htmlFor="ul" className="text-right text-lg font-bold">
              CV Summary:
            </label>
            <ul className="list-outside list-disc space-y-[3px] ">
              {summaryList}
            </ul>
          </div>
          <div className="ml-2 mt-2 w-fit rounded-md border-2 border-black pl-6 pr-4 ">
            <label htmlFor="ul" className="text-right text-lg font-bold">
              Jobs jobSummary:
            </label>
            <ul className="list-outside list-disc space-y-[3px] ">{jobList}</ul>
          </div>
        </div>
      ) : null}
      {nodes ? (
        <div className="ml-2 mt-2 w-full rounded-md border-2 border-black pl-6 pr-4 ">
          <DynamicSearchGraph
            nodesID={nodes}
            activeNodes={Array(nodes.length).fill(true)}
            isNewNodes={Array(nodes.length).fill(false)}
            // setActivateNodeEvent={setActivateNodeEvent}
            height={"380"}
            // graphType={"simple"}
            // graphType={"KG_AI_2"}
            graphType={"KG_AI_2_plusIndustry"}
            // zoomGraph={1.1}
            // setRelatedNodePopup={handleOpenPopup}
            // disableZoom={true}
          />
        </div>
      ) : null}
    </div>
  );
};

export default HolisticCvGPT;
