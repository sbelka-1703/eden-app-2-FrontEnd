import cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { Browser, Page } from "puppeteer";

// Replace this with the actual LinkedIn profile URL

// const linkedInProfileURL = "https://www.linkedin.com/in/michaelsypes/";

async function extractLinkedInProfile(url: string): Promise<string> {
  const browser: Browser = await puppeteer.launch({ headless: true });
  const page: Page = await browser.newPage();

  // Sign in to LinkedIn
  //   await signInToLinkedIn(page);

  await page.goto(url, { waitUntil: "networkidle2" });
  const content: string = await page.content();

  await browser.close();
  return content;
}

// async function signInToLinkedIn(page: Page): Promise<void> {
//   // Add your LinkedIn credentials here
//   const email = "miciti3036@carpetra.com";
//   const password = "4)sk=gf.6,7PP*Y";

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

function extractTextFromHTML(html: string): string {
  const $ = cheerio.load(html);

  return $("body").text().replace(/\n/g, "");
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
      res.status(400).json({ error: "Invalid or missing URL parameter" });
      return;
    }

    try {
      const profileHTML = await extractLinkedInProfile(url);
      const profileText = extractTextFromHTML(profileHTML);

      res.status(200).json({ profileText });
    } catch (error) {
      res.status(500).json({ error: "Failed to scrape LinkedIn profile" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
