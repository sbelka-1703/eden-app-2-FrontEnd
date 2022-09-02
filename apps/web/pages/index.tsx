import { useRouter } from "next/router";
import {
  Button,
  TextBody,
  TextHeading1,
  TextHeading2,
  TextHeading3,
  TextLabel,
} from "ui";

export default function Web() {
  const router = useRouter();

  return (
    <div>
      <span className="p-8 text-3xl font-bold text-gray-600">Landing Page</span>
      <TextHeading1>The brown fox jumped over the lazy dog.</TextHeading1>
      <TextHeading2>The brown fox jumped over the lazy dog.</TextHeading2>
      <TextHeading3>The brown fox jumped over the lazy dog.</TextHeading3>
      <TextBody>The brown fox jumped over the lazy dog.</TextBody>
      <TextLabel>The brown fox jumped over the lazy dog.</TextLabel>
      <div className={`m-4`}>
        <Button variant={`primary`} onClick={() => router.push(`/signup`)}>
          signup
        </Button>
      </div>
      <div className={`m-4`}>
        <Button variant={`primary`} onClick={() => router.push(`/launch`)}>
          launch
        </Button>
      </div>
      <div className={`m-4`}>
        <Button variant={`primary`} onClick={() => router.push(`/projects`)}>
          projects
        </Button>
      </div>

      {/* <div className={`m-4`}>
        <Button
          variant={`primary`}
          onClick={() => router.push(`/champion-board`)}
        >
          champion dashboard
        </Button>
      </div> */}
      <div className={`m-4`}>
        <Button
          variant={`primary`}
          onClick={() =>
            router.push(`/champion-board/recruit/62f77a832dc2d40004d4512f`)
          }
        >
          champion dashboard recruit
        </Button>
      </div>

      <div className={`m-4`}>
        <Button variant={`primary`} onClick={() => router.push(`/profile`)}>
          profile
        </Button>
      </div>
    </div>
  );
}
