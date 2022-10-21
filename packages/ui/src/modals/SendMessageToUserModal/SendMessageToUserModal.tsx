import { UserContext } from "@eden/package-context";
import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Modal,
  TextArea,
  TextHeading3,
} from "@eden/package-ui";
import { useContext, useState } from "react";

export interface SendMessageToUserModalProps {
  openModal: boolean;
  member: Maybe<Members>;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (message: string, member: Maybe<Members>) => void;
}

export const SendMessageToUserModal = ({
  member,
  onSubmit,
  openModal,
}: SendMessageToUserModalProps) => {
  const { currentUser } = useContext(UserContext);
  const [message, setMessage] = useState("");

  return (
    <Modal open={openModal} closeOnEsc={false}>
      <TextHeading3 className="col-span-2 mb-4">
        Let’s invite @{member?.discordName} to apply to School of Code!
      </TextHeading3>
      <div className="rounded-xl border border-gray-300 py-4 px-3">
        <div className="flex items-center ">
          <Avatar
            src={currentUser?.discordAvatar || ""}
            alt={currentUser?.discordName || ""}
          />
          <TextHeading3 className="ml-3">
            @{currentUser?.discordName}
            <span className="text-sm text-gray-400">
              #{currentUser?.discriminator}
            </span>
          </TextHeading3>
        </div>
        <div className="mt-3">
          <TextHeading3>Hey, @{member?.discordName}!</TextHeading3>
          <TextArea
            rows={6}
            value={message}
            className="border-none px-0"
            placeholder="Start typing here"
            customStyle={{ boxShadow: "none", fontSize: "20px" }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-3 text-center">
        <div className="inline-block">
          <Button
            variant="primary"
            onClick={() => {
              onSubmit(message, member);
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </Modal>
  );
};
