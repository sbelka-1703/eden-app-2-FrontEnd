import { gql, useMutation } from "@apollo/client";
import { DynamicSearchGraph } from "@eden/package-ui";
import React, { ChangeEvent, FormEvent, useState } from "react";

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
const CvNodes = () => {
  const [file, setFile] = useState<File | null>(null);
  const [nodes, setNodes] = useState<string[] | null>(null);

  const [CVtoNodes] = useMutation(CV_TO_NODES, {
    onCompleted({ cvMapKG }) {
      console.log("cvMapKG", cvMapKG);
      console.log("cvMapKG.nodeID", cvMapKG.keywords.nodeID);
      console.log("cvMapKG.nodeID", cvMapKG.keywords.nodeID);
      console.log("cvMapKG.keywords", cvMapKG.keywords);
      console.log("cvMapKG.keywords.nodeID", cvMapKG.keywords.nodeID);
      const nodeIDs = cvMapKG.keywords.map((node: any) => node.nodeID);

      setNodes(nodeIDs);
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

        CVtoNodes({ variables: { fields: { message: text } } });

        console.log(text);
      } else {
        const { error } = await response.json();

        console.log("error aaa", error);
      }
    };

    reader.readAsDataURL(file);
  };

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
        <button
          className="rounded-lg border-2 border-blue-400 px-2 font-bold text-blue-400 hover:border-blue-700 hover:bg-blue-700 hover:text-white"
          type="submit"
        >
          Upload Resume
        </button>
      </form>
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

export default CvNodes;
