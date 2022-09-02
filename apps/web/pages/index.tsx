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
          new user signup
        </Button>
      </div>
      <div className={`m-4`}>
        <Button variant={`primary`} onClick={() => router.push(`/launch`)}>
          launch a project
        </Button>
      </div>
      <div className={`m-4`}>
        <Button variant={`primary`} onClick={() => router.push(`/projects`)}>
          user dashboard
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
