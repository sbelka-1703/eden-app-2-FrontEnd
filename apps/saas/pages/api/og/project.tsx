import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const DEFAULT_IMAGE = `https://pbs.twimg.com/profile_images/1595723986524045312/fqOO4ZI__400x400.jpg`;

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = "Eden protocol - alpha";

    const urlDecoded = decodeURI(req.url);

    // console.log("urlDecoded", urlDecoded);

    // find project in request url
    const projectIndex = urlDecoded.indexOf("project=");

    // get project string in request url
    const projectString = urlDecoded.slice(projectIndex);

    // get project value in request url and split value by = and &
    const projectValue = projectString
      .split("=")[1]
      .split("role")[0]
      .replace(/\+/g, " ");

    // // find role in request url
    // const roleIndex = req.url.indexOf("role=");

    // // get role string in request url
    // const roleString = req.url.slice(roleIndex);

    // // get role value in request url and split value by = and &
    // const roleValue = roleString.split("=")[1].split("&")[0];

    const imageSrc = searchParams.get("image") ?? DEFAULT_IMAGE;

    const project = projectValue ? `${projectValue}` : "";

    // const project = "";

    // const role = roleValue ? roleValue : "";

    const role = "";

    return new ImageResponse(
      (
        // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div tw="bg-white flex">
            <div tw="flex flex-col md:flex-row w-full md:items-center justify-between">
              <div tw={`flex flex-col w-1/2 pl-8`}>
                <span tw={`text-lg`} style={{ color: "#071B08" }}>
                  check out my project on
                </span>
                <span tw="text-zinc-600 text-2xl" style={{ color: "#071B08" }}>
                  {title}
                </span>
                <h2 tw="flex flex-col font-bold text-left py-6">
                  <span tw={`text-4xl font-extrabold text-zinc-800`}>
                    {project}
                  </span>
                  <span tw={`text-zinc-600 text-3xl`}>{role}</span>
                </h2>
              </div>

              <div tw="flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${project} profile image`}
                  height={400}
                  src={imageSrc}
                  style={{ margin: "0 0px" }}
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
