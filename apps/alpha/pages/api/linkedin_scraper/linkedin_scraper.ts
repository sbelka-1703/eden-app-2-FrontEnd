import { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { Browser, Page } from "puppeteer";

// Replace this with the actual LinkedIn profile URL
const linkedInProfileURL =
  "https://www.linkedin.com/in/miltiadis-saratzidis-b1a396129/";

async function extractLinkedInProfile(url: string): Promise<string> {
  const browser: Browser = await puppeteer.launch({ headless: true });
  const page: Page = await browser.newPage();

  // Use this line if you need to sign in to LinkedIn first
  // await signInToLinkedIn(page);

  await page.goto(url, { waitUntil: "networkidle2" });
  const content: string = await page.content();

  await browser.close();
  return content;
}

// async function signInToLinkedIn(page: Page): Promise<void> {
//   // Add your LinkedIn credentials here
//   const email = "your@email.com";
//   const password = "your-password";

//   await page.goto("https://www.linkedin.com/login", {
//     waitUntil: "networkidle2",
//   });
//   await page.type("#username", email);
//   await page.type("#password", password);
//   await Promise.all([
//     page.waitForNavigation({ waitUntil: "networkidle2" }),
//     page.click(".login__form_action_container button"),
//   ]);
// }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const profileHTML = await extractLinkedInProfile(linkedInProfileURL);

      res.status(200).json({ profileHTML });
    } catch (error) {
      res.status(500).json({ error: "Failed to scrape LinkedIn profile" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
