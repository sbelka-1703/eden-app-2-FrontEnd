import { NextApiRequest, NextApiResponse } from "next";
import pdfParse from "pdf-parse";

type Data = {
  fileBuffer: string;
};

type ResponseData = {
  text: string;
};

type errorResponse = {
  error: string;
};
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

const processPdf = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | errorResponse>
) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const { fileBuffer } = req.body as Data;

  if (!fileBuffer) {
    res.status(400).json({ error: "No file buffer provided" });
  }

  try {
    const buffer = Buffer.from(fileBuffer, "base64");
    const pdfData = await pdfParse(buffer);

    res.status(200).json({ text: pdfData.text });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the PDF" });
  }
};

export default processPdf;
