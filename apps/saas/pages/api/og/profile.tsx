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

    // find handle in request url
    const handleIndex = urlDecoded.indexOf("handle=");

    // get handle string in request url
    const handleString = urlDecoded.slice(handleIndex);

    // get handle value in request url and split value by = and &
    const handleValue = handleString
      .split("=")[1]
      .split("&")[0]
      .replace(/\+/g, " ");

    // find handle in request url
    const roleIndex = urlDecoded.indexOf("role=");

    // get handle string in request url
    const roleString = urlDecoded.slice(roleIndex);

    // get handle value in request url and split value by = and &
    const roleValue = roleString
      .split("=")[1]
      .split("&")[0]
      .replace(/\+/g, " ");

    const imageSrc = searchParams.get("image") ?? DEFAULT_IMAGE;

    // check if imageSrc ends with .webp
    const isWebp = imageSrc.endsWith(".webp");

    const handle = handleValue ? `@${handleValue}` : "";

    const role = roleValue ? roleValue : "";

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
                  connect with me on
                </span>
                <span tw="text-zinc-600 text-2xl" style={{ color: "#071B08" }}>
                  {title}
                </span>
                <h2 tw="flex flex-col font-bold text-left py-6 flex-wrap">
                  <span tw={`text-4xl font-extrabold text-zinc-800`}>
                    {handle}
                  </span>
                  <span tw={`text-zinc-600 text-3xl`}>{role}</span>
                </h2>
              </div>

              <div tw="flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${handle} profile image`}
                  height={400}
                  src={isWebp ? DEFAULT_IMAGE : imageSrc}
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
