import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  ChangeEvent,
  // FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import { Loading } from "../../elements";
// export const CV_TO_SUMMARY = gql`
//   mutation ($fields: CVtoSummaryInput!) {
//     CVtoSummary(fields: $fields) {
//       result
//     }
//   }
// `;

export const SAVE_CV_TO_USER = gql`
  mutation SaveCVtoUser($fields: saveCVtoUserInput) {
    saveCVtoUser(fields: $fields) {
      success
    }
  }
`;

export interface ICVUploadGPTProps {
  timePerWeek?: number;
  seed?: string;
}

// eslint-disable-next-line no-unused-vars
export const CVUploadGPT = ({ timePerWeek, seed }: ICVUploadGPTProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  // const [summary, setSummary] = useState<string | null>(null);
  const { currentUser } = useContext(UserContext);

  const [SaveCVtoUser] = useMutation(SAVE_CV_TO_USER, {
    // onCompleted({ SaveCVtoUser }) {
    //   console.log("SaveCVtoUser", SaveCVtoUser);
    //   console.log("SaveCVtoUser.result", SaveCVtoUser.result);
    //   setSummary(SaveCVtoUser.result);
    // },
    onCompleted: (data) => {
      console.log("------>", data);

      setUploading(false);
      toast.success("success");
    },
    onError: (err) => {
      setUploading(false);
      toast.error(err.message);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      setUploading(true);
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

          SaveCVtoUser({
            variables: {
              fields: {
                // cvString: text
                userID: currentUser?._id,
                cvContent: text,
              },
            },
          });

          console.log(text);
        } else {
          const { error } = await response.json();

          console.log("error aaa", error);
        }
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!file) {
  //     return;
  //   }
  //   const reader = new FileReader();

  //   reader.onloadend = async () => {
  //     const base64File = ((reader.result as string) || "").split(",")[1];
  //     const response = await fetch("../api/process-pdf/process-pdf", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ fileBuffer: base64File }),
  //     });

  //     if (response.ok) {
  //       const { text } = await response.json();

  //       SaveCVtoUser({
  //         variables: {
  //           fields: {
  //             // cvString: text
  //             userID: currentUser?._id,
  //             cvContent: text,
  //           },
  //         },
  //       });

  //       console.log(text);
  //     } else {
  //       const { error } = await response.json();

  //       console.log("error aaa", error);
  //     }
  //   };

  //   reader.readAsDataURL(file);
  // };

  // const summaryList = summary
  //   ? summary
  //       .split("•")
  //       .filter((item) => item.trim() !== "")
  //       .map((item, index) => <li key={index}>{item}</li>)
  //   : [];

  // console.log("summaryList", summaryList);

  return (
    <div className="w-fit ">
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-2"
      >
        {/* <label>Resume(CV)</label> */}
        {/* <label htmlFor="input" className="text-center text-sm">
          Upload Recent Resume for Better Results Form Our AI
        </label> */}
        <input
          className="ml-60"
          onChange={handleFileChange}
          type="file"
          accept=".pdf"
        ></input>
        {uploading && <Loading title="uploading" />}
        {/* <button
          className="rounded-lg border-2 border-blue-400 px-2 font-bold text-blue-400 hover:border-blue-700 hover:bg-blue-700 hover:text-white"
          type="submit"
        >
          Upload Resume
        </button> */}
      </form>
      {/* {summary ? (
        <div className="ml-2 mt-2 w-fit rounded-md border-2 border-black pl-6 pr-4 ">
          <label htmlFor="ul" className="text-right text-lg font-bold">
            CV Summary:
          </label>
          <ul className="list-outside list-disc space-y-[3px] ">
            {summaryList}
          </ul>
        </div>
      ) : null} */}
    </div>
  );
};
