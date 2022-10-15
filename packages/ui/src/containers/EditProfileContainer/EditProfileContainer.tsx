import { ProjectActionKind, UserContext } from "@eden/package-context";
import { getMember } from "@eden/package-mock";
import {
  Button,
  Card,
  EmojiSelector,
  ProjectLayoutCard,
  TextBody,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import { useContext } from "react";

export interface IEditProfileContainerProps {}

export const EditProfileContainer = ({}: IEditProfileContainerProps) => {
  const member = getMember();

  return (
    <>
      <Card className="mb-8 bg-white p-6">
        <section className="mb-6">
          <TextHeading3>Edit Your Profile: </TextHeading3>
        </section>
        <section className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="col-span-1">
            <div className="mb-3">
              <TextBody>Personal</TextBody>
              {/*<TextField name="title" placeholder="Start typing here" /> */}
            </div>
            <div className="mb-3">
              <TextBody>Choose emoji for your project</TextBody>
            </div>
            <EmojiSelector />
          </div>
          <div className="col-span-1">
            <TextBody className="mb-1">Preview</TextBody>
          </div>
        </section>
      </Card>
      <Button variant="primary" className="mx-auto">
        Next
      </Button>
    </>
  );
};
