import { gql, useMutation } from "@apollo/client";
import React, { ChangeEvent, FormEvent, useState } from "react";

export const CV_TO_SUMMARY = gql`
  mutation ($fields: CVtoSummaryInput!) {
    CVtoSummary(fields: $fields) {
      result
    }
  }
`;
const CvGPT = () => {
  const [file, setFile] = useState<File | null>(null);

  const [CVtoSummary] = useMutation(CV_TO_SUMMARY);

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

        CVtoSummary({ variables: { fields: { cvString: text } } });

        //   messageToGPT({
        //     variables: {
        //       fields: {
        //         message: (customPrompt || "") + messageFromParent,
        //         category: category,
        //         prompt: prompt,
        //       },
        //     },
        //   });
        // }

        console.log(text);
      } else {
        const { error } = await response.json();

        console.log("error aaa", error);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="w-72 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-2"
      >
        <label>Resume(CV)</label>
        <label htmlFor="input" className="text-center text-sm">
          Upload Recent Resume for Better Results Form Our AI
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
    </div>
  );
};

export default CvGPT;
