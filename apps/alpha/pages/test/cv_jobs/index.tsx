import { gql, useMutation } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface Jobs {
  job: string;
  description: string;
}

export const CV_TO_JOBS = gql`
  mutation ($fields: CVtoJobsInput!) {
    CVtoJobs(fields: $fields) {
      result
    }
  }
`;
const CvJobs = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const [CVtoJobs] = useMutation(CV_TO_JOBS, {
    onCompleted({ CVtoJobs }) {
      console.log("CVtoSummary", CVtoJobs);
      console.log("CVtoSummary.result", CVtoJobs.result);
      setSummary(CVtoJobs.result);
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

        CVtoJobs({ variables: { fields: { cvString: text } } });

        console.log(text);
      } else {
        const { error } = await response.json();

        console.log("error aaa", error);
      }
    };

    reader.readAsDataURL(file);
  };

  const jobList = summary
    ? JSON.parse(summary).map((item: Jobs, index: number) => (
        <li key={index}>
          {item.job}
          <ul>
            <li>{jobList.description}</li>
          </ul>
        </li>
      ))
    : [];

  console.log("summaryList", jobList);

  return (
    <div className="w-5/12 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-2"
      >
        <label>Resume(CV)</label>
        <label htmlFor="input" className="text-center text-sm">
          Upload Recent Resume And Get Previous Job Sum,
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
      {summary ? (
        <div className="mt-2 ml-2 w-fit rounded-md border-2 border-black pl-6 pr-4 ">
          <label htmlFor="ul" className="text-right text-lg font-bold">
            Jobs Summary:
          </label>
          <ul className="list-outside list-disc space-y-[3px] ">{jobList}</ul>
        </div>
      ) : null}
    </div>
  );
};

export default CvJobs;
