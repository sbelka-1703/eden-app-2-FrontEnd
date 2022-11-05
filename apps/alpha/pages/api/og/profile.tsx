import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const DEFAULT_IMAGE = `https://pbs.twimg.com/profile_images/1563942271170617344/4Tpfr8SY_400x400.jpg`;

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = "Eden protocol - alpha";

    // find handle in request url
    const handleIndex = req.url.indexOf("handle=");

    // get handle string in request url
    const handleString = req.url.slice(handleIndex);

    // get handle value in request url and split value by = and &
    const handleValue = handleString.split("=")[1].split("&")[0];

    // find handle in request url
    const roleIndex = req.url.indexOf("role=");

    // get handle string in request url
    const roleString = req.url.slice(roleIndex);

    // get handle value in request url and split value by = and &
    const roleValue = roleString.split("=")[1].split("&")[0];

    const imageSrc = searchParams.get("image") ?? DEFAULT_IMAGE;

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
            <div tw="flex flex-col md:flex-row w-full md:items-center justify-between">
              <div tw={`flex flex-col pl-8`}>
                <span tw={`text-lg`} style={{ color: "#071B08" }}>
                  connect with me on
                </span>
                <span
                  tw="inline text-zinc-600 text-2xl"
                  style={{ color: "#071B08" }}
                >
                  {title}
                </span>
                <h2 tw="flex flex-col font-bold tracking-tight text-left py-6">
                  <span tw={`text-5xl font-extrabold text-zinc-800`}>
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
