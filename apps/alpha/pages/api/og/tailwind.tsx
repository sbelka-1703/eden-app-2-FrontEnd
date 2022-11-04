import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const DEFAULT_IMAGE = `https://pbs.twimg.com/profile_images/1563942271170617344/4Tpfr8SY_400x400.jpg`;

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    const hasHandle = searchParams.has("handle");
    const handle = hasHandle
      ? searchParams.get("handle")?.slice(0, 100)
      : "default handle";

    const hasImage = searchParams.has("image");
    const imageSrc = hasImage
      ? searchParams.get("image")?.slice(0, 100)
      : DEFAULT_IMAGE;

    // const handle = searchParams.get("handle") ?? "";
    // const imageSrc = searchParams.get("image") ?? "";

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
          <div tw="bg-green-500 flex">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>{title}</span>
                <span tw="text-indigo-600">Connect with @{handle}</span>
              </h2>
              <div tw="mt-8 flex md:mt-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Vercel"
                  height={400}
                  src={imageSrc}
                  style={{ margin: "0 20px" }}
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
