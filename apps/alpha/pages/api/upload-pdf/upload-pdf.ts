/*
The fs module provides functions for
creating, reading, updating, and deleting
files and directories.
*/
import fs, { writeFileSync } from "fs";
/*
`promisify` is a function in Node.js that
is used to convert a function that uses
a callback into a function that returns a promise.
 */
import PDFParser from "pdf2json";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export default async function handler(req, res) {
  // if (req.method === "POST") {
  // try {
  // req refers to a HTTP request object incoming to a server. req.body refers to the data in that request.
  //In this case it should be the PDF file
  //   const fileDataFromPDF = req.body;

  //   //Generates a unique filename based on Date.now()
  //   const fileName = `${Date.now()}.pdf`;

  //   //Write the file to local storage
  //   await writeFileAsync(`public/uploads/${fileName}`, fileDataFromPDF);

  //Read the contents of the file
  // const fileContents = await readFileAsync("public/uploads/${fileName}");
  const fileContents = await readFileAsync("public/uploads/Sergey-Belyaev.pdf");

  //Parse the PDF and extract text
  const pdfParser = new PDFParser();

  pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
    const pdfStringArray = pdfData.Pages.map((Page) =>
      Page.Texts.map((words) => decodeURIComponent(words.R[0].T)).join("")
    );

    // return res.status(200).json({ Data: pdfData });
    const test = pdfStringArray.join("");

    return res.status(200).json({ Data: test });
  });
  pdfParser.parseBuffer(fileContents);
}

// catch (error) {
//   return res
//     .status(500)
//     .json({ message: "Error uploading and extracting file." });
// }
// } else {
//   // Send a response in case it's not a POST request
//   return res.status(400).json({ message: "Invalid request method." });
// }
// }
