import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const DEFAULT_IMAGE = `https://pbs.twimg.com/profile_images/1595723986524045312/fqOO4ZI__400x400.jpg`;

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = "Eden protocol - alpha";

    const urlDecoded = decodeURI(req.url);

    // console.log("urlDecoded", urlDecoded);

    // find name in request url
    const nameIndex = urlDecoded.indexOf("name=");

    // get name string in request url
    const nameString = urlDecoded.slice(nameIndex);

    console.log("nameString", nameString);

    // get name value in request url and split value by = and &
    const nameValue = nameString
      .split("=")[1]
      .split("&")[0]
      .replace(/\+/g, " ");

    console.log("nameValue", nameValue);

    // find description in request url
    const descriptionIndex = urlDecoded.indexOf("description=");

    // get description string in request url
    const descriptionString = urlDecoded.slice(descriptionIndex);

    // get description value in request url and split value by = and &
    const descriptionValue = descriptionString
      .split("=")[1]
      .split("&")[0]
      .replace(/\+/g, " ");

    const imageSrc = searchParams.get("image") ?? DEFAULT_IMAGE;

    const name = nameValue ? `${nameValue}` : "";

    const description = descriptionValue ? descriptionValue : "";

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
            <div tw="flex w-full md:items-center justify-between">
              <div tw={`flex flex-col w-1/2 pl-8`}>
                <span tw={`text-lg`} style={{ color: "#071B08" }}>
                  view this grant on
                </span>
                <span tw="text-zinc-600 text-2xl" style={{ color: "#071B08" }}>
                  {title}
                </span>
                <h2 tw="flex flex-col font-bold text-left py-6 flex-wrap">
                  <span
                    tw={`text-4xl font-extrabold text-zinc-800 break-normal`}
                  >
                    {name}
                  </span>
                  <span tw={`text-zinc-600 text-3xl`}>{description}</span>
                </h2>
              </div>

              <div tw="flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${name} profile image`}
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
