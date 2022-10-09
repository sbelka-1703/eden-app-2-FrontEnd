import {
  Avatar,
  Button,
  Modal,
  TextArea,
  TextHeading3,
} from "@eden/package-ui";
import { useState } from "react";

export interface SendMessageToUserModalProps {
  sender: string;
  avatar?: string;
  senderId: number;
  receiver: string;
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (message: string) => void;
}

export const SendMessageToUserModal = ({
  avatar,
  sender,
  receiver,
  onSubmit,
  senderId,
  openModal,
}: SendMessageToUserModalProps) => {
  const [message, setMessage] = useState("");

  return (
    <Modal open={openModal} closeOnEsc={false}>
      <TextHeading3 className="col-span-2 mb-4">
        Let’s invite @{receiver} to apply to School of Code!
      </TextHeading3>
      <div className="rounded-xl border border-gray-300 py-4 px-3">
        <div className="flex items-center ">
          <Avatar src={avatar} alt={sender} />
          <TextHeading3 className="ml-3">
            @{sender}
            <span className="text-sm text-gray-400">#{senderId}</span>
          </TextHeading3>
        </div>
        <div className="mt-3">
          <TextHeading3>Hey, @{receiver}!</TextHeading3>
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
              onSubmit(message);
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </Modal>
  );
};
