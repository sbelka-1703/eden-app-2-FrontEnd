import { useState } from "react";
interface CvGPTProps {}

const CvGPT: CvGPTProps = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();

    body.append("file", file);

    const response = await fetch("../api/extract-pdf/extract-pdf", {
      method: "POST",
      body,
    });

    if (response.ok) {
      console.log("response", response);
      const data = await response.json();

      // setString(data);

      console.log("data", data);

      console.log("data.text", data.text);
    } else {
      console.error("Error uploading and extracting file.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange}></input>
      <button className="border-2 border-red-400" type="submit">
        Submit
      </button>
    </form>
  );
};

export default CvGPT;
